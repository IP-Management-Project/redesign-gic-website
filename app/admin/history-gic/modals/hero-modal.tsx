"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHistoryPageCopy, useUpdateHistoryPageCopy } from "@/hooks/useHistoryPageCopy";

const heroFields = [
  { key: "hero.title", label: "Hero title", value: "" },
  { key: "hero.subtitle", label: "Hero subtitle", value: "", multiline: true },
];

export default function HistoryHeroModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useHistoryPageCopy();
  const updateHistory = useUpdateHistoryPageCopy();

  const hero = data?.hero ?? { title: "", subtitle: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "hero.title": hero.title ?? "",
      "hero.subtitle": hero.subtitle ?? "",
    });
  }, [isOpen, hero.title, hero.subtitle]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "hero.title": String(get(formValues, "hero.title", "")),
      "hero.subtitle": String(get(formValues, "hero.subtitle", "")),
    };

    updateHistory.mutate(
      { section: "hero", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit history hero"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateHistory.isPending}
    >
      <FieldsForm
        fields={heroFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the headline content shown above the timeline."
      />
    </SectionModal>
  );
}
