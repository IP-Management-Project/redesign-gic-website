import { useQuery } from "@tanstack/react-query";
import type { CurriculumData } from "@/hooks/useCurriculumData";

export type CourseTypeGroup = {
  title: string;
  icon: "brain" | "cpu" | "search";
  courses: string[];
};

export type MasterDegreeData = {
  curriculum: CurriculumData;
  courseTypes: CourseTypeGroup[];
  careerTags: string[];
};

const masterDegreeData: MasterDegreeData = {
  curriculum: {
    "Semester I": [
      { subject: "Advanced Algorithms and Data Structures", code: "MSC101", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Object-Oriented Programming", code: "MSC102", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "Calculus for Machine Learning", code: "MSC103", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "Probability and Mathematical Statistics", code: "MSC104", hC: 32, hTD: 16, hTP: 0, credit: 3.0 },
      { subject: "Discrete Mathematics", code: "MSC105", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "Artificial Intelligence", code: "MSC106", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Scientific Communication", code: "MSC107", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    ],
    "Semester II": [
      { subject: "Neural Network and Deep Learning", code: "MSC201", hC: 32, hTD: 0, hTP: 32, credit: 4.0 },
      { subject: "Machine Learning", code: "MSC202", hC: 32, hTD: 0, hTP: 16, credit: 3.0 },
      { subject: "Computer Vision", code: "MSC203", hC: 32, hTD: 0, hTP: 16, credit: 3.0 },
      { subject: "Natural Language Processing", code: "MSC204", hC: 32, hTD: 0, hTP: 16, credit: 3.0 },
      { subject: "Data Mining", code: "MSC205", hC: 32, hTD: 0, hTP: 16, credit: 3.0 },
      { subject: "Information Security", code: "MSC206", hC: 16, hTD: 0, hTP: 16, credit: 2.0 },
    ],
    "Semester III": [
      { subject: "Research Methodology", code: "MSC301", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Project Management for Researching", code: "MSC302", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "IT Project Management", code: "MSC303", hC: 16, hTD: 16, hTP: 0, credit: 1.5 },
      { subject: "Entrepreneurship", code: "MSC304", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Cloud Computing", code: "MSC305", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    ],
    "Semester IV": [
      { subject: "Master Thesis / Final Research", code: "MSC401", hC: 0, hTD: 0, hTP: 0, credit: 20.0 },
    ],
  },
  courseTypes: [
    {
      title: "Core Courses",
      icon: "brain",
      courses: [
        "Advanced Algorithms",
        "Object-Oriented Programming",
        "Calculus for Machine Learning",
        "Discrete Mathematics",
        "Artificial Intelligence",
      ],
    },
    {
      title: "Specialized Courses",
      icon: "cpu",
      courses: [
        "Neural Network and Deep Learning",
        "Machine Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Data Mining",
        "Information Security",
      ],
    },
    {
      title: "Research & Electives",
      icon: "search",
      courses: [
        "Scientific Communication",
        "Research Methodology",
        "IT Project Management",
        "Entrepreneurship",
        "Cloud Computing",
      ],
    },
  ],
  careerTags: ["Researcher", "AI Developer", "System Architect", "Security Consultant"],
};

const getMasterDegreeData = async (): Promise<MasterDegreeData> => masterDegreeData;

export function useMasterDegreeData() {
  return useQuery({
    queryKey: ["masterDegree"],
    queryFn: getMasterDegreeData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
