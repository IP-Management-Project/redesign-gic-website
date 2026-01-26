"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMasterDegreeData, useUpdateMasterDegreeData } from "@/hooks/useMasterDegreeData";

const curriculumFields = [
  { key: "curriculumSection.title", label: "Curriculum title", value: "" },
  {
    key: "curriculumSection.description",
    label: "Curriculum description",
    value: "",
    multiline: true,
  },
];

export default function MasterCurriculumModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMasterDegreeData();
  const updateProgram = useUpdateMasterDegreeData();

  const curriculumSection = data?.curriculumSection ?? { title: "", description: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "curriculumSection.title": curriculumSection.title ?? "",
      "curriculumSection.description": curriculumSection.description ?? "",
    });
  }, [curriculumSection.description, curriculumSection.title, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "curriculumSection.title": String(get(formValues, "curriculumSection.title", "")),
      "curriculumSection.description": String(get(formValues, "curriculumSection.description", "")),
    };

    updateProgram.mutate(
      { section: "curriculum", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit curriculum section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={curriculumFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="These values appear above the curriculum table."
      />
    </SectionModal>
  );
}
