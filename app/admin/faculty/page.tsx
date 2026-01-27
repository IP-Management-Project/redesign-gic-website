"use client";

import React from "react";
import { 
  Button, Input, Card, Divider, Select, SelectItem, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Textarea, Pagination, Tooltip 
} from "@heroui/react";
import { 
  Search, Plus, Filter, SortDesc, RefreshCcw, 
  Users, ShieldCheck, GraduationCap, Microscope, Briefcase,
  LayoutGrid
} from "lucide-react";
import { useFacultyCentralize } from "@/hooks/useFacultyCentralize";
import type { FacultyMember } from "@/hooks/useFacultyCentralize";
import { FacultyCard } from "@/components/falcuty-card";

// Mapping icons for the metrics and UI
const groupConfig: Record<FacultyMember["group"], { label: string, icon: any, color: string, bg: string }> = {
  management: { label: "Management", icon: <ShieldCheck size={22} />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  lecturers: { label: "Lecturers", icon: <GraduationCap size={22} />, color: "text-blue-500", bg: "bg-blue-500/10" },
  researchers: { label: "Researchers", icon: <Microscope size={22} />, color: "text-purple-500", bg: "bg-purple-500/10" },
  staff: { label: "Staff", icon: <Briefcase size={22} />, color: "text-amber-500", bg: "bg-amber-500/10" },
};

export default function FacultyAdminPage() {
  const {
    members, filtered, paginated, stats, filters, form,
    isOpen, page, totalPages, setFilters, setForm, setIsOpen,
    setPage, openCreate, openEdit, closeModal, upsert, remove, resetFilters,
  } = useFacultyCentralize();

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-black text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Faculty <span className="text-primary">Directory</span>
            </h1>
            <p className="text-default-500 mt-1 text-medium">
              Manage academic profiles, department leadership, and research teams.
            </p>
          </div>
          <Button 
            color="primary" 
            size="lg" 
            className="font-bold shadow-lg shadow-primary/20"
            startContent={<Plus size={20} />} 
            onPress={openCreate}
          >
            Add Profile
          </Button>
        </div>

        {/* --- Adaptive Metrics Row --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {(Object.keys(groupConfig) as Array<keyof typeof groupConfig>).map((key) => (
            <Card key={key} shadow="sm" className="border-none bg-content1/50 backdrop-blur-md">
              <div className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${groupConfig[key].bg} ${groupConfig[key].color}`}>
                  {groupConfig[key].icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-default-400 tracking-widest">
                    {groupConfig[key].label}
                  </p>
                  <p className="text-2xl font-black text-foreground">
                    {stats[key] || 0}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* --- Unified Toolbar (Matches News/Pubs) --- */}
        <Card className="mb-8 border-none shadow-sm bg-content1/70 backdrop-blur-md overflow-visible">
          <div className="p-4 flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                isClearable
                startContent={<Search size={18} className="text-default-400" />}
                placeholder="Search by name, role, or research focus..."
                value={filters.query}
                onValueChange={(v) => setFilters(p => ({ ...p, query: v }))}
                variant="flat"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Select 
                className="w-44"
                labelPlacement="outside"
                startContent={<Filter size={16} />}
                selectedKeys={[filters.groupFilter]}
                onSelectionChange={(keys) => setFilters(p => ({ ...p, groupFilter: Array.from(keys)[0] as any }))}
              >
                <SelectItem key="ALL">All Groups</SelectItem>
                <SelectItem key="management">Management</SelectItem>
                <SelectItem key="lecturers">Lecturers</SelectItem>
                <SelectItem key="researchers">Researchers</SelectItem>
                <SelectItem key="staff">Staff</SelectItem>
              </Select>

              <Select 
                className="w-40"
                labelPlacement="outside"
                startContent={<SortDesc size={16} />}
                selectedKeys={[filters.sortKey]}
                onSelectionChange={(keys) => setFilters(p => ({ ...p, sortKey: Array.from(keys)[0] as any }))}
              >
                <SelectItem key="NAME_AZ">Name A-Z</SelectItem>
                <SelectItem key="NAME_ZA">Name Z-A</SelectItem>
              </Select>

              <Tooltip content="Reset Filters">
                <Button isIconOnly variant="flat" onPress={resetFilters} className="text-default-500">
                  <RefreshCcw size={18} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>

        {/* --- Content Grid --- */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-content1/30 rounded-3xl border-2 border-dashed border-divider">
              <Users size={48} className="text-default-200 mb-4" />
              <h3 className="text-xl font-bold">No profiles found</h3>
              <p className="text-default-500 mt-2">Try adjusting your search or group filters.</p>
              <Button variant="flat" className="mt-6" onPress={resetFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginated.map((member) => (
                  <div key={member.id} className="transition-transform duration-300 hover:-translate-y-2">
                    <FacultyCard
                      member={member}
                      showAdminMenu
                      onEdit={openEdit}
                      onDelete={(m) => {
                        if (window.confirm(`Permanently delete ${m.name}?`)) remove(m);
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* --- Pagination --- */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-divider">
                <p className="text-sm text-default-500 font-medium">
                  Displaying <span className="text-foreground">{paginated.length}</span> of {filtered.length} members
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
        </div>

        {/* --- Modal: Design Sync with Pubs/News --- */}
        <Modal 
          isOpen={isOpen} 
          onOpenChange={setIsOpen} 
          size="3xl"
          scrollBehavior="inside"
          backdrop="blur"
          classNames={{
            base: "bg-background",
            header: "border-b border-divider",
            footer: "border-t border-divider",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 py-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <LayoutGrid size={20} className="text-primary" />
                    {form.id ? "Update Profile" : "Create New Profile"}
                  </h2>
                </ModalHeader>
                <ModalBody className="py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      className="md:col-span-2"
                      label="FULL NAME"
                      labelPlacement="outside"
                      placeholder="e.g. Prof. Alexander Wright"
                      value={form.name}
                      onValueChange={(v) => setForm(p => ({ ...p, name: v }))}
                    />
                    <Select
                      label="DEPARTMENT GROUP"
                      labelPlacement="outside"
                      selectedKeys={[form.group]}
                      onSelectionChange={(keys) => setForm(p => ({ ...p, group: Array.from(keys)[0] as any }))}
                    >
                      <SelectItem key="management">Management</SelectItem>
                      <SelectItem key="lecturers">Lecturers</SelectItem>
                      <SelectItem key="researchers">Researchers</SelectItem>
                      <SelectItem key="staff">Administrative Staff</SelectItem>
                    </Select>
                    <Input
                      label="PRIMARY ROLE"
                      labelPlacement="outside"
                      placeholder="e.g. Dean of Research"
                      value={form.role}
                      onValueChange={(v) => setForm(p => ({ ...p, role: v }))}
                    />
                    <Input
                      className="md:col-span-2"
                      label="DEGREES & AFFILIATIONS"
                      labelPlacement="outside"
                      placeholder="PhD, Stanford University"
                      value={form.degree}
                      onValueChange={(v) => setForm(p => ({ ...p, degree: v }))}
                    />
                    <Input
                      label="PORTRAIT IMAGE URL"
                      labelPlacement="outside"
                      placeholder="https://..."
                      value={form.portrait}
                      onValueChange={(v) => setForm(p => ({ ...p, portrait: v }))}
                    />
                    <Input
                      label="UNIVERSITY LOGO URL"
                      labelPlacement="outside"
                      placeholder="https://..."
                      value={form.uniLogo}
                      onValueChange={(v) => setForm(p => ({ ...p, uniLogo: v }))}
                    />
                    <Textarea
                      className="md:col-span-2"
                      label="BIO / RESEARCH SUMMARY"
                      labelPlacement="outside"
                      placeholder="Brief summary of academic focus..."
                      value={form.focus}
                      onValueChange={(v) => setForm(p => ({ ...p, focus: v }))}
                      minRows={4}
                    />
                  </div>
                </ModalBody>
                <ModalFooter className="py-6">
                  <Button variant="light" className="font-semibold" onPress={onClose}>
                    Discard
                  </Button>
                  <Button color="primary" className="font-bold px-10" onPress={upsert}>
                    {form.id ? "Save Changes" : "Publish Profile"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}