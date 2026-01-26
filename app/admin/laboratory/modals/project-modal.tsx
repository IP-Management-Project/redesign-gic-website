"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

type ProjectModalProps = SectionModalProps & {
  projectIndex: number | null;
};

export default function ProjectModal({ isOpen, projectIndex, onClose }: ProjectModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const projects = data?.projects ?? [];
  const index = projectIndex ?? 0;
  const project = projects[index] ?? { title: "", topic: "", funder: "", period: "" };

  const fields = [
    { key: `projects.${index}.title`, label: "Project title", value: "" },
    { key: `projects.${index}.topic`, label: "Project topic", value: "", multiline: true },
    { key: `projects.${index}.funder`, label: "Funder", value: "" },
    { key: `projects.${index}.period`, label: "Period", value: "" },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || projectIndex === null) return;

    setFormValues({
      [`projects.${index}.title`]: project.title ?? "",
      [`projects.${index}.topic`]: project.topic ?? "",
      [`projects.${index}.funder`]: project.funder ?? "",
      [`projects.${index}.period`]: project.period ?? "",
    });
  }, [index, isOpen, project.funder, project.period, project.title, project.topic, projectIndex]);

  const handleSave = () => {
    if (projectIndex === null) return;

    const updates: Record<string, string> = {
      [`projects.${index}.title`]: String(get(formValues, `projects.${index}.title`, "")),
      [`projects.${index}.topic`]: String(get(formValues, `projects.${index}.topic`, "")),
      [`projects.${index}.funder`]: String(get(formValues, `projects.${index}.funder`, "")),
      [`projects.${index}.period`]: String(get(formValues, `projects.${index}.period`, "")),
    };

    updateLabs.mutate(
      { section: `project-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit project ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the project information shown in the research grid."
      />
    </SectionModal>
  );
}
