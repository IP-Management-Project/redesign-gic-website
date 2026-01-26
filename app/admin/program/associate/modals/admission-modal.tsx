"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useAssociateDegreeCopy,
  useUpdateAssociateDegreeCopy,
} from "@/hooks/useAssociateDegreeCopy";

const admissionFields = [
  { key: "admission.title", label: "Admission title", value: "" },
  {
    key: "admission.description",
    label: "Admission description",
    value: "",
    multiline: true,
  },
];

export default function AssociateAdmissionModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useAssociateDegreeCopy();
  const updateProgram = useUpdateAssociateDegreeCopy();

  const admission = data?.admission ?? { title: "", description: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "admission.title": admission.title ?? "",
      "admission.description": admission.description ?? "",
    });
  }, [admission.description, admission.title, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "admission.title": String(get(formValues, "admission.title", "")),
      "admission.description": String(get(formValues, "admission.description", "")),
    };

    updateProgram.mutate(
      { section: "admission", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit admission strip"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={admissionFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="These values appear in the blue admission banner."
      />
    </SectionModal>
  );
}
