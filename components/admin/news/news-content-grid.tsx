import { NewsEventArticleItem, NewsEventArticleResponse } from "@/api/services/news";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Pagination } from "@heroui/pagination";
import { Skeleton } from "@heroui/skeleton";
import { Newspaper } from "lucide-react";

interface NewsContentGridProps {
  isLoading: boolean;
  items: NewsEventArticleItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEdit: (item: any) => void;
  onTogglePublish: (item: any) => void;
  onDelete: (item: any) => void;
  onClearFilters: () => void;
}

export function NewsContentGrid({ 
  isLoading, items, totalItems, totalPages, currentPage, 
  onPageChange, onEdit, onTogglePublish, onDelete, onClearFilters 
}: NewsContentGridProps) {
  
  // 1. Loading State (Skeleton Grid)
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg h-48" />
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg h-3" />
              <Skeleton className="w-4/5 rounded-lg h-3" />
              <Skeleton className="w-2/5 rounded-lg h-3" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // 2. Empty State
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-content1/30 rounded-3xl border-2 border-dashed border-default-200">
        <div className="bg-default-100 p-6 rounded-full mb-4">
          <Newspaper size={48} className="text-default-300" />
        </div>
        <h3 className="text-xl font-bold">No results found</h3>
        <p className="text-default-500 mt-2 mb-6 text-center max-w-xs">
          Adjust filters to find what you need.
        </p>
        <Button variant="flat" onPress={onClearFilters}>Clear Filters</Button>
      </div>
    );
  }

  // 3. Data State
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group transition-transform duration-300 hover:-translate-y-2">
            <NewsCard
              item={item}
              href={`edit/${item.article?.slug}`}
              showAdminMenu
              onEdit={onEdit}
              onTogglePublish={onTogglePublish}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      <Divider />

      <div className="flex flex-col sm:flex-row items-center justify-between pb-10">
        <p className="text-sm text-default-500 font-medium">
          Displaying <span className="text-foreground">{items.length}</span> of {totalItems} items
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
