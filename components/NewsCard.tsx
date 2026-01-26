"use client";

import React from "react";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

export type NewsStatus = "PUBLISHED" | "UNPUBLISHED";

export type NewsItem = {
  id: string;
  category: string;
  title: string;
  date: string; // e.g. "JAN 18, 2026"
  excerpt: string;
  image: string;
  status: NewsStatus;
  updatedAt: number; // for sorting
};

type NewsCardProps = {
  item: NewsItem;

  /** When provided, card is clickable and will route. */
  href?: string;

  /** Show the top-right menu. */
  showAdminMenu?: boolean;

  /** Admin actions (optional). */
  onEdit?: (item: NewsItem) => void;
  onTogglePublish?: (item: NewsItem) => void;
  onDelete?: (item: NewsItem) => void;

  /** Optional: hide excerpt (if you want tighter card). */
  hideExcerpt?: boolean;
};

export function NewsCard({
  item,
  href,
  showAdminMenu,
  onEdit,
  onTogglePublish,
  onDelete,
  hideExcerpt,
}: NewsCardProps) {
  const CardInner = (
    <Card className="h-full border border-divider bg-content1 shadow-sm hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300 group rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Chip
            size="sm"
            variant="flat"
            className="bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md text-foreground font-bold border-none shadow-sm"
          >
            {item.category}
          </Chip>

          {item.status === "UNPUBLISHED" ? (
            <Chip
              size="sm"
              variant="flat"
              className="bg-warning-100/90 text-warning-900 dark:bg-warning-900/20 dark:text-warning-200 backdrop-blur-md border-none"
            >
              Unpublished
            </Chip>
          ) : null}
        </div>

        {showAdminMenu ? (
          <div
            className="absolute top-3 right-3 z-10"
            onClick={(e) => e.preventDefault()}
          >
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md"
                  onPress={(e) => {
                    // prevent card click
                    // @ts-expect-error HeroUI passes press event, still safe
                    e?.stopPropagation?.();
                  }}
                >
                  •••
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="News actions"
                onAction={(key) => {
                  if (key === "edit") onEdit?.(item);
                  if (key === "toggle") onTogglePublish?.(item);
                  if (key === "delete") onDelete?.(item);
                }}
              >
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="toggle">
                  {item.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <CardBody className="p-7 flex flex-col">
        <div className="text-[11px] font-bold text-default-400 uppercase tracking-widest mb-3">
          {item.date}
        </div>

        <h3 className="text-xl font-black text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {!hideExcerpt ? (
          <p className="text-default-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
            {item.excerpt}
          </p>
        ) : (
          <div className="flex-grow" />
        )}
      </CardBody>
    </Card>
  );

  if (!href) return CardInner;

  return (
    <Link href={href} className="block h-full">
      {CardInner}
    </Link>
  );
}
