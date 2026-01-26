"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useEngineeringProgramCopy,
  useUpdateEngineeringProgramCopy,
} from "@/hooks/useEngineeringProgramCopy";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const buildFields = (methodsLength: number) => {
  const baseFields = [
    { key: "methodology.title", label: "Section title", value: "" },
    {
      key: "methodology.description",
      label: "Section description",
      value: "",
      multiline: true,
    },
    { key: "methodology.researchTitle", label: "Research card title", value: "" },
    { key: "methodology.downloadLabel", label: "Download button label", value: "" },
    {
      key: "methodology.researchDomainsText",
      label: "Research domains (one per line)",
      value: "",
      multiline: true,
    },
  ];

  const methodFields = Array.from({ length: methodsLength }, (_, index) => [
    { key: `methodology.methods.${index}.label`, label: `Method ${index + 1} label`, value: "" },
    { key: `methodology.methods.${index}.title`, label: `Method ${index + 1} title`, value: "" },
    {
      key: `methodology.methods.${index}.desc`,
      label: `Method ${index + 1} description`,
      value: "",
      multiline: true,
    },
  ]).flat();

  return [...baseFields, ...methodFields];
};

export default function EngineeringMethodologyModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useEngineeringProgramCopy();
  const updateProgram = useUpdateEngineeringProgramCopy();

  const methodology =
    data?.methodology ??
    {
      title: "",
      description: "",
      methods: [],
      researchTitle: "",
      researchDomains: [],
      downloadLabel: "",
    };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "methodology.title": methodology.title ?? "",
      "methodology.description": methodology.description ?? "",
      "methodology.researchTitle": methodology.researchTitle ?? "",
      "methodology.downloadLabel": methodology.downloadLabel ?? "",
      "methodology.researchDomainsText": (methodology.researchDomains ?? []).join("\n"),
    };

    methodology.methods.forEach((method, index) => {
      nextValues[`methodology.methods.${index}.label`] = method.label ?? "";
      nextValues[`methodology.methods.${index}.title`] = method.title ?? "";
      nextValues[`methodology.methods.${index}.desc`] = method.desc ?? "";
    });

    setFormValues(nextValues);
  }, [isOpen, methodology]);

  const fields = buildFields(methodology.methods.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "methodology.title": String(get(formValues, "methodology.title", "")),
      "methodology.description": String(get(formValues, "methodology.description", "")),
      "methodology.researchTitle": String(get(formValues, "methodology.researchTitle", "")),
      "methodology.downloadLabel": String(get(formValues, "methodology.downloadLabel", "")),
    };

    methodology.methods.forEach((_, index) => {
      updates[`methodology.methods.${index}.label`] = String(get(formValues, `methodology.methods.${index}.label`, ""));
      updates[`methodology.methods.${index}.title`] = String(get(formValues, `methodology.methods.${index}.title`, ""));
      updates[`methodology.methods.${index}.desc`] = String(get(formValues, `methodology.methods.${index}.desc`, ""));
    });

    const domainsText = String(get(formValues, "methodology.researchDomainsText", ""));
    const nextDomains = parseLines(domainsText);
    const maxDomains = Math.max(methodology.researchDomains?.length ?? 0, nextDomains.length);

    for (let index = 0; index < maxDomains; index += 1) {
      updates[`methodology.researchDomains.${index}`] = nextDomains[index] ?? "";
    }

    updateProgram.mutate(
      { section: "methodology", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit training methodology"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Research domains appear as the list in the right-hand card."
      />
    </SectionModal>
  );
}
