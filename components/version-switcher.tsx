"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type VersionSwitcherProps = {
  versions: string[];
  defaultVersion: string;
  className?: string;
};

export function VersionSwitcher({
  versions,
  defaultVersion,
  className,
}: VersionSwitcherProps) {
  const [version, setVersion] = React.useState(defaultVersion);

  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">Select version</span>
      <select
        value={version}
        onChange={(event) => setVersion(event.target.value)}
        className="w-full appearance-none rounded-xl border border-border bg-background px-3 py-2 pr-8 text-sm font-medium text-foreground"
      >
        {versions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </label>
  );
}
