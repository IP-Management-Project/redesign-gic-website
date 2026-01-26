"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

const heroFields = [
  { key: "hero.titleMain", label: "Title (main)", value: "" },
  { key: "hero.titleHighlight", label: "Title (highlight)", value: "" },
  { key: "hero.subtitle", label: "Subtitle", value: "", multiline: true },
];

export default function HeroModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const hero = data?.hero ?? { titleMain: "", titleHighlight: "", subtitle: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "hero.titleMain": hero.titleMain ?? "",
      "hero.titleHighlight": hero.titleHighlight ?? "",
      "hero.subtitle": hero.subtitle ?? "",
    });
  }, [hero, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "hero.titleMain": String(get(formValues, "hero.titleMain", "")),
      "hero.titleHighlight": String(get(formValues, "hero.titleHighlight", "")),
      "hero.subtitle": String(get(formValues, "hero.subtitle", "")),
    };

    updateLabs.mutate(
      { section: "hero", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit labs hero"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={heroFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the labs hero title and subtitle."
      />
    </SectionModal>
  );
}
