"use client";

import { useEffect, useRef, useState } from "react";

type PageLike = {
  html?: string;
  css?: string;
};

export function useProjectGrapesManager(page: PageLike | undefined, fetchingData: boolean) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null);
  const [loadingEditor, setLoadingEditor] = useState(true);

  useEffect(() => {
    if (fetchingData || !page || !containerRef.current) return;

    let cancelled = false;

    async function init() {
      try {
        setLoadingEditor(true);

        const grapesjs = (await import("grapesjs")).default;
        const presetWebpage = (await import("grapesjs-preset-webpage")).default;
        const pluginForms = (await import("grapesjs-plugin-forms")).default;
        const pluginCountdown = (await import("grapesjs-component-countdown")).default;
        const pluginCustomCode = (await import("grapesjs-custom-code")).default;
        const pluginTooltip = (await import("grapesjs-tooltip")).default;

        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }

        const editor = grapesjs.init({
          container: containerRef.current!,
          height: "100%",
          width: "auto",
          fromElement: false,
          storageManager: false,
          assetManager: { embedAsBase64: true },

          // IMPORTANT: these must exist in sidebars
          blockManager: { appendTo: "#blocks" },
          layerManager: { appendTo: "#layers" },
          traitManager: { appendTo: "#traits" },

          selectorManager: { componentFirst: true },
          styleManager: {
            appendTo: "#styles",
            clearProperties: true,
            sectors: [
              { name: "Layout", open: true, buildProps: ["display", "position", "top", "right", "left", "bottom"] },
              { name: "Flex", open: false, buildProps: ["flex-direction", "flex-wrap", "justify-content", "align-items", "align-content", "gap"] },
              { name: "Size", open: false, buildProps: ["width", "height", "max-width", "min-height"] },
              { name: "Spacing", open: false, buildProps: ["margin", "padding"] },
              { name: "Typography", open: false, buildProps: ["font-family", "font-size", "font-weight", "color", "text-align"] },
              { name: "Background", open: false, buildProps: ["background-color", "background-image"] },
              { name: "Border", open: false, buildProps: ["border", "border-radius", "border-color"] },
              { name: "Extra", open: false, buildProps: ["overflow", "z-index"] },
            ],
          },

          plugins: [presetWebpage, pluginForms, pluginCountdown, pluginCustomCode, pluginTooltip],
          pluginsOpts: {
            [presetWebpage as any]: {
              blocksBasicOpts: {
                blocks: ["column1", "column2", "column3", "column3-7", "text", "link", "image", "video", "map"],
                flexGrid: true,
              },
            },
          },

          panels: {
            defaults: [
              {
                id: "top",
                el: ".gjs-topbar",
                buttons: [
                  { id: "undo", command: "core:undo", label: "Undo" },
                  { id: "redo", command: "core:redo", label: "Redo" },
                ],
              },
            ],
          },
        });

        // Ensure image block exists
        if (!editor.BlockManager.get("image")) {
          editor.BlockManager.add("image", {
            label: "IMAGE",
            category: "Basic",
            select: true,
            content: { type: "image" },
            activate: true,
          });
        }

        editor.BlockManager.add("flex-container", {
          label: "Flex Container",
          category: "Layout",
          content: `<div style="display:flex;gap:12px;padding:16px;min-height:50px;"></div>`,
        });

        editor.setComponents(page?.html || "<div><h1>Could not load content</h1></div>");
        editor.setStyle(page?.css || "");

        if (!cancelled) {
          editorRef.current = editor;
          setLoadingEditor(false);
        }
      } catch (err) {
        console.error("GrapesJS init error:", err);
        setLoadingEditor(false);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [page, fetchingData]);

  return { containerRef, editorRef, loadingEditor };
}
