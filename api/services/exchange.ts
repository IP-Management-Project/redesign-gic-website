import { apiClient } from "../axiosClient";
import type { ExchangeStoryCard } from "@/hooks/useExchangeSemesterData";

/** Shape returned directly from the NestJS entity (storyId is the numeric PK) */
type ApiStory = Omit<ExchangeStoryCard, "id"> & {
  id: string;      // UUID from BaseEntity
  storyId: number; // Numeric unique column used by CRUD endpoints
};

/** Map the API shape → frontend shape (numeric `id` = storyId) */
function mapStory(s: ApiStory): ExchangeStoryCard {
  return { ...s, id: s.storyId };
}

export const exchangeApi = {
  /** GET /exchange/semester */
  getAll: async (): Promise<ExchangeStoryCard[]> => {
    const data = await apiClient.get<ApiStory[]>("/exchange/semester");
    return data.map(mapStory);
  },

  /** POST /exchange/semester — body: { experience: {...} } */
  create: async (
    story: Omit<ExchangeStoryCard, "id">
  ): Promise<ExchangeStoryCard[]> => {
    const data = await apiClient.post<ApiStory[]>("/exchange/semester", {
      experience: story,
    });
    return data.map(mapStory);
  },

  /** POST /exchange/semester/update — body: { storyId, experience: {...} } */
  update: async (
    storyId: number,
    story: Partial<ExchangeStoryCard>
  ): Promise<ExchangeStoryCard[]> => {
    const data = await apiClient.post<ApiStory[]>("/exchange/semester/update", {
      storyId,
      experience: story,
    });
    return data.map(mapStory);
  },

  /** POST /exchange/semester/delete — body: { storyId } */
  delete: async (storyId: number): Promise<ExchangeStoryCard[]> => {
    const data = await apiClient.post<ApiStory[]>("/exchange/semester/delete", {
      storyId,
    });
    return data.map(mapStory);
  },
};
