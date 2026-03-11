import type {
  CurriculumCourse,
  CurriculumLegendItem,
} from "@/hooks/useCurriculumData";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { defaultCurriculumPageData } from "@/hooks/useCurriculumData";
import {
  curriculumApi,
  type UpsertCurriculumCourseDto,
} from "@/api/services/curriculum";
import { programsApi, type ProgramType } from "@/api/services/programs";

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

export const programKeyToType: Record<CurriculumProgramKey, ProgramType> = {
  national: "engineer",
  international: "international",
  associate: "associate",
  master: "master",
};

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
    curriculum: cloneValue(defaultCurriculumPageData.curriculum),
    legend: baseLegend,
  },
};

const getCurriculumManagementData = async (
  programKey: CurriculumProgramKey,
): Promise<CurriculumProgramData> => {
  const programType = programKeyToType[programKey];
  const program = await programsApi.findByType(programType);
  const response = await curriculumApi.getCurriculum(program.id);

  return {
    programKey,
    program: curriculumProgramMeta[programKey],
    curriculum: response.curriculum,
    legend: response.legend,
  };
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

export function useCurriculumManagementData(programKey: CurriculumProgramKey) {
  return useQuery({
    queryKey: ["curriculumManagement", programKey],
    queryFn: () => getCurriculumManagementData(programKey),
    placeholderData: curriculumSeedByProgram[programKey],
  });
}

export function useUpdateCurriculumManagementData(
  _programKey: CurriculumProgramKey,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CurriculumManagementUpdatePayload) => {
      const currentData = queryClient.getQueryData<CurriculumProgramData>([
        "curriculumManagement",
        payload.programKey,
      ]);

      const programType = programKeyToType[payload.programKey];
      const program = await programsApi.findByType(programType);
      const programId = program.id;

      for (const update of payload.updates) {
        switch (update.type) {
          case "add": {
            const dto: UpsertCurriculumCourseDto = {
              subject: update.course.subject,
              code: update.course.code,
              hC: update.course.hC,
              hTD: update.course.hTD,
              hTP: update.course.hTP,
              credit: update.course.credit,
              order: update.course.order,
            };
            await curriculumApi.upsertCourse(programId, update.semester, dto);
            break;
          }
          case "update": {
            const existing =
              currentData?.curriculum[update.semester]?.[update.courseIndex];
            if (existing) {
              const merged = { ...existing, ...update.changes };
              const dto: UpsertCurriculumCourseDto = {
                id: existing.id,
                subject: merged.subject,
                code: merged.code,
                hC: merged.hC,
                hTD: merged.hTD,
                hTP: merged.hTP,
                credit: merged.credit,
                order: merged.order,
              };
              await curriculumApi.upsertCourse(
                programId,
                update.semester,
                dto,
              );
            }
            break;
          }
          case "delete": {
            const existing =
              currentData?.curriculum[update.semester]?.[update.courseIndex];
            if (existing) {
              await curriculumApi.removeCourse(
                programId,
                update.semester,
                existing.code,
              );
            }
            break;
          }
        }
      }

      return payload;
    },
    onSuccess: (payload) => {
      queryClient.setQueryData<CurriculumProgramData>(
        ["curriculumManagement", payload.programKey],
        (current) => {
          const baseState =
            current ?? curriculumSeedByProgram[payload.programKey];

          return applyCurriculumUpdates(baseState, payload.updates);
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["curriculumManagement", payload.programKey],
      });

      if (payload.programKey === "master") {
        queryClient.invalidateQueries({ queryKey: ["masterDegree"] });
      }
    },
  });
}
