import { useQuery } from "@tanstack/react-query";

export type PartnerRegion = string;

const partnerRegions: PartnerRegion[] = ["France", "Japan", "Korea"];

const getPartnerRegions = async (): Promise<PartnerRegion[]> => partnerRegions;

export function usePartnerRegionsData() {
  return useQuery({
    queryKey: ["partnerRegions"],
    queryFn: getPartnerRegions,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
