"use client";

import React, { useMemo } from "react";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Filter, SortDesc, Tag, Menu } from "lucide-react";

// Imports
import { useMediaKinds } from "@/hooks/news-centralize/useMediaKinds";
import KindManagementDrawer from "@/app/admin/news-centralize/drawer/kind-management-drawer";
import { NewsFilters } from "@/hooks/news-centralize/useNewsCentralize";
import { FilterBar, FilterConfigItem } from "../common/admin-filter-bar";

interface NewsFilterBarProps {
  filters: NewsFilters;
  setFilters: React.Dispatch<React.SetStateAction<NewsFilters>>;
  resetFilters: () => void;
}

export function NewsFilterBar({ filters, setFilters, resetFilters }: NewsFilterBarProps) {
  // 1. Hooks
  const { kinds, isLoading: kindsLoading } = useMediaKinds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // 2. Compute "Active" state for Clear button
  const hasActiveFilters = 
    filters.query !== "" || 
    filters.statusFilter !== "ALL" || 
    filters.categoryFilter !== "ALL" || 
    filters.sortKey !== "NEWEST";

  // 3. Helper for updating state
  const handleUpdate = (key: keyof NewsFilters, val: any) => {
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  // 4. THE CONFIGURATION (This determines the UI)
  const filterConfig: FilterConfigItem<NewsFilters>[] = useMemo(() => [
    {
      key: "statusFilter",
      type: "SELECT",
      label: "All Status",
      width: "w-40",
      icon: <Filter size={16} />,
      options: [
        { key: "ALL", label: "All Status" },
        { key: "PUBLISHED", label: "Published" },
        { key: "DRAFT", label: "Drafts" },
      ]
    },
    {
      key: "categoryFilter",
      type: "SELECT",
      label: "Category",
      width: "w-52",
      icon: <Tag size={16} />,
      isLoading: kindsLoading,
      // Map API data to options
      options: [
        { key: "ALL", label: "All Categories" },
        ...kinds.map(k => ({ key: k.key, label: k.label, color: k.color }))
      ],
      // Inject the custom "Manage" button here
      bottomContent: (
        <div className="pt-2 px-1 pb-1 border-t border-default-200">
          <Button
            className="w-full"
            size="sm"
            variant="light"
            color="primary"
            startContent={<Menu size={16} />}
            onPress={onOpen}
          >
            Manage Categories
          </Button>
        </div>
      )
    },
    {
      key: "sortKey",
      type: "SELECT",
      label: "Sort By",
      width: "w-44",
      icon: <SortDesc size={16} />,
      options: [
        { key: "NEWEST", label: "Newest First" },
        { key: "OLDEST", label: "Oldest First" },
        { key: "TITLE_AZ", label: "Title (A-Z)" },
        { key: "TITLE_ZA", label: "Title (Z-A)" },
      ]
    }
  ], [kinds, kindsLoading, onOpen]);

  return (
    <>
      <FilterBar
        filters={filters}
        setFilters={handleUpdate}
        searchQuery={filters.query}
        onSearchChange={(v) => handleUpdate("query", v)}
        config={filterConfig}
        onClear={resetFilters}
        isClearEnabled={hasActiveFilters}
      />

      <KindManagementDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}