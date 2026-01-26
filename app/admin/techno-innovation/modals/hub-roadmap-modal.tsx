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

const roadmapFields = [
  { key: "roadmapSection.titleMain", label: "Title (main)", value: "" },
  { key: "roadmapSection.titleHighlight", label: "Title (highlight)", value: "" },
  { key: "roadmapSection.subtitle", label: "Subtitle", value: "", multiline: true },
];

export default function HubRoadmapModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const roadmapSection = data?.roadmapSection ?? {
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "roadmapSection.titleMain": roadmapSection.titleMain ?? "",
      "roadmapSection.titleHighlight": roadmapSection.titleHighlight ?? "",
      "roadmapSection.subtitle": roadmapSection.subtitle ?? "",
    });
  }, [isOpen, roadmapSection.subtitle, roadmapSection.titleHighlight, roadmapSection.titleMain]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "roadmapSection.titleMain": String(get(formValues, "roadmapSection.titleMain", "")),
      "roadmapSection.titleHighlight": String(get(formValues, "roadmapSection.titleHighlight", "")),
      "roadmapSection.subtitle": String(get(formValues, "roadmapSection.subtitle", "")),
    };

    updateRoadmap.mutate(
      { section: "hub-roadmap", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit roadmap section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={roadmapFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Roadmap stages can be edited individually from their edit buttons."
      />
    </SectionModal>
  );
}
