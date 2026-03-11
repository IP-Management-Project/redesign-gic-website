import { apiClient } from "../axiosClient";

// ── Shared Types ─────────────────────────────────────────────────────

export type ProgramType =
  | "engineer"
  | "international"
  | "associate"
  | "master";

export interface Program {
  id: string;
  type: ProgramType;
  slug: string;
  data: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProgramDto {
  title?: string;
  type: ProgramType;
  slug?: string;
  about?: Record<string, unknown> | null;
  curriculum?: Record<string, unknown> | null;
  entranceSelection?: Record<string, unknown> | null;
  copyData?: Record<string, unknown> | null;
  isActive?: boolean;
  displayOrder?: number;
}

export interface UpdateProgramDto {
  title?: string;
  type?: ProgramType;
  slug?: string;
  about?: Record<string, unknown> | null;
  curriculum?: Record<string, unknown> | null;
  entranceSelection?: Record<string, unknown> | null;
  copyData?: Record<string, unknown> | null;
  isActive?: boolean;
  displayOrder?: number;
}

// ── International Program Types ──────────────────────────────────────

export interface InternationalProgramResponse {
  hero: {
    badge: string;
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  architecture: {
    title: string;
    description: string;
    foundation: { title: string; description: string };
    specialization: { title: string; description: string };
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
    duration: { label: string; value: string };
    status: { label: string; value: string };
  };
  partners: { name: string; location: string; focus: string }[];
  mobilityHighlights: string[];
}

// ── Programs API ─────────────────────────────────────────────────────

export const programsApi = {
  // ── Public endpoints ───────────────────────────────────────────────

  /** Get all programs */
  findAll: () =>
    apiClient.get<Program[]>("/programs"),

  /** Get program by ID */
  findOne: (id: string) =>
    apiClient.get<Program>(`/programs/${id}`),

  /** Get program by type */
  findByType: (type: ProgramType) =>
    apiClient.get<Program>(`/programs/type/${type}`),

  /** Get program by slug */
  findBySlug: (slug: string) =>
    apiClient.get<Program>(`/programs/slug/${slug}`),

  /** Get international program data */
  getInternational: () =>
    apiClient.get<InternationalProgramResponse>("/programs/international"),

  /** Get master program data */
  getMaster: () =>
    apiClient.get("/programs/master"),

  /** Get associate program copy */
  getAssociateCopy: () =>
    apiClient.get("/programs/copy/associate"),

  /** Get engineering program copy */
  getEngineeringCopy: () =>
    apiClient.get("/programs/copy/engineering"),

  /** Get curriculum data */
  getCurriculum: () =>
    apiClient.get("/programs/curriculum"),

  /** Get FAQ data */
  getFaq: () =>
    apiClient.get("/programs/faq"),

  // ── Admin endpoints ────────────────────────────────────────────────

  /** Create a program */
  create: (data: CreateProgramDto) =>
    apiClient.post<Program>("/programs", data),

  /** Update a program */
  update: (id: string, data: UpdateProgramDto) =>
    apiClient.patch<Program>(`/programs/${id}`, data),

  /** Delete a program */
  remove: (id: string) =>
    apiClient.delete<void>(`/programs/${id}`),
};
