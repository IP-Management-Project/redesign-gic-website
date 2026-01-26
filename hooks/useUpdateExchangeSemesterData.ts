import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  ExchangeStoryCard,
} from "@/hooks/useExchangeSemesterData";

export type ExchangeSemesterUpdatePayload = {
  experience: Omit<ExchangeStoryCard, "id"> & { id?: number };
};

const updateExchangeSemesterData = async (
  payload: ExchangeSemesterUpdatePayload,
) => {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return payload;
};

export function useUpdateExchangeSemesterData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExchangeSemesterData,
    onSuccess: (payload) => {
      queryClient.setQueryData<ExchangeStoryCard[]>(
        ["exchangeSemester"],
        (current) => {
          if (!current) return current;

          const maxId = current.reduce(
            (acc, item) => Math.max(acc, item.id),
            0,
          );
          const nextId = payload.experience.id ?? maxId + 1;
          const newEntry: ExchangeStoryCard = {
            ...payload.experience,
            id: nextId,
          };

          return [newEntry, ...current];
        },
      );

      addToast({
        title: "Experience added",
        description: `${payload.experience.name} was added to the exchange stories.`,
        severity: "success",
      });
    },
  });
}
