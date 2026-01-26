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

const buildFields = (cardsLength: number) => {
  const baseFields = [
    { key: "eligibility.title", label: "Section title", value: "" },
    { key: "eligibility.applyTitle", label: "Apply card title", value: "" },
    { key: "eligibility.deadlineLabel", label: "Deadline label", value: "" },
    { key: "eligibility.deadlineValue", label: "Deadline value", value: "" },
    { key: "eligibility.submissionLabel", label: "Submission label", value: "" },
    { key: "eligibility.submissionValue", label: "Submission value", value: "" },
    { key: "eligibility.downloadLabel", label: "Download button label", value: "" },
  ];

  const cardFields = Array.from({ length: cardsLength }, (_, index) => [
    { key: `eligibility.cards.${index}.title`, label: `Card ${index + 1} title`, value: "" },
    {
      key: `eligibility.cards.${index}.itemsText`,
      label: `Card ${index + 1} items (one per line)`,
      value: "",
      multiline: true,
    },
  ]).flat();

  return [...baseFields, ...cardFields];
};

export default function MasterEligibilityModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMasterDegreeData();
  const updateProgram = useUpdateMasterDegreeData();

  const eligibility =
    data?.eligibility ??
    {
      title: "",
      cards: [],
      applyTitle: "",
      deadlineLabel: "",
      deadlineValue: "",
      submissionLabel: "",
      submissionValue: "",
      downloadLabel: "",
    };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "eligibility.title": eligibility.title ?? "",
      "eligibility.applyTitle": eligibility.applyTitle ?? "",
      "eligibility.deadlineLabel": eligibility.deadlineLabel ?? "",
      "eligibility.deadlineValue": eligibility.deadlineValue ?? "",
      "eligibility.submissionLabel": eligibility.submissionLabel ?? "",
      "eligibility.submissionValue": eligibility.submissionValue ?? "",
      "eligibility.downloadLabel": eligibility.downloadLabel ?? "",
    };

    eligibility.cards.forEach((card, index) => {
      nextValues[`eligibility.cards.${index}.title`] = card.title ?? "";
      nextValues[`eligibility.cards.${index}.itemsText`] = (card.items ?? []).join("\n");
    });

    setFormValues(nextValues);
  }, [eligibility, isOpen]);

  const fields = buildFields(eligibility.cards.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "eligibility.title": String(get(formValues, "eligibility.title", "")),
      "eligibility.applyTitle": String(get(formValues, "eligibility.applyTitle", "")),
      "eligibility.deadlineLabel": String(get(formValues, "eligibility.deadlineLabel", "")),
      "eligibility.deadlineValue": String(get(formValues, "eligibility.deadlineValue", "")),
      "eligibility.submissionLabel": String(get(formValues, "eligibility.submissionLabel", "")),
      "eligibility.submissionValue": String(get(formValues, "eligibility.submissionValue", "")),
      "eligibility.downloadLabel": String(get(formValues, "eligibility.downloadLabel", "")),
    };

    eligibility.cards.forEach((card, index) => {
      updates[`eligibility.cards.${index}.title`] = String(get(formValues, `eligibility.cards.${index}.title`, ""));

      const nextItems = parseLines(String(get(formValues, `eligibility.cards.${index}.itemsText`, "")));
      const maxItems = Math.max(card.items.length, nextItems.length);

      for (let itemIndex = 0; itemIndex < maxItems; itemIndex += 1) {
        updates[`eligibility.cards.${index}.items.${itemIndex}`] = nextItems[itemIndex] ?? "";
      }
    });

    updateProgram.mutate(
      { section: "eligibility", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit eligibility section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Card items appear as bullet points in the eligibility column."
      />
    </SectionModal>
  );
}
