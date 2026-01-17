import { useQuery } from "@tanstack/react-query";

export type InternationalPartner = {
  name: string;
  location: string;
  focus: string;
};

export type InternationalProgramData = {
  partners: InternationalPartner[];
  mobilityHighlights: string[];
};

const internationalProgramData: InternationalProgramData = {
  partners: [
    { name: "INSA Lyon", location: "Lyon, France", focus: "Master & PhD tracks" },
    { name: "INP Toulouse", location: "Toulouse, France", focus: "Joint-supervision" },
    { name: "UTC Compiègne", location: "Compiègne, France", focus: "Software Architecture" },
    { name: "Polytech Network", location: "France-wide", focus: "Specialized Labs" },
  ],
  mobilityHighlights: [
    "Dual-degree paths with France",
    "International research tracks",
    "French & English language mastery",
  ],
};

const getInternationalProgramData = async (): Promise<InternationalProgramData> => internationalProgramData;

export function useInternationalProgramData() {
  return useQuery({
    queryKey: ["internationalProgram"],
    queryFn: getInternationalProgramData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
