"use client";

import React from "react";
import { Button } from "@heroui/button";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMasterDegreeData, useUpdateMasterDegreeData } from "@/hooks/useMasterDegreeData";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function MasterFrameworkModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMasterDegreeData();
  const updateProgram = useUpdateMasterDegreeData();

  const framework = data?.framework ?? { title: "", description: "" };
  const courseTypes = data?.courseTypes ?? [];

  const [typeCount, setTypeCount] = React.useState(courseTypes.length);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setTypeCount(courseTypes.length);

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
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddType = () => setTypeCount((prev) => prev + 1);

  const handleRemoveType = (indexToRemove: number) => {
    const updated = { ...formValues };
    for (let i = indexToRemove; i < typeCount - 1; i++) {
      updated[`courseTypes.${i}.title`] = formValues[`courseTypes.${i + 1}.title`] ?? "";
      updated[`courseTypes.${i}.icon`] = formValues[`courseTypes.${i + 1}.icon`] ?? "";
      updated[`courseTypes.${i}.coursesText`] = formValues[`courseTypes.${i + 1}.coursesText`] ?? "";
    }
    delete updated[`courseTypes.${typeCount - 1}.title`];
    delete updated[`courseTypes.${typeCount - 1}.icon`];
    delete updated[`courseTypes.${typeCount - 1}.coursesText`];
    setFormValues(updated);
    setTypeCount((prev) => prev - 1);
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "framework.title": formValues["framework.title"] ?? "",
      "framework.description": formValues["framework.description"] ?? "",
    };

    for (let index = 0; index < typeCount; index++) {
      updates[`courseTypes.${index}.title`] = formValues[`courseTypes.${index}.title`] ?? "";
      updates[`courseTypes.${index}.icon`] = formValues[`courseTypes.${index}.icon`] ?? "";

      const nextCourses = parseLines(formValues[`courseTypes.${index}.coursesText`] ?? "");
      nextCourses.forEach((course, courseIndex) => {
        updates[`courseTypes.${index}.courses.${courseIndex}`] = course;
      });
    }

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
        fields={[
          { key: "framework.title", label: "Framework title", value: "" },
          { key: "framework.description", label: "Framework description", value: "", multiline: true },
        ]}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Icon options: brain, cpu, search."
      />

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Course Types</p>
          <Button size="sm" variant="flat" color="primary" onPress={handleAddType}>
            + Add Course Type
          </Button>
        </div>

        {typeCount === 0 && (
          <p className="text-sm text-slate-400">No course types yet. Add one above.</p>
        )}

        {Array.from({ length: typeCount }, (_, index) => (
          <div key={index} className="rounded-xl border border-gray-200 p-4 dark:border-zinc-700">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Course Type {index + 1}
              </p>
              <Button
                size="sm"
                variant="light"
                color="danger"
                onPress={() => handleRemoveType(index)}
              >
                🗑 Remove
              </Button>
            </div>
            <FieldsForm
              fields={[
                { key: `courseTypes.${index}.title`, label: "Title", value: "" },
                { key: `courseTypes.${index}.icon`, label: "Icon (brain / cpu / search)", value: "" },
                {
                  key: `courseTypes.${index}.coursesText`,
                  label: "Courses (one per line)",
                  value: "",
                  multiline: true,
                },
              ]}
              formValues={formValues}
              onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
            />
          </div>
        ))}
      </div>
    </SectionModal>
  );
}
