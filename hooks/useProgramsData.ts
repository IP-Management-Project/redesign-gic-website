import { useQuery } from "@tanstack/react-query";

export type ProgramCard = {
  title: string;
  slug: string;
  icon: "cpu" | "book" | "cap" | "globe";
  desc: string;
  tags: string[];
};

const programsData: ProgramCard[] = [
  {
    title: "Engineering Degree",
    slug: "engineering-degree",
    icon: "cpu",
    desc: "3-year specialized track (Year 3 - Year 5) focusing on ICT and Electrical systems.",
    tags: ["STEM", "Innovation", "HPC Access"],
  },
  {
    title: "Associate Degree",
    slug: "associate-degree",
    icon: "book",
    desc: "A 2-year foundation in technical engineering and leadership development.",
    tags: ["Technical Skills", "Career Ready"],
  },
  {
    title: "Master's Program",
    slug: "master-degree",
    icon: "cap",
    desc: "Advanced research and R&D in AI, Khmer NLP, and Cybersecurity.",
    tags: ["Research", "Deep Tech"],
  },
  {
    title: "International Program",
    slug: "international-program",
    icon: "globe",
    desc: "Cross-border academic collaboration through the ASEAN Cyber University.",
    tags: ["ASEAN", "Global Reach"],
  },
];

const getProgramsData = async (): Promise<ProgramCard[]> => programsData;

export function useProgramsData() {
  return useQuery({
    queryKey: ["programCards"],
    queryFn: getProgramsData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
