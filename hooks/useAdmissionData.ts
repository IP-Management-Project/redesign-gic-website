import { useQuery } from "@tanstack/react-query";

export type AdmissionData = {
  title: string;
  description: string;
  subjects: string[];
  scholarshipText: string;
  selectionText: string;
};

const admissionData: AdmissionData = {
  title: "How to Join GIC",
  description:
    "Entrance is highly competitive. Every October, high school graduates undergo a rigorous national entrance exam to secure a spot in one of the country's top engineering faculties.",
  subjects: ["Mathematics", "Physics", "Chemistry", "Logic Reasoning"],
  scholarshipText: "80 full 5-year scholarships awarded annually by MoEYS & ITC.",
  selectionText: "Only the top 1,500 students nationwide are eligible for enrollment.",
};

const getAdmissionData = async (): Promise<AdmissionData> => admissionData;

export function useAdmissionData() {
  return useQuery({
    queryKey: ["admission"],
    queryFn: getAdmissionData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
