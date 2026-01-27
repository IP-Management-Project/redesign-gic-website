"use client";

import * as React from "react";

export type NavItem = {
  title: string;
  url?: string;
  items?: NavItem[];
};

type NavSection = { title: string; items: NavItem[] };

export type NavSearchResult = {
  title: string;
  url: string;
  sectionTitle: string;
  // Optional: include the trail like "Website Content Management / Programs / National Program"
  breadcrumb: string;
};

function flattenNav(sections: NavSection[]): NavSearchResult[] {
  const out: NavSearchResult[] = [];

  const walk = (
    sectionTitle: string,
    items: NavItem[],
    trail: string[] = []
  ) => {
    for (const item of items) {
      const nextTrail = [...trail, item.title];

      // Only searchable if it has a URL
      if (item.url) {
        out.push({
          title: item.title,
          url: item.url,
          sectionTitle,
          breadcrumb: `${sectionTitle} / ${nextTrail.join(" / ")}`,
        });
      }

      if (item.items?.length) {
        walk(sectionTitle, item.items, nextTrail);
      }
    }
  };

  for (const section of sections) {
    walk(section.title, section.items, []);
  }

  return out;
}

function isTypingTarget(target: EventTarget | null) {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tag = target.tagName?.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    target.isContentEditable
  );
}

export function useAdminNavSearchShortcut(params: {
  navMain: NavSection[];
  // Focus target (your header Input)
  focusSearch: () => void;
  // Optional: open a modal/palette, etc.
  onOpen?: () => void;
}) {
  const { navMain, focusSearch, onOpen } = params;

  const index = React.useMemo(() => flattenNav(navMain), [navMain]);

  const search = React.useCallback(
    (q: string) => {
      const query = q.trim().toLowerCase();
      if (!query) return index;

      // Basic fuzzy-ish: all tokens must appear in title or breadcrumb
      const tokens = query.split(/\s+/).filter(Boolean);

      return index
        .map((r) => {
          const hay = `${r.title} ${r.breadcrumb}`.toLowerCase();
          const ok = tokens.every((t) => hay.includes(t));
          if (!ok) return null;

          // Simple scoring: title hits weigh more
          let score = 0;
          for (const t of tokens) {
            if (r.title.toLowerCase().includes(t)) score += 3;
            if (r.breadcrumb.toLowerCase().includes(t)) score += 1;
          }
          return { r, score };
        })
        .filter(Boolean)
        .sort((a, b) => (b!.score - a!.score))
        .map((x) => x!.r);
    },
    [index]
  );

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Only handle Ctrl/⌘ + K
      const isK = e.key.toLowerCase() === "k";
      const wants = (e.metaKey || e.ctrlKey) && isK;
      if (!wants) return;

      // Don’t hijack when user is typing in a field
      if (isTypingTarget(e.target)) return;

      e.preventDefault();
      onOpen?.();
      focusSearch();
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
  }, [focusSearch, onOpen]);

  return { search, index };
}
