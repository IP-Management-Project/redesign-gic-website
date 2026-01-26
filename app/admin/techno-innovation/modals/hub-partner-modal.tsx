"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useIncubationRoadmapData,
  useUpdateIncubationRoadmapData,
} from "@/hooks/useIncubationRoadmapData";

type HubPartnerModalProps = SectionModalProps & {
  partnerIndex: number | null;
};

export default function HubPartnerModal({ isOpen, partnerIndex, onClose }: HubPartnerModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const partners = data?.partners ?? [];
  const index = partnerIndex ?? 0;
  const partner = partners[index] ?? { name: "", role: "", img: "" };

  const fields = [
    { key: `partners.${index}.name`, label: "Partner name", value: "" },
    { key: `partners.${index}.role`, label: "Partner role", value: "" },
    { key: `partners.${index}.img`, label: "Logo path", value: "" },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || partnerIndex === null) return;

    setFormValues({
      [`partners.${index}.name`]: partner.name ?? "",
      [`partners.${index}.role`]: partner.role ?? "",
      [`partners.${index}.img`]: partner.img ?? "",
    });
  }, [index, isOpen, partner.img, partner.name, partner.role, partnerIndex]);

  const handleSave = () => {
    if (partnerIndex === null) return;

    const updates: Record<string, string> = {
      [`partners.${index}.name`]: String(get(formValues, `partners.${index}.name`, "")),
      [`partners.${index}.role`]: String(get(formValues, `partners.${index}.role`, "")),
      [`partners.${index}.img`]: String(get(formValues, `partners.${index}.img`, "")),
    };

    updateRoadmap.mutate(
      { section: `hub-partner-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit partner ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the selected partner logo and tooltip content."
      />
    </SectionModal>
  );
}
