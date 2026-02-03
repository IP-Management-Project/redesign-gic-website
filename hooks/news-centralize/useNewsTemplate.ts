import { newsApi, NewsTemplate } from "@/api/services/news";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Options to control lazy fetching
type UseNewsTemplatesOptions = {
  enabled?: boolean;
};

export function useNewsTemplates(options: UseNewsTemplatesOptions = {}) {
  const queryClient = useQueryClient();
  const { enabled = true } = options;

  // 1. FETCH ALL
  const query = useQuery({
    queryKey: ["news-templates"],
    queryFn: async () => {
      return await newsApi.getNewsTemplate();
    },
    staleTime: 1000 * 60 * 5,
    enabled,
  });

  // 2. FETCH SINGLE (For Editor)
  const useTemplateDetail = (id: string) => useQuery({
    queryKey: ["news-template", id],
    queryFn: async () => {
        return await newsApi.getNewTemplateById(id);
    },
    enabled: !!id,
  });

  // 3. CREATE
  const createMutation = useMutation<NewsTemplate, Error, Partial<NewsTemplate>>({
  mutationFn: async (data) => {
    return await newsApi.createNewTemplate(data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["news-templates"] });
  },
});


  // 4. UPDATE
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<NewsTemplate> }) => {
      return await newsApi.updateNewTemplate(id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["news-templates"] });
      queryClient.invalidateQueries({ queryKey: ["news-template", variables.id] });
    },
  });

  // 5. DELETE
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await newsApi.deleteNewTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news-templates"] });
    },
  });

  return {
    ...query,
    useTemplateDetail,
    createTemplate: createMutation.mutateAsync,
    updateTemplate: updateMutation.mutateAsync,
    deleteTemplate: deleteMutation.mutateAsync,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}