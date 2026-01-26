"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useIncubationShowcaseData,
  useUpdateIncubationShowcaseData,
} from "@/hooks/useIncubationShowcaseData";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const launchpadFields = [
  { key: "launchpad.titleMain", label: "Title (main)", value: "" },
  { key: "launchpad.titleHighlight", label: "Title (highlight)", value: "" },
  { key: "launchpad.description", label: "Description", value: "", multiline: true },
  {
    key: "launchpad.featuresText",
    label: "Features (one per line)",
    value: "",
    multiline: true,
  },
  { key: "launchpad.images.0.src", label: "Primary image URL", value: "" },
  { key: "launchpad.images.0.alt", label: "Primary image alt", value: "" },
  { key: "launchpad.images.1.src", label: "Secondary image URL", value: "" },
  { key: "launchpad.images.1.alt", label: "Secondary image alt", value: "" },
];

export default function LaunchpadModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationShowcaseData();
  const updateShowcase = useUpdateIncubationShowcaseData();

  const launchpad = data?.launchpad ?? {
    titleMain: "",
    titleHighlight: "",
    description: "",
    features: [],
    images: [],
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "launchpad.titleMain": launchpad.titleMain ?? "",
      "launchpad.titleHighlight": launchpad.titleHighlight ?? "",
      "launchpad.description": launchpad.description ?? "",
      "launchpad.featuresText": (launchpad.features ?? []).join("\n"),
    };

    for (let index = 0; index < 2; index += 1) {
      nextValues[`launchpad.images.${index}.src`] = launchpad.images?.[index]?.src ?? "";
      nextValues[`launchpad.images.${index}.alt`] = launchpad.images?.[index]?.alt ?? "";
    }

    setFormValues(nextValues);
  }, [isOpen, launchpad]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "launchpad.titleMain": String(get(formValues, "launchpad.titleMain", "")),
      "launchpad.titleHighlight": String(get(formValues, "launchpad.titleHighlight", "")),
      "launchpad.description": String(get(formValues, "launchpad.description", "")),
    };

    const featuresText = String(get(formValues, "launchpad.featuresText", ""));
    const nextFeatures = parseLines(featuresText);
    const maxFeatures = Math.max(launchpad.features?.length ?? 0, nextFeatures.length);

    for (let index = 0; index < maxFeatures; index += 1) {
      updates[`launchpad.features.${index}`] = nextFeatures[index] ?? "";
    }

    const maxImages = Math.max(launchpad.images?.length ?? 0, 2);
    for (let index = 0; index < maxImages; index += 1) {
      updates[`launchpad.images.${index}.src`] = String(get(formValues, `launchpad.images.${index}.src`, ""));
      updates[`launchpad.images.${index}.alt`] = String(get(formValues, `launchpad.images.${index}.alt`, ""));
    }

    updateShowcase.mutate(
      { section: "launchpad", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit launchpad section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateShowcase.isPending}
    >
      <FieldsForm
        fields={launchpadFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the launchpad headline, features, and images."
      />
    </SectionModal>
  );
}
