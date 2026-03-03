import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/axiosClient";

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
    badge: "",
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
  },
  about: {
    title: "",
    descriptionBefore: "",
    departmentName: "",
    descriptionAfter: "",
  },
  mission: {
    title: "",
    bodyBefore: "",
    bodyHighlight: "",
    bodyAfter: "",
    hardSkillsTitle: "",
    hardSkillsDesc: "",
    softSkillsTitle: "",
    softSkillsDesc: "",
  },
  vision: {
    titleMain: "",
    titleHighlight: "",
    description: "",
  },
  visionPoints: [],
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

const normalizeMissionVisionCopy = (
  incoming?: Partial<MissionVisionCopy>,
): MissionVisionCopy => ({
  hero: mergeSection(missionVisionCopy.hero, incoming?.hero),
  about: mergeSection(missionVisionCopy.about, incoming?.about),
  mission: mergeSection(missionVisionCopy.mission, incoming?.mission),
  vision: mergeSection(missionVisionCopy.vision, incoming?.vision),
  visionPoints: incoming?.visionPoints ?? missionVisionCopy.visionPoints,
});

const getMissionVisionCopy = async (): Promise<MissionVisionCopy> => {
  try {
    const response = await apiClient.get<
      Partial<MissionVisionCopy> | undefined
    >("/content/mission-vision-copy");
    return normalizeMissionVisionCopy(response ?? undefined);
  } catch (error) {
    console.error(error);
    return missionVisionCopy;
  }
};

export function useMissionVisionCopy() {
  return useQuery({
    queryKey: ["missionVisionCopy"],
    queryFn: getMissionVisionCopy,
    initialData: missionVisionCopy,
    // Always refetch on mount so we replace the fallback with live API data
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}

type UpdatableMissionVisionCopy = Record<string, unknown>;

const setNestedValue = (
  source: UpdatableMissionVisionCopy,
  path: string,
  value: string,
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
  try {
    return await apiClient.patch<MissionVisionCopy>(
      "/content/mission-vision-copy",
      payload,
    );
  } catch (error) {
    const status = extractStatusCode(error);

    if (status === 404) {
      const seeded = applyMissionVisionUpdate(missionVisionCopy, payload.data);
      return apiClient.put<MissionVisionCopy>("/content/mission-vision-copy", {
        data: seeded,
      });
    }

    throw error;
  }
};

export function useUpdateMissionVisionCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMissionVisionCopy,
    onSuccess: (updated, payload) => {
      queryClient.setQueryData<MissionVisionCopy>(
        ["missionVisionCopy"],
        (current) => {
          const base = current ?? missionVisionCopy;
          if (updated) {
            return normalizeMissionVisionCopy(updated);
          }
          return applyMissionVisionUpdate(base, payload.data);
        },
      );
    },
  });
}
