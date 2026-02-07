import { useState, useEffect } from "react";
import { useNewsTemplates } from "./useNewsTemplate";
import { addToast } from "@heroui/toast";

export function useTemplateEditorLogic(template: any, refetch: () => void) {
  const { updateTemplate } = useNewsTemplates();
  const [isSaving, setIsSaving] = useState(false);
  
  // Minimal Header State for Templates
  const [header, setHeader] = useState({
    name: "",
    description: "",
  });

  // Sync State
  useEffect(() => {
    if (!template) return;
    setHeader({
        name: template.name ?? "",
        description: template.description ?? "",
    });
  }, [template]);

  const handleSave = async (editor: any) => {
    if (!editor || !template) return;
    setIsSaving(true);
    try {
        const html = editor.getHtml() || "";
        const css = editor.getCss() || "";

        await updateTemplate({ 
            id: template.id, 
            data: {
                name: header.name,
                description: header.description,
                html,
                css,
            }
        });
        addToast({ title: "Template Updated", description: "Changes saved.", color: "success" });

        refetch();
    } catch (error: any) {
        addToast({ title: "Save Failed", description: error.message || "Failed to save", color: "danger" });
    } finally {
        setIsSaving(false);
    }
  };

  return { header, setHeader, isSaving, handleSave };
}