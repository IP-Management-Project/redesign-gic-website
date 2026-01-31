import { apiClient } from "../axiosClient";

export type NewsEventArticleStatus = "PUBLISHED" | "UNPUBLISHED";

export type NewsEventSpotlight = {
  title: string;
  subtitle: string;
  specs: string[];
};

export type NewsEventRelatedBrief = {
  date: string;
  title: string;
};

export type NewsEventArticleContent = {
  grapesPageId: string;
  slug: string;
  title: string;
  html: string;
  css: string;
  spotlight?: NewsEventSpotlight;
  relatedBriefs?: NewsEventRelatedBrief[];
  updatedAt?: string | null;
};

export interface NewsEventArticleItem {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishDate: string;
  domain: string;
  readingTime: string;
  heroImage: string;
  thumbnailImage?: string;
  status: NewsEventArticleStatus;
  publishedAt?: string;
  updatedContentAt?: string | null;
  content?: NewsEventArticleContent | null;
}

export interface NewsEventArticleResponse {
  data: NewsEventArticleItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const newsApi = {

  getNews: () => apiClient.get<NewsEventArticleResponse>('/news'),

  getNewsBySlug: (slug: string) => apiClient.get<NewsEventArticleItem | { data: NewsEventArticleItem }>(`/news/${slug}`),
};
