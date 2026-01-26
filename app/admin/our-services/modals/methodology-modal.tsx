"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useServicesData, useUpdateServicesData } from "@/hooks/useServicesData";

const methodologyFields = [
  { key: "methodology.title", label: "Methodology title", value: "" },
  {
    key: "methodology.description",
    label: "Methodology description",
    value: "",
    multiline: true,
  },
  { key: "methodology.buttonLabel", label: "Button label", value: "" },
];

export default function ServicesMethodologyModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useServicesData();
  const updateServices = useUpdateServicesData();

  const methodology = data?.methodology ?? { title: "", description: "", buttonLabel: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "methodology.title": methodology.title ?? "",
      "methodology.description": methodology.description ?? "",
      "methodology.buttonLabel": methodology.buttonLabel ?? "",
    });
  }, [isOpen, methodology.buttonLabel, methodology.description, methodology.title]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "methodology.title": String(get(formValues, "methodology.title", "")),
      "methodology.description": String(get(formValues, "methodology.description", "")),
      "methodology.buttonLabel": String(get(formValues, "methodology.buttonLabel", "")),
    };

    updateServices.mutate(
      { section: "methodology", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit methodology strip"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateServices.isPending}
    >
      <FieldsForm
        fields={methodologyFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the closing call-to-action band."
      />
    </SectionModal>
  );
}
