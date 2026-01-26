"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

const headerFields = [
  { key: "labsHeader.kicker", label: "Kicker", value: "" },
  { key: "labsHeader.title", label: "Title", value: "" },
];

export default function HeaderModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const header = data?.labsHeader ?? { kicker: "", title: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "labsHeader.kicker": header.kicker ?? "",
      "labsHeader.title": header.title ?? "",
    });
  }, [header, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "labsHeader.kicker": String(get(formValues, "labsHeader.kicker", "")),
      "labsHeader.title": String(get(formValues, "labsHeader.title", "")),
    };

    updateLabs.mutate(
      { section: "labs-header", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit labs header"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={headerFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the research excellence kicker and heading."
      />
    </SectionModal>
  );
}
