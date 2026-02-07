import { request } from "@/lib/http";
import { Project } from "@/types/project";

export type CreatePageDto = {
  slug: string;
  title: string;
  html: string;
  css: string;
};

export const ProjectApi = {
  list() {
    return request<Project[]>("get", "/projects");
  },

  getBySlug(slug: string) {
    return request<Project>("get", `/projects/${slug}`);
  },

  create(data: CreatePageDto) {
    return request<Project>("post", "/projects", data);
  },

  update(slug: string, data: Partial<CreatePageDto>) {
    return request<Project>("patch", `/projects/${slug}`, data);
  },

  delete(slug: string) {
    return request<void>("delete", `/projects/${slug}`);
  },
};
