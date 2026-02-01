export type Project = {
  id: string;
  slug: string;
  title: string;
  html: string;
  css: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
