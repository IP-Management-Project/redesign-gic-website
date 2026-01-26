"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useServicesData, useUpdateServicesData } from "@/hooks/useServicesData";

const buildFields = (length: number) =>
  Array.from({ length }, (_, index) => [
    { key: `capabilities.${index}.title`, label: `Capability ${index + 1} title`, value: "" },
    {
      key: `capabilities.${index}.desc`,
      label: `Capability ${index + 1} description`,
      value: "",
      multiline: true,
    },
    { key: `capabilities.${index}.icon`, label: `Capability ${index + 1} icon`, value: "" },
  ]).flat();

export default function ServicesCapabilitiesModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useServicesData();
  const updateServices = useUpdateServicesData();

  const capabilities = data?.capabilities ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {};
    capabilities.forEach((capability, index) => {
      nextValues[`capabilities.${index}.title`] = capability.title ?? "";
      nextValues[`capabilities.${index}.desc`] = capability.desc ?? "";
      nextValues[`capabilities.${index}.icon`] = capability.icon ?? "";
    });

    setFormValues(nextValues);
  }, [capabilities, isOpen]);

  const fields = buildFields(capabilities.length);

  const handleSave = () => {
    const updates: Record<string, string> = {};

    capabilities.forEach((_, index) => {
      updates[`capabilities.${index}.title`] = String(get(formValues, `capabilities.${index}.title`, ""));
      updates[`capabilities.${index}.desc`] = String(get(formValues, `capabilities.${index}.desc`, ""));
      updates[`capabilities.${index}.icon`] = String(get(formValues, `capabilities.${index}.icon`, ""));
    });

    updateServices.mutate(
      { section: "capabilities", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit core capabilities"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateServices.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Icon options: globe, search, code, cpu."
      />
    </SectionModal>
  );
}
