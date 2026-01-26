"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

const studioFields = [
  { key: "facilities.studio.title", label: "Title", value: "" },
  { key: "facilities.studio.description", label: "Description", value: "", multiline: true },
  { key: "facilities.studio.equipmentLabel", label: "Equipment label", value: "" },
  { key: "facilities.studio.equipmentValue", label: "Equipment value", value: "" },
  { key: "facilities.studio.partnershipLabel", label: "Partnership label", value: "" },
  { key: "facilities.studio.partnershipValue", label: "Partnership value", value: "" },
  { key: "facilities.studio.note", label: "Footer note", value: "" },
];

export default function FacilitiesStudioModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const studio = data?.facilities?.studio ?? {
    title: "",
    description: "",
    equipmentLabel: "",
    equipmentValue: "",
    partnershipLabel: "",
    partnershipValue: "",
    note: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "facilities.studio.title": studio.title ?? "",
      "facilities.studio.description": studio.description ?? "",
      "facilities.studio.equipmentLabel": studio.equipmentLabel ?? "",
      "facilities.studio.equipmentValue": studio.equipmentValue ?? "",
      "facilities.studio.partnershipLabel": studio.partnershipLabel ?? "",
      "facilities.studio.partnershipValue": studio.partnershipValue ?? "",
      "facilities.studio.note": studio.note ?? "",
    });
  }, [isOpen, studio]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "facilities.studio.title": String(get(formValues, "facilities.studio.title", "")),
      "facilities.studio.description": String(get(formValues, "facilities.studio.description", "")),
      "facilities.studio.equipmentLabel": String(get(formValues, "facilities.studio.equipmentLabel", "")),
      "facilities.studio.equipmentValue": String(get(formValues, "facilities.studio.equipmentValue", "")),
      "facilities.studio.partnershipLabel": String(get(formValues, "facilities.studio.partnershipLabel", "")),
      "facilities.studio.partnershipValue": String(get(formValues, "facilities.studio.partnershipValue", "")),
      "facilities.studio.note": String(get(formValues, "facilities.studio.note", "")),
    };

    updateLabs.mutate(
      { section: "facilities-studio", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit studio"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={studioFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the e-learning studio details, partnership, and footer note."
      />
    </SectionModal>
  );
}
