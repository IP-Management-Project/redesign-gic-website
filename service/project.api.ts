import { apiClient } from "@/api/axiosClient";
import { Project } from "@/types/project";

export type CreatePageDto = {
  slug: string;
  title: string;
  html: string;
  css: string;
};

export const ProjectApi = {
  
  list() {
    return apiClient.get<Project[]>("/projects");
  },

  getBySlug(slug: string) {
    return apiClient.get<Project>(`/projects/${slug}`);
  },

  create(data: CreatePageDto) {
    return apiClient.post<Project>("/projects", data);
  },

  update(slug: string, data: Partial<CreatePageDto>) {
    return apiClient.patch<Project>(`/projects/${slug}`, data);
  },
};
