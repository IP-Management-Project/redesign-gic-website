import { NewsEventArticle } from "@/hooks/useNewsEventArticle";
import { apiClient } from "../axiosClient";

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
export interface NewsEventArticleItem {
  id: string;
  link: string;
  article: {
    id: string;
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    publishDate: string;
    domain: string;
    readingTime: string;
    heroImage: string;
    status: string;
  };
}

export const newsApi = {

  getNews: () => apiClient.get<{ data: NewsEventArticleResponse[] }>('/news'),

  getNewsBySlug: (slug: string) => apiClient.get<{ data: NewsEventArticleResponse[] }>(`/news/${slug}`),
};
