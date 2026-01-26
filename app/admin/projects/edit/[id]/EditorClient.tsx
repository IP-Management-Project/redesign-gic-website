"use client";

import { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import "./grapesjs-theme.css";


type PageData = { html: string; css: string };

export default function EditorClient({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setLoading(true);
        setStatus("");

        // ✅ Wait until container exists
        if (!containerRef.current) return;

        // ✅ Load existing page content
        const res = await fetch(`/api/admin/pages/${id}`, { cache: "no-store" });
        const data: PageData = res.ok ? await res.json() : { html: "", css: "" };

        if (cancelled) return;

        // ✅ Dynamic import (prevents SSR / window errors)
        const grapesjs = (await import("grapesjs")).default;

        // Plugins (dynamic import to avoid bundling issues)
        const presetWebpage = (await import("grapesjs-preset-webpage")).default;
        const pluginForms = (await import("grapesjs-plugin-forms")).default;
        // const pluginTabs = (await import("grapesjs-tabs")).default;
        const pluginCountdown = (await import("grapesjs-component-countdown")).default;
        const pluginCustomCode = (await import("grapesjs-custom-code")).default;
        const pluginTooltip = (await import("grapesjs-tooltip")).default;

        // ✅ Important: if React Strict Mode double-mounts in dev, destroy old instance
        if (editorRef.current) {
          try {
            editorRef.current.destroy();
          } catch {}
          editorRef.current = null;
        }

        const editor = grapesjs.init({
          container: containerRef.current,
          height: "100%",
          width: "auto",
          fromElement: false,
          storageManager: false,

          // Mount into your panels
          blockManager: { appendTo: "#blocks" },
          layerManager: { appendTo: "#layers" },
          traitManager: { appendTo: "#traits" },
          selectorManager: { componentFirst: true },

          // ✅ One styleManager object: appendTo + sectors (includes padding/margin)
          styleManager: {
            appendTo: "#styles",
            clearProperties: true,
            sectors: [
              { name: "Layout", open: true, buildProps: ["display", "position", "top", "right", "left", "bottom"] },
              {
                name: "Flex",
                open: false,
                buildProps: ["flex-direction", "flex-wrap", "justify-content", "align-items", "align-content", "gap"],
              },
              { name: "Size", open: false, buildProps: ["width", "height", "max-width", "min-height"] },
              {
                name: "Spacing",
                open: false,
                buildProps: [
                  "margin",
                  "padding",
                  "margin-top",
                  "margin-right",
                  "margin-bottom",
                  "margin-left",
                  "padding-top",
                  "padding-right",
                  "padding-bottom",
                  "padding-left",
                ],
              },
              {
                name: "Typography",
                open: false,
                buildProps: [
                  "font-family",
                  "font-size",
                  "font-weight",
                  "letter-spacing",
                  "line-height",
                  "color",
                  "text-align",
                  "text-decoration",
                  "text-transform",
                ],
              },
              { name: "Background", open: false, buildProps: ["background", "background-color", "background-image", "background-size"] },
              { name: "Border", open: false, buildProps: ["border", "border-radius", "border-color", "border-width", "border-style"] },
              { name: "Effects", open: false, buildProps: ["box-shadow", "opacity"] },
              { name: "Extra", open: false, buildProps: ["overflow", "cursor", "z-index"] },
            ],
          },

          deviceManager: {
            devices: [
              { name: "Desktop", width: "" },
              { name: "Tablet", width: "768px", widthMedia: "992px" },
              { name: "Mobile", width: "375px", widthMedia: "480px" },
            ],
          },

          // ✅ “More features”
          plugins: [
            presetWebpage,
            pluginForms,
            // pluginTabs,
            pluginCountdown,
            pluginCustomCode,
            pluginTooltip,
          ],
          pluginsOpts: {
            [presetWebpage as any]: { blocksBasicOpts: { flexGrid: true } },
          },

          panels: {
            defaults: [
              {
                id: "top",
                el: ".gjs-topbar",
                buttons: [
                  { id: "undo", command: "core:undo", label: "Undo" },
                  { id: "redo", command: "core:redo", label: "Redo" },
                  { id: "preview", command: "preview", label: "Preview" },
                  { id: "fullscreen", command: "fullscreen", label: "Full" },
                  { id: "export", command: "export-template", label: "Export" },
                ],
              },
            ],
          },
        });

        // Load saved content
        if (data.html) editor.setComponents(data.html);
        if (data.css) editor.setStyle(data.css);

        // Add your own block(s)
        editor.BlockManager.add("flex-container", {
          label: "Flex Container",
          category: "Layout",
          content: `<div style="display:flex;gap:12px;padding:16px;align-items:flex-start;"></div>`,
        });

        editorRef.current = editor;

        if (!cancelled) setLoading(false);
      } catch (err: any) {
        console.error("GrapesJS init error:", err);
        if (!cancelled) {
          setStatus(`Init error: ${err?.message ?? String(err)}`);
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
        } catch {}
        editorRef.current = null;
      }
    };
  }, [id]);

  async function handleSave() {
    const editor = editorRef.current;
    if (!editor) return;

    setSaving(true);
    setStatus("");

    try {
      const payload: PageData = {
        html: editor.getHtml() ?? "",
        css: editor.getCss() ?? "", // ✅ fix string|undefined
      };
      console.log(payload);
      

      // const res = await fetch(`/api/admin/pages/${id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      // setStatus("Saved ✅");
      console.log();
      
    } catch (e: any) {
      setStatus(e?.message ?? "Save failed ❌");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(""), 2500);
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr 320px", height: "100vh" }}>
      {/* LEFT */}
      <aside style={{ borderRight: "1px solid #eee", overflow: "auto", padding: 12 }}>
        <button
          onClick={handleSave}
          disabled={loading || saving}
          style={{ padding: "10px 12px", border: "1px solid #ddd", borderRadius: 10 }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 8 }}>{status}</div>

        <hr style={{ margin: "14px 0" }} />
        <h3 style={{ margin: "8px 0" }}>Blocks</h3>
        <div id="blocks" className="font-bold" />

        <hr style={{ margin: "14px 0" }} />
        <h3 style={{ margin: "8px 0" }}>Layers</h3>
        <div id="layers" />
      </aside>

      {/* CANVAS */}
      <main style={{ minWidth: 0 }}>
        <div className="gjs-topbar" style={{ borderBottom: "1px solid #eee", padding: 8 }} />
        {loading && <div style={{ padding: 12 }}>Loading editor… (check console if stuck)</div>}
        <div ref={containerRef} style={{ height: "calc(100vh - 44px)" }} />
      </main>

      {/* RIGHT */}
      <aside style={{ borderLeft: "1px solid #eee", overflow: "auto", padding: 12 }}>
        <h3 style={{ margin: "8px 0" }}>Traits</h3>
        <div id="traits" />

        <hr style={{ margin: "14px 0" }} />
        <h3 style={{ margin: "8px 0" }}>Styles</h3>
        <div id="styles" className="font-[1000] text-2xl" />
      </aside>
    </div>
  );
}
