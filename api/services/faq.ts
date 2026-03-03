import { apiClient } from "../axiosClient";

export interface FaqItem {
  id: string;
  faqId: string;
  question: string;
  answer: string;
  order?: number;
  category?: string;
  icon?: "cpu" | "rocket" | "shield";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFaqDto {
  question: string;
  answer: string;
  order?: number;
  category?: string;
  icon?: "cpu" | "rocket" | "shield";
}

export interface UpdateFaqDto {
  question?: string;
  answer?: string;
  order?: number;
  icon?: "cpu" | "rocket" | "shield";
  category?: string;
}

export const faqApi = {
  // Public endpoint - Get all FAQ items
  findAll: () => 
    apiClient.get<FaqItem[]>('/faq'),

  // Admin only - Create FAQ item (auth commented out in development)
  create: (data: CreateFaqDto) =>
    apiClient.post<FaqItem>('/faq', data),

  // Admin only - Update FAQ item (auth commented out in development)
  update: (faqId: string, data: UpdateFaqDto) =>
    apiClient.patch<FaqItem>(`/faq/${faqId}`, data),

  // Admin only - Delete FAQ item (auth commented out in development)
  remove: (faqId: string) =>
    apiClient.delete<void>(`/faq/${faqId}`),
};
