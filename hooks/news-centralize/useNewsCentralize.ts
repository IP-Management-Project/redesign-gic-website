// src/hooks/news-centralize/useNewsCentralize.ts

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

// Types
import { newsApi, NewsEventArticleStatus, NewStats, NewsTemplate } from "@/api/services/news";
import type { NewsItem } from "@/components/NewsCard";

export type SortKey = "NEWEST" | "OLDEST" | "TITLE_AZ" | "TITLE_ZA" | "DATE_NEWEST" | "DATE_OLDEST";

export type NewsFilters = {
  query: string;
  statusFilter: NewsEventArticleStatus | "ALL";
  categoryFilter: string | "ALL";
  sortKey: SortKey;
};

// --- Helper: Map Backend Data to UI Format ---
function mapApiToNewsItem(article: any): NewsItem {
  let categoryLabel = "Uncategorized";
  if (article.category) {
    if (typeof article.category === 'string') categoryLabel = article.category;
    else if (typeof article.category === 'object') {
      categoryLabel = article.category.label || article.category.key || "Uncategorized";
    }
  }

  return {
    id: article.id,
    slug: article.slug,
    category: categoryLabel.trim(),
    title: article.title,
    date: article.publishDate ?? article.createdAt,
    publishDate: article.publishDate ?? article.createdAt,
    excerpt: article.excerpt,
    image: article.heroImage || article.thumbnailImage,
    heroImage: article.heroImage,
    status: (article.status || "PUBLISHED").toUpperCase(),
    updatedAt: new Date(article.updatedAt).getTime(),
  };
}

// --- Helper: Map Frontend Sort to Backend Params ---
function getBackendSortParams(key: SortKey): { sortBy: string; sortDir: "ASC" | "DESC" } {
  switch (key) {
    case "NEWEST": return { sortBy: "createdAt", sortDir: "DESC" };
    case "OLDEST": return { sortBy: "createdAt", sortDir: "ASC" };
    case "TITLE_AZ": return { sortBy: "title", sortDir: "ASC" };
    case "TITLE_ZA": return { sortBy: "title", sortDir: "DESC" };
    case "DATE_NEWEST": return { sortBy: "publishDate", sortDir: "DESC" };
    case "DATE_OLDEST": return { sortBy: "publishDate", sortDir: "ASC" };
    default: return { sortBy: "createdAt", sortDir: "DESC" };
  }
}

// --- MAIN HOOK ---

export function useNewsCentralize(options: { perPage?: number } = {}) {
  const { perPage = 10 } = options;
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. State
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<NewsFilters>({
    query: "",
    statusFilter: "ALL",
    categoryFilter: "ALL",
    sortKey: "NEWEST",
  });

  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // 2. SERVER FETCHING
  const backendParams = {
    page,
    limit: perPage,
    q: filters.query || undefined,
    status: filters.statusFilter !== "ALL" ? filters.statusFilter : undefined,
    category: filters.categoryFilter !== "ALL" ? filters.categoryFilter : undefined,
    ...getBackendSortParams(filters.sortKey),
  };

  const { 
    data: response, 
    isLoading, 
    isFetching,
    isError 
  } = useQuery({
    queryKey: ["news-list", backendParams],
    queryFn: () => newsApi.getNewsList(backendParams),
    placeholderData: (previousData) => previousData, 
  });

  // 3. SAFE DATA EXTRACTION (FIXED HERE)
  // response = the Axios object. response.data = the body. response.data.data = the array.
  const rawData = response?.data; 
  const news = Array.isArray(rawData) ? rawData.map(mapApiToNewsItem) : [];
  
  const meta = response?.data?.meta;
  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.total || 0;

  // --- MUTATIONS ---
  const deleteMutation = useMutation({
    mutationFn: (id: string) => newsApi.delete(id),
    onSuccess: () => {
      addToast({ title: "Deleted", description: "Article removed", color: "success" });
      queryClient.invalidateQueries({ queryKey: ["news-list"] });
    },
    onError: (err: any) => {
      const isConflict = err.response?.status === 409;
      addToast({
        title: "Error",
        description: isConflict ? "Cannot delete: Article in use" : "Failed to delete",
        color: "danger"
      });
    }
  });

  const duplicateMutation = useMutation({
    mutationFn: (id: string) => newsApi.duplicate(id),
    onSuccess: (response) => {
      addToast({
        title: "Success",
        description: "Article duplicated as Draft",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["news-list"] });
      queryClient.invalidateQueries({ queryKey: ["news-stats"] });
      
      // Optional: Redirect to edit the new copy immediately?
      // if (response.data?.slug) router.push(`/admin/news-centralize/edit/${response.data.slug}`);
    },
    onError: (error: any) => {
      addToast({
        title: "Error",
        description: error.response?.data?.message || "Failed to duplicate",
        color: "danger",
      });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => newsApi.toggleStatus(id),
    onSuccess: () => {
      addToast({ title: "Success", description: "Status updated", color: "success" });
      queryClient.invalidateQueries({ queryKey: ["news-list"] });
    },
    onError: () => addToast({ title: "Error", description: "Failed to update status", color: "danger" })
  });

  // --- ACTIONS ---
  const startCreateFlow = () => setIsTemplateModalOpen(true);
  const openEdit = (item: NewsItem) => router.push(`/admin/news-centralize/edit/${item.slug}`);

  const createDraftFromTemplate = async (template?: NewsTemplate) => {
    setIsCreating(true);
    setIsTemplateModalOpen(false);
    try {
      const timestamp = Date.now();
      const slug = `${template?.name?.toLowerCase().replace(/\s+/g, '-') || 'news'}-${timestamp}`;
      const payload = {
        title: "Untitled News",
        slug,
        category: "press-release",
        status: "DRAFT",
        templateId: template?.id,
      };

      const res = await newsApi.createNew(payload);
      addToast({ title: "Success", description: "Draft created", color: "success" });
      router.push(`/admin/news-centralize/edit/${res.data?.slug || slug}`);
    } catch (e: any) {
      addToast({ title: "Error", description: e.response?.data?.message || "Creation failed", color: "danger" });
      setIsCreating(false);
    }
  };

  const remove = (item: NewsItem) => deleteMutation.mutate(item.id);
  const togglePublish = (item: NewsItem) => toggleStatusMutation.mutate(item.id);
  const duplicate = (item: NewsItem) => duplicateMutation.mutate(item.id);

  // Reset Page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters.query, filters.statusFilter, filters.categoryFilter, filters.sortKey]);

  return {
    news,
    stats: response?.stats as NewStats || {},
    isLoading: isLoading || isFetching,
    isError,
    page,
    setPage,
    totalPages,
    totalItems,
    filters,
    setFilters,
    resetFilters: () => setFilters({ query: "", statusFilter: "ALL", categoryFilter: "ALL", sortKey: "NEWEST" }),
    isTemplateModalOpen,
    setIsTemplateModalOpen,
    isCreating,
    startCreateFlow,
    createDraftFromTemplate,
    openEdit,
    togglePublish,
    remove,
    duplicate,
  };
}