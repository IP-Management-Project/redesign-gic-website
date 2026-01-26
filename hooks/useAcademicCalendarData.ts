import { useQuery } from "@tanstack/react-query";

export type CalendarEvent = {
  month: string;
  title: string;
  type: "Exam" | "Admin" | "Academic" | "Holiday";
  date: string;
  cite: number;
};

export type CalendarGlossaryItem = {
  term: string;
  description: string;
};

export type AcademicCalendarData = {
  months: string[];
  events: CalendarEvent[];
  glossary: CalendarGlossaryItem[];
};

const academicCalendarData: AcademicCalendarData = {
  months: [
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ],
  events: [
    { month: "August", title: "Concours (Entrance Exam)", type: "Exam", date: "Aug 20-22", cite: 3 },
    { month: "September", title: "Jury de Septembre", type: "Admin", date: "Sep 04-12", cite: 3 },
    { month: "October", title: "Rentrée Scolaire", type: "Academic", date: "Oct 16", cite: 3 },
    { month: "October", title: "Fête des Morts (Pchum Ben)", type: "Holiday", date: "Oct", cite: 3 },
    { month: "November", title: "Fête des Eaux (Water Festival)", type: "Holiday", date: "Nov", cite: 3 },
    { month: "January", title: "Examen de Fin Semestre", type: "Exam", date: "Jan", cite: 3 },
    { month: "February", title: "CEVU / GEVU Councils", type: "Admin", date: "Feb", cite: 3 },
    { month: "June", title: "Fin Semestre (Final Exams)", type: "Exam", date: "Jun", cite: 3 },
    { month: "July", title: "Semaine de Rattrapage", type: "Academic", date: "Jul", cite: 3 },
  ],
  glossary: [
    {
      term: "Concours",
      description: "The competitive national entrance examination period held annually in August.",
    },
    {
      term: "CEVU / GEVU",
      description:
        "Institutional councils (Conseil de l'Enseignement et de la Vie Universitaire) that manage academic life.",
    },
    {
      term: "Rattrapage",
      description:
        "Dedicated remedial weeks (Semaine de rattrapage) usually scheduled in July for students to catch up.",
    },
  ],
};

const getAcademicCalendarData = async (): Promise<AcademicCalendarData> => academicCalendarData;

export function useAcademicCalendarData() {
  return useQuery({
    queryKey: ["academicCalendar"],
    queryFn: getAcademicCalendarData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
