"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import type { NewsEventArticleItem, NewsEventArticleStatus } from "@/api/services/news";
import { useNewsEventArticleActions, useNewsEventArticleDetail } from "@/hooks/useNewsEventArticle";

import "grapesjs/dist/css/grapes.min.css";
import "./grapesjs-theme.css";

type NewsHeaderForm = {
  title: string;
  category: string;
  excerpt: string;
  publishDate: string;
  domain: string;
  readingTime: string;
  heroImage: string;
  thumbnailImage: string;
  status: NewsEventArticleStatus;
};

const emptyHeader: NewsHeaderForm = {
  title: "",
  category: "",
  excerpt: "",
  publishDate: "",
  domain: "",
  readingTime: "",
  heroImage: "",
  thumbnailImage: "",
  status: "UNPUBLISHED",
};

export default function NewsCentralizeEditor() {
  const { pageslug } = useParams<{ pageslug: string }>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<any>(null);

  const { data: article, isLoading: fetchingData } = useNewsEventArticleDetail(pageslug);
  const { saveNews, isSaving } = useNewsEventArticleActions();

  const [loadingEditor, setLoadingEditor] = useState(true);
  const [status, setStatus] = useState<string>("");
  const [header, setHeader] = useState<NewsHeaderForm>(emptyHeader);

  useEffect(() => {
    if (!article) return;
    setHeader({
      title: article.title ?? "",
      category: article.category ?? "",
      excerpt: article.excerpt ?? "",
      publishDate: article.publishDate ?? "",
      domain: article.domain ?? "",
      readingTime: article.readingTime ?? "",
      heroImage: article.heroImage ?? "",
      thumbnailImage: article.thumbnailImage ?? "",
      status: article.status ?? "UNPUBLISHED",
    });
  }, [article]);

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
    if (fetchingData || !article || !containerRef.current) return;

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

        if (!editor.BlockManager.get("image")) {
          editor.BlockManager.add("image", {
            label: "IMAGE",
            category: "Basic",
            select: true,
            content: { type: "image" },
            activate: true,
          });
        }

        editor.setComponents(article.content?.html || "<div><h1>Could not load content</h1></div>");
        editor.setStyle(article.content?.css || "");

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
  }, [article, fetchingData]);

  const handleSave = () => {
    const editor = editorRef.current;
    if (!editor || !article) return;

    const updatedContent = {
      grapesPageId: article.content?.grapesPageId ?? "news-content",
      slug: article.slug,
      title: header.title || article.title,
      html: editor.getHtml() || "",
      css: editor.getCss() || "",
      spotlight: article.content?.spotlight,
      relatedBriefs: article.content?.relatedBriefs,
      updatedAt: new Date().toISOString(),
    };

    const updated: NewsEventArticleItem = {
      ...article,
      category: header.category,
      title: header.title,
      excerpt: header.excerpt,
      publishDate: header.publishDate,
      domain: header.domain,
      readingTime: header.readingTime,
      heroImage: header.heroImage,
      thumbnailImage: header.thumbnailImage,
      status: header.status,
      updatedAt: new Date().toISOString(),
      content: updatedContent,
    };

    saveNews(updated);

    setStatus("Syncing... ✅");
    setTimeout(() => setStatus(""), 2000);
  };

  if (fetchingData) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950">
        <Spinner label="Opening News Studio..." />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950 text-white">
        Missing article data.
      </div>
    );
  }

  return (
    <div className="gjs-editor-breakout">
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr 320px", height: "100vh" }}>
        {/* LEFT PANEL */}
        <aside style={{ borderRight: "1px solid #333", overflow: "auto", padding: 12, color: "white" }}>
          <button
            onClick={handleSave}
            disabled={isSaving || loadingEditor}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer",
              opacity: isSaving ? 0.5 : 1,
            }}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <div style={{ fontSize: 10, textAlign: "center", marginTop: 8, color: "#aaa" }}>{status}</div>
          <hr style={{ border: "0.5px solid #333", margin: "20px 0" }} />

          <h3 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            Header Fields
          </h3>
          <div style={{ display: "grid", gap: 10 }}>
            <Field label="Title">
              <input
                value={header.title}
                onChange={(event) => setHeader((prev) => ({ ...prev, title: event.target.value }))}
              />
            </Field>
            <Field label="Category">
              <input
                value={header.category}
                onChange={(event) => setHeader((prev) => ({ ...prev, category: event.target.value }))}
              />
            </Field>
            <Field label="Excerpt">
              <textarea
                rows={3}
                value={header.excerpt}
                onChange={(event) => setHeader((prev) => ({ ...prev, excerpt: event.target.value }))}
              />
            </Field>
            <Field label="Publish Date">
              <input
                value={header.publishDate}
                onChange={(event) => setHeader((prev) => ({ ...prev, publishDate: event.target.value }))}
              />
            </Field>
            <Field label="Domain">
              <input
                value={header.domain}
                onChange={(event) => setHeader((prev) => ({ ...prev, domain: event.target.value }))}
              />
            </Field>
            <Field label="Reading Time">
              <input
                value={header.readingTime}
                onChange={(event) => setHeader((prev) => ({ ...prev, readingTime: event.target.value }))}
              />
            </Field>
            <Field label="Hero Image">
              <input
                value={header.heroImage}
                onChange={(event) => setHeader((prev) => ({ ...prev, heroImage: event.target.value }))}
              />
            </Field>
            <Field label="Thumbnail Image">
              <input
                value={header.thumbnailImage}
                onChange={(event) => setHeader((prev) => ({ ...prev, thumbnailImage: event.target.value }))}
              />
            </Field>
            <Field label="Status">
              <select
                value={header.status}
                onChange={(event) =>
                  setHeader((prev) => ({ ...prev, status: event.target.value as NewsEventArticleStatus }))
                }
              >
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="UNPUBLISHED">UNPUBLISHED</option>
              </select>
            </Field>
          </div>

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 4, fontSize: 11 }}>
      <span style={{ textTransform: "uppercase", letterSpacing: 1, color: "#9ca3af" }}>{label}</span>
      {children}
      <style jsx>{`
        input,
        textarea,
        select {
          width: 100%;
          background: #111827;
          color: white;
          border: 1px solid #374151;
          border-radius: 6px;
          padding: 8px;
          font-size: 12px;
        }
      `}</style>
    </label>
  );
}
