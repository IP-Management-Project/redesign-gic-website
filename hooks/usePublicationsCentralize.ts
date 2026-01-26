import { useEffect, useMemo, useState } from "react";
import { publicationsMockData, type Publication } from "@/hooks/usePublicationsData";

export type PublicationTypeFilter = Publication["type"] | "ALL";

export type PublicationSortKey = "NEWEST" | "OLDEST" | "TITLE_AZ" | "TITLE_ZA";

export type PublicationFormState = {
  id?: number;
  title: string;
  authors: string;
  type: Publication["type"];
  venue: string;
  year: string;
  tags: string;
  doi: string;
  abstract: string;
};

export type PublicationFilters = {
  query: string;
  typeFilter: PublicationTypeFilter;
  sortKey: PublicationSortKey;
};

type PublicationsCentralizeOptions = {
  initialPublications?: Publication[];
  perPage?: number;
};

const emptyForm: PublicationFormState = {
  title: "",
  authors: "",
  type: "Journal",
  venue: "",
  year: "",
  tags: "",
  doi: "",
  abstract: "",
};

const defaultFilters: PublicationFilters = {
  query: "",
  typeFilter: "ALL",
  sortKey: "NEWEST",
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function formToPublication(form: PublicationFormState, id: number): Publication {
  const year = Number.parseInt(form.year, 10);
  const tags = form.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    id,
    title: form.title.trim(),
    authors: form.authors.trim(),
    type: form.type,
    venue: form.venue.trim(),
    year: Number.isNaN(year) ? new Date().getFullYear() : year,
    tags,
    doi: form.doi.trim() || "#",
    abstract: form.abstract.trim(),
  };
}

export function usePublicationsCentralize(options: PublicationsCentralizeOptions = {}) {
  const { initialPublications = publicationsMockData, perPage = 6 } = options;
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [filters, setFilters] = useState<PublicationFilters>(defaultFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<PublicationFormState>(emptyForm);
  const [page, setPage] = useState(1);

  const stats = useMemo(() => {
    const total = publications.length;
    const journal = publications.filter((pub) => pub.type === "Journal").length;
    const conference = publications.filter((pub) => pub.type === "Conference").length;
    const report = publications.filter((pub) => pub.type === "Report").length;
    return { total, journal, conference, report };
  }, [publications]);

  const filtered = useMemo(() => {
    const q = normalize(filters.query);
    let list = [...publications];

    if (filters.typeFilter !== "ALL") {
      list = list.filter((pub) => pub.type === filters.typeFilter);
    }

    if (q.length) {
      list = list.filter((pub) => {
        const hay = normalize(
          `${pub.title} ${pub.authors} ${pub.venue} ${pub.year} ${pub.tags.join(" ")}`
        );
        return hay.includes(q);
      });
    }

    list.sort((a, b) => {
      switch (filters.sortKey) {
        case "NEWEST":
          return b.year - a.year;
        case "OLDEST":
          return a.year - b.year;
        case "TITLE_AZ":
          return a.title.localeCompare(b.title);
        case "TITLE_ZA":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return list;
  }, [filters, publications]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [filters.query, filters.typeFilter, filters.sortKey]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function openCreate() {
    setForm(emptyForm);
    setIsOpen(true);
  }

  function openEdit(pub: Publication) {
    setForm({
      id: pub.id,
      title: pub.title,
      authors: pub.authors,
      type: pub.type,
      venue: pub.venue,
      year: String(pub.year),
      tags: pub.tags.join(", "),
      doi: pub.doi,
      abstract: pub.abstract,
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function upsert() {
    if (!form.title.trim()) return;

    setPublications((prev) => {
      if (form.id !== undefined) {
        return prev.map((pub) =>
          pub.id === form.id ? formToPublication(form, pub.id) : pub
        );
      }

      const nextId = prev.length ? Math.max(...prev.map((pub) => pub.id)) + 1 : 1;
      return [formToPublication(form, nextId), ...prev];
    });

    closeModal();
  }

  function remove(pub: Publication) {
    setPublications((prev) => prev.filter((entry) => entry.id !== pub.id));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return {
    publications,
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
