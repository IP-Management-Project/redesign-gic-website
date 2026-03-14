"use client";

import React from "react";
import { Button } from "@heroui/button";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMasterDegreeData, useUpdateMasterDegreeData } from "@/hooks/useMasterDegreeData";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const baseFields = [
  { key: "eligibility.title", label: "Section title", value: "" },
  { key: "eligibility.applyTitle", label: "Apply card title", value: "" },
  { key: "eligibility.deadlineLabel", label: "Deadline label", value: "" },
  { key: "eligibility.deadlineValue", label: "Deadline value", value: "" },
  { key: "eligibility.submissionLabel", label: "Submission label", value: "" },
  { key: "eligibility.submissionValue", label: "Submission value", value: "" },
  { key: "eligibility.downloadLabel", label: "Download button label", value: "" },
];

export default function MasterEligibilityModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMasterDegreeData();
  const updateProgram = useUpdateMasterDegreeData();

  const eligibility = data?.eligibility ?? {
    title: "",
    cards: [],
    applyTitle: "",
    deadlineLabel: "",
    deadlineValue: "",
    submissionLabel: "",
    submissionValue: "",
    downloadLabel: "",
  };

  const [cardCount, setCardCount] = React.useState(eligibility.cards.length);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setCardCount(eligibility.cards.length);

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
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddCard = () => setCardCount((prev) => prev + 1);

  const handleRemoveCard = (indexToRemove: number) => {
    const updated = { ...formValues };
    for (let i = indexToRemove; i < cardCount - 1; i++) {
      updated[`eligibility.cards.${i}.title`] = formValues[`eligibility.cards.${i + 1}.title`] ?? "";
      updated[`eligibility.cards.${i}.itemsText`] = formValues[`eligibility.cards.${i + 1}.itemsText`] ?? "";
    }
    delete updated[`eligibility.cards.${cardCount - 1}.title`];
    delete updated[`eligibility.cards.${cardCount - 1}.itemsText`];
    setFormValues(updated);
    setCardCount((prev) => prev - 1);
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "eligibility.title": formValues["eligibility.title"] ?? "",
      "eligibility.applyTitle": formValues["eligibility.applyTitle"] ?? "",
      "eligibility.deadlineLabel": formValues["eligibility.deadlineLabel"] ?? "",
      "eligibility.deadlineValue": formValues["eligibility.deadlineValue"] ?? "",
      "eligibility.submissionLabel": formValues["eligibility.submissionLabel"] ?? "",
      "eligibility.submissionValue": formValues["eligibility.submissionValue"] ?? "",
      "eligibility.downloadLabel": formValues["eligibility.downloadLabel"] ?? "",
    };

    for (let index = 0; index < cardCount; index++) {
      updates[`eligibility.cards.${index}.title`] = formValues[`eligibility.cards.${index}.title`] ?? "";

      const nextItems = parseLines(formValues[`eligibility.cards.${index}.itemsText`] ?? "");
      nextItems.forEach((item, itemIndex) => {
        updates[`eligibility.cards.${index}.items.${itemIndex}`] = item;
      });
    }

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
        fields={baseFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Card items appear as bullet points in the eligibility column."
      />

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Eligibility Cards</p>
          <Button size="sm" variant="flat" color="primary" onPress={handleAddCard}>
            + Add Card
          </Button>
        </div>

        {cardCount === 0 && (
          <p className="text-sm text-slate-400">No cards yet. Add one above.</p>
        )}

        {Array.from({ length: cardCount }, (_, index) => (
          <div key={index} className="rounded-xl border border-gray-200 p-4 dark:border-zinc-700">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Card {index + 1}
              </p>
              <Button
                size="sm"
                variant="light"
                color="danger"
                onPress={() => handleRemoveCard(index)}
              >
                🗑 Remove
              </Button>
            </div>
            <FieldsForm
              fields={[
                { key: `eligibility.cards.${index}.title`, label: "Card title", value: "" },
                {
                  key: `eligibility.cards.${index}.itemsText`,
                  label: "Items (one per line)",
                  value: "",
                  multiline: true,
                },
              ]}
              formValues={formValues}
              onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
            />
          </div>
        ))}
      </div>
    </SectionModal>
  );
}
