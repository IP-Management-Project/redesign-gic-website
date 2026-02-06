"use client";

import React, { useMemo } from "react";
import { Button } from "@heroui/react";
import { 
  Plus, ShieldCheck, GraduationCap, Microscope, Briefcase, Filter, SortDesc 
} from "lucide-react";

// --- Hooks ---
import { useFacultyCentralize } from "@/hooks/useFacultyCentralize";

// --- Components ---
import { PageHeader } from "@/components/admin/common/admin-header";
import { StatsGrid, StatItem } from "@/components/admin/common/admin-stats";
import { FilterBar, FilterConfigItem } from "@/components/admin/common/admin-filter-bar";
import { FacultyContentGrid } from "@/components/admin/faculty/faculty-content-grid";
import { FacultyUpsertModal } from "@/components/admin/faculty/faculty-insert-modal";

export default function FacultyAdminPage() {
  const {
    filtered, paginated, stats, filters, form,
    isOpen, page, totalPages, setFilters, setForm, setIsOpen,
    setPage, openCreate, openEdit, upsert, remove, resetFilters,
  } = useFacultyCentralize();

  // --- 1. Stats Config ---
  const statItems: StatItem[] = useMemo(() => [
    { label: "Management", value: stats.management || 0, icon: <ShieldCheck size={22} className="text-emerald-500" />, colorClass: "bg-emerald-500/10" },
    { label: "Lecturers", value: stats.lecturers || 0, icon: <GraduationCap size={22} className="text-blue-500" />, colorClass: "bg-blue-500/10" },
    { label: "Researchers", value: stats.researchers || 0, icon: <Microscope size={22} className="text-purple-500" />, colorClass: "bg-purple-500/10" },
    { label: "Staff", value: stats.staff || 0, icon: <Briefcase size={22} className="text-amber-500" />, colorClass: "bg-amber-500/10" },
  ], [stats]);

  // --- 2. Filter Config ---
  const filterConfig: FilterConfigItem<typeof filters>[] = useMemo(() => [
    {
      key: "groupFilter", type: "SELECT", label: "All Groups", width: "w-44", icon: <Filter size={16} />,
      options: [
        { key: "ALL", label: "All Groups" },
        { key: "management", label: "Management" },
        { key: "lecturers", label: "Lecturers" },
        { key: "researchers", label: "Researchers" },
        { key: "staff", label: "Staff" },
      ]
    },
    {
      key: "sortKey", type: "SELECT", label: "Sort By", width: "w-40", icon: <SortDesc size={16} />,
      options: [
        { key: "NAME_AZ", label: "Name A-Z" },
        { key: "NAME_ZA", label: "Name Z-A" },
      ]
    }
  ], []);

  const handleUpdateFilter = (key: keyof typeof filters, val: any) => setFilters(prev => ({ ...prev, [key]: val }));

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-black text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        
        <PageHeader
          title="Faculty"
          titleHighlight="Directory"
          description="Manage academic profiles, department leadership, and research teams."
        >
          <Button 
            color="primary" 
            className="font-bold shadow-lg shadow-primary/20"
            startContent={<Plus size={20} />} 
            onPress={openCreate}
          >
            Add Profile
          </Button>
        </PageHeader>

        <StatsGrid items={statItems} columns={4} />

        <FilterBar 
          filters={filters}
          setFilters={handleUpdateFilter}
          searchQuery={filters.query}
          onSearchChange={(v) => handleUpdateFilter("query", v)}
          config={filterConfig}
          onClear={resetFilters}
          isClearEnabled={filters.query !== "" || filters.groupFilter !== "ALL"}
        />

        <FacultyContentGrid
          items={paginated}
          totalFiltered={filtered.length}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
          onEdit={openEdit}
          onDelete={(m) => {
            if (window.confirm(`Delete ${m.name}?`)) remove(m);
          }}
          onClearFilters={resetFilters}
        />

        <FacultyUpsertModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          form={form}
          setForm={setForm}
          onSubmit={upsert}
        />

      </div>
    </div>
  );
}