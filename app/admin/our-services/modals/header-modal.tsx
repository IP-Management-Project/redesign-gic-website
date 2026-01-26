"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useServicesData, useUpdateServicesData } from "@/hooks/useServicesData";

const headerFields = [
  { key: "header.title", label: "Header title", value: "" },
  { key: "header.subtitle", label: "Header subtitle", value: "", multiline: true },
];

export default function ServicesHeaderModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useServicesData();
  const updateServices = useUpdateServicesData();

  const header = data?.header ?? { title: "", subtitle: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "header.title": header.title ?? "",
      "header.subtitle": header.subtitle ?? "",
    });
  }, [header.subtitle, header.title, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "header.title": String(get(formValues, "header.title", "")),
      "header.subtitle": String(get(formValues, "header.subtitle", "")),
    };

    updateServices.mutate(
      { section: "header", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit services header"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateServices.isPending}
    >
      <FieldsForm
        fields={headerFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the headline and supporting copy for the services page."
      />
    </SectionModal>
  );
}
