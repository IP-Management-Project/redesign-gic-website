"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMissionVisionCopy, useUpdateMissionVisionCopy } from "@/hooks/useMissionVisionCopy";

const aboutFields = [
  { key: "about.title", label: "Section title", value: "" },
  { key: "about.descriptionBefore", label: "Intro text before name", value: "" },
  { key: "about.departmentName", label: "Department name", value: "" },
  {
    key: "about.descriptionAfter",
    label: "Text after name",
    value: "",
    multiline: true,
  },
];

export default function MissionVisionAboutModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMissionVisionCopy();
  const updateMissionVision = useUpdateMissionVisionCopy();

  const about =
    data?.about ??
    { title: "", descriptionBefore: "", departmentName: "", descriptionAfter: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "about.title": about.title ?? "",
      "about.descriptionBefore": about.descriptionBefore ?? "",
      "about.departmentName": about.departmentName ?? "",
      "about.descriptionAfter": about.descriptionAfter ?? "",
    });
  }, [about.departmentName, about.descriptionAfter, about.descriptionBefore, about.title, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "about.title": String(get(formValues, "about.title", "")),
      "about.descriptionBefore": String(get(formValues, "about.descriptionBefore", "")),
      "about.departmentName": String(get(formValues, "about.departmentName", "")),
      "about.descriptionAfter": String(get(formValues, "about.descriptionAfter", "")),
    };

    updateMissionVision.mutate(
      { section: "about", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit about section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateMissionVision.isPending}
    >
      <FieldsForm
        fields={aboutFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Keep the department name short so it fits the emphasized style."
      />
    </SectionModal>
  );
}
