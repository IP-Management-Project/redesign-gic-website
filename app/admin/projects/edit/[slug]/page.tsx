"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { usePageBySlug, usePageActions } from "@/hooks/usePageManager";
import { Spinner } from "@heroui/react";

import "grapesjs/dist/css/grapes.min.css";
import "./grapesjs-theme.css";

export default function EditorClient() {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null);

  // Hook Data
  const { data: page, isLoading: fetchingData } = usePageBySlug(slug);
  const { savePage, isSaving } = usePageActions();

  const [loadingEditor, setLoadingEditor] = useState(true);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const adminCon = document.getElementById("admincon");
    const mainParent = adminCon?.parentElement; 

    if (adminCon && mainParent) {
      mainParent.style.maxWidth = "none";
      mainParent.style.padding = "0";
      mainParent.style.margin = "0";
      mainParent.style.overflow = "hidden";
      mainParent.style.height = "100vh";
      mainParent.style.backgroundColor = "#0f0f10";

      adminCon.style.maxWidth = "none";
      adminCon.style.padding = "0";
      adminCon.style.margin = "0";
      adminCon.style.width = "100%";
    }

    return () => {
      if (adminCon && mainParent) {
        mainParent.style.maxWidth = "";
        mainParent.style.padding = "";
        mainParent.style.margin = "";
        mainParent.style.overflow = "";
        mainParent.style.height = "";
        mainParent.style.backgroundColor = "";

        adminCon.style.maxWidth = "";
        adminCon.style.padding = "";
        adminCon.style.margin = "";
        adminCon.style.width = "";
      }
    };
  }, []);

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
          assetManager: {
            embedAsBase64: true,
          },
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
          pluginsOpts:{
            [presetWebpage as any]: {
              blocksBasicOpts: {
                blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video', 'map'],
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

        if (!editor.BlockManager.get('image')) {
          editor.BlockManager.add('image', {
            label: 'IMAGE',
            category: 'Basic',
            select: true,
            content: { type: 'image' },
            activate: true,
          });
        }

        // ✅ Inject the dynamic data from your hook
        editor.setComponents(page?.html || '<div><h1>Could not load content</h1></div>');
        editor.setStyle(page?.css);

        editor.BlockManager.add("flex-container", {
          label: "Flex Container",
          category: "Layout",
          content: `<div style="display:flex;gap:12px;padding:16px;min-height:50px;"></div>`,
        });

        if (!cancelled) {
          editorRef.current = editor;
          setLoadingEditor(false);
        }
      } catch (err: any) {
        console.error("GrapesJS init error:", err);
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

  const handleSave = () => {
    const editor = editorRef.current;
    if (!editor || !page) return;

    savePage({
      ...page,
      html: editor.getHtml() || "",
      css: editor.getCss() || "",
      updatedAt: new Date().toISOString()
    });

    setStatus("Syncing... ✅");
    setTimeout(() => setStatus(""), 2000);
  };

  if (fetchingData) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <Spinner label="Opening Design Studio..." />
      </div>
    );
  }

  return (
    <div className="gjs-editor-breakout"
    >
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr 320px", height: "100vh", backgroundColor: "" }}>
        {/* LEFT PANEL */}
        <aside style={{ borderRight: "1px solid #333", overflow: "auto", padding: 12, color: "white" }}>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              width: "100%", padding: "12px", background: "#2563eb", color: "white",
              border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer",
              opacity: isSaving ? 0.5 : 1
            }}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <div style={{ fontSize: 10, textAlign: "center", marginTop: 8, color: "#aaa" }}>{status}</div>
          <hr style={{ border: "0.5px solid #333", margin: "20px 0" }} />
          <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Blocks</h3>
          <div id="blocks" />
          <hr style={{ border: "0.5px solid #333", margin: "20px 0" }} />
          <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Layers</h3>
          <div id="layers" />
        </aside>
        {/* CANVAS */}
        <main style={{ minWidth: 0, position: "relative", backgroundColor: "#f0f0f0" }}>
          <div className="gjs-topbar" style={{ borderBottom: "1px solid #ddd", height: "40px", backgroundColor: "white" }} />
          <div ref={containerRef} style={{ height: "calc(100vh - 40px)" }} />
        </main>
        {/* RIGHT PANEL */}
        <aside style={{ borderLeft: "1px solid #333", overflow: "auto", padding: 12, color: "white" }}>
          <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Traits</h3>
          <div id="traits" />
          <hr style={{ border: "0.5px solid #333", margin: "20px 0" }} />
          <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Styles</h3>
          <div id="styles" />
        </aside>
      </div>
    </div>
  );
}