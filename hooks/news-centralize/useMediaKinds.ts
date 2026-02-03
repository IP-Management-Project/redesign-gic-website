"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { mediaApi } from "@/api/services/media-category"; // Ensure path is correct

// --- 1. Global Constants & Types ---

// Centralized Query Keys
export const MEDIA_KEYS = {
  all: ["media-kinds"] as const,
  list: () => [...MEDIA_KEYS.all, "list"] as const,
  detail: (id: string) => [...MEDIA_KEYS.all, "detail", id] as const,
};

export type MediaKind = {
  id?: string;
  key: string;
  label: string;
  color?: string;
  sortOrder?: number;
};

// --- 2. The Hook ---

export function useMediaKinds() {
  const queryClient = useQueryClient();

  // --- Helpers for Toast & Cache Management ---
  
  const handleSuccess = (message: string) => {
    // 1. Invalidate Cache
    queryClient.invalidateQueries({ queryKey: MEDIA_KEYS.all });
    
    // 2. Show Success Toast
    addToast({
      title: "Success",
      description: message,
      color: "success",
      timeout: 3000,
    });
  };

  const handleError = (action: string, error: any) => {
    // Try to extract specific API error message (NestJS usually returns message in response.data)
    const description = 
      error?.response?.data?.message || 
      error?.message || 
      "An unexpected error occurred.";

    addToast({
      title: `Failed to ${action}`,
      description: Array.isArray(description) ? description.join(", ") : description, // Handle NestJS array errors
      color: "danger",
    });
  };

  // --- 3. Queries & Mutations ---

  // GET: Fetch List
  const { 
    data: kinds = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: MEDIA_KEYS.all, // Use constant
    queryFn: mediaApi.getKinds,
  });

  // POST: Create
  const createMutation = useMutation({
    mutationFn: mediaApi.createKind,
    onSuccess: () => handleSuccess("Category created successfully."),
    onError: (error) => handleError("create category", error),
  });

  // PATCH: Update
  const updateMutation = useMutation({
    mutationFn: mediaApi.updateKind,
    onSuccess: () => handleSuccess("Category updated successfully."),
    onError: (error) => handleError("update category", error),
  });

  // DELETE: Remove
  const deleteMutation = useMutation({
    mutationFn: mediaApi.deleteKind,
    onSuccess: () => handleSuccess("Category deleted successfully."),
    onError: (error) => handleError("delete category", error),
  });

  return {
    // Data
    kinds,
    isLoading,
    error: (error as Error)?.message,

    // Actions (Wrappers)
    createKind: async (data: Partial<MediaKind>) => createMutation.mutateAsync(data),
    updateKind: async (key: string, data: Partial<MediaKind>) => updateMutation.mutateAsync({ key, data }),
    deleteKind: async (key: string) => deleteMutation.mutateAsync(key),

    // Unified Loading State
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}