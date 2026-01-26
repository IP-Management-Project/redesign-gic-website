"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useEngineeringProgramCopy,
  useUpdateEngineeringProgramCopy,
} from "@/hooks/useEngineeringProgramCopy";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const buildFields = (stepsLength: number) => {
  const baseFields = [
    { key: "roadmap.title", label: "Roadmap title", value: "" },
    { key: "roadmap.subtitle", label: "Roadmap subtitle", value: "", multiline: true },
  ];

  const stepFields = Array.from({ length: stepsLength }, (_, index) => [
    { key: `roadmap.steps.${index}.year`, label: `Step ${index + 1} year`, value: "" },
    { key: `roadmap.steps.${index}.title`, label: `Step ${index + 1} title`, value: "" },
    {
      key: `roadmap.steps.${index}.desc`,
      label: `Step ${index + 1} description`,
      value: "",
      multiline: true,
    },
    {
      key: `roadmap.steps.${index}.tagsText`,
      label: `Step ${index + 1} tags (one per line)`,
      value: "",
      multiline: true,
    },
  ]).flat();

  return [...baseFields, ...stepFields];
};

export default function EngineeringRoadmapModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useEngineeringProgramCopy();
  const updateProgram = useUpdateEngineeringProgramCopy();

  const roadmap = data?.roadmap ?? { title: "", subtitle: "", steps: [] };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "roadmap.title": roadmap.title ?? "",
      "roadmap.subtitle": roadmap.subtitle ?? "",
    };

    roadmap.steps.forEach((step, index) => {
      nextValues[`roadmap.steps.${index}.year`] = step.year ?? "";
      nextValues[`roadmap.steps.${index}.title`] = step.title ?? "";
      nextValues[`roadmap.steps.${index}.desc`] = step.desc ?? "";
      nextValues[`roadmap.steps.${index}.tagsText`] = (step.tags ?? []).join("\n");
    });

    setFormValues(nextValues);
  }, [isOpen, roadmap]);

  const fields = buildFields(roadmap.steps.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "roadmap.title": String(get(formValues, "roadmap.title", "")),
      "roadmap.subtitle": String(get(formValues, "roadmap.subtitle", "")),
    };

    roadmap.steps.forEach((step, index) => {
      updates[`roadmap.steps.${index}.year`] = String(get(formValues, `roadmap.steps.${index}.year`, ""));
      updates[`roadmap.steps.${index}.title`] = String(get(formValues, `roadmap.steps.${index}.title`, ""));
      updates[`roadmap.steps.${index}.desc`] = String(get(formValues, `roadmap.steps.${index}.desc`, ""));

      const tagsText = String(get(formValues, `roadmap.steps.${index}.tagsText`, ""));
      const nextTags = parseLines(tagsText);
      const maxTags = Math.max(step.tags?.length ?? 0, nextTags.length);

      for (let tagIndex = 0; tagIndex < maxTags; tagIndex += 1) {
        updates[`roadmap.steps.${index}.tags.${tagIndex}`] = nextTags[tagIndex] ?? "";
      }
    });

    updateProgram.mutate(
      { section: "roadmap", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit academic roadmap"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Tags appear as badges. Use one tag per line for each step."
      />
    </SectionModal>
  );
}
