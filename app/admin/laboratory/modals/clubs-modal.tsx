"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

const clubsFields = [
  { key: "clubsCopy.titleMain", label: "Title (main)", value: "" },
  { key: "clubsCopy.titleHighlight", label: "Title (highlight)", value: "" },
  { key: "clubsCopy.description", label: "Description", value: "", multiline: true },
  { key: "clubsCopy.ctaLabel", label: "CTA label", value: "" },
];

export default function ClubsModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const clubsCopy = data?.clubsCopy ?? {
    titleMain: "",
    titleHighlight: "",
    description: "",
    ctaLabel: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "clubsCopy.titleMain": clubsCopy.titleMain ?? "",
      "clubsCopy.titleHighlight": clubsCopy.titleHighlight ?? "",
      "clubsCopy.description": clubsCopy.description ?? "",
      "clubsCopy.ctaLabel": clubsCopy.ctaLabel ?? "",
    });
  }, [clubsCopy, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "clubsCopy.titleMain": String(get(formValues, "clubsCopy.titleMain", "")),
      "clubsCopy.titleHighlight": String(get(formValues, "clubsCopy.titleHighlight", "")),
      "clubsCopy.description": String(get(formValues, "clubsCopy.description", "")),
      "clubsCopy.ctaLabel": String(get(formValues, "clubsCopy.ctaLabel", "")),
    };

    updateLabs.mutate(
      { section: "clubs", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit clubs section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={clubsFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the clubs heading, description, and join button label."
      />
    </SectionModal>
  );
}
