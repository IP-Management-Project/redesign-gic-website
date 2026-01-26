"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useIncubationRoadmapData,
  useUpdateIncubationRoadmapData,
} from "@/hooks/useIncubationRoadmapData";

type HubObjectiveModalProps = SectionModalProps & {
  objectiveIndex: number | null;
};

export default function HubObjectiveModal({ isOpen, objectiveIndex, onClose }: HubObjectiveModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const objectives = data?.objectives?.items ?? [];
  const index = objectiveIndex ?? 0;
  const objective = objectives[index] ?? { title: "", desc: "" };

  const fields = [
    { key: `objectives.items.${index}.title`, label: "Objective title", value: "" },
    {
      key: `objectives.items.${index}.desc`,
      label: "Objective description",
      value: "",
      multiline: true,
    },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || objectiveIndex === null) return;

    setFormValues({
      [`objectives.items.${index}.title`]: objective.title ?? "",
      [`objectives.items.${index}.desc`]: objective.desc ?? "",
    });
  }, [index, isOpen, objective.desc, objective.title, objectiveIndex]);

  const handleSave = () => {
    if (objectiveIndex === null) return;

    const updates: Record<string, string> = {
      [`objectives.items.${index}.title`]: String(get(formValues, `objectives.items.${index}.title`, "")),
      [`objectives.items.${index}.desc`]: String(get(formValues, `objectives.items.${index}.desc`, "")),
    };

    updateRoadmap.mutate(
      { section: `hub-objective-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit objective ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the selected objective card content."
      />
    </SectionModal>
  );
}
