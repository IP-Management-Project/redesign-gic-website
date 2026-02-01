import { CreatePageDto, ProjectApi } from "@/service/project.api";
import { Project } from "@/types/project";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const keys = {
  all: ["projects"] as const,
  project: (slug: string) => ["project", slug] as const,
};

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: keys.all,
    queryFn: ProjectApi.list,
  });
}

export function useProjectBySlug(slug: string) {
  return useQuery<Project>({
    queryKey: keys.project(slug),
    queryFn: () => ProjectApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function usePageActions() {
  const qc = useQueryClient();

  const createProject = useMutation({
    mutationFn: ProjectApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });

  const saveProject = useMutation({
    mutationFn: ({
      slug,
      data,
    }: {
      slug: string;
      data: Partial<CreatePageDto>;
    }) => ProjectApi.update(slug, data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: keys.all });
      qc.setQueryData(keys.project(data.slug), data);
    },
  });

  return {
    createProject: createProject.mutateAsync,
    saveProject: saveProject.mutateAsync,
    isSaving: saveProject.isPending,
  };
}
