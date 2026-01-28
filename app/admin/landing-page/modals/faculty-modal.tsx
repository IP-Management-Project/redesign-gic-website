"use client";

import React from "react";
import { isEmpty, get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHomePageCopy, useUpdateHomePageCopy } from "@/hooks/useHomePageCopy";

const emptyFaculty = {
  facultyKicker: "",
  facultyTitle: "",
  facultyDesc: "",
};

export default function FacultyModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();
  const faculty = isEmpty(homeCopy?.dict?.t) ? emptyFaculty : homeCopy?.dict?.t ?? emptyFaculty;
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  const fields = React.useMemo(
    () => [
      { key: "dict.t.facultyKicker", label: "Faculty kicker", value: faculty.facultyKicker },
      { key: "dict.t.facultyTitle", label: "Faculty title", value: faculty.facultyTitle },
      {
        key: "dict.t.facultyDesc",
        label: "Faculty description",
        value: faculty.facultyDesc,
        multiline: true,
      },
    ],
    [faculty],
  );

  React.useEffect(() => {
    if (!isOpen) return;
    const nextValues = fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.key] = field.value;
      return acc;
    }, {});
    setFormValues(nextValues);
  }, [fields, isOpen]);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const updates = fields.reduce<Record<string, string | boolean>>((acc, field: any) => {
      const value = get(formValues, field.key, formValues[field.key] ?? "");
      acc[field.key] = field.parse ? field.parse(String(value)) : String(value);
      return acc;
    }, {});

    updateHomeCopy.mutate(
      { section: "faculty", data: updates },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <SectionModal
      title="Edit Faculty"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateHomeCopy.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={handleChange}
        description="Update the faculty section heading and description."
      />
    </SectionModal>
  );
}
