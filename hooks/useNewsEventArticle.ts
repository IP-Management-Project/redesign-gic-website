import { useQuery } from "@tanstack/react-query";

export type NewsEventSpotlight = {
  title: string;
  subtitle: string;
  specs: string[];
};

export type NewsEventRelatedBrief = {
  date: string;
  title: string;
};

export type NewsEventArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  domain: string;
  readingTime: string;
  heroImage: string;
  status?: "PUBLISHED" | "UNPUBLISHED";
  updatedAt?: number;
  htmlBodyPrimary: string;
  htmlBodySecondary: string;
  spotlight?: NewsEventSpotlight;
  relatedBriefs: NewsEventRelatedBrief[];
};

export const newsEventArticleMockData: Record<string, NewsEventArticle> = {
  "gic-hpc-2026": {
    id: "gic-hpc-2026",
    category: "Press Release / 2026",
    title: "Architecting the Digital Backbone",
    excerpt:
      "In a major step toward activating student potential on a global scale, the GIC department has successfully deployed its newest High-Performance Computing (HPC) nodes.",
    date: "JAN 18, 2026",
    domain: "INFRASTRUCTURE",
    readingTime: "8 MINS",
    heroImage: "/landing/server.png",
    status: "PUBLISHED",
    updatedAt: 1734566400000,
    htmlBodyPrimary: `
    <p class="text-2xl font-bold text-[#26304d] dark:text-white mb-6 leading-relaxed">
      In a major step toward activating student potential on a global scale, the GIC department has successfully deployed its newest High-Performance Computing (HPC) nodes.
    </p>
    <p>
      As we bridge the gap between academic theory and bare-metal engineering, these clusters allow our students—both local and from our French exchange partners—to <strong>reveal their potential</strong> to international industrial bodies and stakeholders. 
    </p>
    <p>This initiative follows the GIC 2025 Roadmap, focusing on specialized R&D in Artificial Intelligence and Pattern Recognition.</p>
  `,
    spotlight: {
      title: "Core Innovation",
      subtitle: "Empowering the next generation of Systems Engineers.",
      specs: ["256GB RAM Nodes", "NVIDIA CUDA Support", "GIC Private Cloud Integration"],
    },
    htmlBodySecondary: `
    <h3>Strategic Impact on TIC Cambodia</h3>
    <p>
      By promoting innovative STEM-based solutions for solving real-world problems, this upgrade ensures that participants in the <strong>Techno Innovation Challenge Cambodia (TIC)</strong> have the necessary tools to move their leadership and creativity to the next level.
    </p>
    <ul>
      <li>24/7 Remote access for Year 4 and Year 5 Engineering students.</li>
      <li>Integrated environment for Khmer Natural Language Processing research.</li>
      <li>Collaborative "War Rooms" synced with the server cluster via the GIC Hub.</li>
    </ul>
    <p>We invite all stakeholders to explore the results of this deployment during our upcoming Final Pitch Day in June 2025.</p>
  `,
    relatedBriefs: [
      { date: "MARCH 2025", title: "TIC Season 8: Full Impact Report" },
      { date: "OCT 2025", title: "Master's Program: New AI Research Tracks" },
    ],
  },
};

const getNewsEventArticle = async (eventSlug: string): Promise<NewsEventArticle | null> =>
  newsEventArticleMockData[eventSlug] ?? null;

export function useNewsEventArticle(eventSlug?: string) {
  return useQuery({
    queryKey: ["newsEventArticle", eventSlug],
    queryFn: () => getNewsEventArticle(eventSlug ?? ""),
    enabled: Boolean(eventSlug),
    initialData: eventSlug ? newsEventArticleMockData[eventSlug] : undefined,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
