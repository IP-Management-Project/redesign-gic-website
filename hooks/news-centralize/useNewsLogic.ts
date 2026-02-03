import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { emptyHeader, NewsHeaderForm } from "@/app/admin/news-centralize/edit/types/type";
import { newsApi } from "@/api/services/news";

export function useNewsEditorLogic(article: any, refetch: () => void) {
  const [header, setHeader] = useState<NewsHeaderForm>(emptyHeader);
  const [pendingFiles, setPendingFiles] = useState<{ heroFile?: File | null; thumbFile?: File | null; }>({});
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!article) return;
    if (!pendingFiles.heroFile && !pendingFiles.thumbFile) {
      setHeader({
        title: article.title ?? "",
        category: typeof article.category === 'object' ? article.category.key : (article.category ?? ""),
        excerpt: article.excerpt ?? "",
        publishDate: article.publishDate ?? "",
        domain: article.domain ?? "",
        readingTime: article.readingTime ?? "",
        heroImage: article.heroImage ?? "",
        thumbnailImage: article.thumbnailImage ?? "",
        status: (article.status as any) ?? "UNPUBLISHED",
      });
    }
  }, [article]);

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => {
      return newsApi.updateNews(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsEvents"] });
      addToast({ title: "News Updated", description: "Changes saved.", color: "success" });
      refetch?.();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.message || "Failed to save";
      addToast({ title: "Save Failed", description: message, color: "danger" });
    },
  });

  const handleFileSelect = (field: 'hero' | 'thumb', file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPendingFiles(prev => ({ ...prev, [field === 'hero' ? 'heroFile' : 'thumbFile']: file }));
    setHeader(prev => ({ ...prev, [field === 'hero' ? 'heroImage' : 'thumbnailImage']: previewUrl }));
  };

  const handleRemoveFile = (field: 'hero' | 'thumb') => {
    setPendingFiles(prev => ({ ...prev, [field === 'hero' ? 'heroFile' : 'thumbFile']: null }));
    setHeader(prev => ({ ...prev, [field === 'hero' ? 'heroImage' : 'thumbnailImage']: "" }));
  };

  const handleSave = (editor: any) => {
    if (!editor || !article) return;

    const updatedContent = {
      grapesPageId: article.content?.grapesPageId ?? "p1",
      slug: article.slug,
      title: header.title || article.title,
      html: editor.getHtml() || "",
      css: editor.getCss() || "",
      spotlight: article.content?.spotlight,
      relatedBriefs: article.content?.relatedBriefs,
      updatedAt: new Date().toISOString(),
    };

    const metadataPayload = { ...header, content: updatedContent };

    const formData = new FormData();
    formData.append("data", JSON.stringify(metadataPayload));

    if (pendingFiles.heroFile) formData.append("heroFile", pendingFiles.heroFile);
    if (pendingFiles.thumbFile) formData.append("thumbFile", pendingFiles.thumbFile);

    mutation.mutate({ id: article.id, data: formData });
  };

  return {
    header,
    setHeader,
    isSaving: mutation.isPending,
    handleFileSelect,
    handleRemoveFile,
    handleSave
  };
}