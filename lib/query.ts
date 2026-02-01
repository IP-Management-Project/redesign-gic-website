// src/lib/query.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function createQuery<T>(key: unknown[], fn: () => Promise<T>) {
  return useQuery<T>({
    queryKey: key,
    queryFn: fn,
  });
}

export function createMutation<TData, TVariables>(
  fn: (variables: TVariables) => Promise<TData>,
  invalidateKeys?: unknown[][],
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess() {
      invalidateKeys?.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: key }),
      );
    },
  });
}
