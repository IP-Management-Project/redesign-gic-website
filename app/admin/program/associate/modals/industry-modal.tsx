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

const buildFields = (sectorsLength: number) => {
  const baseFields = [
    { key: "industry.title", label: "Section title", value: "" },
    {
      key: "industry.subtitle",
      label: "Section subtitle",
      value: "",
      multiline: true,
    },
  ];

  const sectorFields = Array.from({ length: sectorsLength }, (_, index) => [
    { key: `industry.sectors.${index}.title`, label: `Sector ${index + 1} title`, value: "" },
  ]).flat();

  return [...baseFields, ...sectorFields];
};

export default function AssociateIndustryModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useAssociateDegreeCopy();
  const updateProgram = useUpdateAssociateDegreeCopy();

  const industry = data?.industry ?? { title: "", subtitle: "", sectors: [] };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "industry.title": industry.title ?? "",
      "industry.subtitle": industry.subtitle ?? "",
    };

    industry.sectors.forEach((sector, index) => {
      nextValues[`industry.sectors.${index}.title`] = sector.title ?? "";
    });

    setFormValues(nextValues);
  }, [industry, isOpen]);

  const fields = buildFields(industry.sectors.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "industry.title": String(get(formValues, "industry.title", "")),
      "industry.subtitle": String(get(formValues, "industry.subtitle", "")),
    };

    industry.sectors.forEach((_, index) => {
      updates[`industry.sectors.${index}.title`] = String(get(formValues, `industry.sectors.${index}.title`, ""));
    });

    updateProgram.mutate(
      { section: "industry", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit industry training"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the section copy and sector card titles."
      />
    </SectionModal>
  );
}
