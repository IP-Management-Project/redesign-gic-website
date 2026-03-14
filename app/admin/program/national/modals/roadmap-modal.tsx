"use client";

import React from "react";
import { get } from "lodash";
import { Button } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";

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

export default function EngineeringRoadmapModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useEngineeringProgramCopy();
  const updateProgram = useUpdateEngineeringProgramCopy();

  const roadmap = data?.roadmap ?? { title: "", subtitle: "", steps: [] };

  const [stepCount, setStepCount] = React.useState(roadmap.steps.length);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setStepCount(roadmap.steps.length);

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

  const handleAddStep = () => setStepCount((prev) => prev + 1);

  const handleRemoveStep = (indexToRemove: number) => {
    const newValues = { ...formValues };

    for (let i = indexToRemove; i < stepCount - 1; i++) {
      newValues[`roadmap.steps.${i}.year`] = newValues[`roadmap.steps.${i + 1}.year`] ?? "";
      newValues[`roadmap.steps.${i}.title`] = newValues[`roadmap.steps.${i + 1}.title`] ?? "";
      newValues[`roadmap.steps.${i}.desc`] = newValues[`roadmap.steps.${i + 1}.desc`] ?? "";
      newValues[`roadmap.steps.${i}.tagsText`] = newValues[`roadmap.steps.${i + 1}.tagsText`] ?? "";
    }

    delete newValues[`roadmap.steps.${stepCount - 1}.year`];
    delete newValues[`roadmap.steps.${stepCount - 1}.title`];
    delete newValues[`roadmap.steps.${stepCount - 1}.desc`];
    delete newValues[`roadmap.steps.${stepCount - 1}.tagsText`];

    setFormValues(newValues);
    setStepCount((prev) => prev - 1);
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "roadmap.title": String(get(formValues, "roadmap.title", "")),
      "roadmap.subtitle": String(get(formValues, "roadmap.subtitle", "")),
    };

    for (let index = 0; index < stepCount; index++) {
      updates[`roadmap.steps.${index}.year`] = String(get(formValues, `roadmap.steps.${index}.year`, ""));
      updates[`roadmap.steps.${index}.title`] = String(get(formValues, `roadmap.steps.${index}.title`, ""));
      updates[`roadmap.steps.${index}.desc`] = String(get(formValues, `roadmap.steps.${index}.desc`, ""));

      const tagsText = String(get(formValues, `roadmap.steps.${index}.tagsText`, ""));
      const nextTags = parseLines(tagsText);
      const currentTags = roadmap.steps[index]?.tags ?? [];
      const maxTags = Math.max(currentTags.length, nextTags.length);

      for (let tagIndex = 0; tagIndex < maxTags; tagIndex++) {
        updates[`roadmap.steps.${index}.tags.${tagIndex}`] = nextTags[tagIndex] ?? "";
      }
    }

    updateProgram.mutate(
      { section: "roadmap", data: updates },
      { onSuccess: () => onClose() },
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
        fields={[
          { key: "roadmap.title", label: "Roadmap title", value: "" },
          { key: "roadmap.subtitle", label: "Roadmap subtitle", value: "", multiline: true },
        ]}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Tags appear as badges. Use one tag per line for each step."
      />

      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: stepCount }, (_, index) => (
          <div key={index} className="rounded-xl border border-default-200 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-default-600">Step {index + 1}</span>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={() => handleRemoveStep(index)}
              >
                <Trash2 size={15} />
              </Button>
            </div>
            <FieldsForm
              fields={[
                { key: `roadmap.steps.${index}.year`, label: "Year label", value: "" },
                { key: `roadmap.steps.${index}.title`, label: "Title", value: "" },
                { key: `roadmap.steps.${index}.desc`, label: "Description", value: "", multiline: true },
                { key: `roadmap.steps.${index}.tagsText`, label: "Tags (one per line)", value: "", multiline: true },
              ]}
              formValues={formValues}
              onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
            />
          </div>
        ))}

        <Button
          variant="bordered"
          color="primary"
          startContent={<Plus size={16} />}
          onPress={handleAddStep}
          className="w-full border-dashed"
        >
          Add Step
        </Button>
      </div>
    </SectionModal>
  );
}

