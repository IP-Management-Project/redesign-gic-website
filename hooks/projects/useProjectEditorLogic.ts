"use client";

import { useCallback, useState } from "react";
import { usePageActions } from "@/hooks/useProject";

type PageLike = {
  slug: string;
};

export function useProjectEditorLogic(page: PageLike | undefined, refetch?: () => any) {
  const { saveProject, isSaving } = usePageActions();
  const [status, setStatus] = useState("");

  const handleSave = useCallback(
    async (editor: any) => {
      if (!editor || !page) return;

      try {
        setStatus("Syncing... ✅");

        await saveProject({
          slug: page.slug,
          data: {
            html: editor.getHtml(),
            css: editor.getCss(),
          },
        });

        await refetch?.();

        setStatus("Saved ✅");
        setTimeout(() => setStatus(""), 2000);
      } catch (e) {
        console.error(e);
        setStatus("Save failed ❌");
        setTimeout(() => setStatus(""), 3000);
      }
    },
    [page, saveProject, refetch]
  );

  return { isSaving, status, handleSave };
}
