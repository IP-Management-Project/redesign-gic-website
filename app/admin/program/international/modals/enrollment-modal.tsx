"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useInternationalProgramData,
  useUpdateInternationalProgramData,
} from "@/hooks/useInternationalProgramData";

const enrollmentFields = [
  { key: "enrollment.titleMain", label: "Title main", value: "" },
  { key: "enrollment.titleHighlight", label: "Title highlight", value: "" },
  {
    key: "enrollment.description",
    label: "Description",
    value: "",
    multiline: true,
  },
  { key: "enrollment.primaryCtaLabel", label: "Primary CTA label", value: "" },
  { key: "enrollment.secondaryCtaLabel", label: "Secondary CTA label", value: "" },
  { key: "enrollment.scholarshipsLabel", label: "Scholarships label", value: "" },
  { key: "enrollment.duration.label", label: "Duration label", value: "" },
  { key: "enrollment.duration.value", label: "Duration value", value: "" },
  { key: "enrollment.status.label", label: "Status label", value: "" },
  { key: "enrollment.status.value", label: "Status value", value: "" },
];

export default function InternationalEnrollmentModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useInternationalProgramData();
  const updateProgram = useUpdateInternationalProgramData();

  const enrollment =
    data?.enrollment ??
    {
      titleMain: "",
      titleHighlight: "",
      description: "",
      primaryCtaLabel: "",
      secondaryCtaLabel: "",
      scholarshipsLabel: "",
      duration: { label: "", value: "" },
      status: { label: "", value: "" },
    };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "enrollment.titleMain": enrollment.titleMain ?? "",
      "enrollment.titleHighlight": enrollment.titleHighlight ?? "",
      "enrollment.description": enrollment.description ?? "",
      "enrollment.primaryCtaLabel": enrollment.primaryCtaLabel ?? "",
      "enrollment.secondaryCtaLabel": enrollment.secondaryCtaLabel ?? "",
      "enrollment.scholarshipsLabel": enrollment.scholarshipsLabel ?? "",
      "enrollment.duration.label": enrollment.duration.label ?? "",
      "enrollment.duration.value": enrollment.duration.value ?? "",
      "enrollment.status.label": enrollment.status.label ?? "",
      "enrollment.status.value": enrollment.status.value ?? "",
    });
  }, [enrollment, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "enrollment.titleMain": String(get(formValues, "enrollment.titleMain", "")),
      "enrollment.titleHighlight": String(get(formValues, "enrollment.titleHighlight", "")),
      "enrollment.description": String(get(formValues, "enrollment.description", "")),
      "enrollment.primaryCtaLabel": String(get(formValues, "enrollment.primaryCtaLabel", "")),
      "enrollment.secondaryCtaLabel": String(get(formValues, "enrollment.secondaryCtaLabel", "")),
      "enrollment.scholarshipsLabel": String(get(formValues, "enrollment.scholarshipsLabel", "")),
      "enrollment.duration.label": String(get(formValues, "enrollment.duration.label", "")),
      "enrollment.duration.value": String(get(formValues, "enrollment.duration.value", "")),
      "enrollment.status.label": String(get(formValues, "enrollment.status.label", "")),
      "enrollment.status.value": String(get(formValues, "enrollment.status.value", "")),
    };

    updateProgram.mutate(
      { section: "enrollment", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit enrollment section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={enrollmentFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the enrollment headline, CTAs, and stat labels."
      />
    </SectionModal>
  );
}
