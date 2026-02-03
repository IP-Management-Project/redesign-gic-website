"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Filter, Search, SortDesc, Tag, Menu, X } from "lucide-react";
import { useMediaKinds } from "@/hooks/news-centralize/useMediaKinds";
import KindManagementDrawer from "@/app/admin/news-centralize/drawer/kind-management-drawer";
import { useDisclosure } from "@heroui/modal";

export function NewsFilterBar({ filters, setFilters, resetFilters }: any) {
  const { kinds, isLoading: kindsLoading } = useMediaKinds();
  
  // 1. Drawer state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  // 2. Select Dropdown Control
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const categoryOptions = useMemo(() => {
    const staticOption = { key: "ALL", label: "All Categories", color: null };
    return [staticOption, ...kinds];
  }, [kinds]);

  const handleOpenDrawer = () => {
    setIsSelectOpen(false); 
    onOpen();              
  };

  // 3. Check if filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.query !== "" ||
      filters.statusFilter !== "ALL" ||
      filters.categoryFilter !== "ALL" ||
      filters.sortKey !== "NEWEST" // Assuming "NEWEST" is your default sort
    );
  }, [filters]);

  return (
    <>
      <Card className="border-none shadow-sm bg-content1/70 backdrop-blur-md overflow-visible">
        <div className="p-4 flex flex-col lg:flex-row gap-4">

          {/* Search */}
          <div className="flex-1">
            <Input
              isClearable
              startContent={<Search size={18} className="text-default-400" />}
              placeholder="Search articles..."
              value={filters.query}
              onValueChange={(v) => setFilters((prev: any) => ({ ...prev, query: v }))}
              variant="flat"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Status Filter */}
            <Select
              className="w-40"
              labelPlacement="outside"
              startContent={<Filter size={16} />}
              selectedKeys={[filters.statusFilter]}
              onSelectionChange={(keys) => setFilters((prev: any) => ({ ...prev, statusFilter: Array.from(keys)[0] }))}
            >
              <SelectItem key="ALL">All Status</SelectItem>
              <SelectItem key="PUBLISHED">Published</SelectItem>
              <SelectItem key="DRAFT">Drafts</SelectItem>
            </Select>

            {/* Category Filter */}
            <Select
              className="w-52"
              labelPlacement="outside"
              placeholder="Category"
              isLoading={kindsLoading}
              items={categoryOptions}
              startContent={<Tag size={16} />}
              selectedKeys={new Set([filters.categoryFilter])}
              onSelectionChange={(keys) => setFilters((prev: any) => ({ ...prev, categoryFilter: Array.from(keys)[0] }))}
              
              isOpen={isSelectOpen}
              onOpenChange={(open) => setIsSelectOpen(open)}
              listboxProps={{
                bottomContent: (
                  <div className="pt-2 px-1 pb-1 border-t border-default-200">
                    <Button
                      className="w-full"
                      size="sm"
                      variant="light"
                      color="primary"
                      startContent={<Menu size={16} />}
                      onPress={handleOpenDrawer}
                    >
                      Manage Categories
                    </Button>
                  </div>
                )
              }}
            >
              {(item) => (
                <SelectItem
                  key={item.key}
                  textValue={item.label}
                  startContent={item.color ? <span className={`w-2 h-2 rounded-full bg-${item.color}-500`} /> : null}
                >
                  {item.label}
                </SelectItem>
              )}
            </Select>

            {/* Sort Options */}
            <Select
              className="w-44"
              labelPlacement="outside"
              startContent={<SortDesc size={16} />}
              selectedKeys={[filters.sortKey]}
              onSelectionChange={(keys) => setFilters((prev: any) => ({ ...prev, sortKey: Array.from(keys)[0] }))}
            >
              <SelectItem key="NEWEST">Newest First</SelectItem>
              <SelectItem key="OLDEST">Oldest First</SelectItem>
              <SelectItem key="TITLE_AZ">Title (A-Z)</SelectItem>
              <SelectItem key="TITLE_ZA">Title (Z-A)</SelectItem>
            </Select>

            {/* 4. Conditional Clear Button */}
            {hasActiveFilters && (
              <Button 
                variant="flat" 
                color="danger" 
                startContent={<X size={16} />}
                onPress={resetFilters} 
                className="text-default-500 hover:text-danger hover:bg-danger/10 transition-colors"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </Card>

      <KindManagementDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}