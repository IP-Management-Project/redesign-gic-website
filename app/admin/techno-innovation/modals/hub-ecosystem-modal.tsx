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

const ecosystemFields = [
  { key: "ecosystem.title", label: "Title", value: "" },
  { key: "ecosystem.description", label: "Description", value: "", multiline: true },
  { key: "ecosystem.leadershipLabel", label: "Leadership label", value: "" },
  { key: "ecosystem.creativityLabel", label: "Creativity label", value: "" },
];

export default function HubEcosystemModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const ecosystem = data?.ecosystem ?? {
    title: "",
    description: "",
    leadershipLabel: "",
    creativityLabel: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "ecosystem.title": ecosystem.title ?? "",
      "ecosystem.description": ecosystem.description ?? "",
      "ecosystem.leadershipLabel": ecosystem.leadershipLabel ?? "",
      "ecosystem.creativityLabel": ecosystem.creativityLabel ?? "",
    });
  }, [ecosystem, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "ecosystem.title": String(get(formValues, "ecosystem.title", "")),
      "ecosystem.description": String(get(formValues, "ecosystem.description", "")),
      "ecosystem.leadershipLabel": String(get(formValues, "ecosystem.leadershipLabel", "")),
      "ecosystem.creativityLabel": String(get(formValues, "ecosystem.creativityLabel", "")),
    };

    updateRoadmap.mutate(
      { section: "hub-ecosystem", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit competition ecosystem"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={ecosystemFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the ecosystem card content and labels."
      />
    </SectionModal>
  );
}
