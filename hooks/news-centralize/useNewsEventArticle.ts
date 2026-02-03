import {
  newsApi,
  NewsEventArticleItem,
  NewsEventRelatedBrief,
  NewsEventSpotlight,
} from "@/api/services/news";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type NewsEventArticle = {
  id: string;
  slug?: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  domain: string;
  readingTime: string;
  heroImage: string;
  status?: "PUBLISHED" | "UNPUBLISHED";
  updatedAt?: number;
  htmlBodyPrimary: string;
  htmlBodySecondary: string;
  spotlight?: NewsEventSpotlight;
  relatedBriefs: NewsEventRelatedBrief[];
};

const mapNewsEventArticle = (article: NewsEventArticleItem): NewsEventArticle => ({
  id: article.id,
  slug: article.slug,
  category: article.category,
  title: article.title,
  excerpt: article.excerpt,
  date: article.publishDate,
  domain: article.domain,
  readingTime: article.readingTime,
  heroImage: article.heroImage,
  status: article.status,
  updatedAt: article.updatedAt ? Date.parse(article.updatedAt) : undefined,
  htmlBodyPrimary: article.content?.html ?? "",
  htmlBodySecondary: "",
  spotlight: article.content?.spotlight,
  relatedBriefs: article.content?.relatedBriefs ?? [],
});

export function useNewsEvents() {
  return useQuery({
    queryKey: ["newsEvents"],
    queryFn: async () => {
      const response = await newsApi.getNews();

      return response.data || []; 
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useNewsEventArticle(eventSlug?: string) {
  return useQuery({
    queryKey: ["newsEventArticle", eventSlug],
    queryFn: async () => {
      if (!eventSlug) return null;
      const response = await newsApi.getNewsBySlug(eventSlug);

      const payload = response.data;
      const article = payload && "data" in payload ? payload.data : payload;
      return article ? mapNewsEventArticle(article) : null;
    },
    enabled: !!eventSlug,
    staleTime: 1000 * 60 * 5,
  });
}

export function useNewsEventArticleDetail(eventSlug?: string) {
  return useQuery({
    queryKey: ["newsEventArticleDetail", eventSlug],
    queryFn: async () => {
      if (!eventSlug) return null;
      const response = await newsApi.getNewsBySlug(eventSlug);
      console.log(response);
      
      const payload = response;
      return payload && "data" in payload ? payload.data : payload;
    },
    enabled: !!eventSlug,
    staleTime: 1000 * 60 * 5,
  });
}

export function useNewsEventArticleActions() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (updated: NewsEventArticleItem) => {
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["newsEventArticleDetail", data.slug], data);
      queryClient.setQueryData(["newsEventArticle", data.slug], mapNewsEventArticle(data));
      queryClient.setQueryData(["newsEvents"], (prev?: NewsEventArticleItem[]) =>
        prev ? prev.map((item) => (item.slug === data.slug ? { ...item, ...data } : item)) : prev
      );
    },
  });

  return { saveNews: mutation.mutate, isSaving: mutation.isPending };
}