import { apiClient } from "../axiosClient";

// ── Types ────────────────────────────────────────────────────────────

export interface ApiCurriculumCourse {
  id: string;
  subject: string;
  code: string;
  hC: number;
  hTD: number;
  hTP: number;
  credit: number;
  order: number;
}

export interface CurriculumResponse {
  curriculum: Record<string, ApiCurriculumCourse[]>;
  legend: { label: string }[];
}

export interface ReorderCurriculumDto {
  items: { code: string; order: number }[];
}

export interface UpsertCurriculumCourseDto {
  /** Pass id to update an existing course (allows code changes) */
  id?: string;
  subject: string;
  code: string;
  hC: number;
  hTD: number;
  hTP: number;
  credit: number;
  order?: number;
}

// ── Curriculum API ───────────────────────────────────────────────────

const base = (programId: string) => `/programs/${programId}/curriculum`;

export const curriculumApi = {
  // ── Public ─────────────────────────────────────────────────────────

  /** Get the full curriculum for a program */
  getCurriculum: (programId: string) =>
    apiClient.get<CurriculumResponse>(base(programId)),

  // ── Admin ──────────────────────────────────────────────────────────

  /** Reorder courses within a semester */
  reorderCourses: (
    programId: string,
    semester: string,
    data: ReorderCurriculumDto,
  ) =>
    apiClient.patch(
      `${base(programId)}/semester/${semester}/reorder`,
      data,
    ),

  /** Create or update a course in a semester */
  upsertCourse: (
    programId: string,
    semester: string,
    data: UpsertCurriculumCourseDto,
  ) =>
    apiClient.patch(
      `${base(programId)}/semester/${semester}/course`,
      data,
    ),

  /** Delete a course from a semester by its code */
  removeCourse: (programId: string, semester: string, code: string) =>
    apiClient.delete<void>(
      `${base(programId)}/semester/${semester}/course/${code}`,
    ),
};
