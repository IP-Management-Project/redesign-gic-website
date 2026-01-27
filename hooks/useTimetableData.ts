"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
}

// Map the old time strings to the new 2-hour block keys
const timeMap: Record<string, string> = {
  "7h00 - 8h55": "7-9",
  "9h10 - 11h05": "9-11",
  "13h00 - 14h55": "1-3",
  "15h10 - 17h05": "3-5"
};

const initialSeededData = [
  { id: "s1", academicYear: "Year 3", semester: "Semester I", day: "Lundi", timeSlot: "7-9", subject: "Statistique", type: "C", lecturer: "PHOK Ponna", code: "snk2rpb" },
  { id: "s2", academicYear: "Year 3", semester: "Semester I", day: "Mardi", timeSlot: "7-9", subject: "Anglais", type: "C", lecturer: "TBD", code: "9c3yiph" },
  { id: "s3", academicYear: "Year 3", semester: "Semester I", day: "Mardi", timeSlot: "1-3", subject: "Algorithms & Programming I", type: "C", lecturer: "BOU Channa", code: "yjdxx1g" },
  { id: "s4", academicYear: "Year 3", semester: "Semester I", day: "Jeudi", timeSlot: "9-11", subject: "Combinational & Sequential Logic I", type: "C", lecturer: "HENG Rathpisey", code: "skje0zr" },
  { id: "s5", academicYear: "Year 3", semester: "Semester I", day: "Vendredi", timeSlot: "1-3", subject: "Combinational & Sequential Logic I", type: "TP", lecturer: "HENG Rathpisey", group: "Group A" },
  { id: "s6", academicYear: "Year 4", semester: "Semester I", day: "Lundi", timeSlot: "7-9", subject: "Combinational & Sequential Logic I", type: "TP", lecturer: "HENG Rathpisey", group: "Group A" },

];

export function useTimetableData() {
  return useQuery({
    queryKey: ["timetable"],
    queryFn: async () => ({
      academicYears: ["Year 3", "Year 4", "Year 5", "Master 1", "Master 2"],
      semesters: ["Semester I", "Semester II"],
      days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
      timetable: initialSeededData as TimetableSession[]
    }),
  });
}

export function useTimetableActions() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updated: TimetableSession[]) => updated,
    onSuccess: (data) => queryClient.setQueryData(["timetable"], (old: any) => ({ ...old, timetable: data })),
  });
  return { updateTimetable: mutation.mutate };
}