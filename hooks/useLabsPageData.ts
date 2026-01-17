import { useQuery } from "@tanstack/react-query";

export type ResearchProject = {
  title: string;
  topic: string;
  funder: string;
  period: string;
};

export type LabItem = {
  name: string;
  desc: string;
  icon: "globe" | "search" | "cpu" | "shield";
  specialization: string;
};

export type ClubItem = {
  name: string;
  desc: string;
  icon: "code" | "terminal" | "lightbulb";
  color: string;
};

export type LabsPageData = {
  projects: ResearchProject[];
  labs: LabItem[];
  clubs: ClubItem[];
  researchInterests: string[];
  expectedApplications: string[];
};

const labsPageData: LabsPageData = {
  projects: [
    {
      title: "L2K Conversion",
      topic: "Automatic Latin-to-Khmer based Text Conversation",
      funder: "MoEYS Cambodia",
      period: "2019 - 2022",
    },
    {
      title: "Manuscript Digitization",
      topic: "Ancient Manuscript Digitization and Indexation",
      funder: "ARES-CCD",
      period: "2016 - 2019",
    },
    {
      title: "Visual Attention",
      topic: "Top-down Approach and Memory Information",
      funder: "ARES-CCD",
      period: "2017 - 2019",
    },
  ],
  labs: [
    {
      name: "Natural Language Processing (NLP)",
      desc: "Focusing on Khmer script analysis, OCR, and Machine Translation.",
      icon: "globe",
      specialization: "AI & Linguistics",
    },
    {
      name: "Data Science & Big Data",
      desc: "Advanced processing for large-scale datasets and predictive modeling.",
      icon: "search",
      specialization: "Statistics & Mining",
    },
    {
      name: "Mobile Ecosystems & Security",
      desc: "Research on iOS/Android security and data mining in mobile environments.",
      icon: "cpu",
      specialization: "Cybersecurity",
    },
    {
      name: "High-Performance Computing (HPC)",
      desc: "Managing our physical server center for heavy computational research.",
      icon: "shield",
      specialization: "Cloud Sovereignty",
    },
  ],
  clubs: [
    {
      name: "Codera Development Club",
      desc: "A community for full-stack and mobile app enthusiasts to build real-world projects.",
      icon: "code",
      color: "bg-blue-600",
    },
    {
      name: "Cybersecurity Club",
      desc: "Practicing Capture The Flag (CTF) and ethical hacking to secure future infrastructures.",
      icon: "terminal",
      color: "bg-zinc-900",
    },
    {
      name: "Innovation Hub",
      desc: "Focusing on entrepreneurship, startups, and Techno Innovation Challenges.",
      icon: "lightbulb",
      color: "bg-amber-500",
    },
  ],
  researchInterests: [
    "Text & Pattern Recognition",
    "Spoken Language Processing",
    "Speech Synthesis",
    "Artificial Intelligence",
  ],
  expectedApplications: [
    "Khmer OCR Tool",
    "Text to Speech",
    "Speech Recognition",
    "Romanization Tool",
  ],
};

const getLabsPageData = async (): Promise<LabsPageData> => labsPageData;

export function useLabsPageData() {
  return useQuery({
    queryKey: ["labsPage"],
    queryFn: getLabsPageData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
