import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type EngineeringRoadmapStep = {
  year: string;
  title: string;
  desc: string;
  tags: string[];
};

export type EngineeringMethodBox = {
  label: string;
  title: string;
  desc: string;
};

export type EngineeringProgramCopy = {
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  roadmap: {
    title: string;
    subtitle: string;
    steps: EngineeringRoadmapStep[];
  };
  methodology: {
    title: string;
    description: string;
    methods: EngineeringMethodBox[];
    researchTitle: string;
    researchDomains: string[];
    downloadLabel: string;
  };
};

export type EngineeringProgramUpdatePayload = {
  section: string;
  data: Record<string, string>;
};

const engineeringProgramCopy: EngineeringProgramCopy = {
  hero: {
    badge: "Academic Excellence",
    titleMain: "Engineering",
    titleHighlight: "Degree",
    subtitle:
      "A comprehensive 5-year program at the Global Innovation Center designed to transform high-potential students into world-class software and systems engineers.",
  },
  roadmap: {
    title: "The Academic Roadmap",
    subtitle: "From foundation to specialization and research.",
    steps: [
      {
        year: "Years 1 - 2",
        title: "Tronc Commun (Foundation)",
        desc:
          "A multi-disciplinary foundation in Math, Physics, and Chemistry, paired with soft skills in Marketing, Philosophy, and Khmer History.",
        tags: ["Math", "Physics", "English/French", "Technical Drawing"],
      },
      {
        year: "Year 3",
        title: "Computer Science Fundamentals",
        desc:
          "Deep dive into fundamental theories. Mastering the core principles of algorithms, data structures, and the logic of computation.",
        tags: ["Core Theory", "Algorithms", "Programming Logic"],
      },
      {
        year: "Year 4",
        title: "Technologies & Professional Practice",
        desc:
          "Bridging theory and industry. Includes a mandatory vacation internship to apply skills in real-world environments.",
        tags: ["Professional Courses", "System Architecture", "Internship"],
      },
      {
        year: "Year 5",
        title: "Advanced Research & Graduation",
        desc:
          "Specialization in AI, NLP, and Distributed Systems. Concludes with a 12-week final internship and a defended thesis.",
        tags: ["AI", "NLP", "Software Project Management", "Thesis Defense"],
      },
    ],
  },
  methodology: {
    title: "Training Methodology",
    description:
      "Our curriculum follows the French engineering school standard, balancing theoretical lectures with intense practical sessions.",
    methods: [
      { label: "C", title: "Cours", desc: "Theoretical lectures & concepts." },
      { label: "TD", title: "Travaux Dirigés", desc: "Guided tutorials & exercises." },
      { label: "TP", title: "Travaux Practiques", desc: "Hands-on laboratory sessions." },
    ],
    researchTitle: "Advanced Research Domains",
    researchDomains: [
      "Artificial Intelligence",
      "Natural Language Processing",
      "Image Processing",
      "Distributed Systems",
    ],
    downloadLabel: "DOWNLOAD FULL CURRICULUM (PDF)",
  },
};

const getEngineeringProgramCopy = async (): Promise<EngineeringProgramCopy> => engineeringProgramCopy;

export function useEngineeringProgramCopy() {
  return useQuery({
    queryKey: ["engineeringProgramCopy"],
    queryFn: getEngineeringProgramCopy,
    initialData: engineeringProgramCopy,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

type UpdatableEngineeringCopy = Record<string, unknown>;

const setNestedValue = (source: UpdatableEngineeringCopy, path: string, value: string) => {
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

  return root as EngineeringProgramCopy;
};

const applyEngineeringProgramUpdate = (
  current: EngineeringProgramCopy,
  updates: Record<string, string>,
): EngineeringProgramCopy =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateEngineeringProgramCopy = async (payload: EngineeringProgramUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return payload;
};

export function useUpdateEngineeringProgramCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEngineeringProgramCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<EngineeringProgramCopy>(["engineeringProgramCopy"], (current) => {
        if (!current) return current;
        return applyEngineeringProgramUpdate(current, payload.data);
      });
    },
  });
}
