"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchFormProps = {
  className?: string;
};

export function SearchForm({ className }: SearchFormProps) {
  return (
    <form className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search content"
        className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
      />
    </form>
  );
}
