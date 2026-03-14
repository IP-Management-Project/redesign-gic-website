"use client";

import React from "react";
import { get } from "lodash";
import { Button } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useInternationalProgramData,
  useUpdateInternationalProgramData,
} from "@/hooks/useInternationalProgramData";

const buildFields = (partnersLength: number) => {
  const baseFields = [
    { key: "partnersSection.title", label: "Section title", value: "" },
    {
      key: "partnersSection.subtitle",
      label: "Section subtitle",
      value: "",
      multiline: true,
    },
  ];

  const partnerFields = Array.from({ length: partnersLength }, (_, index) => [
    { key: `partners.${index}.name`, label: `Partner ${index + 1} name`, value: "" },
    { key: `partners.${index}.location`, label: `Partner ${index + 1} location`, value: "" },
    {
      key: `partners.${index}.focus`,
      label: `Partner ${index + 1} focus`,
      value: "",
      multiline: true,
    },
  ]).flat();

  return [...baseFields, ...partnerFields];
};

export default function InternationalPartnersModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useInternationalProgramData();
  const updateProgram = useUpdateInternationalProgramData();

  const partnersSection = data?.partnersSection ?? { title: "", subtitle: "" };
  const partners = data?.partners ?? [];

  const [partnerCount, setPartnerCount] = React.useState(partners.length);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setPartnerCount(partners.length);

    const nextValues: Record<string, string> = {
      "partnersSection.title": partnersSection.title ?? "",
      "partnersSection.subtitle": partnersSection.subtitle ?? "",
    };

    partners.forEach((partner, index) => {
      nextValues[`partners.${index}.name`] = partner.name ?? "";
      nextValues[`partners.${index}.location`] = partner.location ?? "";
      nextValues[`partners.${index}.focus`] = partner.focus ?? "";
    });

    setFormValues(nextValues);
  }, [isOpen, partners, partnersSection.subtitle, partnersSection.title]);

  const handleAddPartner = () => {
    setPartnerCount((prev) => prev + 1);
  };

  const handleRemovePartner = (indexToRemove: number) => {
    // Shift all partner values down by one after the removed index
    const newValues = { ...formValues };

    for (let i = indexToRemove; i < partnerCount - 1; i++) {
      newValues[`partners.${i}.name`] = newValues[`partners.${i + 1}.name`] ?? "";
      newValues[`partners.${i}.location`] = newValues[`partners.${i + 1}.location`] ?? "";
      newValues[`partners.${i}.focus`] = newValues[`partners.${i + 1}.focus`] ?? "";
    }

    // Remove the last (now duplicate) entry
    delete newValues[`partners.${partnerCount - 1}.name`];
    delete newValues[`partners.${partnerCount - 1}.location`];
    delete newValues[`partners.${partnerCount - 1}.focus`];

    setFormValues(newValues);
    setPartnerCount((prev) => prev - 1);
  };

  const fields = buildFields(partnerCount);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "partnersSection.title": String(get(formValues, "partnersSection.title", "")),
      "partnersSection.subtitle": String(get(formValues, "partnersSection.subtitle", "")),
    };

    for (let i = 0; i < partnerCount; i++) {
      updates[`partners.${i}.name`] = String(get(formValues, `partners.${i}.name`, ""));
      updates[`partners.${i}.location`] = String(get(formValues, `partners.${i}.location`, ""));
      updates[`partners.${i}.focus`] = String(get(formValues, `partners.${i}.focus`, ""));
    }

    updateProgram.mutate(
      { section: "partners", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit partners section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={fields.slice(0, 2)} // base fields only (title + subtitle)
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update section copy and partner cards."
      />

      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: partnerCount }, (_, index) => (
          <div key={index} className="rounded-xl border border-default-200 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-default-600">Partner {index + 1}</span>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={() => handleRemovePartner(index)}
              >
                <Trash2 size={15} />
              </Button>
            </div>
            <FieldsForm
              fields={[
                { key: `partners.${index}.name`, label: "Name", value: "" },
                { key: `partners.${index}.location`, label: "Location", value: "" },
                { key: `partners.${index}.focus`, label: "Focus", value: "", multiline: true },
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
          onPress={handleAddPartner}
          className="w-full border-dashed"
        >
          Add Partner
        </Button>
      </div>
    </SectionModal>
  );
}
