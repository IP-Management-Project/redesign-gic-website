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

const objectivesFields = [
  { key: "objectives.titleMain", label: "Title (main)", value: "" },
  { key: "objectives.titleHighlight", label: "Title (highlight)", value: "" },
  { key: "objectives.description", label: "Description", value: "", multiline: true },
];

export default function HubObjectivesModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const objectives = data?.objectives ?? {
    titleMain: "",
    titleHighlight: "",
    description: "",
    items: [],
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "objectives.titleMain": objectives.titleMain ?? "",
      "objectives.titleHighlight": objectives.titleHighlight ?? "",
      "objectives.description": objectives.description ?? "",
    });
  }, [isOpen, objectives.description, objectives.titleHighlight, objectives.titleMain]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "objectives.titleMain": String(get(formValues, "objectives.titleMain", "")),
      "objectives.titleHighlight": String(get(formValues, "objectives.titleHighlight", "")),
      "objectives.description": String(get(formValues, "objectives.description", "")),
    };

    updateRoadmap.mutate(
      { section: "hub-objectives", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit objectives section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={objectivesFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Objective cards can be edited individually from their own buttons."
      />
    </SectionModal>
  );
}
