"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

type DeploymentItemModalProps = SectionModalProps & {
  deploymentIndex: number | null;
};

export default function DeploymentItemModal({
  isOpen,
  deploymentIndex,
  onClose,
}: DeploymentItemModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const items = data?.deployments?.items ?? [];
  const index = deploymentIndex ?? 0;
  const item = items[index] ?? { name: "", status: "" };

  const fields = [
    { key: `deployments.items.${index}.name`, label: "Name", value: "" },
    { key: `deployments.items.${index}.status`, label: "Status", value: "" },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || deploymentIndex === null) return;

    setFormValues({
      [`deployments.items.${index}.name`]: item.name ?? "",
      [`deployments.items.${index}.status`]: item.status ?? "",
    });
  }, [deploymentIndex, index, isOpen, item.name, item.status]);

  const handleSave = () => {
    if (deploymentIndex === null) return;

    const updates: Record<string, string> = {
      [`deployments.items.${index}.name`]: String(get(formValues, `deployments.items.${index}.name`, "")),
      [`deployments.items.${index}.status`]: String(get(formValues, `deployments.items.${index}.status`, "")),
    };

    updateLabs.mutate(
      { section: `deployment-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit deployment ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the deployment name and status label."
      />
    </SectionModal>
  );
}
