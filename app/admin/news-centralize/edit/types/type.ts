// src/components/admin/news-editor/types.ts
export type NewsEventArticleStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED" | "UNPUBLISHED";

export type NewsHeaderForm = {
  title: string;
  category: string;
  excerpt: string;
  publishDate: string;
  domain: string;
  readingTime: string;
  heroImage: string;
  thumbnailImage: string;
  status: NewsEventArticleStatus;
};

export const emptyHeader: NewsHeaderForm = {
  title: "",
  category: "",
  excerpt: "",
  publishDate: "",
  domain: "",
  readingTime: "",
  heroImage: "",
  thumbnailImage: "",
  status: "UNPUBLISHED",
};