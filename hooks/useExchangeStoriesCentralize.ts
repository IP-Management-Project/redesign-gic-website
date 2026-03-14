"use client";

import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExchangeStoryCard, useExchangeSemesterData } from "./useExchangeSemesterData";
import { exchangeApi } from "@/api/services/exchange";

const QUERY_KEY = ["exchangeSemester"];

const EMPTY_FORM: Partial<ExchangeStoryCard> = {
  type: "Khmer to France",
  name: "",
  destination: "",
  story: "",
  focus: "",
  backgroundImg: "",
  portrait: "",
  span: "md:col-span-1 md:row-span-1",
};

export function useExchangeStoriesCentralize() {
  const queryClient = useQueryClient();
  const { data: stories = [], isLoading } = useExchangeSemesterData();

  const [filters, setFilters] = useState({ query: "", typeFilter: "ALL" });
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [form, setForm] = useState<Partial<ExchangeStoryCard>>(EMPTY_FORM);

  // ─── Mutations ────────────────────────────────────────────────────────────

  const createMutation = useMutation({
    mutationFn: (data: Omit<ExchangeStoryCard, "id">) => exchangeApi.create(data),
    onSuccess: (updated) => {
      queryClient.setQueryData<ExchangeStoryCard[]>(QUERY_KEY, updated);
      setIsOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ExchangeStoryCard> }) =>
      exchangeApi.update(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData<ExchangeStoryCard[]>(QUERY_KEY, updated);
      setIsOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => exchangeApi.delete(id),
    onSuccess: (updated) => {
      queryClient.setQueryData<ExchangeStoryCard[]>(QUERY_KEY, updated);
    },
  });

  const isMutating =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  // ─── Derived state ────────────────────────────────────────────────────────

  const stats = useMemo(() => ({
    total: stories.length,
    khmerAbroad: stories.filter((s) => s.type.includes("Khmer to")).length,
    international: stories.filter((s) => s.type.includes("to Cambodia")).length,
  }), [stories]);

  const filtered = useMemo(() => {
    return stories.filter((item) => {
      const matchQuery = `${item.name} ${item.destination} ${item.focus}`
        .toLowerCase()
        .includes(filters.query.toLowerCase());
      const matchType = filters.typeFilter === "ALL" || item.type === filters.typeFilter;
      return matchQuery && matchType;
    });
  }, [stories, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // ─── Modal helpers ────────────────────────────────────────────────────────

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setIsOpen(true);
  };

  const openEdit = (item: ExchangeStoryCard) => {
    setForm(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    createMutation.reset();
    updateMutation.reset();
  };

  // ─── CRUD actions ─────────────────────────────────────────────────────────

  const upsert = () => {
    const { id, ...rest } = form as ExchangeStoryCard;
    if (id) {
      updateMutation.mutate({ id, data: rest });
    } else {
      createMutation.mutate(rest as Omit<ExchangeStoryCard, "id">);
    }
  };

  const remove = (id: number) => {
    deleteMutation.mutate(id);
  };

  // ─── Error helpers ────────────────────────────────────────────────────────

  const mutationError =
    (createMutation.error ?? updateMutation.error ?? deleteMutation.error) as Error | null;

  return {
    filtered,
    paginated,
    stats,
    filters,
    setFilters,
    form,
    setForm,
    isOpen,
    setIsOpen,
    page,
    setPage,
    totalPages,
    isLoading,
    isMutating,
    mutationError,
    openCreate,
    openEdit,
    upsert,
    remove,
    resetFilters: () => setFilters({ query: "", typeFilter: "ALL" }),
    closeModal,
  };
}