"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMasterDegreeData, useUpdateMasterDegreeData } from "@/hooks/useMasterDegreeData";

const coordinatorFields = [
  { key: "coordinator.title", label: "Coordinator section title", value: "" },
  { key: "coordinator.contacts.email", label: "Coordinator email", value: "" },
  { key: "coordinator.contacts.phone", label: "Coordinator phone", value: "" },
];

export default function MasterCoordinatorModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMasterDegreeData();
  const updateProgram = useUpdateMasterDegreeData();

  const coordinator =
    data?.coordinator ?? { title: "", contacts: { email: "", phone: "" } };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "coordinator.title": coordinator.title ?? "",
      "coordinator.contacts.email": coordinator.contacts.email ?? "",
      "coordinator.contacts.phone": coordinator.contacts.phone ?? "",
    });
  }, [coordinator, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "coordinator.title": String(get(formValues, "coordinator.title", "")),
      "coordinator.contacts.email": String(get(formValues, "coordinator.contacts.email", "")),
      "coordinator.contacts.phone": String(get(formValues, "coordinator.contacts.phone", "")),
    };

    updateProgram.mutate(
      { section: "coordinator", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit coordinator section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={coordinatorFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the coordinator heading and contact details."
      />
    </SectionModal>
  );
}
