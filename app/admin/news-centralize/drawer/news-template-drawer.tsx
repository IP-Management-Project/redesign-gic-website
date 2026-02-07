"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  Button, Input, Card, Textarea, Tooltip,
  addToast,
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@heroui/react";
import { Pencil, Trash2, Plus, Layout } from "lucide-react";
import { ConfirmModal } from "@/components/admin/common/modals/confirmation-modal";
import { useNewsTemplates } from "@/hooks/news-centralize/useNewsTemplate";

// --- VALIDATION SCHEMA ---
const templateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  description: z.string().optional(),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface TemplateManagementDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function TemplateManagementDrawer({ isOpen, onOpenChange }: TemplateManagementDrawerProps) {
  const router = useRouter();

  // Data Hook
  const { data: templates, isLoading, createTemplate, deleteTemplate, isMutating } = useNewsTemplates({ enabled: isOpen });

  // State
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: { name: "", description: "" },
  });

  // --- SUBMIT HANDLER (CREATE ONLY) ---
  const onSubmit = async (data: TemplateFormData) => {
    try {
      // CREATE MODE: Create and Redirect to Editor
      const newTemplate = await createTemplate({
        ...data,
        html: "",
        css: "",
      });

      addToast({
        title: "Success",
        description: "Template created",
        color: "success",
      });

      onOpenChange(false); // Close drawer
      reset(); // Clear form

      // Redirect to the editor page
      router.push(`news-centralize/template/edit/${newTemplate.id}`);

    } catch (err) {
      console.error("Operation failed", err);
      addToast({
        title: "Error",
        description: "Failed to create template",
        color: "danger",
      });
    }
  };

  // --- DELETE HANDLERS ---
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteTemplate(itemToDelete.id);
      addToast({
        title: "Success",
        description: "Template deleted",
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to delete template",
        color: "danger",
      });
    }
    setItemToDelete(null);
  };

  // Helper to route to editor
  const handleEditRedirect = (id: string) => {
    onOpenChange(false);
    router.push(`news-centralize/template/edit/${id}`);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (!open) reset(); // Reset form on close
          onOpenChange(open);
        }}
        size="md"
        backdrop="blur"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 border-b border-default-100">
                Manage Templates
              </DrawerHeader>

              <DrawerBody className="gap-6 pt-6">

                {/* 1. CREATE FORM SECTION */}
                <div className="bg-default-50 p-4 rounded-medium border border-default-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-small font-bold uppercase text-default-600">
                      Create New Template
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Template Name"
                          placeholder="e.g. Corporate Newsletter"
                          size="sm"
                          variant="bordered"
                          isInvalid={!!errors.name}
                          errorMessage={errors.name?.message}
                        />
                      )}
                    />

                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          label="Description"
                          placeholder="Brief description..."
                          size="sm"
                          variant="bordered"
                          minRows={2}
                        />
                      )}
                    />

                    <Button
                      color="primary"
                      type="submit"
                      isLoading={isMutating}
                      startContent={!isMutating && <Plus size={16} />}
                    >
                      Create & Design
                    </Button>
                  </form>
                </div>

                {/* 2. LIST SECTION */}
                <div className="flex flex-col gap-2 h-full">
                  <h3 className="text-small font-bold uppercase text-default-600 px-1">
                    Existing Templates ({Array.isArray(templates) ? templates.length : 0})
                  </h3>

                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <span className="animate-pulse text-default-400">Loading templates...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-1 pb-10">
                      {Array.isArray(templates) && templates.map((item: any) => (
                        <Card key={item.id} className="p-3 flex-row items-center justify-between shadow-sm border border-default-100 hover:border-default-300 group transition-all">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                              <Popover placement="right">
                                <PopoverTrigger>
                                  <Layout size={24} />
                                </PopoverTrigger>
                                <PopoverContent>
                                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                                    <iframe
                                      srcDoc={`<style>${item.css}</style>${item.html}`}
                                      className="w-[1200px] h-[800px] origin-top-left pointer-events-none"
                                    />
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-small truncate">{item.name}</p>
                              <p className="text-tiny text-default-400 truncate">
                                {item.description || "No description"}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-1 items-center">
                            {/* Edit / Open Button */}
                            <Tooltip content="Open in Editor">
                              <Button
                                isIconOnly size="sm" variant="light"
                                className="text-default-500 hover:text-primary"
                                onPress={() => handleEditRedirect(item.id)}
                              >
                                <Pencil size={18} />
                              </Button>
                            </Tooltip>

                            {/* Delete Button */}
                            <Tooltip content="Delete Template" color="danger">
                              <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => setItemToDelete(item)}>
                                <Trash2 size={18} />
                              </Button>
                            </Tooltip>
                          </div>
                        </Card>
                      ))}
                      {(!templates || (Array.isArray(templates) && templates.length === 0)) && (
                        <div className="text-center text-default-400 text-sm py-4">
                          No templates found. Create one above!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </DrawerBody>

              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* --- CONFIRM MODAL --- */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isMutating}
        title="Delete Template"
        message={
          <span>Are you sure you want to delete <b>{itemToDelete?.name}</b>?</span>
        }
        confirmLabel="Delete"
      />
    </>
  );
}