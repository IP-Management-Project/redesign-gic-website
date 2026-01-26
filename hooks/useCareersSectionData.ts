import { useQuery } from "@tanstack/react-query";

export type CareerRole = {
  title: string;
  growth: string;
  color: string;
};

export type CareersSectionData = {
  partners: string[];
  roles: CareerRole[];
};

const careersSectionData: CareersSectionData = {
  partners: ["Smart", "Huawei", "ABA Bank", "BRED Bank", "TotalEnergies", "Wing"],
  roles: [
    { title: "DevOps Engineer", growth: "+25%", color: "text-blue-500" },
    { title: "Full-Stack Developer", growth: "+40%", color: "text-emerald-500" },
    { title: "Data Scientist", growth: "+32%", color: "text-purple-500" },
    { title: "Cybersecurity Analyst", growth: "+18%", color: "text-red-500" },
  ],
};

const getCareersSectionData = async (): Promise<CareersSectionData> => careersSectionData;

export function useCareersSectionData() {
  return useQuery({
    queryKey: ["careersSection"],
    queryFn: getCareersSectionData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
