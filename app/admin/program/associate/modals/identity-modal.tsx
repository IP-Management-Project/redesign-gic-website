"use client";

import React from "react";
import { get } from "lodash";
import { Button } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useAssociateDegreeCopy,
  useUpdateAssociateDegreeCopy,
} from "@/hooks/useAssociateDegreeCopy";

export default function AssociateIdentityModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useAssociateDegreeCopy();
  const updateProgram = useUpdateAssociateDegreeCopy();

  const identity = data?.identity ?? { title: "", paragraph1: "", paragraph2: "", features: [] };

  const [featureCount, setFeatureCount] = React.useState(identity.features.length);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFeatureCount(identity.features.length);

    const nextValues: Record<string, string> = {
      "identity.title": identity.title ?? "",
      "identity.paragraph1": identity.paragraph1 ?? "",
      "identity.paragraph2": identity.paragraph2 ?? "",
    };

    identity.features.forEach((feature, index) => {
      nextValues[`identity.features.${index}.title`] = feature.title ?? "";
      nextValues[`identity.features.${index}.desc`] = feature.desc ?? "";
    });

    setFormValues(nextValues);
  }, [identity, isOpen]);

  const handleAddFeature = () => setFeatureCount((prev) => prev + 1);

  const handleRemoveFeature = (indexToRemove: number) => {
    const newValues = { ...formValues };

    for (let i = indexToRemove; i < featureCount - 1; i++) {
      newValues[`identity.features.${i}.title`] = newValues[`identity.features.${i + 1}.title`] ?? "";
      newValues[`identity.features.${i}.desc`] = newValues[`identity.features.${i + 1}.desc`] ?? "";
    }
    delete newValues[`identity.features.${featureCount - 1}.title`];
    delete newValues[`identity.features.${featureCount - 1}.desc`];

    setFormValues(newValues);
    setFeatureCount((prev) => prev - 1);
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "identity.title": String(get(formValues, "identity.title", "")),
      "identity.paragraph1": String(get(formValues, "identity.paragraph1", "")),
      "identity.paragraph2": String(get(formValues, "identity.paragraph2", "")),
    };

    for (let index = 0; index < featureCount; index++) {
      updates[`identity.features.${index}.title`] = String(get(formValues, `identity.features.${index}.title`, ""));
      updates[`identity.features.${index}.desc`] = String(get(formValues, `identity.features.${index}.desc`, ""));
    }

    updateProgram.mutate(
      { section: "identity", data: updates },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <SectionModal
      title="Edit identity section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={[
          { key: "identity.title", label: "Section title", value: "" },
          { key: "identity.paragraph1", label: "Paragraph 1", value: "", multiline: true },
          { key: "identity.paragraph2", label: "Paragraph 2", value: "", multiline: true },
        ]}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the section copy and feature cards."
      />

      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: featureCount }, (_, index) => (
          <div key={index} className="rounded-xl border border-default-200 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-default-600">Feature {index + 1}</span>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={() => handleRemoveFeature(index)}
              >
                <Trash2 size={15} />
              </Button>
            </div>
            <FieldsForm
              fields={[
                { key: `identity.features.${index}.title`, label: "Title", value: "" },
                { key: `identity.features.${index}.desc`, label: "Description", value: "", multiline: true },
              ]}
              formValues={formValues}
              onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
            />
          </div>
        ))}

        <Button
          variant="bordered"
          color="primary"
          startContent={<Plus size={16} />}
          onPress={handleAddFeature}
          className="w-full border-dashed"
        >
          Add Feature
        </Button>
      </div>
    </SectionModal>
  );
}
