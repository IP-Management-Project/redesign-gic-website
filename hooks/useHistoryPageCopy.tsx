import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/api/axiosClient";

export type HistoryIconKey = "rocket" | "globe" | "graduation";

export type HistoryImage = {
  src: string;
  alt: string;
};

export type HistoryEntryCopy = {
  period: string;
  heading: string;
  description: string;
  // icon: HistoryIconKey;
  tags: string[];
  images: HistoryImage[];
};

export type HistoryHeroCopy = {
  title: string;
  subtitle: string;
};

export type HistoryPageCopy = {
  hero: HistoryHeroCopy;
  entries: HistoryEntryCopy[];
};

export type HistoryPageUpdatePayload = {
  section: string;
  data: Record<string, string | number | boolean | null>;
};

const HISTORY_CONTENT_SLUG = "history-page";

const emptyHistoryPageCopy: HistoryPageCopy = {
  hero: {
    title: "",
    subtitle: "",
  },
  entries: [],
};

const extractStatusCode = (error: unknown) => {
  const anyError = error as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
    request?: { status?: number };
  };
  return (
    anyError?.statusCode ??
    anyError?.status ??
    anyError?.response?.status ??
    (anyError as any)?.request?.status ??
    null
  );
};

const getHistoryPageCopy = async (): Promise<HistoryPageCopy> => {
  try {
    return await apiClient.get<HistoryPageCopy>(
      `/content/${HISTORY_CONTENT_SLUG}`,
    );
  } catch (error) {
    console.error("Failed to load history page copy; returning empty", error);
    return emptyHistoryPageCopy;
  }
};

export function useHistoryPageCopy() {
  return useQuery({
    queryKey: ["historyPageCopy"],
    queryFn: getHistoryPageCopy,
    initialData: emptyHistoryPageCopy,
    // Always refetch on mount so we replace the fallback with live API data
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}

type UpdatableHistoryCopy = Record<string, unknown>;

const setNestedValue = (
  source: UpdatableHistoryCopy,
  path: string,
  value: string | number | boolean | null,
) => {
  const keys = path.split(".");
  const root = Array.isArray(source) ? [...source] : { ...source };
  let cursor: any = root;

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    const pathKey = Number.isNaN(Number(key)) ? key : Number(key);

    if (isLast) {
      cursor[pathKey] = value;
      return;
    }

    const nextKey = keys[index + 1];
    const nextIsIndex = !Number.isNaN(Number(nextKey));
    const existing = cursor[pathKey];
    const nextValue =
      existing !== undefined
        ? Array.isArray(existing)
          ? [...existing]
          : { ...existing }
        : nextIsIndex
          ? []
          : {};

    cursor[pathKey] = nextValue;
    cursor = nextValue;
  });

  return root as HistoryPageCopy;
};

const applyHistoryCopyUpdate = (
  current: HistoryPageCopy,
  updates: Record<string, string | number | boolean | null>,
): HistoryPageCopy =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateHistoryPageCopy = async (payload: HistoryPageUpdatePayload) => {
  try {
    return await apiClient.patch<HistoryPageCopy>(
      `/content/${HISTORY_CONTENT_SLUG}`,
      payload,
    );
  } catch (error) {
    const status = extractStatusCode(error);

    if (status === 404) {
      // Auto-seed the content block with an empty shape plus the incoming update
      const seeded = applyHistoryCopyUpdate(emptyHistoryPageCopy, payload.data);
      return apiClient.put<HistoryPageCopy>(
        `/content/${HISTORY_CONTENT_SLUG}`,
        {
          data: seeded,
        },
      );
    }

    throw error;
  }
};

export function useUpdateHistoryPageCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHistoryPageCopy,
    onSuccess: (updated, payload) => {
      queryClient.setQueryData<HistoryPageCopy>(
        ["historyPageCopy"],
        (current) => {
          if (updated) return updated;
          if (!current) return current;
          return applyHistoryCopyUpdate(current, payload.data);
        },
      );
    },
  });
}
