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
import { usePublicationsCentralize } from "@/hooks/usePublicationsCentralize";
import type { Publication } from "@/hooks/usePublicationsData";

export default function PublicationsAdminPage() {
  const {
    publications,
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
  } = usePublicationsCentralize();

  function confirmRemove(pub: Publication) {
    const ok = window.confirm(`Delete "${pub.title}"? This cannot be undone.`);
    if (!ok) return;
    remove(pub);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-black">Publications Management</h1>
            <p className="text-default-500 mt-2">
              Manage journals, conference papers, and reports for the research portal.
            </p>
          </div>

          <Button color="primary" onPress={openCreate}>
            + Create Publication
          </Button>
        </div>

        <Divider className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Total</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.total}</p>
            <p className="mt-2 text-sm text-default-500">
              Publications currently listed.
            </p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Journals</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.journal}</p>
            <p className="mt-2 text-sm text-default-500">Peer-reviewed articles.</p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Conferences</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.conference}</p>
            <p className="mt-2 text-sm text-default-500">Conference proceedings.</p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Reports</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.report}</p>
            <p className="mt-2 text-sm text-default-500">Internal publications.</p>
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
                placeholder="Search by title, author, venue, tags..."
              />
            </div>

            <div className="md:col-span-3">
              <Select
                label="Type"
                selectedKeys={new Set([filters.typeFilter])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, typeFilter: v ?? "ALL" }));
                }}
              >
                <SelectItem key="ALL">All</SelectItem>
                <SelectItem key="Journal">Journal</SelectItem>
                <SelectItem key="Conference">Conference</SelectItem>
                <SelectItem key="Report">Report</SelectItem>
              </Select>
            </div>

            <div className="md:col-span-4">
              <Select
                label="Sort"
                selectedKeys={new Set([filters.sortKey])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, sortKey: v ?? "NEWEST" }));
                }}
              >
                <SelectItem key="NEWEST">Newest year</SelectItem>
                <SelectItem key="OLDEST">Oldest year</SelectItem>
                <SelectItem key="TITLE_AZ">Title A → Z</SelectItem>
                <SelectItem key="TITLE_ZA">Title Z → A</SelectItem>
              </Select>
            </div>

            <div className="md:col-span-12 flex items-end justify-between gap-3 flex-wrap">
              <div className="text-sm text-default-500">
                Showing <span className="font-bold text-foreground">{filtered.length}</span>{" "}
                of <span className="font-bold text-foreground">{publications.length}</span>
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
              <h3 className="text-xl font-black">No publications yet</h3>
              <p className="text-default-500 mt-2">
                Add your first publication or adjust filters to see results.
              </p>
              <Button className="mt-6" color="primary" onPress={openCreate}>
                + Create Publication
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginated.map((pub) => (
                  <Card key={pub.id} className="border border-divider bg-content1 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3">
                        <Chip size="sm" variant="flat" className="bg-background/80 font-bold">
                          {pub.type}
                        </Chip>
                        <h3 className="text-xl font-black">{pub.title}</h3>
                        <p className="text-sm text-default-500">{pub.authors}</p>
                        <p className="text-sm text-default-500">
                          {pub.venue} · {pub.year}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pub.tags.map((tag) => (
                            <span
                              key={`${pub.id}-${tag}`}
                              className="text-xs font-semibold uppercase tracking-wide text-default-500 bg-default-100 rounded-full px-3 py-1"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="flat" onPress={() => openEdit(pub)}>
                          Edit
                        </Button>
                        <Button size="sm" color="danger" variant="flat" onPress={() => confirmRemove(pub)}>
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
              {form.id ? "Edit Publication" : "Create Publication"}
              <span className="text-sm text-default-500 font-normal">
                {form.id ? `Editing: ${form.id}` : "Add a new publication entry."}
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  className="md:col-span-2"
                  label="Title"
                  value={form.title}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
                />

                <Input
                  className="md:col-span-2"
                  label="Authors"
                  value={form.authors}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, authors: value }))}
                />

                <Select
                  label="Type"
                  selectedKeys={new Set([form.type])}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as Publication["type"];
                    setForm((prev) => ({ ...prev, type: v ?? "Journal" }));
                  }}
                >
                  <SelectItem key="Journal">Journal</SelectItem>
                  <SelectItem key="Conference">Conference</SelectItem>
                  <SelectItem key="Report">Report</SelectItem>
                </Select>

                <Input
                  label="Year"
                  type="number"
                  value={form.year}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, year: value }))}
                />

                <Input
                  className="md:col-span-2"
                  label="Venue"
                  value={form.venue}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, venue: value }))}
                />

                <Input
                  className="md:col-span-2"
                  label="Tags"
                  value={form.tags}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, tags: value }))}
                  placeholder="NLP, Machine Translation, L2K"
                />

                <Input
                  className="md:col-span-2"
                  label="DOI / URL"
                  value={form.doi}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, doi: value }))}
                />

                <Textarea
                  className="md:col-span-2"
                  label="Abstract"
                  value={form.abstract}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, abstract: value }))}
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
