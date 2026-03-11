import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import merge from "lodash/merge";
import { programsApi } from "@/api/services/programs";

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

const emptyEngineeringProgramCopy: EngineeringProgramCopy = {
  hero: {
    badge: "",
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
  },
  roadmap: {
    title: "",
    subtitle: "",
    steps: [],
  },
  methodology: {
    title: "",
    description: "",
    methods: [],
    researchTitle: "",
    researchDomains: [],
    downloadLabel: "",
  },
};

const getEngineeringProgramCopy = async (): Promise<EngineeringProgramCopy> => {
  const res = await programsApi.getEngineeringCopy();
  const raw = res as any;
  const copy = raw?.copyData;

  if (!copy || typeof copy !== "object") {
    return emptyEngineeringProgramCopy;
  }

  // Deep-merge fetched copyData on top of the empty defaults so any
  // section not yet saved always has safe empty values instead of undefined.
  return merge({}, emptyEngineeringProgramCopy, copy) as EngineeringProgramCopy;
};

export function useEngineeringProgramCopy() {
  return useQuery({
    queryKey: ["engineeringProgramCopy"],
    queryFn: getEngineeringProgramCopy,
    placeholderData: emptyEngineeringProgramCopy,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

// ── Create / Initialize a program ────────────────────────────────────
export function useCreateEngineeringProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      programsApi.create({
        title: "Engineering Program",
        slug: "engineering",
        type: "engineer",
        isActive: true,
        displayOrder: 2,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["engineeringProgramCopy"] });
    },
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
  // Fetch the engineering program to get its id and current copyData
  const res = await programsApi.getEngineeringCopy();
  const raw = res as any;
  const programId = raw.id;

  if (!programId) {
    throw new Error("Engineering program not found");
  }

  // Build updated copyData by applying dot-path updates to the current data
  const currentCopyData = raw.copyData ?? {};
  const updatedCopyData = applyEngineeringProgramUpdate(
    { ...currentCopyData } as EngineeringProgramCopy,
    payload.data,
  );

  // PATCH with copyData as a top-level field
  await programsApi.update(programId, { copyData: updatedCopyData });

  return payload;
};

export function useUpdateEngineeringProgramCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEngineeringProgramCopy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["engineeringProgramCopy"] });
    },
  });
}
