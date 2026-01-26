import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { HomeCopy } from "@/hooks/useHomePageCopy";

export type HomePageUpdatePayload = {
  section: string;
  data: Record<string, string | boolean>;
};

const setNestedValue = (
  source: HomeCopy,
  path: string,
  value: string | boolean,
): HomeCopy => {
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

  return root as HomeCopy;
};

const applyHomeCopyUpdate = (
  current: HomeCopy,
  updates: Record<string, string | boolean>,
): HomeCopy => {
  return Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );
};

const updateHomePageCopy = async (payload: HomePageUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return payload;
};

export function useUpdateHomePageCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHomePageCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<HomeCopy>(["homeCopy"], (current) => {
        if (!current) return current;
        return applyHomeCopyUpdate(current, payload.data);
      });
    },
  });
}
