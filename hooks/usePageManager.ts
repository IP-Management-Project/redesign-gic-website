"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type GrapesContent = {
  id: string;
  slug: string;
  title: string;
  html: string;
  css: string;
  updatedAt: string;
};

const initialPages: GrapesContent[] = [
  {
    id: "p1",
    slug: "landing-page",
    title: "Main Landing Page",
    html: `<body id="ivuo"><div style="padding:50px; text-align:center;"><h1>GIC Studio</h1><p>Visual Editor Active</p></div></body>`,
    css: `body { margin: 0; } h1 { color: #2563eb; }`,
    updatedAt: "2026-01-27T10:00:00Z",
  },
  {
    id: "p2",
    slug: "contact",
    title: "Contact Form",
    html: `<body id="ivuo"><form style="padding:20px;"><label>Email</label><input type="email" style="display:block;"/><button type="button">Send</button></form></body>`,
    css: `body { background: #fafafa; }`,
    updatedAt: "2026-01-25T14:30:00Z",
  }
];

export function usePages() {
  return useQuery({
    queryKey: ["pages"],
    queryFn: async () => initialPages,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function usePageBySlug(slug: string) {
  return useQuery({
    queryKey: ["page", slug],
    queryFn: async () => {
      const found = initialPages.find(p => p.slug === slug);
      if (!found) throw new Error("Page not found");
      return found;
    },
    enabled: !!slug,
  });
}

export function usePageActions() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updatedPage: GrapesContent) => {
      console.log("Mocking Save to Backend:", updatedPage.html);
      return updatedPage;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["page", data.slug], data);
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    }
  });

  return { savePage: mutation.mutate, isSaving: mutation.isPending };
}