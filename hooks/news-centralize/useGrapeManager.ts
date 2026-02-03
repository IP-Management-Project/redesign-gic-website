import { useEffect, useRef, useState } from "react";

export function useGrapesManager(article: any, fetchingData: boolean) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null);
  const [loadingEditor, setLoadingEditor] = useState(true);

  useEffect(() => {
    if (fetchingData || !article || !containerRef.current) return;

    // ✅ Make sure targets exist (sidebar mounted)
    const blocksEl = document.getElementById("blocks");
    const layersEl = document.getElementById("layers");
    const traitsEl = document.getElementById("traits");
    const stylesEl = document.getElementById("styles");
    if (!blocksEl || !layersEl || !traitsEl || !stylesEl) return;

    let cancelled = false;

    async function initGrapes() {
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
          selectorManager: { componentFirst: true },

          // ✅ attach to your sidebar targets
          blockManager: { appendTo: "#blocks" },
          layerManager: { appendTo: "#layers" },
          traitManager: { appendTo: "#traits" },
          styleManager: {
            appendTo: "#styles",
            sectors: [
              { name: "Layout", open: true, buildProps: ["display", "position", "top", "right", "left", "bottom", "z-index"] },
              { name: "Typography", open: false, buildProps: ["font-family", "font-size", "font-weight", "letter-spacing", "color", "text-align"] },
              { name: "Decorations", open: false, buildProps: ["background-color", "border", "border-radius", "box-shadow"] },
              { name: "Extra", open: false, buildProps: ["opacity", "cursor"] },
            ],
          },

          plugins: [presetWebpage, pluginForms, pluginCountdown, pluginCustomCode, pluginTooltip],
          pluginsOpts: {
            [presetWebpage as any]: {
              blocksBasicOpts: {
                blocks: ["column1", "column2", "column3", "text", "link", "image", "video", "map"],
                flexGrid: true,
              },
            },
          },


          // ✅ IMPORTANT: do NOT nuke panels
          // panels: { defaults: [] },
        });

        if (!editor.BlockManager.get("image")) {
          editor.BlockManager.add("image", {
            label: "Image",
            category: "Basic",
            media: `
      <svg viewBox="0 0 24 24" width="100" height="100">
        <path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5Z"/>
      </svg>
    `,
            content: { type: "image" },
            select: true,
            activate: true,
          });
        }
        editor.setComponents(article?.html || article.content?.html ||`<div style="padding: 20px;"><h1>${article.title}</h1></div>`);
        editor.setStyle(article?.css || article.content?.css || "");

        if (!cancelled) {
          editorRef.current = editor;
          setLoadingEditor(false);
        }
      } catch (err) {
        console.error("GrapesJS Init Failed:", err);
        setLoadingEditor(false);
      }
    }

    initGrapes();

    return () => {
      cancelled = true;
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [article, fetchingData]);

  return { containerRef, editorRef, loadingEditor };
}
