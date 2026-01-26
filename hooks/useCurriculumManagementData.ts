import type {
  CurriculumCourse,
  CurriculumLegendItem,
} from "@/hooks/useCurriculumData";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { defaultCurriculumPageData } from "@/hooks/useCurriculumData";
import { masterDegreeSeed } from "@/hooks/useMasterDegreeData";

export type CurriculumProgramKey =
  | "national"
  | "international"
  | "associate"
  | "master";

export type CurriculumProgramMeta = {
  label: string;
  description: string;
};

export const curriculumProgramMeta: Record<
  CurriculumProgramKey,
  CurriculumProgramMeta
> = {
  national: {
    label: "National Program",
    description:
      "Manage the engineering curriculum displayed on the national program page.",
  },
  international: {
    label: "International Program",
    description:
      "Manage the curriculum table used for the international program.",
  },
  associate: {
    label: "Associate Program",
    description:
      "Manage the associate degree curriculum that appears on the public site.",
  },
  master: {
    label: "Master Program",
    description:
      "Manage the master's curriculum that powers the master's program curriculum section.",
  },
};

export const curriculumProgramKeys = Object.keys(
  curriculumProgramMeta,
) as CurriculumProgramKey[];

export const isCurriculumProgramKey = (
  value: string,
): value is CurriculumProgramKey => value in curriculumProgramMeta;

export type CurriculumProgramData = {
  programKey: CurriculumProgramKey;
  program: CurriculumProgramMeta;
  curriculum: Record<string, CurriculumCourse[]>;
  legend: CurriculumLegendItem[];
};

export type CurriculumCourseUpdate =
  | {
      type: "update";
      semester: string;
      courseIndex: number;
      changes: Partial<CurriculumCourse>;
    }
  | {
      type: "add";
      semester: string;
      course: CurriculumCourse;
    }
  | {
      type: "delete";
      semester: string;
      courseIndex: number;
    };

export type CurriculumManagementUpdatePayload = {
  programKey: CurriculumProgramKey;
  updates: CurriculumCourseUpdate[];
};

const cloneValue = <T>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
};

const baseLegend = cloneValue(defaultCurriculumPageData.legend);

const curriculumSeedByProgram: Record<
  CurriculumProgramKey,
  CurriculumProgramData
> = {
  national: {
    programKey: "national",
    program: curriculumProgramMeta.national,
    curriculum: cloneValue(defaultCurriculumPageData.curriculum),
    legend: baseLegend,
  },
  international: {
    programKey: "international",
    program: curriculumProgramMeta.international,
    curriculum: cloneValue(defaultCurriculumPageData.curriculum),
    legend: baseLegend,
  },
  associate: {
    programKey: "associate",
    program: curriculumProgramMeta.associate,
    curriculum: cloneValue(defaultCurriculumPageData.curriculum),
    legend: baseLegend,
  },
  master: {
    programKey: "master",
    program: curriculumProgramMeta.master,
    curriculum: cloneValue(masterDegreeSeed.curriculum),
    legend: baseLegend,
  },
};

const getCurriculumManagementData = async (
  programKey: CurriculumProgramKey,
): Promise<CurriculumProgramData> => {
  // TODO: replace with API call once curriculum endpoints are available.
  return cloneValue(curriculumSeedByProgram[programKey]);
};

const applyCurriculumUpdates = (
  current: CurriculumProgramData,
  updates: CurriculumCourseUpdate[],
): CurriculumProgramData => {
  const nextCurriculum = cloneValue(current.curriculum);

  updates.forEach((update) => {
    if (update.type === "add") {
      const courses = nextCurriculum[update.semester] ?? [];

      nextCurriculum[update.semester] = [...courses, update.course];

      return;
    }

    if (update.type === "delete") {
      const courses = nextCurriculum[update.semester];

      if (!courses?.[update.courseIndex]) return;

      nextCurriculum[update.semester] = courses.filter(
        (_course, index) => index !== update.courseIndex,
      );

      return;
    }

    const courses = nextCurriculum[update.semester];

    if (!courses?.[update.courseIndex]) return;

    const updatedCourse: CurriculumCourse = {
      ...courses[update.courseIndex],
      ...update.changes,
    };

    nextCurriculum[update.semester] = courses.map((course, index) =>
      index === update.courseIndex ? updatedCourse : course,
    );
  });

  return {
    ...current,
    curriculum: nextCurriculum,
  };
};

const updateCurriculumManagementData = async (
  payload: CurriculumManagementUpdatePayload,
): Promise<CurriculumManagementUpdatePayload> => {
  // TODO: replace with API mutation.
  await new Promise((resolve) => setTimeout(resolve, 200));

  return payload;
};

export function useCurriculumManagementData(programKey: CurriculumProgramKey) {
  return useQuery({
    queryKey: ["curriculumManagement", programKey],
    queryFn: () => getCurriculumManagementData(programKey),
    initialData: curriculumSeedByProgram[programKey],
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useUpdateCurriculumManagementData(
  _programKey: CurriculumProgramKey,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurriculumManagementData,
    onSuccess: (payload) => {
      queryClient.setQueryData<CurriculumProgramData>(
        ["curriculumManagement", payload.programKey],
        (current) => {
          const baseState =
            current ?? curriculumSeedByProgram[payload.programKey];

          return applyCurriculumUpdates(baseState, payload.updates);
        },
      );

      if (payload.programKey === "master") {
        queryClient.setQueryData(
          ["masterDegree"],
          (current: typeof masterDegreeSeed | undefined) => {
            const baseState = current ?? masterDegreeSeed;
            const updatedCurriculum = applyCurriculumUpdates(
              {
                programKey: "master",
                program: curriculumProgramMeta.master,
                curriculum: baseState.curriculum,
                legend: baseLegend,
              },
              payload.updates,
            );

            return {
              ...baseState,
              curriculum: updatedCurriculum.curriculum,
            };
          },
        );
      }
    },
  });
}
