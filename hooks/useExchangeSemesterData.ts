import { useQuery } from "@tanstack/react-query";
import { exchangeApi } from "@/api/services/exchange";

export type ExchangeStoryCard = {
  id: number;
  type: string;
  name: string;
  destination: string;
  backgroundImg: string;
  portrait: string;
  story: string;
  focus: string;
  activityImages?: string[];
  span: string;
};

export function useExchangeSemesterData() {
  return useQuery({
    queryKey: ["exchangeSemester"],
    queryFn: exchangeApi.getAll,
    staleTime: 1000 * 60, // 1 minute
  });
}
