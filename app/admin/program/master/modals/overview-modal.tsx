"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMasterDegreeData, useUpdateMasterDegreeData } from "@/hooks/useMasterDegreeData";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const overviewFields = [
  { key: "overview.title", label: "Section title", value: "" },
  {
    key: "overview.description",
    label: "Section description",
    value: "",
    multiline: true,
  },
  {
    key: "overview.highlightsText",
    label: "Highlights (one per line)",
    value: "",
    multiline: true,
  },
];

export default function MasterOverviewModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMasterDegreeData();
  const updateProgram = useUpdateMasterDegreeData();

  const overview = data?.overview ?? { title: "", description: "", highlights: [] };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "overview.title": overview.title ?? "",
      "overview.description": overview.description ?? "",
      "overview.highlightsText": (overview.highlights ?? []).map((item) => item.text).join("\n"),
    });
  }, [isOpen, overview]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "overview.title": String(get(formValues, "overview.title", "")),
      "overview.description": String(get(formValues, "overview.description", "")),
    };

    const nextHighlights = parseLines(String(get(formValues, "overview.highlightsText", "")));
    const maxHighlights = Math.max(overview.highlights.length, nextHighlights.length);

    for (let index = 0; index < maxHighlights; index += 1) {
      updates[`overview.highlights.${index}.text`] = nextHighlights[index] ?? "";
    }

    updateProgram.mutate(
      { section: "overview", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit overview section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={overviewFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Highlights appear as the two callout cards on the left."
      />
    </SectionModal>
  );
}
