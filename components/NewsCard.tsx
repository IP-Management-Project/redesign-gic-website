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
import { MoreVertical, Edit3, Globe, Trash2, Copy } from "lucide-react";

export type NewsEventArticleStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

export type NewsItem = {
  id: string;
  slug?: string;
  category: string | { label: string; key: string }; 
  title: string;
  excerpt: string;
  publishDate?: string;
  date?: string;
  domain?: string;
  readingTime?: string;
  heroImage?: string;
  thumbnailImage?: string;
  image?: string;
  status?: NewsEventArticleStatus;
  updatedAt?: number;
};

type NewsCardProps = {
  item: NewsItem;
  href?: string;
  showAdminMenu?: boolean;
  onEdit?: (item: NewsItem) => void;
  onTogglePublish?: (item: NewsItem) => void;
  onDelete?: (item: NewsItem) => void;
  onDuplicate?: (item: NewsItem) => void;
  hideExcerpt?: boolean;
};

export function NewsCard({
  item,
  href,
  showAdminMenu,
  onEdit,
  onTogglePublish,
  onDelete,
  onDuplicate,
  hideExcerpt,
}: NewsCardProps) {
  
  const categoryLabel = typeof item.category === "object" && item.category !== null 
    ? item.category.label 
    : item.category || "Uncategorized";

  const isPublished = item.status === "PUBLISHED";
  const isDraft = item.status === "DRAFT"; // or "UNPUBLISHED" based on your API
  const isArchived = item.status === "ARCHIVED";

  const CardInner = (
    <Card className="h-full border border-divider bg-content1 shadow-sm hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300 group rounded-2xl overflow-hidden">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={item.heroImage || item.image || "/images/placeholder-image.png"}
          alt={item.title || "News Article"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges Container */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
          <Chip
            size="sm"
            variant="flat"
            className="bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md text-foreground font-bold border-none shadow-sm"
          >
            {categoryLabel}
          </Chip>

          {/* --- NEW: Published Chip --- */}
          {isPublished && (
            <Chip
              size="sm"
              variant="flat"
              className="bg-success-100/90 text-success-700 dark:bg-success-900/20 dark:text-success-400 backdrop-blur-md border-none font-medium"
            >
              Live
            </Chip>
          )}

          {isDraft && (
            <Chip
              size="sm"
              variant="flat"
              className="bg-warning-100/90 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400 backdrop-blur-md border-none font-medium"
            >
              Draft
            </Chip>
          )}

          {isArchived && (
            <Chip
              size="sm"
              variant="flat"
              className="bg-default-100/90 text-default-600 dark:bg-default-900/20 dark:text-default-400 backdrop-blur-md border-none font-medium"
            >
              Archived
            </Chip>
          )}
        </div>

        {/* --- ADMIN MENU --- */}
        {showAdminMenu && (
          <div
            className="absolute top-3 right-3 z-30"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md min-w-8 w-8 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <MoreVertical size={16} />
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="Admin Actions"
                variant="flat"
                onAction={(key) => {
                  if (key === "edit") onEdit?.(item);
                  if (key === "toggle") onTogglePublish?.(item);
                  if (key === "delete") onDelete?.(item);
                  if (key === "duplicate") onDuplicate?.(item);
                }}
              >
                <DropdownItem key="edit" startContent={<Edit3 size={14} />}>
                  Edit Details
                </DropdownItem>
                
                <DropdownItem key="toggle" startContent={<Globe size={14} />}>
                  {isPublished ? "Unpublish (Set to Draft)" : "Publish Live"}
                </DropdownItem>

                <DropdownItem key="duplicate" startContent={<Copy size={14} />}>
                  Duplicate
                </DropdownItem>
                
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Trash2 size={14} />}
                >
                  Delete Card
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </div>

      {/* Content */}
      <CardBody className="p-7 flex flex-col">
        <div className="text-[11px] font-bold text-default-400 uppercase tracking-widest mb-3">
          {item.publishDate ?? item.date ?? "No Date"}
        </div>

        <h3 className="text-xl font-black text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
          {item.title || "Untitled Article"}
        </h3>

        {!hideExcerpt ? (
          <p className="text-default-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
            {item.excerpt || "No excerpt available"}
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