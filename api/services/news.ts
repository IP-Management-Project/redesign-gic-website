import { apiClient } from "../axiosClient";
import { SortDir } from "../service.type";
export interface User {
  id: number;
  name: string;
  email: string;
}

export const userApi = {
  getUsers: () => apiClient.get<User[]>("/users"),

  getUserById: (id: number) =>
    apiClient.get<User>(`/users/${id}`),

  createUser: (data: Partial<User>) =>
    apiClient.post<User>("/users", data),

  updateUser: (id: number, data: Partial<User>) =>
    apiClient.put<User>(`/users/${id}`, data),

  deleteUser: (id: number) =>
    apiClient.delete<void>(`/users/${id}`),
};

export type NewsEventArticleStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

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

export type NewsTemplate = {
  id: string;
  name: string;
  thumbnail?: string;
  html: string;
  css: string;
  description?: string;
};

export type NewsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type NewStats = {
  total: number;
  published: number;
  draft: number;
}

export type NewsResponse = {
  data: NewsTemplate[];
  stats: NewStats;
  meta: NewsMeta;
};

export type NewsQueryParams = {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
  category?: string;
  sortBy?: string;
  sortDir?: SortDir;
};

export const newsApi = {

  createNew: (data: any) =>
    apiClient.post('/news', data),
  duplicate: (id: string) =>
    apiClient.post(`/news/${id}/duplicate`),
  getNewsList: (params: NewsQueryParams) => 
    apiClient.get<NewsResponse>('/news', { params }),
  getNewsBySlug: (slug: string) =>
    apiClient.get<NewsEventArticleItem | { data: NewsEventArticleItem }>(`/news/${slug}`),
  updateNews: (id: string, data: FormData) => 
  apiClient.patch(`/news/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data', //Use this if need to upload with image
    },
  }),

  toggleStatus: (id: string) =>
    apiClient.patch(`/news/${id}/toggle-publish`),
  delete: (id: string) =>
    apiClient.delete(`/news/${id}`),

  getNewsTemplate: () =>
    apiClient.get<NewsTemplate>(`/news-templates/`),
  getNewTemplateById: (id: string) =>
    apiClient.get<NewsTemplate>(`/news-templates/${id}`),

  createNewTemplate: async (data: Partial<NewsTemplate>): Promise<NewsTemplate> => {
    return await apiClient.post<NewsTemplate>('/news-templates', data);
  },
  updateNewTemplate: (id: string, data: Partial<NewsTemplate>) =>
    apiClient.patch(`/news-templates/${id}`, data),
  deleteNewTemplate: (id: string) =>
    apiClient.delete(`/news-templates/${id}`),
};
