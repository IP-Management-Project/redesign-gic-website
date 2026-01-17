import { useQuery } from "@tanstack/react-query";

export type SessionType = "C" | "TD" | "TP";

export type TimetableSession = {
  day: string;
  time: string;
  subject: string;
  type: SessionType;
  lecturer: string;
  code?: string;
  group?: string;
};

export type TimetableData = Record<string, Record<string, TimetableSession[]>>;

export type TimetablePageData = {
  academicYears: string[];
  semesters: string[];
  timetable: TimetableData;
  days: string[];
  legend: Array<{ color: string; label: string }>;
};

const timetablePageData: TimetablePageData = {
  academicYears: ["Year 3", "Year 4", "Year 5", "Master 1", "Master 2"],
  semesters: ["Semester I", "Semester II"],
  days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  legend: [
    { color: "bg-blue-600", label: "Cours (Lecture)" },
    { color: "bg-amber-500", label: "Travaux Dirigés (Tutorial)" },
    { color: "bg-emerald-500", label: "Travaux Pratiques (Lab)" },
  ],
  timetable: {
    "Year 3": {
      "Semester I": [
        {
          day: "Lundi",
          time: "7h00 - 8h55",
          subject: "Statistique",
          type: "C",
          lecturer: "PHOK Ponna",
          code: "snk2rpb",
        },
        {
          day: "Mardi",
          time: "7h00 - 8h55",
          subject: "Anglais",
          type: "C",
          lecturer: "TBD",
          code: "9c3yiph",
        },
        {
          day: "Mardi",
          time: "13h00 - 14h55",
          subject: "Algorithms & Programming I",
          type: "C",
          lecturer: "BOU Channa",
          code: "yjdxx1g",
        },
        {
          day: "Jeudi",
          time: "9h10 - 11h05",
          subject: "Combinational & Sequential Logic I",
          type: "C",
          lecturer: "HENG Rathpisey",
          code: "skje0zr",
        },
        {
          day: "Vendredi",
          time: "13h00 - 14h55",
          subject: "Combinational & Sequential Logic I",
          type: "TP",
          lecturer: "HENG Rathpisey",
          group: "Group A",
        },
      ],
    },
  },
};

const getTimetablePageData = async (): Promise<TimetablePageData> => timetablePageData;

export function useTimetableData() {
  return useQuery({
    queryKey: ["timetablePage"],
    queryFn: getTimetablePageData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
