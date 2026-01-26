import { useEffect, useMemo, useState } from "react";
import {
  incubationShowcaseMockData,
  type GalleryItem,
  type SeasonalHighlight,
} from "@/hooks/useIncubationShowcaseData";

export type ShowcaseKind = "gallery" | "season";

export type ShowcaseItem = {
  id: string;
  kind: ShowcaseKind;
  title: string;
  subtitle: string;
  image?: string;
  meta?: string;
  span?: string;
  teams?: string[];
};

export type ShowcaseFilters = {
  query: string;
  kindFilter: ShowcaseKind | "ALL";
  sortKey: "TITLE_AZ" | "TITLE_ZA";
};

export type ShowcaseFormState = {
  id?: string;
  kind: ShowcaseKind;
  title: string;
  subtitle: string;
  image: string;
  meta: string;
  span: string;
  teams: string;
};

type ExchangeShowcaseOptions = {
  initialGallery?: GalleryItem[];
  initialSeasons?: SeasonalHighlight[];
  perPage?: number;
};

const emptyForm: ShowcaseFormState = {
  kind: "gallery",
  title: "",
  subtitle: "",
  image: "",
  meta: "",
  span: "",
  teams: "",
};

const defaultFilters: ShowcaseFilters = {
  query: "",
  kindFilter: "ALL",
  sortKey: "TITLE_AZ",
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function buildItems(gallery: GalleryItem[], seasons: SeasonalHighlight[]): ShowcaseItem[] {
  const galleryItems: ShowcaseItem[] = gallery.map((item) => ({
    id: `gallery-${item.id}`,
    kind: "gallery",
    title: item.label,
    subtitle: "Gallery item",
    image: item.image,
    span: item.span,
  }));

  const seasonItems: ShowcaseItem[] = seasons.map((season) => ({
    id: `season-${season.season}-${season.year}`,
    kind: "season",
    title: season.season,
    subtitle: season.winner,
    meta: season.year,
    teams: season.teams,
  }));

  return [...galleryItems, ...seasonItems];
}

export function useExchangeShowcaseCentralize(options: ExchangeShowcaseOptions = {}) {
  const {
    initialGallery = incubationShowcaseMockData.galleryItems,
    initialSeasons = incubationShowcaseMockData.seasons,
    perPage = 6,
  } = options;
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGallery);
  const [seasonItems, setSeasonItems] = useState<SeasonalHighlight[]>(initialSeasons);
  const [filters, setFilters] = useState<ShowcaseFilters>(defaultFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<ShowcaseFormState>(emptyForm);
  const [page, setPage] = useState(1);

  const items = useMemo(
    () => buildItems(galleryItems, seasonItems),
    [galleryItems, seasonItems]
  );

  const stats = useMemo(
    () => ({
      gallery: galleryItems.length,
      seasons: seasonItems.length,
      total: galleryItems.length + seasonItems.length,
    }),
    [galleryItems.length, seasonItems.length]
  );

  const filtered = useMemo(() => {
    const q = normalize(filters.query);
    let list = [...items];

    if (filters.kindFilter !== "ALL") {
      list = list.filter((item) => item.kind === filters.kindFilter);
    }

    if (q.length) {
      list = list.filter((item) => {
        const hay = normalize(
          `${item.title} ${item.subtitle} ${item.meta ?? ""} ${(item.teams ?? []).join(" ")}`
        );
        return hay.includes(q);
      });
    }

    list.sort((a, b) => {
      if (filters.sortKey === "TITLE_ZA") {
        return b.title.localeCompare(a.title);
      }
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [filters, items]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [filters.query, filters.kindFilter, filters.sortKey]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function openCreate(kind: ShowcaseKind) {
    setForm({ ...emptyForm, kind });
    setIsOpen(true);
  }

  function openEdit(item: ShowcaseItem) {
    setForm({
      id: item.id,
      kind: item.kind,
      title: item.title,
      subtitle: item.subtitle,
      image: item.image ?? "",
      meta: item.meta ?? "",
      span: item.span ?? "",
      teams: item.teams?.join(", ") ?? "",
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function upsert() {
    if (!form.title.trim()) return;

    if (form.kind === "gallery") {
      setGalleryItems((prev) => {
        if (form.id?.startsWith("gallery-")) {
          const id = Number(form.id.replace("gallery-", ""));
          return prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  label: form.title.trim(),
                  image: form.image.trim(),
                  span: form.span.trim() || item.span,
                }
              : item
          );
        }

        const nextId = prev.length ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
        return [
          {
            id: nextId,
            label: form.title.trim(),
            image: form.image.trim(),
            span: form.span.trim() || "md:col-span-1 md:row-span-1",
          },
          ...prev,
        ];
      });
    } else {
      setSeasonItems((prev) => {
        if (form.id?.startsWith("season-")) {
          const [seasonLabel, year] = form.title.split(" / ");
          return prev.map((item) =>
            item.season === seasonLabel && item.year === form.meta
              ? {
                  ...item,
                  season: form.title.trim(),
                  year: form.meta.trim() || item.year,
                  winner: form.subtitle.trim() || item.winner,
                  teams: form.teams
                    .split(",")
                    .map((team) => team.trim())
                    .filter(Boolean),
                  desc: item.desc,
                }
              : item
          );
        }

        return [
          {
            season: form.title.trim(),
            year: form.meta.trim(),
            winner: form.subtitle.trim(),
            teams: form.teams
              .split(",")
              .map((team) => team.trim())
              .filter(Boolean),
            desc: "Update this description in the CMS.",
          },
          ...prev,
        ];
      });
    }

    closeModal();
  }

  function remove(item: ShowcaseItem) {
    if (item.kind === "gallery") {
      const id = Number(item.id.replace("gallery-", ""));
      setGalleryItems((prev) => prev.filter((entry) => entry.id !== id));
    } else {
      setSeasonItems((prev) => prev.filter((entry) => entry.season !== item.title));
    }
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return {
    galleryItems,
    seasonItems,
    items,
    filtered,
    paginated,
    stats,
    filters,
    form,
    isOpen,
    page,
    perPage,
    totalPages,
    setFilters,
    setForm,
    setIsOpen,
    setPage,
    openCreate,
    openEdit,
    closeModal,
    upsert,
    remove,
    resetFilters,
  };
}
