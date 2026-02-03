import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type MissionVisionIconKey = "users" | "trending" | "globe" | "lightbulb";

export type MissionVisionPoint = {
  text: string;
  icon: MissionVisionIconKey;
};

export type MissionVisionCopy = {
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  about: {
    title: string;
    descriptionBefore: string;
    departmentName: string;
    descriptionAfter: string;
  };
  mission: {
    title: string;
    bodyBefore: string;
    bodyHighlight: string;
    bodyAfter: string;
    hardSkillsTitle: string;
    hardSkillsDesc: string;
    softSkillsTitle: string;
    softSkillsDesc: string;
  };
  vision: {
    titleMain: string;
    titleHighlight: string;
    description: string;
  };
  visionPoints: MissionVisionPoint[];
};

export type MissionVisionUpdatePayload = {
  section: string;
  data: Record<string, string>;
};

const missionVisionCopy: MissionVisionCopy = {
  hero: {
    badge: "Our Foundation",
    titleMain: "Mission &",
    titleHighlight: "Vision",
    subtitle:
      "Leading the digital evolution of Cambodia through academic excellence, ethical professionalism, and impactful research.",
  },
  about: {
    title: "About GIC",
    descriptionBefore: "The",
    departmentName: "Département de Génie d’Informatique et Communication",
    descriptionAfter:
      "(GIC) was established in 1998. Since our inception, we have formed more than one thousand engineers and technicians who are now participating actively in the development of both public and private sectors.",
  },
  mission: {
    title: "Our Mission",
    bodyBefore: "Our main mission is to produce",
    bodyHighlight: "highly qualified graduates",
    bodyAfter:
      "from both undergraduate and higher education in computer science.",
    hardSkillsTitle: "Hard Skills",
    hardSkillsDesc:
      "Rigorous technical curriculum in software and systems engineering.",
    softSkillsTitle: "Soft Skills",
    softSkillsDesc:
      "Communication and teamwork essential for the modern workplace.",
  },
  vision: {
    titleMain: "Our",
    titleHighlight: "Vision",
    description:
      "To be the core engine of Cambodia's ICT development through higher education and fruitful research.",
  },
  visionPoints: [
    {
      text: "Actively participate in human resource development in ICT",
      icon: "users",
    },
    {
      text: "Contribute in the development of related domains",
      icon: "trending",
    },
    {
      text: "Contribute in the development of higher education of the country",
      icon: "globe",
    },
    {
      text: "Conduct fruitful research that meet the needs of the country",
      icon: "lightbulb",
    },
  ],
};

const getMissionVisionCopy = async (): Promise<MissionVisionCopy> => missionVisionCopy;

export function useMissionVisionCopy() {
  return useQuery({
    queryKey: ["missionVisionCopy"],
    queryFn: getMissionVisionCopy,
    initialData: missionVisionCopy,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

type UpdatableMissionVisionCopy = Record<string, unknown>;

const setNestedValue = (source: UpdatableMissionVisionCopy, path: string, value: string) => {
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

  return root as MissionVisionCopy;
};

const applyMissionVisionUpdate = (
  current: MissionVisionCopy,
  updates: Record<string, string>,
): MissionVisionCopy =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateMissionVisionCopy = async (payload: MissionVisionUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return payload;
};

export function useUpdateMissionVisionCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMissionVisionCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<MissionVisionCopy>(["missionVisionCopy"], (current) => {
        if (!current) return current;
        return applyMissionVisionUpdate(current, payload.data);
      });
    },
  });
}
