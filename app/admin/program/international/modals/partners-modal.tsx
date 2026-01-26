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

const buildFields = (partnersLength: number) => {
  const baseFields = [
    { key: "partnersSection.title", label: "Section title", value: "" },
    {
      key: "partnersSection.subtitle",
      label: "Section subtitle",
      value: "",
      multiline: true,
    },
  ];

  const partnerFields = Array.from({ length: partnersLength }, (_, index) => [
    { key: `partners.${index}.name`, label: `Partner ${index + 1} name`, value: "" },
    { key: `partners.${index}.location`, label: `Partner ${index + 1} location`, value: "" },
    {
      key: `partners.${index}.focus`,
      label: `Partner ${index + 1} focus`,
      value: "",
      multiline: true,
    },
  ]).flat();

  return [...baseFields, ...partnerFields];
};

export default function InternationalPartnersModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useInternationalProgramData();
  const updateProgram = useUpdateInternationalProgramData();

  const partnersSection = data?.partnersSection ?? { title: "", subtitle: "" };
  const partners = data?.partners ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "partnersSection.title": partnersSection.title ?? "",
      "partnersSection.subtitle": partnersSection.subtitle ?? "",
    };

    partners.forEach((partner, index) => {
      nextValues[`partners.${index}.name`] = partner.name ?? "";
      nextValues[`partners.${index}.location`] = partner.location ?? "";
      nextValues[`partners.${index}.focus`] = partner.focus ?? "";
    });

    setFormValues(nextValues);
  }, [isOpen, partners, partnersSection.subtitle, partnersSection.title]);

  const fields = buildFields(partners.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "partnersSection.title": String(get(formValues, "partnersSection.title", "")),
      "partnersSection.subtitle": String(get(formValues, "partnersSection.subtitle", "")),
    };

    partners.forEach((_, index) => {
      updates[`partners.${index}.name`] = String(get(formValues, `partners.${index}.name`, ""));
      updates[`partners.${index}.location`] = String(get(formValues, `partners.${index}.location`, ""));
      updates[`partners.${index}.focus`] = String(get(formValues, `partners.${index}.focus`, ""));
    });

    updateProgram.mutate(
      { section: "partners", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit partners section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update section copy and partner cards."
      />
    </SectionModal>
  );
}
