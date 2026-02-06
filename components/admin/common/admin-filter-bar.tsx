"use client";

import { ReactNode } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Search, X } from "lucide-react";

// --- Types ---

export interface FilterOption {
  key: string;
  label: string;
  color?: string; // Optional: "blue", "red", etc.
}

export interface FilterConfigItem<T> {
  key: keyof T;           // Must match a key in your state object
  type: "SELECT";         // Expandable (e.g., "DATE_RANGE" later)
  label: string;          // Used as placeholder
  icon?: ReactNode;       // Icon on the left
  options: FilterOption[];
  width?: string;         // e.g., "w-40"
  isLoading?: boolean;    // For async data like Categories
  
  /** Optional: Custom content for the bottom of the dropdown (e.g. "Manage Categories") */
  bottomContent?: ReactNode; 
}

interface FilterBarProps<T> {
  // State
  filters: T;
  setFilters: (key: keyof T, value: any) => void;
  
  // Search
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  // Configuration
  config: FilterConfigItem<T>[];

  // Actions
  onClear?: () => void;
  isClearEnabled?: boolean;
}

// --- Component ---

export function FilterBar<T>({
  filters,
  setFilters,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  config,
  onClear,
  isClearEnabled = false,
}: FilterBarProps<T>) {

  return (
    <Card className="border-none shadow-sm bg-content1/70 backdrop-blur-md overflow-visible">
      <div className="p-4 flex flex-col lg:flex-row gap-4">
        
        {/* 1. Search Field */}
        <div className="flex-1">
          <Input
            isClearable
            startContent={<Search size={18} className="text-default-400" />}
            placeholder={searchPlaceholder}
            value={searchQuery}
            onValueChange={onSearchChange}
            onClear={() => onSearchChange("")}
            variant="flat"
          />
        </div>

        {/* 2. Dynamic Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {config.map((field) => (
            <Select
              key={String(field.key)}
              className={field.width || "w-40"}
              labelPlacement="outside"
              placeholder={field.label}
              startContent={field.icon}
              isLoading={field.isLoading}
              
              // Handle Value
              // @ts-ignore: Accessing dynamic key safely
              selectedKeys={new Set([filters[field.key]])}
              onSelectionChange={(keys) => {
                // Convert Set to single value
                const value = Array.from(keys)[0];
                if (value) setFilters(field.key, value);
              }}

              // Handle "Manage Categories" button or other custom footers
              listboxProps={field.bottomContent ? {
                bottomContent: field.bottomContent
              } : undefined}
            >
              {field.options.map((opt) => (
                <SelectItem 
                  key={opt.key} 
                  textValue={opt.label}
                  startContent={
                    opt.color ? <span className={`w-2 h-2 rounded-full bg-${opt.color}-500`} /> : null
                  }
                >
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
          ))}

          {/* 3. Clear Button */}
          {isClearEnabled && onClear && (
            <Button
              variant="flat"
              color="danger"
              startContent={<X size={16} />}
              onPress={onClear}
              className="text-default-500 hover:text-danger hover:bg-danger/10 transition-colors"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}