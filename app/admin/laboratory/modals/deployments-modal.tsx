"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

const deploymentsFields = [
  { key: "deployments.title", label: "Title", value: "" },
  { key: "deployments.ctaLabel", label: "CTA label", value: "" },
];

export default function DeploymentsModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const deployments = data?.deployments ?? { title: "", ctaLabel: "", items: [] };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "deployments.title": deployments.title ?? "",
      "deployments.ctaLabel": deployments.ctaLabel ?? "",
    });
  }, [deployments.ctaLabel, deployments.title, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "deployments.title": String(get(formValues, "deployments.title", "")),
      "deployments.ctaLabel": String(get(formValues, "deployments.ctaLabel", "")),
    };

    updateLabs.mutate(
      { section: "deployments", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit deployments section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={deploymentsFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Deployment items can be edited individually."
      />
    </SectionModal>
  );
}
