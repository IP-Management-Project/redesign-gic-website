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

const careerFields = [
  { key: "career.title", label: "Career card title", value: "" },
  {
    key: "career.description",
    label: "Career card description",
    value: "",
    multiline: true,
  },
  {
    key: "career.tagsText",
    label: "Career tags (one per line)",
    value: "",
    multiline: true,
  },
];

export default function MasterCareerModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMasterDegreeData();
  const updateProgram = useUpdateMasterDegreeData();

  const career = data?.career ?? { title: "", description: "", tags: [] };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "career.title": career.title ?? "",
      "career.description": career.description ?? "",
      "career.tagsText": (career.tags ?? []).join("\n"),
    });
  }, [career, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "career.title": String(get(formValues, "career.title", "")),
      "career.description": String(get(formValues, "career.description", "")),
    };

    const nextTags = parseLines(String(get(formValues, "career.tagsText", "")));
    const maxTags = Math.max(career.tags.length, nextTags.length);

    for (let index = 0; index < maxTags; index += 1) {
      updates[`career.tags.${index}`] = nextTags[index] ?? "";
    }

    updateProgram.mutate(
      { section: "career", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit career card"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={careerFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Tags appear as the pill badges inside the dark career card."
      />
    </SectionModal>
  );
}
