"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type FaqItem = {
  id: string; // Added for management
  category: string;
  icon: "cpu" | "rocket" | "shield";
  question: string;
  answer: string;
};

const initialFaqData: FaqItem[] = [
  {
    id: "faq-1",
    category: "Academic",
    icon: "cpu",
    question: "How long is the Engineering Degree program?",
    answer: "The Engineering Degree is a 3-year specialized program spanning from Year 3 to Year 5, focusing on ICT and Electrical Engineering tracks.",
  },
  {
    id: "faq-2",
    category: "Competition",
    icon: "rocket",
    question: "When does TIC 2025 registration begin?",
    answer: "Official registration for TIC 2025 opens on April 22 and concludes on May 16, 2025.",
  },
  {
    id: "faq-3",
    category: "Incubation",
    icon: "shield",
    question: "Who can access the GIC Incubation Hub?",
    answer: "Teams participating in the Techno Innovation Challenge and registered engineering students have 24/7 access to workstations and HPC nodes.",
  },
];

export function useFaqData() {
  return useQuery({
    queryKey: ["faq"],
    queryFn: async () => initialFaqData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useFaqActions() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newData: FaqItem[]) => newData,
    onSuccess: (data) => {
      queryClient.setQueryData(["faq"], data);
    },
  });

  const upsertFaq = (item: FaqItem) => {
    const current = queryClient.getQueryData<FaqItem[]>(["faq"]) || [];
    const exists = current.find((f) => f.id === item.id);
    const updated = exists
      ? current.map((f) => (f.id === item.id ? item : f))
      : [...current, item];

    mutation.mutate(updated);
  };

  const removeFaq = (id: string) => {
    const current = queryClient.getQueryData<FaqItem[]>(["faq"]) || [];
    mutation.mutate(current.filter((f) => f.id !== id));
  };

  return { upsertFaq, removeFaq, isPending: mutation.isPending };
}