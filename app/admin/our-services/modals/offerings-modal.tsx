"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useServicesData, useUpdateServicesData } from "@/hooks/useServicesData";

const buildFields = (servicesLength: number) => {
  const baseFields = [
    { key: "offerings.title", label: "Offerings title", value: "" },
    {
      key: "offerings.subtitle",
      label: "Offerings subtitle",
      value: "",
      multiline: true,
    },
  ];

  const serviceFields = Array.from({ length: servicesLength }, (_, index) => [
    { key: `mainServices.${index}.title`, label: `Service ${index + 1} title`, value: "" },
    { key: `mainServices.${index}.icon`, label: `Service ${index + 1} icon`, value: "" },
    { key: `mainServices.${index}.href`, label: `Service ${index + 1} href`, value: "" },
  ]).flat();

  return [...baseFields, ...serviceFields];
};

export default function ServicesOfferingsModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useServicesData();
  const updateServices = useUpdateServicesData();

  const offerings = data?.offerings ?? { title: "", subtitle: "" };
  const mainServices = data?.mainServices ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "offerings.title": offerings.title ?? "",
      "offerings.subtitle": offerings.subtitle ?? "",
    };

    mainServices.forEach((service, index) => {
      nextValues[`mainServices.${index}.title`] = service.title ?? "";
      nextValues[`mainServices.${index}.icon`] = service.icon ?? "";
      nextValues[`mainServices.${index}.href`] = service.href ?? "";
    });

    setFormValues(nextValues);
  }, [isOpen, mainServices, offerings.subtitle, offerings.title]);

  const fields = buildFields(mainServices.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "offerings.title": String(get(formValues, "offerings.title", "")),
      "offerings.subtitle": String(get(formValues, "offerings.subtitle", "")),
    };

    mainServices.forEach((_, index) => {
      updates[`mainServices.${index}.title`] = String(get(formValues, `mainServices.${index}.title`, ""));
      updates[`mainServices.${index}.icon`] = String(get(formValues, `mainServices.${index}.icon`, ""));
      updates[`mainServices.${index}.href`] = String(get(formValues, `mainServices.${index}.href`, ""));
    });

    updateServices.mutate(
      { section: "offerings", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit offerings"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateServices.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Service icon options: search, chart, scan, users, cpu, database, layout, video."
      />
    </SectionModal>
  );
}
