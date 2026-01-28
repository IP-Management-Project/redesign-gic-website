import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CurriculumData } from "@/hooks/useCurriculumData";

export type CourseTypeGroup = {
  title: string;
  icon: "brain" | "cpu" | "search";
  courses: string[];
};

export type MasterHighlight = {
  text: string;
};

export type MasterEligibilityCard = {
  title: string;
  items: string[];
};

export type MasterCoordinatorContacts = {
  email: string;
  phone: string;
};

export type MasterDegreeData = {
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  overview: {
    title: string;
    description: string;
    highlights: MasterHighlight[];
  };
  career: {
    title: string;
    description: string;
    tags: string[];
  };
  framework: {
    title: string;
    description: string;
  };
  eligibility: {
    title: string;
    cards: MasterEligibilityCard[];
    applyTitle: string;
    deadlineLabel: string;
    deadlineValue: string;
    submissionLabel: string;
    submissionValue: string;
    downloadLabel: string;
  };
  coordinator: {
    title: string;
    contacts: MasterCoordinatorContacts;
  };
  curriculumSection: {
    title: string;
    description: string;
  };
  curriculum: CurriculumData;
  courseTypes: CourseTypeGroup[];
};

export type MasterDegreeUpdatePayload = {
  section: string;
  data: Record<string, string>;
};

export const masterDegreeSeed: MasterDegreeData = {
  hero: {
    badge: "Graduate School of ITC",
    titleMain: "Master of",
    titleHighlight: "Engineering",
    subtitle:
      "A prestigious two-academic-year program designed to provide advanced skills in Artificial Intelligence (AI) and Information Security.",
  },
  overview: {
    title: "Advanced Research Trends",
    description:
      "This program aims to provide the essential skills to develop human resources in the current trends of computer science. We emphasize the need for AI applications, Blockchain technology, and Smart Information Systems.",
    highlights: [
      { text: "Focus on Information Security & Application Design." },
      { text: "Deployment of advanced AI and data-related technology." },
    ],
  },
  career: {
    title: "Career Opportunities",
    description:
      "Graduates become high-level researchers or developers in advanced fields, with opportunities for Ph.D. level research.",
    tags: ["Researcher", "AI Developer", "System Architect", "Security Consultant"],
  },
  framework: {
    title: "Course Framework",
    description: "Delivered over 4 semesters covering a minimum of 54 credits.",
  },
  eligibility: {
    title: "Admission & Eligibility",
    cards: [
      {
        title: "For ITC Students",
        items: [
          "Engineering graduates: Start from Year 2 (1-year study).",
          "GIC Year 4 students: Start from Year 1 (2-year study).",
        ],
      },
      {
        title: "External Applicants",
        items: [
          "Bachelor's degree or equivalent in CS, IT, or related fields (2-year study duration).",
        ],
      },
    ],
    applyTitle: "How to Apply",
    deadlineLabel: "Application Deadline",
    deadlineValue: "30th September 5pm",
    submissionLabel: "Submission",
    submissionValue: "Graduate School, Room B-110",
    downloadLabel: "DOWNLOAD APPLICATION",
  },
  coordinator: {
    title: "Program Coordinator",
    contacts: {
      email: "rathpisey@itc.edu.kh",
      phone: "(+855) 96 631 12 21",
    },
  },
  curriculumSection: {
    title: "Master's Program Curriculum",
    description:
      "A specialized 54-credit path focusing on AI, Deep Learning, and Advanced Research Methodology. All courses are delivered in English.",
  },
  curriculum: {
    "Semester I": [
      {
        subject: "Advanced Algorithms and Data Structures", code: "MSC101", hC: 32, hTD: 0, hTP: 0, credit: 2.0,
        order: 0
      },
      {
        subject: "Object-Oriented Programming", code: "MSC102", hC: 16, hTD: 16, hTP: 16, credit: 2.0,
        order: 1
      },
      {
        subject: "Calculus for Machine Learning", code: "MSC103", hC: 16, hTD: 0, hTP: 0, credit: 1.0,
        order: 2
      },
      {
        subject: "Probability and Mathematical Statistics", code: "MSC104", hC: 32, hTD: 16, hTP: 0, credit: 3.0,
        order: 3
      },
      {
        subject: "Discrete Mathematics", code: "MSC105", hC: 16, hTD: 0, hTP: 0, credit: 1.0,
        order: 4
      },
      {
        subject: "Artificial Intelligence", code: "MSC106", hC: 32, hTD: 0, hTP: 0, credit: 2.0,
        order: 5
      },
      {
        subject: "Scientific Communication", code: "MSC107", hC: 32, hTD: 0, hTP: 0, credit: 2.0,
        order: 6
      },
    ],
    "Semester II": [
      {
        subject: "Neural Network and Deep Learning", code: "MSC201", hC: 32, hTD: 0, hTP: 32, credit: 4.0,
        order: 0
      },
      {
        subject: "Machine Learning", code: "MSC202", hC: 32, hTD: 0, hTP: 16, credit: 3.0,
        order: 0
      },
      {
        subject: "Computer Vision", code: "MSC203", hC: 32, hTD: 0, hTP: 16, credit: 3.0,
        order: 0
      },
      {
        subject: "Natural Language Processing", code: "MSC204", hC: 32, hTD: 0, hTP: 16, credit: 3.0,
        order: 0
      },
      {
        subject: "Data Mining", code: "MSC205", hC: 32, hTD: 0, hTP: 16, credit: 3.0,
        order: 0
      },
      {
        subject: "Information Security", code: "MSC206", hC: 16, hTD: 0, hTP: 16, credit: 2.0,
        order: 0
      },
    ],
    "Semester III": [
      {
        subject: "Research Methodology", code: "MSC301", hC: 32, hTD: 0, hTP: 0, credit: 2.0,
        order: 0
      },
      {
        subject: "Project Management for Researching", code: "MSC302", hC: 32, hTD: 0, hTP: 0, credit: 2.0,
        order: 0
      },
      {
        subject: "IT Project Management", code: "MSC303", hC: 16, hTD: 16, hTP: 0, credit: 1.5,
        order: 0
      },
      {
        subject: "Entrepreneurship", code: "MSC304", hC: 32, hTD: 0, hTP: 0, credit: 2.0,
        order: 0
      },
      {
        subject: "Cloud Computing", code: "MSC305", hC: 16, hTD: 0, hTP: 16, credit: 1.5,
        order: 0
      },
    ],
    "Semester IV": [
      {
        subject: "Master Thesis / Final Research", code: "MSC401", hC: 0, hTD: 0, hTP: 0, credit: 20.0,
        order: 0
      },
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
};

const getMasterDegreeData = async (): Promise<MasterDegreeData> => masterDegreeSeed;

export function useMasterDegreeData() {
  return useQuery({
    queryKey: ["masterDegree"],
    queryFn: getMasterDegreeData,
    initialData: masterDegreeSeed,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

type UpdatableMasterCopy = Record<string, unknown>;

const setNestedValue = (source: UpdatableMasterCopy, path: string, value: string) => {
  const keys = path.split(".");
  const root = Array.isArray(source) ? [...source] : { ...source };
  let cursor: any = root;

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    const pathKey = Number.isNaN(Number(key)) ? key : Number(key);

    if (isLast) {
      cursor[pathKey] = value;
      return;
    }

    const nextKey = keys[index + 1];
    const nextIsIndex = !Number.isNaN(Number(nextKey));
    const existing = cursor[pathKey];
    const nextValue =
      existing !== undefined
        ? Array.isArray(existing)
          ? [...existing]
          : { ...existing }
        : nextIsIndex
          ? []
          : {};

    cursor[pathKey] = nextValue;
    cursor = nextValue;
  });

  return root as MasterDegreeData;
};

const applyMasterDegreeUpdate = (
  current: MasterDegreeData,
  updates: Record<string, string>,
): MasterDegreeData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateMasterDegreeCopy = async (payload: MasterDegreeUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return payload;
};

export function useUpdateMasterDegreeData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMasterDegreeCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<MasterDegreeData>(["masterDegree"], (current) => {
        if (!current) return current;
        return applyMasterDegreeUpdate(current, payload.data);
      });
    },
  });
}
