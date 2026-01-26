import { useQuery } from "@tanstack/react-query";

import { getVisionPoints, type VisionPoint } from "@/content/vision-points";

export function useVisionPointsData() {
  return useQuery<VisionPoint[]>({
    queryKey: ["visionPoints"],
    queryFn: getVisionPoints,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
