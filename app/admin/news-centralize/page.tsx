"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Textarea } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { NewsCard } from "@/components/NewsCard";
import { useNewsCentralize } from "@/hooks/useNewsCentralize";

export default function NewsManagementPage() {
  const {
    news,
    filtered,
    paginated,
    categories,
    stats,
    isOpen,
    form,
    filters,
    page,
    totalPages,
    setForm,
    setFilters,
    setIsOpen,
    setPage,
    openCreate,
    openEdit,
    closeModal,
    upsert,
    togglePublish,
    remove,
    resetFilters,
  } = useNewsCentralize();

  function confirmRemove(item: Parameters<typeof remove>[0]) {
    const ok = window.confirm(`Delete "${item.title}"? This cannot be undone.`);
    if (!ok) return;
    remove(item);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-black">News Management</h1>
            <p className="text-default-500 mt-2">
              Search, sort, filter, and manage your news cards. Create new items anytime.
            </p>
          </div>

          <Button color="primary" onPress={openCreate}>
            + Create New
          </Button>
        </div>

        <Divider className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Total cards</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.total}</p>
            <p className="mt-2 text-sm text-default-500">
              Latest updates across all categories.
            </p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Published</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.published}</p>
            <p className="mt-2 text-sm text-default-500">
              Visible on the public news & events feed.
            </p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Drafts</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.unpublished}</p>
            <p className="mt-2 text-sm text-default-500">
              Stay internal until you're ready to publish.
            </p>
          </Card>
        </div>

        {/* Toolbar */}
        <Card className="border border-divider bg-content1 rounded-2xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <Input
                value={filters.query}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, query: value }))
                }
                label="Search"
                placeholder="Search by title, category, date, excerpt..."
              />
            </div>

            <div className="md:col-span-3">
              <Select
                label="Status"
                selectedKeys={new Set([filters.statusFilter])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, statusFilter: v ?? "ALL" }));
                }}
              >
                <SelectItem key="ALL">All</SelectItem>
                <SelectItem key="PUBLISHED">Published</SelectItem>
                <SelectItem key="UNPUBLISHED">Unpublished</SelectItem>
              </Select>
            </div>

            <div className="md:col-span-4">
              <Select
                label="Category"
                selectedKeys={new Set([filters.categoryFilter])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, categoryFilter: v ?? "ALL" }));
                }}
              >
                <SelectItem key="ALL">All</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c}>{c}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="md:col-span-4">
              <Select
                label="Sort"
                selectedKeys={new Set([filters.sortKey])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, sortKey: v ?? "NEWEST_UPDATED" }));
                }}
              >
                <SelectItem key="NEWEST_UPDATED">Newest updated</SelectItem>
                <SelectItem key="OLDEST_UPDATED">Oldest updated</SelectItem>
                <SelectItem key="TITLE_AZ">Title A → Z</SelectItem>
                <SelectItem key="TITLE_ZA">Title Z → A</SelectItem>
                <SelectItem key="DATE_AZ">Date A → Z</SelectItem>
                <SelectItem key="DATE_ZA">Date Z → A</SelectItem>
              </Select>
            </div>

            <div className="md:col-span-8 flex items-end justify-between gap-3 flex-wrap">
              <div className="text-sm text-default-500">
                Showing <span className="font-bold text-foreground">{filtered.length}</span>{" "}
                of <span className="font-bold text-foreground">{news.length}</span>
              </div>

              <Button
                variant="flat"
                onPress={resetFilters}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Grid */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <Card className="border border-dashed border-divider bg-content1 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-black">No news cards yet</h3>
              <p className="text-default-500 mt-2">
                Create your first update or adjust the filters to see existing content.
              </p>
              <Button className="mt-6" color="primary" onPress={openCreate}>
                + Create News Card
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((item) => (
                  <NewsCard
                    key={item.id}
                    item={item}
                    href={`/news-events/${item.id}`}
                    showAdminMenu
                    onEdit={openEdit}
                    onTogglePublish={togglePublish}
                    onDelete={confirmRemove}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-default-500">
                  Page <span className="font-semibold text-foreground">{page}</span> of{" "}
                  <span className="font-semibold text-foreground">{totalPages}</span>
                </p>
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={setPage}
                  showControls
                  className="mx-auto sm:mx-0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal: Create/Edit */}
        <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="2xl">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {form.id ? "Edit News" : "Create News"}
              <span className="text-sm text-default-500 font-normal">
                {form.id ? `Editing: ${form.id}` : "Add a new news card."}
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Category"
                  value={form.category}
                  onValueChange={(v) => setForm((p) => ({ ...p, category: v }))}
                />
                <Select
                  label="Status"
                  selectedKeys={new Set([form.status])}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as NewsStatus;
                    setForm((p) => ({ ...p, status: v ?? "PUBLISHED" }));
                  }}
                >
                  <SelectItem key="PUBLISHED">Published</SelectItem>
                  <SelectItem key="UNPUBLISHED">Unpublished</SelectItem>
                </Select>

                <Input
                  className="md:col-span-2"
                  label="Title"
                  value={form.title}
                  onValueChange={(v) => setForm((p) => ({ ...p, title: v }))}
                />

                <Input
                  label="Date"
                  value={form.date}
                  onValueChange={(v) => setForm((p) => ({ ...p, date: v }))}
                  placeholder='e.g. "JAN 18, 2026"'
                />

                <Input
                  label="Hero image"
                  value={form.image}
                  onValueChange={(v) => setForm((p) => ({ ...p, image: v }))}
                  placeholder='e.g. "/landing/server.png"'
                />

                <Textarea
                  className="md:col-span-2"
                  label="Excerpt"
                  value={form.excerpt}
                  onValueChange={(v) => setForm((p) => ({ ...p, excerpt: v }))}
                  minRows={4}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={closeModal}>
                Cancel
              </Button>
              <Button color="primary" onPress={upsert}>
                {form.id ? "Save Changes" : "Create"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
