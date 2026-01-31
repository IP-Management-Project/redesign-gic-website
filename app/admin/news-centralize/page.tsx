"use client";

import React from "react";
import { useNewsCentralize } from "@/hooks/useNewsCentralize";
import { PageHeader } from "@/components/admin/news/news-page-header";
import { NewsStats } from "@/components/admin/news/news-stats";
import { NewsFilterBar } from "@/components/admin/news/filter-bar";
import { NewsContentGrid } from "@/components/admin/news/news-content-grid";
import { NewsUpsertModal } from "@/components/admin/news/news-upsert-modal";

// --- Main Page Component ---
export default function NewsManagementPage() {
  const {
    news, filtered, paginated, categories, stats,
    isOpen, form, filters, page, totalPages, isLoading,
    setForm, setFilters, setIsOpen, setPage,
    openCreate, openEdit, closeModal, upsert,
    togglePublish, remove, resetFilters,
  } = useNewsCentralize();

  const handleConfirmRemove = (item: any) => {
    if (window.confirm(`Delete "${item.title}"? This cannot be undone.`)) {
      remove(item);
    }
  };

  return (
    <div className="min-h-screen dark:bg-black p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. Header Section */}
        <PageHeader onCreate={openCreate} />

        {/* 2. Stats Section (Handles its own loading state visually) */}
        <NewsStats stats={stats} isLoading={isLoading} />

        {/* 3. Filter Toolbar */}
        <NewsFilterBar
          filters={filters} 
          categories={categories} 
          setFilters={setFilters} 
          resetFilters={resetFilters} 
        />

        {/* 4. Content Grid (Shows Skeletons while loading) */}
        
        <NewsContentGrid
          isLoading={isLoading}
          items={news}
          totalItems={filtered.length}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
          onEdit={openEdit}
          onTogglePublish={togglePublish}
          onDelete={handleConfirmRemove}
          onClearFilters={resetFilters}
        />

        {/* 5. Logic: Upsert Modal */}
        <NewsUpsertModal
          isOpen={isOpen} 
          onOpenChange={setIsOpen} 
          form={form} 
          setForm={setForm} 
          onClose={closeModal} 
          onSubmit={upsert} 
        />
      </div>
    </div>
  );
}