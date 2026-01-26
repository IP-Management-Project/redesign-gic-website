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

const heritageFields = [
  { key: "heritage.title", label: "Section title", value: "" },
  { key: "heritage.subtitle", label: "Section subtitle", value: "", multiline: true },
  { key: "heritage.teamsLabel", label: "Teams label", value: "" },
  { key: "heritage.winnerSuffix", label: "Winner suffix", value: "" },
];

export default function HeritageModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationShowcaseData();
  const updateShowcase = useUpdateIncubationShowcaseData();

  const heritage = data?.heritage ?? {
    title: "",
    subtitle: "",
    teamsLabel: "",
    winnerSuffix: "Winner",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "heritage.title": heritage.title ?? "",
      "heritage.subtitle": heritage.subtitle ?? "",
      "heritage.teamsLabel": heritage.teamsLabel ?? "",
      "heritage.winnerSuffix": heritage.winnerSuffix ?? "",
    });
  }, [heritage, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "heritage.title": String(get(formValues, "heritage.title", "")),
      "heritage.subtitle": String(get(formValues, "heritage.subtitle", "")),
      "heritage.teamsLabel": String(get(formValues, "heritage.teamsLabel", "")),
      "heritage.winnerSuffix": String(get(formValues, "heritage.winnerSuffix", "")),
    };

    updateShowcase.mutate(
      { section: "heritage", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit heritage section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateShowcase.isPending}
    >
      <FieldsForm
        fields={heritageFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the heritage explorer heading and labels."
      />
    </SectionModal>
  );
}
