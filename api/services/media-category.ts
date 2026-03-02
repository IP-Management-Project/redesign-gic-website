import { MediaKind } from "@/hooks/news-centralize/useMediaKinds"; // Or define the type here
import { apiClient } from "../axiosClient";

export const mediaApi = {
  getKinds: async () => {
    return await apiClient.get<MediaKind[]>("/media/kinds");
  },

  createKind: async (payload: Partial<MediaKind>) => {
    return await apiClient.post("/media/kinds", payload);
  },

  updateKind: async ({
    key,
    data,
  }: {
    key: string;
    data: Partial<MediaKind>;
  }) => {
    return await apiClient.patch(`/media/kinds/${key}`, data);
  },

  deleteKind: async (key: string) => {
    return await apiClient.delete(`/media/kinds/${key}`);
  },
};
