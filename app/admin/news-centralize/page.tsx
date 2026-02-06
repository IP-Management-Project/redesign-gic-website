"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Menu, Plus, Newspaper, CheckCircle2, FileEdit } from "lucide-react";

// --- Hooks ---
import { useNewsCentralize } from "@/hooks/news-centralize/useNewsCentralize";
import { useNewsTemplates } from "@/hooks/news-centralize/useNewsTemplate";

// --- Components ---
import { PageHeader } from "@/components/admin/common/admin-header";
import { StatsGrid, StatItem } from "@/components/admin/common/admin-stats"; 
import { NewsContentGrid } from "@/components/admin/news/news-content-grid";
import { TemplateSelector } from "@/components/admin/news/news-upsert-modal";
import TemplateManagementDrawer from "./drawer/news-template-drawer";
import { ConfirmModal } from "@/components/admin/common/modals/confirmation-modal";
import { NewsFilterBar } from "@/components/admin/news/news-filter";

export default function NewsManagementPage() {
  // 1. Main Hook
  const {
    news,
    stats,
    isLoading: isNewsLoading,
    filters,
    page,
    totalPages,
    totalItems,
    setFilters,
    setPage,
    resetFilters,
    startCreateFlow,
    createDraftFromTemplate,
    openEdit,
    togglePublish,
    remove,
    duplicate,
    isTemplateModalOpen,
    setIsTemplateModalOpen,
  } = useNewsCentralize({ perPage: 9 });

  // 2. Local UI State
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

  // 3. Templates Data
  const {
    data: templates,
    isLoading: isTemplatesLoading
  } = useNewsTemplates({
    enabled: isTemplateModalOpen || isManagerOpen
  });

  // 4. Handlers
  const onRequestDelete = (item: any) => {
    setItemToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleExecuteDelete = async () => {
    if (!itemToDelete) return;
    await remove(itemToDelete);
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  // 5. Config for Stats
  const statItems: StatItem[] = [
    {
      label: "Total Articles",
      value: stats.total || 0,
      icon: <Newspaper className="text-blue-500" />,
      colorClass: "bg-blue-500/10"
    },
    {
      label: "Live Now",
      value: stats.published || 0,
      icon: <CheckCircle2 className="text-green-500" />,
      colorClass: "bg-green-500/10"
    },
    {
      label: "In Draft",
      value: stats.draft || 0,
      icon: <FileEdit className="text-amber-500" />,
      colorClass: "bg-amber-500/10"
    },
  ];

  return (
    <div className="min-h-screen dark:bg-black p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- Header --- */}
        <PageHeader
          title="Newsroom"
          titleHighlight="Studio"
          description="Manage your content strategy and public announcements."
        >
          <Button
            color="primary"
            className="shadow-lg shadow-primary/20 font-semibold"
            startContent={<Plus size={20} />}
            onPress={startCreateFlow}
          >
            New Article
          </Button>

          <Button
            color="default"
            className="shadow-lg shadow-primary/20 font-semibold"
            startContent={<Menu size={20} />}
            onPress={() => setIsManagerOpen(true)}
          >
            Templates
          </Button>
        </PageHeader>

        {/* --- Stats --- */}
        <StatsGrid items={statItems} isLoading={isNewsLoading} columns={3} />

        {/* --- Filter Bar (Config Driven) --- */}
        <NewsFilterBar
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          // Note: 'categories' prop is removed because NewsFilterBar handles it internally now
        />

        {/* --- Content Grid --- */}
        <NewsContentGrid
          isLoading={isNewsLoading}
          items={news}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
          onEdit={openEdit}
          onTogglePublish={togglePublish}
          onDelete={onRequestDelete}
          onClearFilters={resetFilters}
          onDuplicate={duplicate}
        />

        {/* --- Modals & Drawers --- */}
        <TemplateSelector
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
          templates={templates as any}
          isLoading={isTemplatesLoading}
          onSelect={createDraftFromTemplate}
        />

        <TemplateManagementDrawer
          isOpen={isManagerOpen}
          onOpenChange={setIsManagerOpen}
        />

        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => { setIsDeleteOpen(false); setItemToDelete(null); }}
          onConfirm={handleExecuteDelete}
          isLoading={isNewsLoading}
          title="Delete Article?"
          message={<span>Delete <b>{itemToDelete?.title}</b>?</span>}
          confirmLabel="Yes, Delete"
        />
      </div>
    </div>
  );
}