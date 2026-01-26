"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const featuredLabFields = [
  { key: "featuredLab.name", label: "Lab name", value: "" },
  { key: "featuredLab.leadLabel", label: "Lead label", value: "" },
  { key: "featuredLab.leadName", label: "Lead name", value: "" },
  { key: "featuredLab.leadEmail", label: "Lead email", value: "" },
  { key: "featuredLab.badgeLabel", label: "Badge label", value: "" },
  { key: "featuredLab.visionLabel", label: "Vision label", value: "" },
  { key: "featuredLab.visionQuote", label: "Vision quote", value: "", multiline: true },
  { key: "featuredLab.interestsLabel", label: "Interests label", value: "" },
  { key: "featuredLab.applicationsLabel", label: "Applications label", value: "" },
  { key: "featuredLab.repositoryLabel", label: "Repository label", value: "" },
  { key: "featuredLab.repositoryHref", label: "Repository link", value: "" },
  {
    key: "researchInterestsText",
    label: "Research interests (one per line)",
    value: "",
    multiline: true,
  },
  {
    key: "expectedApplicationsText",
    label: "Expected applications (one per line)",
    value: "",
    multiline: true,
  },
];

export default function FeaturedLabModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const featuredLab = data?.featuredLab ?? {
    name: "",
    leadLabel: "",
    leadName: "",
    leadEmail: "",
    badgeLabel: "",
    visionLabel: "",
    visionQuote: "",
    interestsLabel: "",
    applicationsLabel: "",
    repositoryLabel: "",
    repositoryHref: "",
  };
  const researchInterests = data?.researchInterests ?? [];
  const expectedApplications = data?.expectedApplications ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "featuredLab.name": featuredLab.name ?? "",
      "featuredLab.leadLabel": featuredLab.leadLabel ?? "",
      "featuredLab.leadName": featuredLab.leadName ?? "",
      "featuredLab.leadEmail": featuredLab.leadEmail ?? "",
      "featuredLab.badgeLabel": featuredLab.badgeLabel ?? "",
      "featuredLab.visionLabel": featuredLab.visionLabel ?? "",
      "featuredLab.visionQuote": featuredLab.visionQuote ?? "",
      "featuredLab.interestsLabel": featuredLab.interestsLabel ?? "",
      "featuredLab.applicationsLabel": featuredLab.applicationsLabel ?? "",
      "featuredLab.repositoryLabel": featuredLab.repositoryLabel ?? "",
      "featuredLab.repositoryHref": featuredLab.repositoryHref ?? "",
      researchInterestsText: researchInterests.join("\n"),
      expectedApplicationsText: expectedApplications.join("\n"),
    });
  }, [expectedApplications, featuredLab, isOpen, researchInterests]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "featuredLab.name": String(get(formValues, "featuredLab.name", "")),
      "featuredLab.leadLabel": String(get(formValues, "featuredLab.leadLabel", "")),
      "featuredLab.leadName": String(get(formValues, "featuredLab.leadName", "")),
      "featuredLab.leadEmail": String(get(formValues, "featuredLab.leadEmail", "")),
      "featuredLab.badgeLabel": String(get(formValues, "featuredLab.badgeLabel", "")),
      "featuredLab.visionLabel": String(get(formValues, "featuredLab.visionLabel", "")),
      "featuredLab.visionQuote": String(get(formValues, "featuredLab.visionQuote", "")),
      "featuredLab.interestsLabel": String(get(formValues, "featuredLab.interestsLabel", "")),
      "featuredLab.applicationsLabel": String(get(formValues, "featuredLab.applicationsLabel", "")),
      "featuredLab.repositoryLabel": String(get(formValues, "featuredLab.repositoryLabel", "")),
      "featuredLab.repositoryHref": String(get(formValues, "featuredLab.repositoryHref", "")),
    };

    const nextInterests = parseLines(String(get(formValues, "researchInterestsText", "")));
    const interestsLength = Math.max(researchInterests.length, nextInterests.length);
    for (let index = 0; index < interestsLength; index += 1) {
      updates[`researchInterests.${index}`] = nextInterests[index] ?? "";
    }

    const nextApplications = parseLines(String(get(formValues, "expectedApplicationsText", "")));
    const applicationsLength = Math.max(expectedApplications.length, nextApplications.length);
    for (let index = 0; index < applicationsLength; index += 1) {
      updates[`expectedApplications.${index}`] = nextApplications[index] ?? "";
    }

    updateLabs.mutate(
      { section: "featured-lab", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit featured lab"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={featuredLabFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the featured lab details and maintain one list item per line."
      />
    </SectionModal>
  );
}
