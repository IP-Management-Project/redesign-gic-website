"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { timetableApi } from "@/api/services/timetable";

export type SessionType = "C" | "TD" | "TP";
export const FIXED_SLOTS = ["7-9", "9-11", "1-3", "3-5"];

export interface TimetableSession {
  id: string;
  day: string;
  timeSlot: string;
  subject: string;
  lecturer: string;
  type: SessionType;
  group?: string;
  code?: string;
  // Year and Semester added to the session object for database filtering
  academicYear: string;
  semester: string;
  createdAt?: string;
  updatedAt?: string;
}

// Map the old time strings to the new 2-hour block keys
const timeMap: Record<string, string> = {
  "7h00 - 8h55": "7-9",
  "9h10 - 11h05": "9-11",
  "13h00 - 14h55": "1-3",
  "15h10 - 17h05": "3-5"
};

// Mock data commented out - now using API
// const initialSeededData = [
//   { id: "s1", academicYear: "Year 3", semester: "Semester I", day: "Lundi", timeSlot: "7-9", subject: "Statistique", type: "C", lecturer: "PHOK Ponna", code: "snk2rpb" },
//   { id: "s2", academicYear: "Year 3", semester: "Semester I", day: "Mardi", timeSlot: "7-9", subject: "Anglais", type: "C", lecturer: "TBD", code: "9c3yiph" },
//   { id: "s3", academicYear: "Year 3", semester: "Semester I", day: "Mardi", timeSlot: "1-3", subject: "Algorithms & Programming I", type: "C", lecturer: "BOU Channa", code: "yjdxx1g" },
//   { id: "s4", academicYear: "Year 3", semester: "Semester I", day: "Jeudi", timeSlot: "9-11", subject: "Combinational & Sequential Logic I", type: "C", lecturer: "HENG Rathpisey", code: "skje0zr" },
//   { id: "s5", academicYear: "Year 3", semester: "Semester I", day: "Vendredi", timeSlot: "1-3", subject: "Combinational & Sequential Logic I", type: "TP", lecturer: "HENG Rathpisey", group: "Group A" },
//   { id: "s6", academicYear: "Year 4", semester: "Semester I", day: "Lundi", timeSlot: "7-9", subject: "Combinational & Sequential Logic I", type: "TP", lecturer: "HENG Rathpisey", group: "Group A" },
// ];

export function useTimetableData(year?: string, semester?: string) {
  return useQuery({
    queryKey: ["timetable", year, semester],
    queryFn: async () => {
      const timetable = await timetableApi.findAll({ year, semester });
      return {
        academicYears: ["Year 3", "Year 4", "Year 5", "Master 1", "Master 2"],
        semesters: ["Semester I", "Semester II"],
        days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
        timetable: timetable as TimetableSession[]
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTimetableActions() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: Omit<TimetableSession, "id" | "createdAt" | "updatedAt">) =>
      timetableApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TimetableSession> }) =>
      timetableApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => timetableApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
    },
  });

  const replaceAllMutation = useMutation({
    mutationFn: async (data: Omit<TimetableSession, "id" | "createdAt" | "updatedAt">[]) =>
      timetableApi.replaceAll(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timetable"] });
    },
  });

  const createSession = (data: Omit<TimetableSession, "id" | "createdAt" | "updatedAt">) => {
    createMutation.mutate(data);
  };

  const updateSession = (id: string, data: Partial<TimetableSession>) => {
    updateMutation.mutate({ id, data });
  };

  const deleteSession = (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateTimetable = (sessions: TimetableSession[]) => {
    // Convert to create DTOs (remove id, createdAt, updatedAt)
    const data = sessions.map(({ id, createdAt, updatedAt, ...rest }) => rest);
    replaceAllMutation.mutate(data);
  };

  return {
    createSession,
    updateSession,
    deleteSession,
    updateTimetable,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending || replaceAllMutation.isPending,
  };
}