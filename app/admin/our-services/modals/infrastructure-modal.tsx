"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useServicesData, useUpdateServicesData } from "@/hooks/useServicesData";

const buildFields = (specLength: number) => {
  const baseFields = [
    { key: "infrastructure.badge", label: "Badge", value: "" },
    { key: "infrastructure.titleMain", label: "Title main", value: "" },
    { key: "infrastructure.titleHighlight", label: "Title highlight", value: "" },
    {
      key: "infrastructure.description",
      label: "Description",
      value: "",
      multiline: true,
    },
    { key: "infrastructure.controlTitle", label: "Control title", value: "" },
    {
      key: "infrastructure.controlDesc",
      label: "Control description",
      value: "",
      multiline: true,
    },
    { key: "infrastructure.performanceTitle", label: "Performance title", value: "" },
    {
      key: "infrastructure.performanceDesc",
      label: "Performance description",
      value: "",
      multiline: true,
    },
    { key: "infrastructure.statusLabel", label: "Status label", value: "" },
    { key: "infrastructure.uptimeLabel", label: "Uptime label", value: "" },
    { key: "infrastructure.uptimeValue", label: "Uptime value (e.g. 99%)", value: "" },
  ];

  const specFields = Array.from({ length: specLength }, (_, index) => [
    { key: `serverSpecs.${index}.label`, label: `Spec ${index + 1} label`, value: "" },
    { key: `serverSpecs.${index}.val`, label: `Spec ${index + 1} value`, value: "" },
  ]).flat();

  return [...baseFields, ...specFields];
};

export default function ServicesInfrastructureModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useServicesData();
  const updateServices = useUpdateServicesData();

  const infrastructure =
    data?.infrastructure ??
    {
      badge: "",
      titleMain: "",
      titleHighlight: "",
      description: "",
      controlTitle: "",
      controlDesc: "",
      performanceTitle: "",
      performanceDesc: "",
      statusLabel: "",
      uptimeLabel: "",
      uptimeValue: "",
    };
  const serverSpecs = data?.serverSpecs ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "infrastructure.badge": infrastructure.badge ?? "",
      "infrastructure.titleMain": infrastructure.titleMain ?? "",
      "infrastructure.titleHighlight": infrastructure.titleHighlight ?? "",
      "infrastructure.description": infrastructure.description ?? "",
      "infrastructure.controlTitle": infrastructure.controlTitle ?? "",
      "infrastructure.controlDesc": infrastructure.controlDesc ?? "",
      "infrastructure.performanceTitle": infrastructure.performanceTitle ?? "",
      "infrastructure.performanceDesc": infrastructure.performanceDesc ?? "",
      "infrastructure.statusLabel": infrastructure.statusLabel ?? "",
      "infrastructure.uptimeLabel": infrastructure.uptimeLabel ?? "",
      "infrastructure.uptimeValue": infrastructure.uptimeValue ?? "",
    };

    serverSpecs.forEach((spec, index) => {
      nextValues[`serverSpecs.${index}.label`] = spec.label ?? "";
      nextValues[`serverSpecs.${index}.val`] = spec.val ?? "";
    });

    setFormValues(nextValues);
  }, [infrastructure, isOpen, serverSpecs]);

  const fields = buildFields(serverSpecs.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "infrastructure.badge": String(get(formValues, "infrastructure.badge", "")),
      "infrastructure.titleMain": String(get(formValues, "infrastructure.titleMain", "")),
      "infrastructure.titleHighlight": String(get(formValues, "infrastructure.titleHighlight", "")),
      "infrastructure.description": String(get(formValues, "infrastructure.description", "")),
      "infrastructure.controlTitle": String(get(formValues, "infrastructure.controlTitle", "")),
      "infrastructure.controlDesc": String(get(formValues, "infrastructure.controlDesc", "")),
      "infrastructure.performanceTitle": String(get(formValues, "infrastructure.performanceTitle", "")),
      "infrastructure.performanceDesc": String(get(formValues, "infrastructure.performanceDesc", "")),
      "infrastructure.statusLabel": String(get(formValues, "infrastructure.statusLabel", "")),
      "infrastructure.uptimeLabel": String(get(formValues, "infrastructure.uptimeLabel", "")),
      "infrastructure.uptimeValue": String(get(formValues, "infrastructure.uptimeValue", "")),
    };

    serverSpecs.forEach((_, index) => {
      updates[`serverSpecs.${index}.label`] = String(get(formValues, `serverSpecs.${index}.label`, ""));
      updates[`serverSpecs.${index}.val`] = String(get(formValues, `serverSpecs.${index}.val`, ""));
    });

    updateServices.mutate(
      { section: "infrastructure", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit infrastructure section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateServices.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Keep uptime value in percent format (e.g. 99.9%)."
      />
    </SectionModal>
  );
}
