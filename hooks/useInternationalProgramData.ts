import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import merge from "lodash/merge";
import { programsApi } from "@/api/services/programs";

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
    badge: "",
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
  },
  architecture: {
    title: "",
    description: "",
    foundation: {
      title: "",
      description: "",
    },
    specialization: {
      title: "",
      description: "",
    },
    mobilityTitle: "",
    mobilityDescription: "",
  },
  partnersSection: {
    title: "",
    subtitle: "",
  },
  enrollment: {
    titleMain: "",
    titleHighlight: "",
    description: "",
    primaryCtaLabel: "",
    secondaryCtaLabel: "",
    scholarshipsLabel: "",
    duration: {
      label: "",
      value: "",
    },
    status: {
      label: "",
      value: "",
    },
  },
  partners: [],
  mobilityHighlights: [],
};

const getInternationalProgramData = async (): Promise<InternationalProgramData> => {
  const res = await programsApi.getInternational();
  const raw = res as any;
  const copy = raw?.copyData;

  if (!copy || typeof copy !== "object") {
    return internationalProgramData;
  }

  // Deep-merge fetched copyData on top of the empty defaults.
  // This ensures sections not yet saved (e.g. architecture when only hero
  // has been edited) always have safe empty-string values instead of
  // undefined, preventing runtime crashes.
  return merge({}, internationalProgramData, copy) as InternationalProgramData;
};

export function useInternationalProgramData() {
  return useQuery({
    queryKey: ["internationalProgram"],
    queryFn: getInternationalProgramData,
    placeholderData: internationalProgramData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on 404
  });
}

// ── Create / Initialize a program ────────────────────────────────────
export function useCreateProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: {
      title: string;
      slug: string;
      type: "engineer" | "international" | "associate" | "master";
      isActive?: boolean;
      displayOrder?: number;
    }) =>
      programsApi.create({
        title: dto.title,
        slug: dto.slug,
        type: dto.type,
        isActive: dto.isActive ?? true,
        displayOrder: dto.displayOrder ?? 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internationalProgram"] });
    },
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
  // Fetch the international program to get its id and current copyData
  const res = await programsApi.getInternational();
  const raw = res as any;
  const programId = raw.id;

  if (!programId) {
    throw new Error("International program not found");
  }

  // Build updated copyData by applying dot-path updates to the current data
  const currentCopyData = raw.copyData ?? {};
  const updatedCopyData = applyInternationalProgramUpdate(
    { ...currentCopyData } as InternationalProgramData,
    payload.data,
  );

  // PATCH with copyData as a top-level field
  await programsApi.update(programId, { copyData: updatedCopyData });

  return payload;
};

export function useUpdateInternationalProgramData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInternationalProgramCopy,
    onSuccess: () => {
      // Refetch from backend to get the latest data
      queryClient.invalidateQueries({ queryKey: ["internationalProgram"] });
    },
  });
}
