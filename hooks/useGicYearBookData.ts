import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type GicYearBookEntry = {
  id: string;
  year: string;
  title: string;
  fileUrl: string;
  coverImageUrl: string;
  description?: string;
};

export type GicYearBookData = {
  entries: GicYearBookEntry[];
};

export type GicYearBookUpdate =
  | {
      type: "add";
      entry: GicYearBookEntry;
    }
  | {
      type: "update";
      id: string;
      changes: Partial<GicYearBookEntry>;
    }
  | {
      type: "delete";
      id: string;
    }
  | {
      type: "bulkAdd";
      entries: GicYearBookEntry[];
    };

export type GicYearBookUpdatePayload = {
  updates: GicYearBookUpdate[];
};

export const gicYearBookSeed: GicYearBookData = {
  entries: [
    {
      id: "gic-yearbook-2024",
      year: "2024",
      title: "GIC Year Book 2024",
      fileUrl: "https://example.com/yearbook-2024.pdf",
      coverImageUrl:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a",
      description: "Highlights from the Class of 2024.",
    },
    {
      id: "gic-yearbook-2023",
      year: "2023",
      title: "GIC Year Book 2023",
      fileUrl: "https://example.com/yearbook-2023.pdf",
      coverImageUrl:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      description: "Student stories, events, and academic milestones.",
    },
  ],
};

const cloneValue = <T>(value: T): T => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
};

const getGicYearBookData = async (): Promise<GicYearBookData> =>
  cloneValue(gicYearBookSeed);

const applyYearBookUpdates = (
  current: GicYearBookData,
  updates: GicYearBookUpdate[],
): GicYearBookData => {
  const nextEntries = cloneValue(current.entries);

  updates.forEach((update) => {
    if (update.type === "add") {
      nextEntries.push(update.entry);

      return;
    }

    if (update.type === "bulkAdd") {
      nextEntries.push(...update.entries);

      return;
    }

    if (update.type === "delete") {
      const index = nextEntries.findIndex((entry) => entry.id === update.id);

      if (index === -1) return;
      nextEntries.splice(index, 1);

      return;
    }

    const index = nextEntries.findIndex((entry) => entry.id === update.id);

    if (index === -1) return;

    nextEntries[index] = {
      ...nextEntries[index],
      ...update.changes,
    };
  });

  return {
    entries: nextEntries,
  };
};

const updateGicYearBookData = async (
  payload: GicYearBookUpdatePayload,
): Promise<GicYearBookUpdatePayload> => {
  // TODO: replace with API mutation.
  await new Promise((resolve) => setTimeout(resolve, 200));

  return payload;
};

export function useGicYearBookData() {
  return useQuery({
    queryKey: ["gicYearBook"],
    queryFn: getGicYearBookData,
    initialData: gicYearBookSeed,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useUpdateGicYearBookData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGicYearBookData,
    onSuccess: (payload) => {
      queryClient.setQueryData<GicYearBookData>(["gicYearBook"], (current) => {
        const baseState = current ?? gicYearBookSeed;

        return applyYearBookUpdates(baseState, payload.updates);
      });
    },
  });
}
