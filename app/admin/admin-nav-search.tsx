"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/react";
import { Search, Command } from "lucide-react";
import { NavSearchResult } from "@/hooks/useAdminNavSearchShortcut";

function isClickOutside(e: MouseEvent, el: HTMLElement | null) {
  if (!el) return false;
  return !el.contains(e.target as Node);
}

export function AdminNavSearch(props: {
  index: NavSearchResult[];
  search: (q: string) => NavSearchResult[];
  maxResults?: number;
}) {
  const { index, search, maxResults = 8 } = props;
  const router = useRouter();

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);

  const results = React.useMemo(() => {
    const list = q.trim() ? search(q) : index;
    return list.slice(0, maxResults);
  }, [q, search, index, maxResults]);

  // open on focus/click
  const openDropdown = React.useCallback(() => {
    setOpen(true);
  }, []);

  // close on outside click
  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (open && isClickOutside(e, rootRef.current)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // reset active when query changes / results change
  React.useEffect(() => {
    setActive(0);
  }, [q]);

  const go = React.useCallback(
    (r: NavSearchResult | undefined) => {
      if (!r) return;
      setOpen(false);
      router.replace(r.url);
      // keep it snappy
      setQ("");
      inputRef.current?.blur();
    },
    [router]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }

    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((v) => Math.min(v + 1, results.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((v) => Math.max(v - 1, 0));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
      return;
    }
  };

  return (
    <div ref={rootRef} className="relative w-full">
      {/* Floating shell */}
      <div
        className={[
          "transition-all",
          open ? "scale-[1.01]" : "scale-100",
        ].join(" ")}
      >
        <Input
          ref={inputRef as any}
          startContent={<Search size={16} className="text-default-400" />}
          endContent={
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-divider bg-default-100 px-1.5 font-mono text-[10px] font-medium text-default-500">
              <Command size={10} /> K
            </kbd>
          }
          placeholder="Quick search..."
          size="sm"
          variant="flat"
          className={[
            "w-full",
            open ? "shadow-lg ring-1 ring-default-200" : "",
          ].join(" ")}
          value={q}
          onValueChange={setQ}
          onFocus={openDropdown}
          onClick={openDropdown}
          onKeyDown={onKeyDown}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-divider bg-background shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 text-[11px] text-default-500">
            <span>
              {q.trim() ? "Results" : "Quick access"}
              {results.length ? ` • ${results.length}` : ""}
            </span>
            <span className="hidden sm:inline-flex items-center gap-2">
              <span className="rounded border border-divider bg-default-100 px-1.5 py-0.5 font-mono">
                ↑↓
              </span>
              <span className="rounded border border-divider bg-default-100 px-1.5 py-0.5 font-mono">
                Enter
              </span>
              <span className="rounded border border-divider bg-default-100 px-1.5 py-0.5 font-mono">
                Esc
              </span>
            </span>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-auto p-1">
            {results.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-default-500">
                No matches.
              </div>
            ) : (
              results.map((r, i) => (
                <button
                  key={`${r.url}-${r.title}`}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                  className={[
                    "w-full rounded-lg px-3 py-2 text-left transition-colors",
                    "hover:bg-default-100",
                    i === active ? "bg-default-100" : "bg-transparent",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-foreground">
                        {r.title}
                      </div>
                      <div className="truncate text-[11px] text-default-500">
                        {r.breadcrumb}
                      </div>
                    </div>
                    <div className="shrink-0 rounded-md border border-divider bg-default-50 px-2 py-0.5 text-[10px] text-default-600">
                      {r.sectionTitle}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
