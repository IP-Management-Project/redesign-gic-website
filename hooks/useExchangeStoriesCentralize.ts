"use client";

import { useState, useMemo, useEffect } from "react";
import { ExchangeStoryCard, useExchangeSemesterData } from "./useExchangeSemesterData";

export type ShowcaseItem = {
  id: number;
  /** The direction of exchange, e.g., "Khmer to France" or "French to Cambodia" */
  type: string;
  /** The student's full name */
  name: string;
  /** The institution or city and country, e.g., "INSA Rennes, France" */
  destination: string;
  /** The large cinematic background image used for the card expansion */
  backgroundImg: string;
  /** The student's headshot/portrait image */
  portrait: string;
  /** The long-form testimonial or quote provided by the student */
  story: string;
  /** Their academic field of study or project focus, e.g., "Cybersecurity & R&D" */
  focus: string;
  /** Optional array of additional photos from their exchange activities */
  activityImages?: string[];
  /** * CSS Grid span settings for the Bento-style gallery layout.
   * e.g., "md:col-span-2 md:row-span-2"
   */
  span: string;
};

/**
 * Filter state for the Exchange Stories Admin Portal
 */
export type ShowcaseFilters = {
  query: string;
  typeFilter: string | "ALL";
};

/**
 * UI State for the Centralized Hook
 */
export type ShowcaseState = {
  items: ShowcaseItem[];
  filtered: ShowcaseItem[];
  paginated: ShowcaseItem[];
  stats: {
    total: number;
    khmerAbroad: number;
    international: number;
  };
};

export function useExchangeStoriesCentralize() {
  const { data: stories = [] } = useExchangeSemesterData();
  
  // Local state for items so we can simulate Add/Edit/Delete without a real backend
  const [localStories, setLocalStories] = useState<ExchangeStoryCard[]>([]);

  useEffect(() => {
    if (stories.length) setLocalStories(stories);
  }, [stories]);

  const [filters, setFilters] = useState({ query: "", typeFilter: "ALL" });
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [form, setForm] = useState<Partial<ExchangeStoryCard>>({
    type: "Khmer to France",
    name: "",
    destination: "",
    story: "",
    focus: "",
    backgroundImg: "",
    portrait: "",
    span: "md:col-span-1 md:row-span-1",
  });

  const stats = useMemo(() => ({
    total: localStories.length,
    khmerAbroad: localStories.filter(s => s.type.includes("Khmer to")).length,
    international: localStories.filter(s => s.type.includes("to Cambodia")).length,
  }), [localStories]);

  const filtered = useMemo(() => {
    return localStories.filter(item => {
      const matchQuery = `${item.name} ${item.destination} ${item.focus}`.toLowerCase().includes(filters.query.toLowerCase());
      const matchType = filters.typeFilter === "ALL" || item.type === filters.typeFilter;
      return matchQuery && matchType;
    });
  }, [localStories, filters]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const openCreate = () => {
    setForm({ type: "Khmer to France", name: "", destination: "", story: "", focus: "", backgroundImg: "", portrait: "", span: "md:col-span-1 md:row-span-1" });
    setIsOpen(true);
  };

  const openEdit = (item: ExchangeStoryCard) => {
    setForm(item);
    setIsOpen(true);
  };

  const upsert = () => {
    if (form.id) {
      setLocalStories(prev => prev.map(s => s.id === form.id ? (form as ExchangeStoryCard) : s));
    } else {
      setLocalStories(prev => [{ ...form, id: Date.now() } as ExchangeStoryCard, ...prev]);
    }
    setIsOpen(false);
  };

  const remove = (id: number) => {
    setLocalStories(prev => prev.filter(s => s.id !== id));
  };

  return {
    filtered, paginated, stats, filters, setFilters,
    form, setForm, isOpen, setIsOpen, page, setPage, totalPages,
    openCreate, openEdit, upsert, remove, resetFilters: () => setFilters({ query: "", typeFilter: "ALL" }),
    closeModal: () => setIsOpen(false)
  };
}