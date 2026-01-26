import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type InternationalPartner = {
  name: string;
  location: string;
  focus: string;
};

export type InternationalInfoCard = {
  title: string;
  description: string;
};

export type InternationalStatCard = {
  label: string;
  value: string;
};

export type InternationalProgramData = {
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  architecture: {
    title: string;
    description: string;
    foundation: InternationalInfoCard;
    specialization: InternationalInfoCard;
    mobilityTitle: string;
    mobilityDescription: string;
  };
  partnersSection: {
    title: string;
    subtitle: string;
  };
  enrollment: {
    titleMain: string;
    titleHighlight: string;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    scholarshipsLabel: string;
    duration: InternationalStatCard;
    status: InternationalStatCard;
  };
  partners: InternationalPartner[];
  mobilityHighlights: string[];
};

export type InternationalProgramUpdatePayload = {
  section: string;
  data: Record<string, string>;
};

const internationalProgramData: InternationalProgramData = {
  hero: {
    badge: "Global Academic Standards",
    titleMain: "International",
    titleHighlight: "Program",
    subtitle:
      "A premium 5-year engineering curriculum modeled after the French educational system, bridging Cambodian talent with world-class European partnerships.",
  },
  architecture: {
    title: "Program Architecture",
    description:
      "Our program is structured to transform high-potential students into specialized engineers capable of competing in the global market.",
    foundation: {
      title: "Years 1 - 2: Foundation",
      description:
        "The Tronc Commun: Mastering math, physics, chemistry, and humanities to build a multi-disciplinary base.",
    },
    specialization: {
      title: "Years 3 - 5: Specialization",
      description:
        "Focusing on advanced computer science, professional technologies, and research in AI and NLP.",
    },
    mobilityTitle: "Global Mobility",
    mobilityDescription:
      "The hallmark of our International Program is the opportunity for dual-degree paths, allowing students to earn degrees recognized both in Cambodia and Europe.",
  },
  partnersSection: {
    title: "European Partners",
    subtitle: "Collaborating with elite French engineering institutions.",
  },
  enrollment: {
    titleMain: "Secure Your",
    titleHighlight: "Future",
    description:
      "High school graduates are eligible for the national entrance exam held every October. Securing a spot means joining the top 1,500 students in the country.",
    primaryCtaLabel: "APPLY FOR EXAM",
    secondaryCtaLabel: "VIEW REQUIREMENTS",
    scholarshipsLabel: "Annual Scholarships Provided",
    duration: {
      label: "Duration",
      value: "5 Years",
    },
    status: {
      label: "Status",
      value: "Top 1500",
    },
  },
  partners: [
    { name: "INSA Lyon", location: "Lyon, France", focus: "Master & PhD tracks" },
    { name: "INP Toulouse", location: "Toulouse, France", focus: "Joint-supervision" },
    { name: "UTC Compiègne", location: "Compiègne, France", focus: "Software Architecture" },
    { name: "Polytech Network", location: "France-wide", focus: "Specialized Labs" },
  ],
  mobilityHighlights: [
    "Dual-degree paths with France",
    "International research tracks",
    "French & English language mastery",
  ],
};

const getInternationalProgramData = async (): Promise<InternationalProgramData> => internationalProgramData;

export function useInternationalProgramData() {
  return useQuery({
    queryKey: ["internationalProgram"],
    queryFn: getInternationalProgramData,
    initialData: internationalProgramData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

type UpdatableInternationalCopy = Record<string, unknown>;

const setNestedValue = (source: UpdatableInternationalCopy, path: string, value: string) => {
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

  return root as InternationalProgramData;
};

const applyInternationalProgramUpdate = (
  current: InternationalProgramData,
  updates: Record<string, string>,
): InternationalProgramData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateInternationalProgramCopy = async (payload: InternationalProgramUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return payload;
};

export function useUpdateInternationalProgramData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInternationalProgramCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<InternationalProgramData>(["internationalProgram"], (current) => {
        if (!current) return current;
        return applyInternationalProgramUpdate(current, payload.data);
      });
    },
  });
}
