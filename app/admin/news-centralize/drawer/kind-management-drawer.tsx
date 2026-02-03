"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, 
  Button, Input, Select, SelectItem, Card 
} from "@heroui/react";
import { Pencil, Trash2, X, Plus, AlertCircle } from "lucide-react";
import { useMediaKinds, MediaKind } from "@/hooks/news-centralize/useMediaKinds";
import { ConfirmModal } from "@/components/admin/common/modals/confirmation-modal";

// --- VALIDATION SCHEMA ---
const kindSchema = z.object({
  label: z.string().min(1, "Label is required"),
  key: z.string().min(1, "Key is required")
    .regex(/^[a-z0-9-]+$/, "Lowercase, numbers, hyphens only"),
  color: z.string().min(1, "Color is required"),
});

type KindFormData = z.infer<typeof kindSchema>;

interface KindManagementDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function KindManagementDrawer({ isOpen, onOpenChange }: KindManagementDrawerProps) {
  const { kinds, isLoading, createKind, updateKind, deleteKind, isMutating } = useMediaKinds();
  
  // 1. State for Editing
  const [editingItem, setEditingItem] = useState<MediaKind | null>(null);

  // 2. State for Deleting (Stores the key of the item to delete, or null if closed)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<KindFormData>({
    resolver: zodResolver(kindSchema),
    defaultValues: { label: "", key: "", color: "blue" },
  });

  // --- FORM HANDLERS ---
  useEffect(() => {
    if (editingItem) {
      reset({
        label: editingItem.label,
        key: editingItem.key,
        color: editingItem.color || "blue",
      });
    } else {
      reset({ label: "", key: "", color: "blue" });
    }
  }, [editingItem, reset]);

  const handleLabelChange = (val: string) => {
    setValue("label", val, { shouldValidate: true });
    if (!editingItem) {
      const slug = val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      setValue("key", slug, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: KindFormData) => {
    try {
      if (editingItem) {
        await updateKind(editingItem.key, data);
        setEditingItem(null);
      } else {
        await createKind(data);
        reset();
      }
    } catch (err) {
      console.error("Operation failed", err);
    }
  };

  // --- DELETE HANDLERS ---

  // Step A: User clicks trash icon -> Open Modal
  const requestDelete = (key: string) => {
    setItemToDelete(key);
  };

  // Step B: User clicks Confirm in Modal -> Execute API
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    await deleteKind(itemToDelete);
    
    // If we deleted the item currently being edited, clear the form
    if (editingItem?.key === itemToDelete) {
      setEditingItem(null);
    }
    
    // Close modal
    setItemToDelete(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    reset();
  };

  return (
    <>
      <Drawer 
        isOpen={isOpen} 
        onOpenChange={(open) => {
          if (!open) handleCancelEdit();
          onOpenChange(open);
        }}
        size="md"
        backdrop="blur"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 border-b border-default-100">
                Manage Categories
              </DrawerHeader>

              <DrawerBody className="gap-6 pt-6">
                
                {/* FORM SECTION */}
                <div className="bg-default-50 p-4 rounded-medium border border-default-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-small font-bold uppercase text-default-600">
                      {editingItem ? "Edit Category" : "Create New Category"}
                    </h3>
                    {editingItem && (
                      <Button size="sm" variant="light" color="danger" startContent={<X size={14}/>} onPress={handleCancelEdit}>
                        Cancel Edit
                      </Button>
                    )}
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Controller
                      name="label"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Label"
                          size="sm"
                          variant="bordered"
                          onValueChange={handleLabelChange}
                          isInvalid={!!errors.label}
                          errorMessage={errors.label?.message}
                        />
                      )}
                    />
                    <div className="flex gap-2">
                      <Controller
                        name="key"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Key"
                            size="sm"
                            variant="bordered"
                            isDisabled={!!editingItem}
                            className="flex-1"
                            isInvalid={!!errors.key}
                            errorMessage={errors.key?.message}
                          />
                        )}
                      />
                      <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                          <Select
                            label="Color"
                            size="sm"
                            className="w-32"
                            variant="bordered"
                            selectedKeys={field.value ? [field.value] : []}
                            onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
                          >
                            {["blue", "green", "red", "purple", "orange", "default"].map((c) => (
                              <SelectItem key={c} startContent={<div className={`w-3 h-3 rounded-full bg-${c}-500`}/>}>
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                    </div>
                    <Button 
                      color="primary" 
                      type="submit" 
                      isLoading={isMutating}
                      startContent={!isMutating && (editingItem ? <Pencil size={16}/> : <Plus size={16}/>)}
                    >
                      {editingItem ? "Update Category" : "Create Category"}
                    </Button>
                  </form>
                </div>

                {/* LIST SECTION */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-small font-bold uppercase text-default-600 px-1">
                    Existing Categories ({kinds.length})
                  </h3>
                  
                  {isLoading ? (
                    <p className="text-center text-default-400">Loading...</p>
                  ) : (
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-1">
                      {kinds.map((item: MediaKind) => (
                        <Card key={item.key} className="p-3 flex-row items-center justify-between shadow-sm border border-default-100 hover:border-default-300">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-${item.color || "blue"}-500/20 flex items-center justify-center`}>
                               <div className={`w-3 h-3 rounded-full bg-${item.color || "blue"}-500`} />
                            </div>
                            <div>
                              <p className="font-semibold text-small">{item.label}</p>
                              <p className="text-tiny text-default-400 font-mono">{item.key}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button isIconOnly size="sm" variant="light" onPress={() => setEditingItem(item)}>
                              <Pencil size={16} className="text-default-500" />
                            </Button>
                            
                            {/* UPDATE: Triggers state change instead of window.confirm */}
                            <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => requestDelete(item.key)}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </DrawerBody>

              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close Manager
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* --- CONFIRM MODAL --- */}
      <ConfirmModal
        isOpen={!!itemToDelete} // Open if we have an ID
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        isLoading={isMutating}
        title="Delete Category"
        message={
          <span>
            Are you sure you want to delete <b>{itemToDelete}</b>? 
            <br/>Articles using this category may lose their classification.
          </span>
        }
        confirmLabel="Delete Category"
        // Optional: Add strict mode if you want them to type the key
        // matchKeyword={itemToDelete || undefined} 
      />
    </>
  );
}