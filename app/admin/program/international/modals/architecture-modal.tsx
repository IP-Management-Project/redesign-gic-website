"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useInternationalProgramData,
  useUpdateInternationalProgramData,
} from "@/hooks/useInternationalProgramData";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const architectureFields = [
  { key: "architecture.title", label: "Section title", value: "" },
  {
    key: "architecture.description",
    label: "Section description",
    value: "",
    multiline: true,
  },
  { key: "architecture.foundation.title", label: "Foundation title", value: "" },
  {
    key: "architecture.foundation.description",
    label: "Foundation description",
    value: "",
    multiline: true,
  },
  { key: "architecture.specialization.title", label: "Specialization title", value: "" },
  {
    key: "architecture.specialization.description",
    label: "Specialization description",
    value: "",
    multiline: true,
  },
  { key: "architecture.mobilityTitle", label: "Mobility card title", value: "" },
  {
    key: "architecture.mobilityDescription",
    label: "Mobility card description",
    value: "",
    multiline: true,
  },
  {
    key: "mobilityHighlightsText",
    label: "Mobility highlights (one per line)",
    value: "",
    multiline: true,
  },
];

export default function InternationalArchitectureModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useInternationalProgramData();
  const updateProgram = useUpdateInternationalProgramData();

  const architecture =
    data?.architecture ??
    {
      title: "",
      description: "",
      foundation: { title: "", description: "" },
      specialization: { title: "", description: "" },
      mobilityTitle: "",
      mobilityDescription: "",
    };
  const mobilityHighlights = data?.mobilityHighlights ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "architecture.title": architecture.title ?? "",
      "architecture.description": architecture.description ?? "",
      "architecture.foundation.title": architecture.foundation.title ?? "",
      "architecture.foundation.description": architecture.foundation.description ?? "",
      "architecture.specialization.title": architecture.specialization.title ?? "",
      "architecture.specialization.description": architecture.specialization.description ?? "",
      "architecture.mobilityTitle": architecture.mobilityTitle ?? "",
      "architecture.mobilityDescription": architecture.mobilityDescription ?? "",
      mobilityHighlightsText: mobilityHighlights.join("\n"),
    });
  }, [architecture, isOpen, mobilityHighlights]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "architecture.title": String(get(formValues, "architecture.title", "")),
      "architecture.description": String(get(formValues, "architecture.description", "")),
      "architecture.foundation.title": String(get(formValues, "architecture.foundation.title", "")),
      "architecture.foundation.description": String(
        get(formValues, "architecture.foundation.description", ""),
      ),
      "architecture.specialization.title": String(
        get(formValues, "architecture.specialization.title", ""),
      ),
      "architecture.specialization.description": String(
        get(formValues, "architecture.specialization.description", ""),
      ),
      "architecture.mobilityTitle": String(get(formValues, "architecture.mobilityTitle", "")),
      "architecture.mobilityDescription": String(
        get(formValues, "architecture.mobilityDescription", ""),
      ),
    };

    const highlightsText = String(get(formValues, "mobilityHighlightsText", ""));
    const nextHighlights = parseLines(highlightsText);
    const maxHighlights = Math.max(mobilityHighlights.length, nextHighlights.length);

    for (let index = 0; index < maxHighlights; index += 1) {
      updates[`mobilityHighlights.${index}`] = nextHighlights[index] ?? "";
    }

    updateProgram.mutate(
      { section: "architecture", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit program architecture"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={architectureFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Mobility highlights appear as the checklist in the blue card."
      />
    </SectionModal>
  );
}
