import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import merge from "lodash/merge";
import { programsApi } from "@/api/services/programs";

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

const emptyAssociateProgramCopy: AssociateProgramCopy = {
  hero: {
    badge: "",
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
  },
  admission: {
    title: "",
    description: "",
  },
  identity: {
    title: "",
    paragraph1: "",
    paragraph2: "",
    features: [],
  },
  industry: {
    title: "",
    subtitle: "",
    sectors: [],
  },
  careers: {
    title: "",
    description: "",
    tags: [],
    bullets: [],
  },
};

const getAssociateProgramCopy = async (): Promise<AssociateProgramCopy> => {
  const res = await programsApi.getAssociateCopy();
  const raw = res as any;
  const copy = raw?.copyData;

  if (!copy || typeof copy !== "object") {
    return emptyAssociateProgramCopy;
  }

  // Deep-merge fetched copyData on top of the empty defaults so any
  // section not yet saved always has safe empty values instead of undefined.
  return merge({}, emptyAssociateProgramCopy, copy) as AssociateProgramCopy;
};

export function useAssociateDegreeCopy() {
  return useQuery({
    queryKey: ["associateDegreeCopy"],
    queryFn: getAssociateProgramCopy,
    placeholderData: emptyAssociateProgramCopy,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

// ── Create / Initialize a program ────────────────────────────────────
export function useCreateAssociateProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      programsApi.create({
        title: "Associate Degree",
        slug: "associate",
        type: "associate",
        isActive: true,
        displayOrder: 3,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["associateDegreeCopy"] });
    },
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
  // Fetch the associate program to get its id and current copyData
  const res = await programsApi.getAssociateCopy();
  const raw = res as any;
  const programId = raw.id;

  if (!programId) {
    throw new Error("Associate program not found");
  }

  // Build updated copyData by applying dot-path updates to the current data
  const currentCopyData = raw.copyData ?? {};
  const updatedCopyData = applyAssociateProgramUpdate(
    { ...currentCopyData } as AssociateProgramCopy,
    payload.data,
  );

  // PATCH with copyData as a top-level field
  await programsApi.update(programId, { copyData: updatedCopyData });

  return payload;
};

export function useUpdateAssociateDegreeCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssociateProgramCopy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["associateDegreeCopy"] });
    },
  });
}
