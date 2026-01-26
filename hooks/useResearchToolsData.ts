import { useQuery } from "@tanstack/react-query";

export type StudentTool = {
  title: string;
  author: string;
  lecturer: string;
  desc: string;
  tags: string[];
  icon: "globe" | "home" | "bot" | "zap" | "file" | "scan";
  status: string;
};

const researchToolsData: StudentTool[] = [
  {
    title: "MultiSocialLive",
    author: "GIC Developers (Codera)",
    lecturer: "Department Faculty",
    desc: "A unified social media CMS allowing creators to manage Facebook, TikTok, and Instagram from a single dashboard with automated approval workflows.",
    tags: ["Next.js", "NestJS", "API Integration"],
    icon: "globe",
    status: "R&D Product",
  },
  {
    title: "Rent House Management System",
    author: "Final Year Thesis Project",
    lecturer: "Thesis Committee",
    desc: "A comprehensive platform for landlords to manage tenants, lease agreements, and automated billing cycles for local rental markets.",
    tags: ["React", "PostgreSQL", "System Design"],
    icon: "home",
    status: "Thesis Project",
  },
  {
    title: "Codera AI Assistant",
    author: "Codera Team",
    lecturer: "Mr. VALY Dona",
    desc: "An intelligent digital employee that handles CRM ticket routing and basic resolution using Natural Language Understanding.",
    tags: ["AI", "NLU", "Python"],
    icon: "bot",
    status: "Beta",
  },
  {
    title: "Kaoh Kantheay Sustainable Grid",
    author: "Sustainable Energy Group",
    lecturer: "Energy Engineering Dept",
    desc: "A simulation tool for designing a sustainable electricity supply system using hybrid renewable sources for Kaoh Kantheay Island.",
    tags: ["Modeling", "Energy Efficiency", "Load Estimation"],
    icon: "zap",
    status: "Lab Project",
  },
  {
    title: "Khmer OCR Tool",
    author: "Khmer NLP Lab Students",
    lecturer: "Mr. VALY Dona",
    desc: "An advanced Optical Character Recognition engine specifically tuned for the complex ligatures and scripts of the Khmer language.",
    tags: ["Deep Learning", "Computer Vision", "NLP"],
    icon: "file",
    status: "Active Research",
  },
  {
    title: "Biometric Attendance System",
    author: "GIC Systems Group",
    lecturer: "Infrastructure Team",
    desc: "A facial recognition platform for automated student attendance tracking, integrated with on-campus physical server nodes.",
    tags: ["Biometrics", "C++", "Security"],
    icon: "scan",
    status: "Deployment",
  },
];

const getResearchToolsData = async (): Promise<StudentTool[]> => researchToolsData;

export function useResearchToolsData() {
  return useQuery({
    queryKey: ["researchTools"],
    queryFn: getResearchToolsData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
