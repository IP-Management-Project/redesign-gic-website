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
import { Chip } from "@heroui/chip";
import { useExchangeShowcaseCentralize } from "@/hooks/useExchangeShowcaseCentralize";
import type { ShowcaseItem } from "@/hooks/useExchangeShowcaseCentralize";

const kindLabels: Record<ShowcaseItem["kind"], string> = {
  gallery: "Gallery",
  season: "Season",
};

export default function ExchangeShowcaseAdminPage() {
  const {
    items,
    filtered,
    paginated,
    stats,
    filters,
    form,
    isOpen,
    page,
    totalPages,
    setFilters,
    setForm,
    setIsOpen,
    setPage,
    openCreate,
    openEdit,
    closeModal,
    upsert,
    remove,
    resetFilters,
  } = useExchangeShowcaseCentralize();

  function confirmRemove(item: ShowcaseItem) {
    const ok = window.confirm(`Delete "${item.title}"? This cannot be undone.`);
    if (!ok) return;
    remove(item);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-black">Exchange Student Showcase</h1>
            <p className="text-default-500 mt-2">
              Manage highlight seasons and gallery moments for the exchange student showcase.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="flat" onPress={() => openCreate("season")}>
              + Add Season
            </Button>
            <Button color="primary" onPress={() => openCreate("gallery")}>
              + Add Gallery
            </Button>
          </div>
        </div>

        <Divider className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Total items</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.total}</p>
            <p className="mt-2 text-sm text-default-500">Across gallery and seasons.</p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Gallery</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.gallery}</p>
            <p className="mt-2 text-sm text-default-500">Visual highlights.</p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Seasons</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.seasons}</p>
            <p className="mt-2 text-sm text-default-500">Season showcases.</p>
          </Card>
        </div>

        <Card className="border border-divider bg-content1 rounded-2xl p-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <Input
                value={filters.query}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, query: value }))
                }
                label="Search"
                placeholder="Search by title, winner, year..."
              />
            </div>

            <div className="md:col-span-3">
              <Select
                label="Type"
                selectedKeys={new Set([filters.kindFilter])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, kindFilter: v ?? "ALL" }));
                }}
              >
                <SelectItem key="ALL">All</SelectItem>
                <SelectItem key="gallery">Gallery</SelectItem>
                <SelectItem key="season">Season</SelectItem>
              </Select>
            </div>

            <div className="md:col-span-4">
              <Select
                label="Sort"
                selectedKeys={new Set([filters.sortKey])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, sortKey: v ?? "TITLE_AZ" }));
                }}
              >
                <SelectItem key="TITLE_AZ">Title A → Z</SelectItem>
                <SelectItem key="TITLE_ZA">Title Z → A</SelectItem>
              </Select>
            </div>

            <div className="md:col-span-12 flex items-end justify-between gap-3 flex-wrap">
              <div className="text-sm text-default-500">
                Showing <span className="font-bold text-foreground">{filtered.length}</span>{" "}
                of <span className="font-bold text-foreground">{items.length}</span>
              </div>

              <Button variant="flat" onPress={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <Card className="border border-dashed border-divider bg-content1 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-black">No showcase items yet</h3>
              <p className="text-default-500 mt-2">
                Add your first season or gallery highlight.
              </p>
              <Button className="mt-6" color="primary" onPress={() => openCreate("gallery")}>
                + Add Gallery
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginated.map((item) => (
                  <Card key={item.id} className="border border-divider bg-content1 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3">
                        <Chip size="sm" variant="flat" className="bg-background/80 font-bold">
                          {kindLabels[item.kind]}
                        </Chip>
                        <h3 className="text-xl font-black">{item.title}</h3>
                        <p className="text-sm text-default-500">{item.subtitle}</p>
                        {item.meta ? (
                          <p className="text-sm text-default-500">Year: {item.meta}</p>
                        ) : null}
                        {item.teams?.length ? (
                          <p className="text-sm text-default-500">
                            Teams: {item.teams.join(", ")}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="flat" onPress={() => openEdit(item)}>
                          Edit
                        </Button>
                        <Button size="sm" color="danger" variant="flat" onPress={() => confirmRemove(item)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
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

        <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="3xl">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {form.id ? "Edit Showcase Item" : "Create Showcase Item"}
              <span className="text-sm text-default-500 font-normal">
                {form.id ? `Editing: ${form.id}` : "Add a new season or gallery highlight."}
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Type"
                  selectedKeys={new Set([form.kind])}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as ShowcaseItem["kind"];
                    setForm((prev) => ({ ...prev, kind: v ?? "gallery" }));
                  }}
                >
                  <SelectItem key="gallery">Gallery</SelectItem>
                  <SelectItem key="season">Season</SelectItem>
                </Select>

                <Input
                  label="Title"
                  value={form.title}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
                  placeholder={form.kind === "season" ? "Season 9" : "Team Collaboration"}
                />

                <Input
                  label={form.kind === "season" ? "Winner" : "Subtitle"}
                  value={form.subtitle}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, subtitle: value }))}
                  placeholder={form.kind === "season" ? "EcoPulse AI" : "Gallery item"}
                />

                {form.kind === "season" ? (
                  <Input
                    label="Year"
                    value={form.meta}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, meta: value }))}
                  />
                ) : null}

                {form.kind === "gallery" ? (
                  <>
                    <Input
                      className="md:col-span-2"
                      label="Image URL"
                      value={form.image}
                      onValueChange={(value) => setForm((prev) => ({ ...prev, image: value }))}
                    />
                    <Input
                      className="md:col-span-2"
                      label="Grid Span"
                      value={form.span}
                      onValueChange={(value) => setForm((prev) => ({ ...prev, span: value }))}
                      placeholder="md:col-span-2 md:row-span-1"
                    />
                  </>
                ) : null}

                {form.kind === "season" ? (
                  <Textarea
                    className="md:col-span-2"
                    label="Teams (comma separated)"
                    value={form.teams}
                    onValueChange={(value) => setForm((prev) => ({ ...prev, teams: value }))}
                    minRows={3}
                  />
                ) : null}
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
