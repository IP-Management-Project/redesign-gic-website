"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Globe, GraduationCap, Rocket } from "lucide-react";

import { Timeline } from "@/components/ui/timeline";
import {
  type HistoryEntryCopy,
  type HistoryIconKey,
  useHistoryPageCopy,
} from "@/hooks/useHistoryPageCopy";

export type HistorySectionKey = "hero" | `entry-${number}`;

type HistoryPageContentProps = {
  editable?: boolean;
  onEditSection?: (section: HistorySectionKey) => void;
};

type EditAction = {
  label: string;
  onEdit: () => void;
};

const defaultHero = {
  title: "",
  subtitle: "",
};

const iconMap: Record<HistoryIconKey, React.ReactNode> = {
  rocket: <Rocket size={18} className="text-primary" />,
  globe: <Globe size={18} className="text-primary" />,
  graduation: <GraduationCap size={18} className="text-primary" />,
};

const tagColors: Array<"primary" | "secondary" | "success"> = [
  "primary",
  "secondary",
  "success",
];

function TimelineEntryCard({ entry, editAction }: { entry: HistoryEntryCopy; editAction?: EditAction }) {
  const tags = entry.tags?.filter(Boolean) ?? [];
  const images = entry.images?.filter((image) => image.src) ?? [];

  return (
    <div>
      {editAction ? (
        <div className="mb-4 flex justify-end">
          <Button size="sm" variant="flat" onPress={editAction.onEdit}>
            {editAction.label}
          </Button>
        </div>
      ) : null}

      <div className="flex items-center gap-2 mb-4">
        {iconMap[entry.icon]}
        <h3 className="text-xl font-black text-foreground">{entry.heading}</h3>
      </div>

      <p className="mb-8 text-xs font-normal leading-relaxed text-neutral-800 dark:text-neutral-200 md:text-sm">
        {entry.description}
      </p>

      {tags.length ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Chip
              key={`${tag}-${index}`}
              size="sm"
              variant="flat"
              color={tagColors[index % tagColors.length]}
            >
              {tag}
            </Chip>
          ))}
        </div>
      ) : null}

      {images.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.slice(0, 2).map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt || entry.heading}
              className="h-20 w-full rounded-xl object-cover shadow-sm md:h-44 lg:h-60"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function HistoryPageContent({ editable = false, onEditSection }: HistoryPageContentProps) {
  const { data } = useHistoryPageCopy();
  const hero = data?.hero ?? defaultHero;
  const entries = data?.entries ?? [];

  const getEditAction = (section: HistorySectionKey, label: string): EditAction | undefined =>
    editable && onEditSection
      ? {
          label,
          onEdit: () => onEditSection(section),
        }
      : undefined;

  const timelineData = entries.map((entry, index) => ({
    title: entry.period,
    content: (
      <TimelineEntryCard
        entry={entry}
        editAction={getEditAction(`entry-${index}`, `Edit entry ${index + 1}`)}
      />
    ),
  }));

  return (
    <div className="relative w-full overflow-clip bg-background">
      <section className="relative">
        {editable ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-6 top-6 z-20">
              <Button size="sm" variant="flat" onPress={() => onEditSection?.("hero")}>
                Edit hero
              </Button>
            </div>
          </div>
        ) : null}

        <div className="max-w-7xl mx-auto py-20 px-6">
          <h2 className="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-7xl">
            {hero.title}
          </h2>
          <p className="max-w-2xl text-lg font-medium text-default-500">{hero.subtitle}</p>
        </div>
      </section>

      <Timeline data={timelineData} />
    </div>
  );
}
