"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

const nodeHubFields = [
  { key: "facilities.nodeHub.kicker", label: "Kicker", value: "" },
  { key: "facilities.nodeHub.titleMain", label: "Title (main)", value: "" },
  { key: "facilities.nodeHub.titleHighlight", label: "Title (highlight)", value: "" },
  { key: "facilities.nodeHub.description", label: "Description", value: "", multiline: true },
  { key: "facilities.nodeHub.image", label: "Image URL", value: "" },
  { key: "facilities.nodeHub.footnote", label: "Footnote", value: "" },
];

export default function FacilitiesNodeModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const nodeHub = data?.facilities?.nodeHub ?? {
    kicker: "",
    titleMain: "",
    titleHighlight: "",
    description: "",
    image: "",
    footnote: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "facilities.nodeHub.kicker": nodeHub.kicker ?? "",
      "facilities.nodeHub.titleMain": nodeHub.titleMain ?? "",
      "facilities.nodeHub.titleHighlight": nodeHub.titleHighlight ?? "",
      "facilities.nodeHub.description": nodeHub.description ?? "",
      "facilities.nodeHub.image": nodeHub.image ?? "",
      "facilities.nodeHub.footnote": nodeHub.footnote ?? "",
    });
  }, [isOpen, nodeHub]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "facilities.nodeHub.kicker": String(get(formValues, "facilities.nodeHub.kicker", "")),
      "facilities.nodeHub.titleMain": String(get(formValues, "facilities.nodeHub.titleMain", "")),
      "facilities.nodeHub.titleHighlight": String(get(formValues, "facilities.nodeHub.titleHighlight", "")),
      "facilities.nodeHub.description": String(get(formValues, "facilities.nodeHub.description", "")),
      "facilities.nodeHub.image": String(get(formValues, "facilities.nodeHub.image", "")),
      "facilities.nodeHub.footnote": String(get(formValues, "facilities.nodeHub.footnote", "")),
    };

    updateLabs.mutate(
      { section: "facilities-node", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit node hub"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={nodeHubFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the physical infrastructure node hub content and imagery."
      />
    </SectionModal>
  );
}
