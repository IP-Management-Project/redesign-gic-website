import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type AssociateFeatureCard = {
  title: string;
  desc: string;
};

export type AssociateSector = {
  title: string;
};

export type AssociateProgramCopy = {
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  admission: {
    title: string;
    description: string;
  };
  identity: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    features: AssociateFeatureCard[];
  };
  industry: {
    title: string;
    subtitle: string;
    sectors: AssociateSector[];
  };
  careers: {
    title: string;
    description: string;
    tags: string[];
    bullets: string[];
  };
};

export type AssociateProgramUpdatePayload = {
  section: string;
  data: Record<string, string>;
};

const associateProgramCopy: AssociateProgramCopy = {
  hero: {
    badge: "Professional Technical Track",
    titleMain: "Associate",
    titleHighlight: "Degree",
    subtitle:
      "A specialized 2-year program designed for high school graduates to gain immediate technical expertise and professional ethics for the modern IT workforce.",
  },
  admission: {
    title: "Direct Admission Path",
    description:
      "Open enrollment for high school graduates — no entrance exam required for the Associate track.",
  },
  identity: {
    title: "Who We Are?",
    paragraph1:
      "Founded in 1998, GIC has formed more than one thousand technicians in computer science who are now participating actively in the development of both public and private sectors.",
    paragraph2:
      "Our curriculum covers fundamental theories while emphasizing hands-on skills in analysis, design, and implementation of computer-based systems.",
    features: [
      {
        title: "Technical Skills",
        desc: "Mastering software solutions and network infrastructure.",
      },
      {
        title: "Soft Skills",
        desc: "Communication and teamwork for real working environments.",
      },
    ],
  },
  industry: {
    title: "Industry Training",
    subtitle:
      "We provide a solid technical foundation enhanced by professional ethics and patriotism.",
    sectors: [
      { title: "IT Software Solutions" },
      { title: "Network & Infrastructure" },
      { title: "Telecommunications" },
      { title: "Business Intelligence" },
      { title: "Finance & Banking" },
      { title: "Media & Broadcasting" },
    ],
  },
  careers: {
    title: "Beyond Graduation",
    description:
      "Most of our graduates secure successful careers as IT professionals, researchers, lecturers, and consultants. Many become workforce for government, academic sectors, or run their own startups.",
    tags: ["iOS/Android Dev", "Data Mining", "Big Data", "System Admin"],
    bullets: [
      "2-Year Full-Time Duration",
      "Focus on Computer Science Foundations",
      "Obligatory Industry Internships",
    ],
  },
};

const getAssociateProgramCopy = async (): Promise<AssociateProgramCopy> => associateProgramCopy;

export function useAssociateDegreeCopy() {
  return useQuery({
    queryKey: ["associateDegreeCopy"],
    queryFn: getAssociateProgramCopy,
    initialData: associateProgramCopy,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

type UpdatableAssociateCopy = Record<string, unknown>;

const setNestedValue = (source: UpdatableAssociateCopy, path: string, value: string) => {
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

  return root as AssociateProgramCopy;
};

const applyAssociateProgramUpdate = (
  current: AssociateProgramCopy,
  updates: Record<string, string>,
): AssociateProgramCopy =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateAssociateProgramCopy = async (payload: AssociateProgramUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return payload;
};

export function useUpdateAssociateDegreeCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssociateProgramCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<AssociateProgramCopy>(["associateDegreeCopy"], (current) => {
        if (!current) return current;
        return applyAssociateProgramUpdate(current, payload.data);
      });
    },
  });
}
