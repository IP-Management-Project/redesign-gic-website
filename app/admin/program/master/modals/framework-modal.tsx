"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMasterDegreeData, useUpdateMasterDegreeData } from "@/hooks/useMasterDegreeData";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const buildFields = (typesLength: number) => {
  const baseFields = [
    { key: "framework.title", label: "Framework title", value: "" },
    {
      key: "framework.description",
      label: "Framework description",
      value: "",
      multiline: true,
    },
  ];

  const typeFields = Array.from({ length: typesLength }, (_, index) => [
    { key: `courseTypes.${index}.title`, label: `Course type ${index + 1} title`, value: "" },
    { key: `courseTypes.${index}.icon`, label: `Course type ${index + 1} icon`, value: "" },
    {
      key: `courseTypes.${index}.coursesText`,
      label: `Course type ${index + 1} courses (one per line)`,
      value: "",
      multiline: true,
    },
  ]).flat();

  return [...baseFields, ...typeFields];
};

export default function MasterFrameworkModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMasterDegreeData();
  const updateProgram = useUpdateMasterDegreeData();

  const framework = data?.framework ?? { title: "", description: "" };
  const courseTypes = data?.courseTypes ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "framework.title": framework.title ?? "",
      "framework.description": framework.description ?? "",
    };

    courseTypes.forEach((type, index) => {
      nextValues[`courseTypes.${index}.title`] = type.title ?? "";
      nextValues[`courseTypes.${index}.icon`] = type.icon ?? "";
      nextValues[`courseTypes.${index}.coursesText`] = (type.courses ?? []).join("\n");
    });

    setFormValues(nextValues);
  }, [courseTypes, framework.description, framework.title, isOpen]);

  const fields = buildFields(courseTypes.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "framework.title": String(get(formValues, "framework.title", "")),
      "framework.description": String(get(formValues, "framework.description", "")),
    };

    courseTypes.forEach((type, index) => {
      updates[`courseTypes.${index}.title`] = String(get(formValues, `courseTypes.${index}.title`, ""));
      updates[`courseTypes.${index}.icon`] = String(get(formValues, `courseTypes.${index}.icon`, ""));

      const nextCourses = parseLines(String(get(formValues, `courseTypes.${index}.coursesText`, "")));
      const maxCourses = Math.max(type.courses.length, nextCourses.length);

      for (let courseIndex = 0; courseIndex < maxCourses; courseIndex += 1) {
        updates[`courseTypes.${index}.courses.${courseIndex}`] = nextCourses[courseIndex] ?? "";
      }
    });

    updateProgram.mutate(
      { section: "framework", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit course framework"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Icon options: brain, cpu, search."
      />
    </SectionModal>
  );
}
