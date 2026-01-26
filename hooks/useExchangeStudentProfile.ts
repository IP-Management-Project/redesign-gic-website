import { useQuery } from "@tanstack/react-query";

export type ExchangeStudentProfile = {
  id: number;
  name: string;
  school: string;
  country: string;
  year: string;
  duration: string;
  focus: string;
  portrait: string;
  mainStory: string;
  learnings: string[];
  gallery: string[];
};

const exchangeStudentProfiles: Record<string, ExchangeStudentProfile> = {
  "1": {
    id: 1,
    name: "Sok Pongra",
    school: "INSA Rennes",
    country: "France",
    year: "Year 4 (Engineering)",
    duration: "September 2024 - June 2025",
    focus: "Cybersecurity & R&D",
    portrait: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    mainStory:
      "My time at INSA Rennes has been a cornerstone of my academic career. Moving my leadership and creativity to the next level meant adapting to a high-pressure R&D environment in France. I mastered advanced cybersecurity frameworks that I now apply to protecting GIC's server infrastructure.",
    learnings: [
      "Advanced Network Cryptography",
      "French Language & Culture",
      "Agile Leadership in Tech",
      "STEM-based Problem Solving",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    ],
  },
};

const getExchangeStudentProfile = async (studentSlug: string): Promise<ExchangeStudentProfile | null> =>
  exchangeStudentProfiles[studentSlug] ?? null;

export function useExchangeStudentProfile(studentSlug?: string) {
  return useQuery({
    queryKey: ["exchangeStudentProfile", studentSlug],
    queryFn: () => getExchangeStudentProfile(studentSlug ?? ""),
    enabled: Boolean(studentSlug),
    initialData: studentSlug ? exchangeStudentProfiles[studentSlug] : undefined,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
