"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

const portfolioFields = [
  { key: "researchPortfolio.title", label: "Title", value: "" },
  { key: "researchPortfolio.description", label: "Description", value: "", multiline: true },
];

export default function ResearchPortfolioModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const portfolio = data?.researchPortfolio ?? { title: "", description: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "researchPortfolio.title": portfolio.title ?? "",
      "researchPortfolio.description": portfolio.description ?? "",
    });
  }, [isOpen, portfolio.description, portfolio.title]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "researchPortfolio.title": String(get(formValues, "researchPortfolio.title", "")),
      "researchPortfolio.description": String(get(formValues, "researchPortfolio.description", "")),
    };

    updateLabs.mutate(
      { section: "research-portfolio", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit research portfolio"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={portfolioFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the research portfolio summary card."
      />
    </SectionModal>
  );
}
