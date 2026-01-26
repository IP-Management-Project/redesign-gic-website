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

const heroFields = [
  { key: "hero.subtitle", label: "Hero subtitle", value: "", multiline: true },
];

export default function HubHeroModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const hero = data?.hero ?? { subtitle: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "hero.subtitle": hero.subtitle ?? "",
    });
  }, [hero.subtitle, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "hero.subtitle": String(get(formValues, "hero.subtitle", "")),
    };

    updateRoadmap.mutate(
      { section: "hub-hero", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit hub hero"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={heroFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the hero subtitle displayed over the marquee."
      />
    </SectionModal>
  );
}
