"use client";

import React from "react";
import { 
  Button, Input, Card, Divider, Select, SelectItem, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Textarea, Pagination, Chip, Dropdown, DropdownTrigger, 
  DropdownMenu, DropdownItem, Tooltip 
} from "@heroui/react";
import { 
  Plus, Search, Filter, SortDesc, MoreVertical, 
  BookOpen, Users, FileText, Layers, Calendar, 
  MapPin, Hash, ExternalLink, Trash2, Edit3, RefreshCcw 
} from "lucide-react";
import { usePublicationsCentralize } from "@/hooks/usePublicationsCentralize";
import type { Publication } from "@/hooks/usePublicationsData";

export default function PublicationsAdminPage() {
  const {
    publications, filtered, paginated, stats, filters, form,
    isOpen, page, totalPages, setFilters, setForm, setIsOpen,
    setPage, openCreate, openEdit, closeModal, upsert, remove, resetFilters,
  } = usePublicationsCentralize();

  function confirmRemove(pub: Publication) {
    const ok = window.confirm(`Permanently delete "${pub.title}"? This cannot be undone.`);
    if (ok) remove(pub);
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* --- Header & Main Action --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              Publication <span className="text-primary">Repository</span>
            </h1>
            <p className="text-default-500 mt-1 text-medium">
              Curate and manage your academic outputs and research reports.
            </p>
          </div>
          <Button 
            color="primary" 
            size="lg"
            className="shadow-lg shadow-primary/20 font-bold"
            startContent={<Plus size={20} />} 
            onPress={openCreate}
          >
            Create Publication
          </Button>
        </div>

        {/* --- Academic Metrics --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Assets", val: stats.total, icon: <Layers size={22} />, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Journals", val: stats.journal, icon: <BookOpen size={22} />, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Conferences", val: stats.conference, icon: <Users size={22} />, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Reports", val: stats.report, icon: <FileText size={22} />, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((s, i) => (
            <Card key={i} shadow="sm" className="border-none bg-content1/50 backdrop-blur-md">
              <div className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${s.bg} ${s.color} dark:bg-default-100`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-default-400 tracking-widest">{s.label}</p>
                  <p className="text-2xl font-black text-foreground">{s.val}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* --- Unified Search & Filter Toolbar --- */}
        <Card className="mb-8 border-none shadow-sm bg-content1/80 backdrop-blur-md overflow-visible">
          <div className="p-4 flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                isClearable
                startContent={<Search size={18} className="text-default-400" />}
                placeholder="Search by title, author, venue, or DOI..."
                value={filters.query}
                onValueChange={(v) => setFilters(p => ({ ...p, query: v }))}
                variant="flat"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Select 
                className="w-40"
                labelPlacement="outside"
                startContent={<Filter size={16} />}
                selectedKeys={[filters.typeFilter]}
                onSelectionChange={(keys) => setFilters(p => ({ ...p, typeFilter: Array.from(keys)[0] as any }))}
              >
                <SelectItem key="ALL">All Types</SelectItem>
                <SelectItem key="Journal">Journals</SelectItem>
                <SelectItem key="Conference">Conferences</SelectItem>
                <SelectItem key="Report">Reports</SelectItem>
              </Select>

              <Select 
                className="w-44"
                labelPlacement="outside"
                startContent={<SortDesc size={16} />}
                selectedKeys={[filters.sortKey]}
                onSelectionChange={(keys) => setFilters(p => ({ ...p, sortKey: Array.from(keys)[0] as any }))}
              >
                <SelectItem key="NEWEST">Newest First</SelectItem>
                <SelectItem key="OLDEST">Oldest First</SelectItem>
                <SelectItem key="TITLE_AZ">Title A-Z</SelectItem>
              </Select>

              <Tooltip content="Reset Filters">
                <Button isIconOnly variant="flat" onPress={resetFilters} className="text-default-500">
                  <RefreshCcw size={18} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>

        {/* --- Content Area --- */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-content1/30 rounded-3xl border-2 border-dashed border-divider">
              <BookOpen size={48} className="text-default-200 mb-4" />
              <h3 className="text-xl font-bold">No publications found</h3>
              <p className="text-default-500 max-w-xs text-center mt-2">Try adjusting your filters or add a new research entry.</p>
              <Button color="primary" variant="flat" className="mt-6" onPress={openCreate}>Add First Entry</Button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginated.map((pub) => (
                  <Card key={pub.id} className="border border-divider bg-content1 hover:shadow-lg transition-all duration-300 group rounded-2xl p-0">
                    <div className="flex flex-col h-full">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between p-4 border-b border-divider bg-default-50/50">
                        <Chip 
                          size="sm" 
                          variant="dot" 
                          color={pub.type === "Journal" ? "success" : pub.type === "Conference" ? "secondary" : "warning"}
                          className="font-bold uppercase text-[10px]"
                        >
                          {pub.type}
                        </Chip>
                        
                        <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                          <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                              <Button isIconOnly size="sm" variant="light" radius="full">
                                <MoreVertical size={18} className="text-default-400" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Actions" onAction={(key) => key === "edit" ? openEdit(pub) : confirmRemove(pub)}>
                              <DropdownItem key="edit" startContent={<Edit3 size={16} />}>Edit Entry</DropdownItem>
                              <DropdownItem key="delete" color="danger" className="text-danger" startContent={<Trash2 size={16} />}>
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 flex-grow">
                        <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors mb-3 line-clamp-2">
                          {pub.title}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-default-600 font-medium">
                            <Users size={14} className="text-default-400" />
                            <span className="truncate">{pub.authors}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-default-400">
                            <MapPin size={14} />
                            <span>{pub.venue}</span>
                            <span>•</span>
                            <Calendar size={14} />
                            <span>{pub.year}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-5">
                          {pub.tags.map((tag) => (
                            <Chip key={tag} size="sm" variant="flat" className="text-[10px] font-semibold bg-default-100/50">
                              #{tag}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-divider">
                <p className="text-sm text-default-500 font-medium italic">
                  Showing {paginated.length} of {filtered.length} publications
                </p>
                <Pagination
                  isCompact
                  showControls
                  total={totalPages}
                  page={page}
                  onChange={setPage}
                  color="primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* --- Enhanced Modal --- */}
        <Modal 
          isOpen={isOpen} 
          onOpenChange={setIsOpen} 
          size="3xl" 
          scrollBehavior="inside"
          classNames={{
            header: "border-b border-divider",
            footer: "border-t border-divider",
            base: "bg-background",
          }}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 py-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {form.id ? <Edit3 size={20} className="text-primary" /> : <Plus size={20} className="text-primary" />}
                {form.id ? "Edit Scholarly Work" : "New Publication Entry"}
              </h2>
            </ModalHeader>

            <ModalBody className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  className="md:col-span-2"
                  label="Article Title"
                  placeholder="The impact of AI on..."
                  labelPlacement="outside"
                  value={form.title}
                  onValueChange={(v) => setForm(p => ({ ...p, title: v }))}
                />

                <Input
                  className="md:col-span-2"
                  label="Authors"
                  placeholder="Separate with commas"
                  labelPlacement="outside"
                  value={form.authors}
                  onValueChange={(v) => setForm(p => ({ ...p, authors: v }))}
                />

                <Select
                  label="Publication Type"
                  labelPlacement="outside"
                  selectedKeys={[form.type]}
                  onSelectionChange={(keys) => setForm(p => ({ ...p, type: Array.from(keys)[0] as any }))}
                >
                  <SelectItem key="Journal">Journal Article</SelectItem>
                  <SelectItem key="Conference">Conference Paper</SelectItem>
                  <SelectItem key="Report">Internal Report</SelectItem>
                </Select>

                <Input
                  label="Year"
                  type="number"
                  labelPlacement="outside"
                  value={form.year}
                  onValueChange={(v) => setForm(p => ({ ...p, year: v }))}
                />

                <Input
                  className="md:col-span-2"
                  label="Venue / Publisher"
                  placeholder="e.g. Nature Machine Intelligence"
                  labelPlacement="outside"
                  value={form.venue}
                  onValueChange={(v) => setForm(p => ({ ...p, venue: v }))}
                />

                <Input
                  className="md:col-span-1"
                  label="Keywords / Tags"
                  placeholder="Separated by commas"
                  labelPlacement="outside"
                  value={form.tags}
                  onValueChange={(v) => setForm(p => ({ ...p, tags: v }))}
                />

                <Input
                  className="md:col-span-1"
                  label="DOI / Resource URL"
                  placeholder="https://doi.org/..."
                  labelPlacement="outside"
                  value={form.doi}
                  onValueChange={(v) => setForm(p => ({ ...p, doi: v }))}
                  startContent={<ExternalLink size={14} className="text-default-300" />}
                />

                <Textarea
                  className="md:col-span-2"
                  label="Abstract Summary"
                  placeholder="Brief overview of findings..."
                  labelPlacement="outside"
                  value={form.abstract}
                  onValueChange={(v) => setForm(p => ({ ...p, abstract: v }))}
                  minRows={4}
                />
              </div>
            </ModalBody>

            <ModalFooter className="py-4">
              <Button variant="light" onPress={closeModal} className="font-semibold text-default-500">
                Cancel
              </Button>
              <Button color="primary" onPress={upsert} className="font-bold px-8">
                {form.id ? "Save Changes" : "Create Entry"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}