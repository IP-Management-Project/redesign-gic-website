import { useEffect, useMemo, useState } from "react";
import type { NewsItem, NewsStatus } from "@/components/NewsCard";
// 1. Import the new list hook instead of the mock data
import { useNewsEvents } from "@/hooks/useNewsEventArticle"; 

export type SortKey =
  | "NEWEST_UPDATED"
  | "OLDEST_UPDATED"
  | "TITLE_AZ"
  | "TITLE_ZA"
  | "DATE_AZ"
  | "DATE_ZA";

export type NewsFormState = {
  id?: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  status: NewsStatus;
};

export type NewsFilters = {
  query: string;
  statusFilter: NewsStatus | "ALL";
  categoryFilter: string | "ALL";
  sortKey: SortKey;
};

type NewsCentralizeOptions = {
  // initialNews is now optional/fallback
  initialNews?: NewsItem[]; 
  now?: () => number;
  idFactory?: (title: string) => string;
  perPage?: number;
};

// 2. Helper to map API data to NewsItem (moved outside to be reusable)
function mapApiToNewsItem(article: any): NewsItem {
  return {
    id: article.id,
    category: article.category,
    title: article.title,
    date: article.date,
    excerpt: article.excerpt,
    image: article.heroImage || article.image, // Handle variable naming diffs
    status: article.status ?? "PUBLISHED",
    updatedAt: article.updatedAt ?? Date.now(),
  };
}

const emptyForm: NewsFormState = {
  category: "Press Release / 2026",
  title: "",
  date: "",
  excerpt: "",
  image: "/landing/server.png",
  status: "PUBLISHED",
};

const defaultFilters: NewsFilters = {
  query: "",
  statusFilter: "ALL",
  categoryFilter: "ALL",
  sortKey: "NEWEST_UPDATED",
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function defaultIdFactory(title: string) {
  return (
    normalize(title)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Math.floor(Math.random() * 10000).toString()
  );
}

export function useNewsCentralize(options: NewsCentralizeOptions = {}) {
  const {
    initialNews = [], // Default to empty if waiting for API
    now = () => Date.now(),
    idFactory = defaultIdFactory,
    perPage = 6,
  } = options;

  // 3. Fetch data using the hook
  const { data: serverNews, isLoading, isError } = useNewsEvents();

  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [filters, setFilters] = useState<NewsFilters>(defaultFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<NewsFormState>(emptyForm);
  const [page, setPage] = useState(1);

  // 4. Sync Server State to Local State
  // When API data arrives, we populate the local `news` state.
  useEffect(() => {
    if (serverNews && Array.isArray(serverNews)) {
      const mappedNews = serverNews.map(mapApiToNewsItem);
      setNews(mappedNews);
    }
  }, [serverNews]);

  const categories = useMemo(() => {
    const set = new Set(news.map((item) => item.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [news]);

  const stats = useMemo(() => {
    const published = news.filter((item) => item.status === "PUBLISHED").length;
    const unpublished = news.length - published;
    return { total: news.length, published, unpublished };
  }, [news]);

  const filtered = useMemo(() => {
    const q = normalize(filters.query);
    let list = [...news];

    if (filters.statusFilter !== "ALL") {
      list = list.filter((item) => item.status === filters.statusFilter);
    }

    if (filters.categoryFilter !== "ALL") {
      list = list.filter((item) => item.category === filters.categoryFilter);
    }

    if (q.length) {
      list = list.filter((item) => {
        const hay = normalize(
          `${item.title} ${item.category} ${item.date} ${item.excerpt} ${item.status}`
        );
        return hay.includes(q);
      });
    }

    list.sort((a, b) => {
      switch (filters.sortKey) {
        case "NEWEST_UPDATED":
          return b.updatedAt - a.updatedAt;
        case "OLDEST_UPDATED":
          return a.updatedAt - b.updatedAt;
        case "TITLE_AZ":
          return a.title.localeCompare(b.title);
        case "TITLE_ZA":
          return b.title.localeCompare(a.title);
        case "DATE_AZ":
          return a.date.localeCompare(b.date);
        case "DATE_ZA":
          return b.date.localeCompare(a.date);
        default:
          return 0;
      }
    });

    return list;
  }, [news, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [filters.query, filters.statusFilter, filters.categoryFilter, filters.sortKey]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function openCreate() {
    setForm(emptyForm);
    setIsOpen(true);
  }

  function openEdit(item: NewsItem) {
    setForm({
      id: item.id,
      category: item.category,
      title: item.title,
      date: item.date,
      excerpt: item.excerpt,
      image: item.image,
      status: item.status,
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function upsert() {
    const cleanedTitle = form.title.trim();
    if (!cleanedTitle) return;

    setNews((prev) => {
      // Logic remains the same: modifying LOCAL state
      // Note: In a real app, you would likely call a mutation here (e.g. useUpdateNews)
      if (form.id) {
        return prev.map((item) =>
          item.id === form.id
            ? {
                ...item,
                category: form.category.trim() || item.category,
                title: cleanedTitle,
                date: form.date.trim() || item.date,
                excerpt: form.excerpt.trim() || item.excerpt,
                image: form.image.trim() || item.image,
                status: form.status,
                updatedAt: now(),
              }
            : item
        );
      }

      const created: NewsItem = {
        id: idFactory(cleanedTitle),
        category: form.category.trim() || "Press Release / 2026",
        title: cleanedTitle,
        date: form.date.trim() || "TBD",
        excerpt: form.excerpt.trim() || "",
        image: form.image.trim() || "/landing/server.png",
        status: form.status,
        updatedAt: now(),
      };

      return [created, ...prev];
    });

    closeModal();
  }

  function togglePublish(item: NewsItem) {
    setNews((prev) =>
      prev.map((entry) =>
        entry.id === item.id
          ? {
              ...entry,
              status: entry.status === "PUBLISHED" ? "UNPUBLISHED" : "PUBLISHED",
              updatedAt: now(),
            }
          : entry
      )
    );
  }

  function remove(item: NewsItem) {
    setNews((prev) => prev.filter((entry) => entry.id !== item.id));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return {
    news,
    filtered,
    paginated,
    categories,
    stats,
    isOpen,
    form,
    filters,
    page,
    perPage,
    totalPages,
    isLoading, // 5. Return loading state
    isError,
    setForm,
    setFilters,
    setIsOpen,
    setPage,
    openCreate,
    openEdit,
    closeModal,
    upsert,
    togglePublish,
    remove,
    resetFilters,
  };
}