import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/axiosClient";

export type RoadmapStage = {
  stage: string;
  date: string;
  desc: string;
  color: string;
};

export type RoadmapPartner = {
  name: string;
  role: string;
  img: string;
};

export type IncubationObjective = {
  title: string;
  desc: string;
};

export type IncubationRoadmapCopy = {
  hero: {
    subtitle: string;
  };
  objectives: {
    titleMain: string;
    titleHighlight: string;
    description: string;
    items: IncubationObjective[];
  };
  ecosystem: {
    title: string;
    description: string;
    leadershipLabel: string;
    creativityLabel: string;
  };
  partnersSection: {
    title: string;
    supportLabel: string;
  };
  roadmapSection: {
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
};

export type IncubationRoadmapData = IncubationRoadmapCopy & {
  roadmap: RoadmapStage[];
  partners: RoadmapPartner[];
  ministries: RoadmapPartner[];
  marqueeImages: string[];
};

export type IncubationRoadmapUpdatePayload = {
  section: string;
  data: Record<string, unknown>;
};

const incubationRoadmapData: IncubationRoadmapData = {
  hero: {
    subtitle: "",
  },
  objectives: {
    titleMain: "",
    titleHighlight: "",
    description: "",
    items: [
      {
        title: "",
        desc: "",
      },
      {
        title: "",
        desc: "",
      },
      {
        title: "",
        desc: "",
      },
    ],
  },
  ecosystem: {
    title: "",
    description: "",
    leadershipLabel: "",
    creativityLabel: "",
  },
  partnersSection: {
    title: "",
    supportLabel: "",
  },
  roadmapSection: {
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
  },
  roadmap: [
    {
      stage: "",
      date: "",
      desc: "",
      color: "",
    },
    {
      stage: "",
      date: "",
      desc: "",
      color: "",
    },
    {
      stage: "",
      date: "",
      desc: "",
      color: "",
    },
    {
      stage: "",
      date: "",
      desc: "",
      color: "",
    },
    {
      stage: "",
      date: "",
      desc: "",
      color: "",
    },
    {
      stage: "",
      date: "",
      desc: "",
      color: "",
    },
  ],
  partners: [
    {
      name: "",
      role: "",
      img: "",
    },
    {
      name: "",
      role: "",
      img: "",
    },
    {
      name: "",
      role: "",
      img: "",
    },
    {
      name: "",
      role: "",
      img: "",
    },
    {
      name: "",
      role: "",
      img: "",
    },
  ],
  ministries: [
    {
      name: "",
      role: "",
      img: "",
    },
    { name: "", role: "", img: "" },
  ],
  marqueeImages: [""],
};

const extractStatusCode = (error: unknown) => {
  const anyError = error as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
    request?: { status?: number };
  };
  return (
    anyError?.statusCode ??
    anyError?.status ??
    anyError?.response?.status ??
    (anyError as any)?.request?.status ??
    null
  );
};

const mergeSection = <T extends object>(
  defaults: T,
  incoming?: Partial<T>,
) => ({
  ...defaults,
  ...(incoming ?? {}),
});

const normalizeIncubationRoadmapData = (
  incoming?: Partial<IncubationRoadmapData>,
): IncubationRoadmapData => ({
  hero: mergeSection(incubationRoadmapData.hero, incoming?.hero),
  objectives: mergeSection(
    incubationRoadmapData.objectives,
    incoming?.objectives,
  ),
  ecosystem: mergeSection(incubationRoadmapData.ecosystem, incoming?.ecosystem),
  partnersSection: mergeSection(
    incubationRoadmapData.partnersSection,
    incoming?.partnersSection,
  ),
  roadmapSection: mergeSection(
    incubationRoadmapData.roadmapSection,
    incoming?.roadmapSection,
  ),
  roadmap: incoming?.roadmap ?? incubationRoadmapData.roadmap,
  partners: incoming?.partners ?? incubationRoadmapData.partners,
  ministries: incoming?.ministries ?? incubationRoadmapData.ministries,
  marqueeImages: (() => {
    const value = incoming?.marqueeImages;

    const cleanArray = (arr: unknown[]) =>
      arr.map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean);

    if (Array.isArray(value)) {
      return cleanArray(value);
    }

    if (typeof value === "string") {
      // Try to parse JSON array, fallback to splitting
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return cleanArray(parsed);
        }
      } catch (e) {
        /* ignore */
      }

      return value
        .split(/[\,\n]+/)
        .map((v) => v.trim())
        .filter(Boolean);
    }

    if (value && typeof value === "object") {
      return cleanArray(Object.values(value));
    }

    return incubationRoadmapData.marqueeImages;
  })(),
});

const getIncubationRoadmapData = async (): Promise<IncubationRoadmapData> => {
  try {
    const response = await apiClient.get<
      Partial<IncubationRoadmapData> | undefined
    >("/content/incubation-roadmap");
    return normalizeIncubationRoadmapData(response ?? undefined);
  } catch (error) {
    console.error("Failed to fetch incubation roadmap", error);
    return incubationRoadmapData;
  }
};

export function useIncubationRoadmapData() {
  return useQuery({
    queryKey: ["incubationRoadmap"],
    queryFn: getIncubationRoadmapData,
    initialData: incubationRoadmapData,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}

type UpdatableIncubationRoadmap = Record<string, unknown>;

const setNestedValue = (
  source: UpdatableIncubationRoadmap,
  path: string,
  value: unknown,
) => {
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

  return root as IncubationRoadmapData;
};

const applyIncubationRoadmapUpdate = (
  current: IncubationRoadmapData,
  updates: Record<string, unknown>,
): IncubationRoadmapData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateIncubationRoadmap = async (
  payload: IncubationRoadmapUpdatePayload,
) => {
  try {
    return await apiClient.patch<IncubationRoadmapData>(
      "/content/incubation-roadmap",
      payload,
    );
  } catch (error) {
    const status = extractStatusCode(error);

    if (status === 404) {
      const seeded = applyIncubationRoadmapUpdate(
        incubationRoadmapData,
        payload.data,
      );
      return apiClient.put<IncubationRoadmapData>(
        "/content/incubation-roadmap",
        {
          data: seeded,
        },
      );
    }

    throw error;
  }
};

export function useUpdateIncubationRoadmapData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIncubationRoadmap,
    onSuccess: (updated, payload) => {
      queryClient.setQueryData<IncubationRoadmapData>(
        ["incubationRoadmap"],
        (current) => {
          const base = current ?? incubationRoadmapData;
          let next = updated
            ? normalizeIncubationRoadmapData(updated)
            : applyIncubationRoadmapUpdate(base, payload.data);

          // If the payload explicitly sent marqueeImages, prefer it to ensure multiple URLs persist
          const payloadImages = payload.data.marqueeImages;
          if (payloadImages) {
            const normalizedImages = normalizeIncubationRoadmapData({
              marqueeImages: payloadImages as unknown as string[],
            }).marqueeImages;
            next = {
              ...next,
              marqueeImages: normalizedImages,
            };
          }

          return next;
        },
      );
    },
  });
}
