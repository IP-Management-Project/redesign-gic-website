import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import merge from "lodash/merge";
import type { CurriculumData } from "@/hooks/useCurriculumData";
import { programsApi } from "@/api/services/programs";

export type CourseTypeGroup = {
  title: string;
  icon: "brain" | "cpu" | "search";
  courses: string[];
};

export type MasterHighlight = {
  text: string;
};

export type MasterEligibilityCard = {
  title: string;
  items: string[];
};

export type MasterCoordinatorContacts = {
  email: string;
  phone: string;
};

export type MasterDegreeData = {
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  overview: {
    title: string;
    description: string;
    highlights: MasterHighlight[];
  };
  career: {
    title: string;
    description: string;
    tags: string[];
  };
  framework: {
    title: string;
    description: string;
  };
  eligibility: {
    title: string;
    cards: MasterEligibilityCard[];
    applyTitle: string;
    deadlineLabel: string;
    deadlineValue: string;
    submissionLabel: string;
    submissionValue: string;
    downloadLabel: string;
  };
  coordinator: {
    title: string;
    contacts: MasterCoordinatorContacts;
  };
  curriculumSection: {
    title: string;
    description: string;
  };
  curriculum: CurriculumData;
  courseTypes: CourseTypeGroup[];
};

export type MasterDegreeUpdatePayload = {
  section: string;
  data: Record<string, string>;
};

const emptyMasterDegreeData: MasterDegreeData = {
  hero: {
    badge: "",
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
  },
  overview: {
    title: "",
    description: "",
    highlights: [],
  },
  career: {
    title: "",
    description: "",
    tags: [],
  },
  framework: {
    title: "",
    description: "",
  },
  eligibility: {
    title: "",
    cards: [],
    applyTitle: "",
    deadlineLabel: "",
    deadlineValue: "",
    submissionLabel: "",
    submissionValue: "",
    downloadLabel: "",
  },
  coordinator: {
    title: "",
    contacts: {
      email: "",
      phone: "",
    },
  },
  curriculumSection: {
    title: "",
    description: "",
  },
  curriculum: {},
  courseTypes: [],
};

const getMasterDegreeData = async (): Promise<MasterDegreeData> => {
  const res = await programsApi.getMaster();
  const raw = res as any;
  const copy = raw?.copyData;

  if (!copy || typeof copy !== "object") {
    return emptyMasterDegreeData;
  }

  return merge({}, emptyMasterDegreeData, copy) as MasterDegreeData;
};

export function useMasterDegreeData() {
  return useQuery({
    queryKey: ["masterDegree"],
    queryFn: getMasterDegreeData,
    placeholderData: emptyMasterDegreeData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on 404
  });
}

// ── Create / Initialize Master program ───────────────────────────────
export function useCreateMasterProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      programsApi.create({
        title: "Master Degree Program",
        slug: "master",
        type: "master",
        isActive: true,
        displayOrder: 4,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterDegree"] });
    },
  });
}

type UpdatableMasterCopy = Record<string, unknown>;

const setNestedValue = (source: UpdatableMasterCopy, path: string, value: string) => {
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

  return root as MasterDegreeData;
};

const applyMasterDegreeUpdate = (
  current: MasterDegreeData,
  updates: Record<string, string>,
): MasterDegreeData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateMasterDegreeCopy = async (payload: MasterDegreeUpdatePayload) => {
  const res = await programsApi.getMaster();
  const raw = res as any;
  const programId = raw?.id;

  if (!programId) {
    throw new Error("Master degree program not found");
  }

  const currentCopyData = raw.copyData ?? {};
  const updatedCopyData = applyMasterDegreeUpdate(
    { ...currentCopyData } as MasterDegreeData,
    payload.data,
  );

  await programsApi.update(programId, { copyData: updatedCopyData });

  return payload;
};

export function useUpdateMasterDegreeData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMasterDegreeCopy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masterDegree"] });
    },
  });
}
