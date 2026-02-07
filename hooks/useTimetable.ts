import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TimetableApi } from "@/service/timetable.api";

export const keys = {
  all: ["timetable"] as const,
  filter: (year: string, semester: string) =>
    ["timetable", year, semester] as const,
};

export function useTimetable(year?: string, semester?: string) {
  return useQuery({
    queryKey: year && semester ? keys.filter(year, semester) : keys.all,
    queryFn: () => TimetableApi.list(year, semester),
  });
}

export function useTimetableActions() {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: TimetableApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      TimetableApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });

  const remove = useMutation({
    mutationFn: TimetableApi.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });

  const replace = useMutation({
    mutationFn: TimetableApi.replaceAll,
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
  });

  return {
    create: create.mutateAsync,
    update: update.mutateAsync,
    delete: remove.mutateAsync,
    replaceAll: replace.mutateAsync,

    isCreating: create.isPending,
    isUpdating: update.isPending,
    isDeleting: remove.isPending,
    isReplacing: replace.isPending,
  };
}
