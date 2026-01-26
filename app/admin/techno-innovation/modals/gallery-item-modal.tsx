"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useIncubationShowcaseData,
  useUpdateIncubationShowcaseData,
} from "@/hooks/useIncubationShowcaseData";

type GalleryItemModalProps = SectionModalProps & {
  galleryIndex: number | null;
};

export default function GalleryItemModal({ isOpen, galleryIndex, onClose }: GalleryItemModalProps) {
  const { data } = useIncubationShowcaseData();
  const updateShowcase = useUpdateIncubationShowcaseData();

  const items = data?.galleryItems ?? [];
  const index = galleryIndex ?? 0;
  const item = items[index] ?? { label: "", image: "", span: "" };

  const fields = [
    { key: `galleryItems.${index}.label`, label: "Label", value: "" },
    { key: `galleryItems.${index}.image`, label: "Image URL", value: "" },
    { key: `galleryItems.${index}.span`, label: "Grid span classes", value: "" },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || galleryIndex === null) return;

    setFormValues({
      [`galleryItems.${index}.label`]: item.label ?? "",
      [`galleryItems.${index}.image`]: item.image ?? "",
      [`galleryItems.${index}.span`]: item.span ?? "",
    });
  }, [galleryIndex, index, isOpen, item.image, item.label, item.span]);

  const handleSave = () => {
    if (galleryIndex === null) return;

    const updates: Record<string, string> = {
      [`galleryItems.${index}.label`]: String(get(formValues, `galleryItems.${index}.label`, "")),
      [`galleryItems.${index}.image`]: String(get(formValues, `galleryItems.${index}.image`, "")),
      [`galleryItems.${index}.span`]: String(get(formValues, `galleryItems.${index}.span`, "")),
    };

    updateShowcase.mutate(
      { section: `gallery-item-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit gallery item ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateShowcase.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the gallery image and layout span classes."
      />
    </SectionModal>
  );
}
