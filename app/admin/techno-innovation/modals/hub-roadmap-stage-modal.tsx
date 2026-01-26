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

type HubRoadmapStageModalProps = SectionModalProps & {
  stageIndex: number | null;
};

export default function HubRoadmapStageModal({ isOpen, stageIndex, onClose }: HubRoadmapStageModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const stages = data?.roadmap ?? [];
  const index = stageIndex ?? 0;
  const stage = stages[index] ?? { stage: "", date: "", desc: "", color: "" };

  const fields = [
    { key: `roadmap.${index}.stage`, label: "Stage", value: "" },
    { key: `roadmap.${index}.date`, label: "Date", value: "" },
    { key: `roadmap.${index}.desc`, label: "Description", value: "", multiline: true },
    { key: `roadmap.${index}.color`, label: "Color class", value: "" },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || stageIndex === null) return;

    setFormValues({
      [`roadmap.${index}.stage`]: stage.stage ?? "",
      [`roadmap.${index}.date`]: stage.date ?? "",
      [`roadmap.${index}.desc`]: stage.desc ?? "",
      [`roadmap.${index}.color`]: stage.color ?? "",
    });
  }, [index, isOpen, stage.color, stage.date, stage.desc, stage.stage, stageIndex]);

  const handleSave = () => {
    if (stageIndex === null) return;

    const updates: Record<string, string> = {
      [`roadmap.${index}.stage`]: String(get(formValues, `roadmap.${index}.stage`, "")),
      [`roadmap.${index}.date`]: String(get(formValues, `roadmap.${index}.date`, "")),
      [`roadmap.${index}.desc`]: String(get(formValues, `roadmap.${index}.desc`, "")),
      [`roadmap.${index}.color`]: String(get(formValues, `roadmap.${index}.color`, "")),
    };

    updateRoadmap.mutate(
      { section: `hub-roadmap-stage-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit roadmap stage ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the stage title, date, description, and Tailwind color class."
      />
    </SectionModal>
  );
}
