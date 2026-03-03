"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  calendarApi,
  CreateCalendarEventDto,
  UpdateCalendarEventDto,
  CreateGlossaryItemDto,
  UpdateGlossaryItemDto,
} from "@/api/services/calendar";

export type CalendarEvent = {
  id: string;
  month: string;
  title: string;
  type: "Exam" | "Admin" | "Academic" | "Holiday";
  startDate: string;
  endDate?: string;
  cite: number;
  createdAt?: string;
  updatedAt?: string;
};

export type GlossaryItem = {
  id: string;
  term: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AcademicCalendarData = {
  months: string[];
  events: CalendarEvent[];
  glossary: GlossaryItem[];
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const initialData: AcademicCalendarData = {
  months: [...MONTHS],
  events: [
    // // --- AUGUST 2024 ---
    // {
    //   id: "aug-1",
    //   month: "August",
    //   title: "Concours (Entrance Exam)",
    //   type: "Exam",
    //   startDate: "2024-08-20",
    //   endDate: "2024-08-22",
    //   cite: 1,
    // },

    // // --- SEPTEMBER 2024 ---
    // {
    //   id: "sep-1",
    //   month: "September",
    //   title: "Jury de septembre",
    //   type: "Admin",
    //   startDate: "2024-09-04",
    //   endDate: "2024-09-13",
    //   cite: 1,
    // },
    // {
    //   id: "sep-2",
    //   month: "September",
    //   title: "Pré-rentrée",
    //   type: "Academic",
    //   startDate: "2024-09-10",
    //   cite: 1,
    // },
    // {
    //   id: "sep-3",
    //   month: "September",
    //   title: "Concours in 13 3",
    //   type: "Exam",
    //   startDate: "2024-09-11",
    //   cite: 1,
    // },
    // {
    //   id: "sep-4",
    //   month: "September",
    //   title: "Jury de septembre (Final)",
    //   type: "Admin",
    //   startDate: "2024-09-20",
    //   cite: 1,
    // },

    // // --- OCTOBER 2024 ---
    // {
    //   id: "oct-1",
    //   month: "October",
    //   title: "Fête des Morts (Pchum Ben)",
    //   type: "Holiday",
    //   startDate: "2024-10-02",
    //   endDate: "2024-10-03",
    //   cite: 1,
    // },
    // {
    //   id: "oct-2",
    //   month: "October",
    //   title: "Rentrée scolaire",
    //   type: "Academic",
    //   startDate: "2024-10-15",
    //   cite: 1,
    // },
    // {
    //   id: "oct-3",
    //   month: "October",
    //   title: "Fin d'année de IT et TI",
    //   type: "Academic",
    //   startDate: "2024-10-10",
    //   cite: 1,
    // },

    // // --- NOVEMBER 2024 ---
    // {
    //   id: "nov-1",
    //   month: "November",
    //   title: "Fête des Eaux (Water Festival)",
    //   type: "Holiday",
    //   startDate: "2024-11-14",
    //   endDate: "2024-11-15",
    //   cite: 1,
    // },

    // // --- JANUARY 2025 ---
    // {
    //   id: "jan-1",
    //   month: "January",
    //   title: "Fin semestre (Exam Period)",
    //   type: "Exam",
    //   startDate: "2025-01-21",
    //   cite: 1,
    // },

    // // --- FEBRUARY 2025 ---
    // {
    //   id: "feb-1",
    //   month: "February",
    //   title: "Pré-CEVU Council",
    //   type: "Admin",
    //   startDate: "2025-02-22",
    //   cite: 1,
    // },
    // {
    //   id: "feb-2",
    //   month: "February",
    //   title: "DEVU Council",
    //   type: "Admin",
    //   startDate: "2025-02-20",
    //   cite: 1,
    // },

    // // --- MAY 2025 ---
    // {
    //   id: "may-1",
    //   month: "May",
    //   title: "Fin semestre (Finals)",
    //   type: "Exam",
    //   startDate: "2025-05-20",
    //   endDate: "2025-05-22",
    //   cite: 1,
    // },

    // // --- JUNE 2025 ---
    // {
    //   id: "jun-1",
    //   month: "June",
    //   title: "Fin semestre 2",
    //   type: "Exam",
    //   startDate: "2025-06-10",
    //   cite: 1,
    // },

    // // --- JULY 2025 ---
    // {
    //   id: "jul-1",
    //   month: "July",
    //   title: "Semaine de rattrapage",
    //   type: "Academic",
    //   startDate: "2025-07-01",
    //   endDate: "2025-07-03",
    //   cite: 1,
    // },
    // {
    //   id: "jul-2",
    //   month: "July",
    //   title: "Concours en 13 3",
    //   type: "Exam",
    //   startDate: "2025-07-13",
    //   cite: 1,
    // },
  ],
  glossary: [
    {
      id: "glossary-concours",
      term: "Concours",
      description:
        "Competitive entrance examination period for university admission.",
    },
    {
      id: "glossary-jury",
      term: "Jury",
      description:
        "Academic board session for validating grades and student progression.",
    },
    {
      id: "glossary-rattrapage",
      term: "Rattrapage",
      description:
        "Remedial week for students to catch up on coursework or failed exams.",
    },
    
  ],
};

export function useAcademicCalendarData() {
  return useQuery({
    queryKey: ["academicCalendar"],
    queryFn: async (): Promise<AcademicCalendarData> => {
      const res = await calendarApi.getAcademicCalendar();
      // Always use the static months list so the dropdown shows all 12 months
      return { ...res, months: [...MONTHS] as string[] };
    },
    placeholderData: initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

// ── Calendar Event CRUD ──────────────────────────────────────────────
export function useCalendarActions() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateCalendarEventDto) => calendarApi.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicCalendar"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCalendarEventDto }) =>
      calendarApi.updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicCalendar"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => calendarApi.removeEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicCalendar"] });
    },
  });

  return {
    createEvent: (data: CreateCalendarEventDto) =>
      createMutation.mutateAsync(data),
    updateEvent: (id: string, data: UpdateCalendarEventDto) =>
      updateMutation.mutateAsync({ id, data }),
    deleteEvent: (id: string) => deleteMutation.mutateAsync(id),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}

// ── Glossary CRUD ────────────────────────────────────────────────────
export function useGlossaryActions() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateGlossaryItemDto) =>
      calendarApi.createGlossaryItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicCalendar"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateGlossaryItemDto;
    }) => calendarApi.updateGlossaryItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicCalendar"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => calendarApi.removeGlossaryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academicCalendar"] });
    },
  });

  return {
    createGlossaryItem: (data: CreateGlossaryItemDto) =>
      createMutation.mutateAsync(data),
    updateGlossaryItem: (id: string, data: UpdateGlossaryItemDto) =>
      updateMutation.mutateAsync({ id, data }),
    deleteGlossaryItem: (id: string) => deleteMutation.mutateAsync(id),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}
