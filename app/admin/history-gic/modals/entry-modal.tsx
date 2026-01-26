"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHistoryPageCopy, useUpdateHistoryPageCopy } from "@/hooks/useHistoryPageCopy";

type HistoryEntryModalProps = SectionModalProps & {
  entryIndex: number | null;
};

const buildFields = (entryIndex: number) => [
  { key: `entries.${entryIndex}.period`, label: "Period", value: "" },
  { key: `entries.${entryIndex}.heading`, label: "Heading", value: "" },
  {
    key: `entries.${entryIndex}.description`,
    label: "Description",
    value: "",
    multiline: true,
  },
  {
    key: `entries.${entryIndex}.tagsText`,
    label: "Tags (one per line)",
    value: "",
    multiline: true,
  },
  { key: `entries.${entryIndex}.images.0.src`, label: "Image 1 URL", value: "" },
  { key: `entries.${entryIndex}.images.0.alt`, label: "Image 1 alt text", value: "" },
  { key: `entries.${entryIndex}.images.1.src`, label: "Image 2 URL", value: "" },
  { key: `entries.${entryIndex}.images.1.alt`, label: "Image 2 alt text", value: "" },
];

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function HistoryEntryModal({ isOpen, onClose, entryIndex }: HistoryEntryModalProps) {
  const { data } = useHistoryPageCopy();
  const updateHistory = useUpdateHistoryPageCopy();

  const entry = entryIndex !== null ? data?.entries?.[entryIndex] : undefined;

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || entryIndex === null || !entry) return;

    setFormValues({
      [`entries.${entryIndex}.period`]: entry.period ?? "",
      [`entries.${entryIndex}.heading`]: entry.heading ?? "",
      [`entries.${entryIndex}.description`]: entry.description ?? "",
      [`entries.${entryIndex}.tagsText`]: (entry.tags ?? []).join("\n"),
      [`entries.${entryIndex}.images.0.src`]: entry.images?.[0]?.src ?? "",
      [`entries.${entryIndex}.images.0.alt`]: entry.images?.[0]?.alt ?? "",
      [`entries.${entryIndex}.images.1.src`]: entry.images?.[1]?.src ?? "",
      [`entries.${entryIndex}.images.1.alt`]: entry.images?.[1]?.alt ?? "",
    });
  }, [entry, entryIndex, isOpen]);

  if (entryIndex === null || !entry) return null;

  const fields = buildFields(entryIndex);

  const handleSave = () => {
    const tagsText = String(get(formValues, `entries.${entryIndex}.tagsText`, ""));
    const nextTags = parseLines(tagsText);
    const maxTags = Math.max(entry.tags?.length ?? 0, nextTags.length);

    const updates: Record<string, string> = {
      [`entries.${entryIndex}.period`]: String(get(formValues, `entries.${entryIndex}.period`, "")),
      [`entries.${entryIndex}.heading`]: String(get(formValues, `entries.${entryIndex}.heading`, "")),
      [`entries.${entryIndex}.description`]: String(
        get(formValues, `entries.${entryIndex}.description`, ""),
      ),
      [`entries.${entryIndex}.images.0.src`]: String(
        get(formValues, `entries.${entryIndex}.images.0.src`, ""),
      ),
      [`entries.${entryIndex}.images.0.alt`]: String(
        get(formValues, `entries.${entryIndex}.images.0.alt`, ""),
      ),
      [`entries.${entryIndex}.images.1.src`]: String(
        get(formValues, `entries.${entryIndex}.images.1.src`, ""),
      ),
      [`entries.${entryIndex}.images.1.alt`]: String(
        get(formValues, `entries.${entryIndex}.images.1.alt`, ""),
      ),
    };

    for (let index = 0; index < maxTags; index += 1) {
      updates[`entries.${entryIndex}.tags.${index}`] = nextTags[index] ?? "";
    }

    updateHistory.mutate(
      { section: `entry-${entryIndex}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit timeline entry ${entryIndex + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateHistory.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Edit the period label, description, tags, and supporting images for this milestone."
      />
    </SectionModal>
  );
}
