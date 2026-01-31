import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Filter, RefreshCcw, Search, SortDesc } from "lucide-react";

export function NewsFilterBar({ filters, categories, setFilters, resetFilters }: any) {
  return (
    <Card className="border-none shadow-sm bg-content1/70 backdrop-blur-md overflow-visible">
      <div className="p-4 flex flex-col lg:flex-row gap-4">
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
        <div className="flex flex-wrap items-center gap-3">
          <Select
            className="w-40"
            labelPlacement="outside"
            startContent={<Filter size={16} />}
            selectedKeys={[filters.statusFilter]}
            onSelectionChange={(keys) => setFilters((prev: any) => ({ ...prev, statusFilter: Array.from(keys)[0] }))}
          >
            <SelectItem key="ALL">All Status</SelectItem>
            <SelectItem key="PUBLISHED">Published</SelectItem>
            <SelectItem key="UNPUBLISHED">Drafts</SelectItem>
          </Select>

          <Select
            className="w-44"
            labelPlacement="outside"
            selectedKeys={new Set([filters.categoryFilter])}
            onSelectionChange={(keys) => setFilters((prev: any) => ({ ...prev, categoryFilter: Array.from(keys)[0] }))}
            items={["ALL", ...categories].map((c) => ({ id: c, label: c }))}
          >
            {(item) => (
              <SelectItem key={item.id} textValue={item.label}>
                {item.label === "ALL" ? "All Categories" : item.label}
              </SelectItem>
            )}
          </Select>

          <Select
            className="w-48"
            labelPlacement="outside"
            startContent={<SortDesc size={16} />}
            selectedKeys={[filters.sortKey]}
            onSelectionChange={(keys) => setFilters((prev: any) => ({ ...prev, sortKey: Array.from(keys)[0] }))}
          >
            <SelectItem key="NEWEST_UPDATED">Recently Updated</SelectItem>
            <SelectItem key="OLDEST_UPDATED">Oldest First</SelectItem>
            <SelectItem key="TITLE_AZ">Title A-Z</SelectItem>
          </Select>

          <Button isIconOnly variant="flat" onPress={resetFilters} className="text-default-500">
            <RefreshCcw size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
