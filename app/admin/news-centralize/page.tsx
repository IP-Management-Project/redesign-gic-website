"use client";

import React, { useState, useMemo } from "react"; 
import { useNewsCentralize } from "@/hooks/news-centralize/useNewsCentralize";
import { useMediaKinds } from "@/hooks/news-centralize/useMediaKinds"; // Import this
import { PageHeader } from "@/components/admin/news/news-page-header";
import { NewsStats } from "@/components/admin/news/news-stats";
import { NewsFilterBar } from "@/components/admin/news/filter-bar";
import { NewsContentGrid } from "@/components/admin/news/news-content-grid";
import { useNewsTemplates } from "@/hooks/news-centralize/useNewsTemplate";
import { TemplateSelector } from "@/components/admin/news/news-upsert-modal";
import TemplateManagementDrawer from "./drawer/news-template-drawer";
import { ConfirmModal } from "@/components/admin/common/modals/confirmation-modal";

export default function NewsManagementPage() {
  // 1. Main Hook (Backend Pagination)
  const {
    news,           // Current Page Data
    stats,          // Meta stats
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

  // 2. Fetch Categories (For Filter Dropdown)
  const { kinds } = useMediaKinds();
  // Transform kinds to simple string array for the filter bar
  const categoryOptions = useMemo(() => 
    kinds?.map(k => k.key).sort() || [], 
  [kinds]);

  // 3. Other Local State
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

  // 4. Fetch Templates
  const {
    data: templates,
    isLoading: isTemplatesLoading
  } = useNewsTemplates({
    enabled: isTemplateModalOpen || isManagerOpen
  });

  // --- Handlers ---
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

  return (
    <div className="min-h-screen dark:bg-black p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        <PageHeader
          onCreateNews={startCreateFlow}
          onClickTemplateMangement={() => setIsManagerOpen(true)}
        />

        {/* Stats - Note: If backend doesn't return count by status, 
            you might need a separate API call for this, 
            or just show 'Total' from pagination meta */}
        <NewsStats stats={stats} isLoading={isNewsLoading} />

        <NewsFilterBar
          filters={filters}
          categories={categoryOptions} // Pass fetched categories
          setFilters={setFilters}
          resetFilters={resetFilters}
        />

        <NewsContentGrid
          isLoading={isNewsLoading}
          items={news} // Directly pass the current page items
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