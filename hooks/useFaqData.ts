import { useQuery } from "@tanstack/react-query";

export type FaqItem = {
  category: string;
  icon: "cpu" | "rocket" | "shield";
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    category: "Academic",
    icon: "cpu",
    question: "How long is the Engineering Degree program?",
    answer:
      "The Engineering Degree is a 3-year specialized program spanning from Year 3 to Year 5, focusing on ICT and Electrical Engineering tracks.",
  },
  {
    category: "Competition",
    icon: "rocket",
    question: "When does TIC 2025 registration begin?",
    answer: "Official registration for TIC 2025 opens on April 22 and concludes on May 16, 2025.",
  },
  {
    category: "Incubation",
    icon: "shield",
    question: "Who can access the GIC Incubation Hub?",
    answer:
      "Teams participating in the Techno Innovation Challenge and registered engineering students have 24/7 access to workstations and HPC nodes.",
  },
];

const getFaqData = async (): Promise<FaqItem[]> => faqData;

export function useFaqData() {
  return useQuery({
    queryKey: ["faq"],
    queryFn: getFaqData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
