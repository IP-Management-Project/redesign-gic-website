import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type HistoryIconKey = "rocket" | "globe" | "graduation";

export type HistoryImage = {
  src: string;
  alt: string;
};

export type HistoryEntryCopy = {
  period: string;
  heading: string;
  description: string;
  icon: HistoryIconKey;
  tags: string[];
  images: HistoryImage[];
};

export type HistoryHeroCopy = {
  title: string;
  subtitle: string;
};

export type HistoryPageCopy = {
  hero: HistoryHeroCopy;
  entries: HistoryEntryCopy[];
};

export type HistoryPageUpdatePayload = {
  section: string;
  data: Record<string, string>;
};

const historyPageCopy: HistoryPageCopy = {
  hero: {
    title: "The GIC Story",
    subtitle:
      "Two decades of pioneering engineering education, bridging Cambodia's brightest talents with global innovation.",
  },
  entries: [
    {
      period: "2024 - 2026",
      heading: "Digital Transformation Era",
      description:
        "GIC officially launched the Global Innovation Center Pro initiative, integrating AI-driven curriculum and smart-lab infrastructures. We successfully expanded our research impact to 12 core labs focusing on Khmer-first AI tools and high-performance computing.",
      icon: "rocket",
      tags: [],
      images: [
        {
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
          alt: "Smart Labs",
        },
        {
          src: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
          alt: "Research Labs",
        },
      ],
    },
    {
      period: "2015 - 2023",
      heading: "International Expansion",
      description:
        "This decade marked the peak of our international cooperation with French Engineering schools (INSA, INP Toulouse, and UTC). We established the International Program and the Master's in Software Engineering.",
      icon: "globe",
      tags: ["INSA Lyon Partner", "Erasmus+ Collaboration", "Dual Degree Launch"],
      images: [
        {
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
          alt: "Collaborative Learning",
        },
        {
          src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
          alt: "Graduation Ceremony",
        },
      ],
    },
    {
      period: "2005 - 2014",
      heading: "Foundation & Roots",
      description:
        "Founded within the Institut de Technologie du Cambodge, GIC began with a single mission: to provide high-level computer science education to the brightest minds in Cambodia. The first cohort of 50 students set the standard for excellence.",
      icon: "graduation",
      tags: [
        "First Engineering Batch Graduated",
        "Established Dept. of Information Tech",
        "First Partnership with AUF",
      ],
      images: [
        {
          src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
          alt: "Campus Foundation",
        },
        {
          src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
          alt: "Classic Library",
        },
      ],
    },
  ],
};

const getHistoryPageCopy = async (): Promise<HistoryPageCopy> => historyPageCopy;

export function useHistoryPageCopy() {
  return useQuery({
    queryKey: ["historyPageCopy"],
    queryFn: getHistoryPageCopy,
    initialData: historyPageCopy,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

type UpdatableHistoryCopy = Record<string, unknown>;

const setNestedValue = (source: UpdatableHistoryCopy, path: string, value: string) => {
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

  return root as HistoryPageCopy;
};

const applyHistoryCopyUpdate = (
  current: HistoryPageCopy,
  updates: Record<string, string>,
): HistoryPageCopy =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateHistoryPageCopy = async (payload: HistoryPageUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return payload;
};

export function useUpdateHistoryPageCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHistoryPageCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<HistoryPageCopy>(["historyPageCopy"], (current) => {
        if (!current) return current;
        return applyHistoryCopyUpdate(current, payload.data);
      });
    },
  });
}
