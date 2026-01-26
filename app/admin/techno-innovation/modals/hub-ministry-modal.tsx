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

type HubMinistryModalProps = SectionModalProps & {
  ministryIndex: number | null;
};

export default function HubMinistryModal({ isOpen, ministryIndex, onClose }: HubMinistryModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const ministries = data?.ministries ?? [];
  const index = ministryIndex ?? 0;
  const ministry = ministries[index] ?? { name: "", role: "", img: "" };

  const fields = [
    { key: `ministries.${index}.name`, label: "Ministry name", value: "" },
    { key: `ministries.${index}.role`, label: "Ministry role", value: "" },
    { key: `ministries.${index}.img`, label: "Logo path", value: "" },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || ministryIndex === null) return;

    setFormValues({
      [`ministries.${index}.name`]: ministry.name ?? "",
      [`ministries.${index}.role`]: ministry.role ?? "",
      [`ministries.${index}.img`]: ministry.img ?? "",
    });
  }, [index, isOpen, ministry.img, ministry.name, ministry.role, ministryIndex]);

  const handleSave = () => {
    if (ministryIndex === null) return;

    const updates: Record<string, string> = {
      [`ministries.${index}.name`]: String(get(formValues, `ministries.${index}.name`, "")),
      [`ministries.${index}.role`]: String(get(formValues, `ministries.${index}.role`, "")),
      [`ministries.${index}.img`]: String(get(formValues, `ministries.${index}.img`, "")),
    };

    updateRoadmap.mutate(
      { section: `hub-ministry-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit ministry ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the selected ministry logo and tooltip content."
      />
    </SectionModal>
  );
}
