"use client";

import React from "react";
import {
  Button, Input, Card, Divider, Select, SelectItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Textarea, Pagination, Chip, Tooltip
} from "@heroui/react";
import {
  Search, Plus, Filter, SortDesc,
  Newspaper, CheckCircle2, FileEdit, Trash2,
  RefreshCcw, LayoutGrid, List
} from "lucide-react"; // Assuming Lucide-React is used for icons
import { NewsCard } from "@/components/NewsCard";
import { useNewsCentralize } from "@/hooks/useNewsCentralize";

export default function NewsManagementPage() {
  const {
    news, filtered, paginated, categories, stats,
    isOpen, form, filters, page, totalPages,
    setForm, setFilters, setIsOpen, setPage,
    openCreate, openEdit, closeModal, upsert,
    togglePublish, remove, resetFilters,
  } = useNewsCentralize();

  function confirmRemove(item: any) {
    const ok = window.confirm(`Delete "${item.title}"? This cannot be undone.`);
    if (ok) remove(item);
  }

  return (
    <div className="min-h-screen dark:bg-black">
      <div className="max-w-7xl mx-auto">

        {/* --- Header & Actions --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              Newsroom <span className="text-primary">Studio</span>
            </h1>
            <p className="text-default-500 mt-1 text-medium">
              Manage your content strategy and public announcements.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="bordered"
              startContent={<RefreshCcw size={18} />}
              onPress={() => window.location.reload()}
            >
              Refresh
            </Button>
            <Button
              color="primary"
              className="shadow-lg shadow-primary/20 font-semibold"
              startContent={<Plus size={20} />}
              onPress={openCreate}
            >
              New Article
            </Button>
          </div>
        </div>

        {/* --- Quick Stats --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Articles", val: stats.total, icon: <Newspaper className="text-blue-500" />, bg: "bg-blue-500/10" },
            { label: "Live Now", val: stats.published, icon: <CheckCircle2 className="text-green-500" />, bg: "bg-green-500/10" },
            { label: "In Draft", val: stats.unpublished, icon: <FileEdit className="text-amber-500" />, bg: "bg-amber-500/10" },
          ].map((s, i) => (
            <Card key={i} shadow="sm" className="border-none bg-content1/50 backdrop-blur-md">
              <div className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${s.bg}`}>{s.icon}</div>
                <div>
                  <p className="text-tiny uppercase font-bold text-default-400 tracking-wider">{s.label}</p>
                  <p className="text-2xl font-black">{s.val}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* --- Unified Toolbar --- */}
        <Card className="mb-8 border-none shadow-sm bg-content1/70 backdrop-blur-md overflow-visible">
          <div className="p-4 flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                isClearable
                startContent={<Search size={18} className="text-default-400" />}
                placeholder="Search articles, categories, or snippets..."
                value={filters.query}
                onValueChange={(v) => setFilters(prev => ({ ...prev, query: v }))}
                variant="flat"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select
                className="w-40"
                labelPlacement="outside"
                startContent={<Filter size={16} />}
                selectedKeys={[filters.statusFilter]}
                onSelectionChange={(keys) => setFilters(prev => ({ ...prev, statusFilter: Array.from(keys)[0] as any }))}
              >
                <SelectItem key="ALL">All Status</SelectItem>
                <SelectItem key="PUBLISHED">Published</SelectItem>
                <SelectItem key="UNPUBLISHED">Drafts</SelectItem>
              </Select>
              <Select
                className="w-44"
                labelPlacement="outside"
                selectedKeys={new Set([filters.categoryFilter])}
                onSelectionChange={(keys) => {
                  const first = Array.from(keys)[0];
                  setFilters((prev) => ({ ...prev, categoryFilter: String(first) }));
                }}
                items={["ALL", ...categories].map((c) => ({ id: c, label: c }))}
              >
                {(item) => (
                  <SelectItem key={item.id} textValue={item.label}>
                    {item.label === "ALL" ? "All Categories" : item.label}
                  </SelectItem>
                )}
              </Select>


              <Select
                className="w-48"
                labelPlacement="outside"
                startContent={<SortDesc size={16} />}
                selectedKeys={[filters.sortKey]}
                onSelectionChange={(keys) => setFilters(prev => ({ ...prev, sortKey: Array.from(keys)[0] as any }))}
              >
                <SelectItem key="NEWEST_UPDATED">Recently Updated</SelectItem>
                <SelectItem key="OLDEST_UPDATED">Oldest First</SelectItem>
                <SelectItem key="TITLE_AZ">Title A-Z</SelectItem>
                <SelectItem key="DATE_ZA">Date (Newest)</SelectItem>
              </Select>

              <Button isIconOnly variant="flat" onPress={resetFilters} className="text-default-500">
                <RefreshCcw size={18} />
              </Button>
            </div>
          </div>
        </Card>

        {/* --- Content Grid --- */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-content1/30 rounded-3xl border-2 border-dashed border-default-200">
            <div className="bg-default-100 p-6 rounded-full mb-4">
              <Newspaper size={48} className="text-default-300" />
            </div>
            <h3 className="text-xl font-bold">No results found</h3>
            <p className="text-default-500 max-w-xs text-center mt-2">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <Button variant="flat" className="mt-6" onPress={resetFilters}>Clear Filters</Button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginated.map((item) => (
                <div key={item.id} className="group transition-transform duration-300 hover:-translate-y-2">
                  <NewsCard
                    item={item}
                    href={`/news-events/${item.id}`}
                    showAdminMenu
                    onEdit={openEdit}
                    onTogglePublish={togglePublish}
                    onDelete={confirmRemove}
                  />
                </div>
              ))}
            </div>

            <Divider />

            {/* --- Pagination --- */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-10">
              <p className="text-sm text-default-500 font-medium">
                Displaying <span className="text-foreground">{paginated.length}</span> of {filtered.length} items
              </p>
              <Pagination
                isCompact
                showControls
                total={totalPages}
                page={page}
                onChange={setPage}
                color="primary"
                variant="flat"
              />
            </div>
          </div>
        )}

        {/* --- Upsert Modal --- */}
        <Modal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          size="3xl"
          backdrop="blur"
          scrollBehavior="inside"
          classNames={{
            base: "bg-background",
            header: "border-b border-divider",
            footer: "border-t border-divider",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 py-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileEdit size={20} className="text-primary" />
                </div>
                <h2 className="text-xl font-bold">{form.id ? "Edit News Article" : "Compose New Article"}</h2>
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Category"
                  placeholder="e.g. Technology, Update"
                  labelPlacement="outside"
                  value={form.category}
                  onValueChange={(v) => setForm(p => ({ ...p, category: v }))}
                />
                <Select
                  label="Visibility Status"
                  labelPlacement="outside"
                  selectedKeys={[form.status]}
                  onSelectionChange={(keys) => setForm(p => ({ ...p, status: Array.from(keys)[0] as any }))}
                >
                  <SelectItem key="PUBLISHED" startContent={<div className="w-2 h-2 rounded-full bg-green-500" />}>Published</SelectItem>
                  <SelectItem key="UNPUBLISHED" startContent={<div className="w-2 h-2 rounded-full bg-amber-500" />}>Draft / Hidden</SelectItem>
                </Select>

                <Input
                  className="md:col-span-2"
                  label="Headline"
                  placeholder="Enter a catchy title..."
                  labelPlacement="outside"
                  value={form.title}
                  onValueChange={(v) => setForm(p => ({ ...p, title: v }))}
                />

                <Input
                  label="Publish Date"
                  placeholder="JAN 27, 2026"
                  labelPlacement="outside"
                  value={form.date}
                  onValueChange={(v) => setForm(p => ({ ...p, date: v }))}
                />

                <Input
                  label="Cover Image URL"
                  placeholder="/images/hero.jpg"
                  labelPlacement="outside"
                  value={form.image}
                  onValueChange={(v) => setForm(p => ({ ...p, image: v }))}
                />

                <Textarea
                  className="md:col-span-2"
                  label="Content Snippet"
                  placeholder="Provide a brief summary of the news..."
                  labelPlacement="outside"
                  value={form.excerpt}
                  onValueChange={(v) => setForm(p => ({ ...p, excerpt: v }))}
                  minRows={4}
                />
              </div>
            </ModalBody>

            <ModalFooter className="py-4">
              <Button variant="light" onPress={closeModal} className="font-semibold text-default-500">
                Discard
              </Button>
              <Button color="primary" onPress={upsert} className="font-bold px-8">
                {form.id ? "Update Post" : "Publish Article"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}