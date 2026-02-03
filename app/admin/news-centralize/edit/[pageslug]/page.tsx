"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";

// Imports from refactored folders

// Global Hooks
import { useNewsEventArticleDetail } from "@/hooks/news-centralize/useNewsEventArticle";
import { useMediaKinds } from "@/hooks/news-centralize/useMediaKinds";

import "grapesjs/dist/css/grapes.min.css";
import { useNewsEditorLogic } from "@/hooks/news-centralize/useNewsLogic";
import { useGrapesManager } from "@/hooks/news-centralize/useGrapeManager";
import { GrapesSidebarLeft } from "@/components/admin/editor/grapejs/grapejs-sidebar-left";
import { GrapesSidebarRight } from "@/components/admin/editor/grapejs/grapejs-sidebar-right";

// news-header.fields.ts
import { GrapeFieldConfig, GrapeForm } from "@/components/admin/editor/grapejs/grape-form";
import { NewsHeaderForm } from "../types/type";

export const newsHeaderFields = (
  kinds: any[]
): GrapeFieldConfig<NewsHeaderForm>[] => [
    {
      key: "title",
      label: "Title",
      type: "text",
    },
    {
      key: "publishDate",
      label: "Publish Date",
      type: "date",
    },
    {
      key: "readingTime",
      label: "Reading Time",
      type: "text",
      placeholder: "e.g. 5 MINS",
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: kinds.map((k) => ({
        label: k.label,
        value: k.key,
      })),
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Published", value: "PUBLISHED" },
        { label: "Unpublished", value: "UNPUBLISHED" },
        { label: "Archived", value: "ARCHIVED" },
      ],
    },
    {
      key: "excerpt",
      label: "Excerpt",
      type: "textarea",
      rows: 3,
    },
    {
      key: "domain",
      label: "Domain / Tag",
      type: "text",
    },
    {
      key: "heroImage",
      label: "Hero Image",
      type: "image",
    },
    {
      key: "thumbnailImage",
      label: "Thumbnail Image",
      type: "image",
    },
  ];


export default function NewsCentralizeEditor() {
  const { pageslug } = useParams<{ pageslug: string }>();

  // 1. Data
  const { data: article, isLoading: fetchingData, refetch } = useNewsEventArticleDetail(pageslug);
  const { kinds } = useMediaKinds();

  // 2. Logic & State (Custom Hook)
  const {
    header, setHeader, isSaving, handleFileSelect, handleRemoveFile, handleSave
  } = useNewsEditorLogic(article, refetch);

  // 3. GrapesJS Editor (Custom Hook)
  const { containerRef, editorRef, loadingEditor } = useGrapesManager(article, fetchingData);

  const mapImageField = (key: keyof NewsHeaderForm) => {
    if (key === "heroImage") return "hero";
    if (key === "thumbnailImage") return "thumb";
    return null;
  };


  // 4. Admin Layout Reset (Fullscreen)
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
      adminCon.style.width = "100%";
      return () => {
        mainParent.style.maxWidth = "";
        mainParent.style.padding = "";
        mainParent.style.margin = "";
        mainParent.style.overflow = "";
        mainParent.style.height = "";
        mainParent.style.backgroundColor = "";
        adminCon.style.maxWidth = "";
        adminCon.style.padding = "";
        adminCon.style.width = "";
      };
    }
  }, []);

  if (fetchingData && loadingEditor) {
    return (
      <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center bg-[#0f0f10] text-white">
        <Spinner size="lg" color="white" />
        <p className="text-sm font-mono animate-pulse">Loading News Studio...</p>
      </div>
    );
  }

  if (!article) return <div className="text-white p-10">Article not found.</div>;

  return (
    <div className="gjs-editor-breakout flex h-screen overflow-hidden bg-[#0f0f10]">

      {/* Left Sidebar (Form) */}
      <GrapesSidebarLeft
        save={{
          onClick: () => handleSave(editorRef.current),
          isLoading: isSaving,
        }}
      >
        <GrapeForm
          values={header}
          onChange={setHeader}
          fields={newsHeaderFields(kinds)}
          onFileSelect={(key, file) => {
            const field = mapImageField(key as keyof NewsHeaderForm);
            if (!field) return;
            handleFileSelect(field, file);
          }}
          onRemoveFile={(key) => {
            const field = mapImageField(key as keyof NewsHeaderForm);
            if (!field) return;
            handleRemoveFile(field);
          }}
        />
      </GrapesSidebarLeft>


      {/* Center Canvas */}
      <main className="flex-1 relative flex flex-col bg-[#1e1e24]">
        <div className="gjs-topbar hidden" />
        <div ref={containerRef} className="flex-1 h-full" />
      </main>

      {/* Right Sidebar (Traits/Styles) */}
      <GrapesSidebarRight />

    </div>
  );
}