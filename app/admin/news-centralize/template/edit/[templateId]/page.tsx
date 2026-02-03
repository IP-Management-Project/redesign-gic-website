"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import "grapesjs/dist/css/grapes.min.css";

import { useNewsTemplates } from "@/hooks/news-centralize/useNewsTemplate";
import { useTemplateEditorLogic } from "@/hooks/news-centralize/useTemplateEditorLogic";
import { useGrapesManager } from "@/hooks/news-centralize/useGrapeManager";

import { GrapesSidebarRight } from "@/components/admin/editor/grapejs/grapejs-sidebar-right";
import { GrapesSidebarLeft } from "@/components/admin/editor/grapejs/grapejs-sidebar-left";
import { GrapeFieldConfig, GrapeForm } from "@/components/admin/editor/grapejs/grape-form";

type TemplateHeaderForm = {
  name: string;
  description: string;
};

const templateHeaderFields: GrapeFieldConfig<TemplateHeaderForm>[] = [
  { key: "name", label: "Template Name", type: "text", placeholder: "Enter template name" },
  { key: "description", label: "Description", type: "textarea", rows: 4, placeholder: "Short description..." },
];


export default function TemplateEditorPage() {
  const { templateId } = useParams<{ templateId: string }>();

  // 1. Fetch Template Data
  const { useTemplateDetail } = useNewsTemplates();
  const { data: template, isLoading: fetchingData, refetch } = useTemplateDetail(templateId);

  // 2. Logic & State
  const { header, setHeader, isSaving, handleSave } = useTemplateEditorLogic(template, refetch);

  // 3. GrapesJS Editor
  const { containerRef, editorRef, loadingEditor } = useGrapesManager(template, fetchingData);

  // 4. Fullscreen Layout Fix
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
        <p className="text-sm font-mono animate-pulse">Loading Template Studio...</p>
      </div>
    );
  }

  if (!template && !fetchingData) return <div className="text-white p-10">Template not found.</div>;

  return (
    <div className="gjs-editor-breakout flex h-screen overflow-hidden bg-[#0f0f10]">
      {/* Left Sidebar (Reusable) */}
      <GrapesSidebarLeft
        className="w-[300px] bg-[#18181b]"
        title="Template Editor"
        onBack={() => window.history.back()}
        save={{
          onClick: () => handleSave(editorRef.current),
          isLoading: isSaving,
          label: "Save Template",
          loadingLabel: "Saving...",
        }}
        showBlocks
        showLayers
      >
        <GrapeForm
          values={header}
          onChange={setHeader}
          fields={templateHeaderFields}
        />
      </GrapesSidebarLeft>

      {/* Center Canvas */}
      <main className="flex-1 relative flex flex-col bg-[#1e1e24]">
        <div className="gjs-topbar hidden" />
        <div ref={containerRef} className="flex-1 h-full" />
      </main>

      {/* Right Sidebar */}
      <GrapesSidebarRight />
      
    </div>
  );
}
