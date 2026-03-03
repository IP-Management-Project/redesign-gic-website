"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { faqApi } from "@/api/services/faq";

export type FaqItem = {
  id: string;
  faqId: string; // Added for management
  category?: string;
  icon?: "cpu" | "rocket" | "shield";
  question: string;
  answer: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
};

// Mock data commented out - now using API
// const initialFaqData: FaqItem[] = [
//   {
//     id: "faq-1",
//     category: "Academic",
//     icon: "cpu",
//     question: "How long is the Engineering Degree program?",
//     answer: "The Engineering Degree is a 3-year specialized program spanning from Year 3 to Year 5, focusing on ICT and Electrical Engineering tracks.",
//   },
//   {
//     id: "faq-2",
//     category: "Competition",
//     icon: "rocket",
//     question: "When does TIC 2025 registration begin?",
//     answer: "Official registration for TIC 2025 opens on April 22 and concludes on May 16, 2025.",
//   },
//   {
//     id: "faq-3",
//     category: "Incubation",
//     icon: "shield",
//     question: "Who can access the GIC Incubation Hub?",
//     answer: "Teams participating in the Techno Innovation Challenge and registered engineering students have 24/7 access to workstations and HPC nodes.",
//   },
// ];

export function useFaqData() {
  return useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const data = await faqApi.findAll();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFaqActions() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: Omit<FaqItem, "id" | "createdAt" | "updatedAt">) => 
      faqApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ faqId, data }: { faqId: string; data: Partial<FaqItem> }) =>
      faqApi.update(faqId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (faqId: string) => faqApi.remove(faqId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });

  const upsertFaq = (item: FaqItem) => {
    if (item.faqId) {
      // Existing item - update
      updateMutation.mutate({ faqId: item.faqId, data: item });
    } else {
      // New item - create
      createMutation.mutate(item);
    }
  };

  const removeFaq = (faqId: string) => {
    deleteMutation.mutate(faqId);
  };

  return { 
    upsertFaq, 
    removeFaq, 
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending 
  };
}