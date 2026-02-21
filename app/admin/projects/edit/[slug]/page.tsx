"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";

import "grapesjs/dist/css/grapes.min.css";
import "./grapesjs-theme.css";

// Data + actions
import { useProjectBySlug } from "@/hooks/useProject";

import { GrapesSidebarLeft } from "@/components/admin/editor/grapejs/grapejs-sidebar-left";
import { GrapesSidebarRight } from "@/components/admin/editor/grapejs/grapejs-sidebar-right";
import { useProjectEditorLogic } from "@/hooks/projects/useProjectEditorLogic";
import { useProjectGrapesManager } from "@/hooks/projects/useProjectGrapesManager";

export default function EditorClient() {
  const { slug } = useParams<{ slug: string }>();

  const { data: page, isLoading: fetchingData, refetch } = useProjectBySlug(slug);

  const { isSaving, status, handleSave } = useProjectEditorLogic(page, refetch);

  const { containerRef, editorRef, loadingEditor } = useProjectGrapesManager(
    page,
    fetchingData
  );

  useEffect(() => {
    const adminCon = document.getElementById("admincon");
    const mainParent = adminCon?.parentElement;
    if (!adminCon || !mainParent) return;

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

    return () => {
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
    };
  }, []);

  // Loading
  if (fetchingData) {
    return (
      <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center bg-[#0f0f10] text-white">
        <Spinner size="lg" color="white" />
        <p className="text-sm font-mono animate-pulse">Opening Design Studio...</p>
      </div>
    );
  }

  if (!page) return <div className="text-white p-10">Page not found.</div>;

  return (
    <div className="gjs-editor-breakout flex h-screen overflow-hidden bg-[#0f0f10]">
      {/* Left Sidebar (Save + Blocks + Layers) */}
      <GrapesSidebarLeft
        save={{
          onClick: () => handleSave(editorRef.current),
          isLoading: isSaving,
        }}
        showBlocks
        showLayers
      />

      {/* Center Canvas */}
      <main className="flex-1 relative flex flex-col bg-[#1e1e24]">
        <div className="gjs-topbar" />
        <div ref={containerRef} className="flex-1 h-full" />
      </main>

      {/* Right Sidebar (Traits/Styles) */}
      <GrapesSidebarRight />
    </div>
  );
}
