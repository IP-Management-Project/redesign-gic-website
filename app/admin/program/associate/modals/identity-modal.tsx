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

const buildFields = (featuresLength: number) => {
  const baseFields = [
    { key: "identity.title", label: "Section title", value: "" },
    {
      key: "identity.paragraph1",
      label: "Paragraph 1",
      value: "",
      multiline: true,
    },
    {
      key: "identity.paragraph2",
      label: "Paragraph 2",
      value: "",
      multiline: true,
    },
  ];

  const featureFields = Array.from({ length: featuresLength }, (_, index) => [
    { key: `identity.features.${index}.title`, label: `Feature ${index + 1} title`, value: "" },
    {
      key: `identity.features.${index}.desc`,
      label: `Feature ${index + 1} description`,
      value: "",
      multiline: true,
    },
  ]).flat();

  return [...baseFields, ...featureFields];
};

export default function AssociateIdentityModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useAssociateDegreeCopy();
  const updateProgram = useUpdateAssociateDegreeCopy();

  const identity = data?.identity ?? { title: "", paragraph1: "", paragraph2: "", features: [] };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "identity.title": identity.title ?? "",
      "identity.paragraph1": identity.paragraph1 ?? "",
      "identity.paragraph2": identity.paragraph2 ?? "",
    };

    identity.features.forEach((feature, index) => {
      nextValues[`identity.features.${index}.title`] = feature.title ?? "";
      nextValues[`identity.features.${index}.desc`] = feature.desc ?? "";
    });

    setFormValues(nextValues);
  }, [identity, isOpen]);

  const fields = buildFields(identity.features.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "identity.title": String(get(formValues, "identity.title", "")),
      "identity.paragraph1": String(get(formValues, "identity.paragraph1", "")),
      "identity.paragraph2": String(get(formValues, "identity.paragraph2", "")),
    };

    identity.features.forEach((_, index) => {
      updates[`identity.features.${index}.title`] = String(get(formValues, `identity.features.${index}.title`, ""));
      updates[`identity.features.${index}.desc`] = String(get(formValues, `identity.features.${index}.desc`, ""));
    });

    updateProgram.mutate(
      { section: "identity", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit identity section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the section copy and the two feature cards."
      />
    </SectionModal>
  );
}
