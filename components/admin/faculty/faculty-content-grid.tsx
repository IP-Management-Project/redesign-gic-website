"use client";

import React from "react";
import { Button, Pagination } from "@heroui/react";
import { Users } from "lucide-react";
import { FacultyCard } from "@/components/falcuty-card"; // Adjust path
import type { FacultyMember } from "@/hooks/useFacultyCentralize";

interface FacultyContentGridProps {
  items: FacultyMember[];
  totalFiltered: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEdit: (member: FacultyMember) => void;
  onDelete: (member: FacultyMember) => void;
  onClearFilters: () => void;
}

export function FacultyContentGrid({
  items,
  totalFiltered,
  totalPages,
  currentPage,
  onPageChange,
  onEdit,
  onDelete,
  onClearFilters,
}: FacultyContentGridProps) {
  
  // 1. Empty State
  if (totalFiltered === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-content1/30 rounded-3xl border-2 border-dashed border-divider mt-8">
        <Users size={48} className="text-default-200 mb-4" />
        <h3 className="text-xl font-bold">No profiles found</h3>
        <p className="text-default-500 mt-2">Try adjusting your search or group filters.</p>
        <Button variant="flat" className="mt-6" onPress={onClearFilters}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  // 2. Grid & Pagination
  return (
    <div className="mt-8 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((member) => (
          <div key={member.id} className="transition-transform duration-300 hover:-translate-y-2">
            <FacultyCard
              member={member}
              showAdminMenu
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-divider">
        <p className="text-sm text-default-500 font-medium">
          Displaying <span className="text-foreground">{items.length}</span> of {totalFiltered} members
        </p>
        <Pagination
          isCompact
          showControls
          total={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
          variant="flat"
        />
      </div>
    </div>
  );
}