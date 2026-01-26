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

const partnersSectionFields = [
  { key: "partnersSection.title", label: "Section title", value: "" },
  { key: "partnersSection.supportLabel", label: "Support label", value: "" },
];

export default function HubPartnersModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const partnersSection = data?.partnersSection ?? {
    title: "",
    supportLabel: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "partnersSection.title": partnersSection.title ?? "",
      "partnersSection.supportLabel": partnersSection.supportLabel ?? "",
    });
  }, [isOpen, partnersSection.supportLabel, partnersSection.title]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "partnersSection.title": String(get(formValues, "partnersSection.title", "")),
      "partnersSection.supportLabel": String(get(formValues, "partnersSection.supportLabel", "")),
    };

    updateRoadmap.mutate(
      { section: "hub-partners", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit partners section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={partnersSectionFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Partner and ministry logos can be edited individually."
      />
    </SectionModal>
  );
}
