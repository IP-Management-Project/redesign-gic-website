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

export default function AssociateIndustryModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useAssociateDegreeCopy();
  const updateProgram = useUpdateAssociateDegreeCopy();

  const industry = data?.industry ?? { title: "", subtitle: "", sectors: [] };

  const [sectorCount, setSectorCount] = React.useState(industry.sectors.length);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setSectorCount(industry.sectors.length);

    const nextValues: Record<string, string> = {
      "industry.title": industry.title ?? "",
      "industry.subtitle": industry.subtitle ?? "",
    };

    industry.sectors.forEach((sector, index) => {
      nextValues[`industry.sectors.${index}.title`] = sector.title ?? "";
    });

    setFormValues(nextValues);
  }, [industry, isOpen]);

  const handleAddSector = () => setSectorCount((prev) => prev + 1);

  const handleRemoveSector = (indexToRemove: number) => {
    const newValues = { ...formValues };

    for (let i = indexToRemove; i < sectorCount - 1; i++) {
      newValues[`industry.sectors.${i}.title`] = newValues[`industry.sectors.${i + 1}.title`] ?? "";
    }
    delete newValues[`industry.sectors.${sectorCount - 1}.title`];

    setFormValues(newValues);
    setSectorCount((prev) => prev - 1);
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "industry.title": String(get(formValues, "industry.title", "")),
      "industry.subtitle": String(get(formValues, "industry.subtitle", "")),
    };

    for (let index = 0; index < sectorCount; index++) {
      updates[`industry.sectors.${index}.title`] = String(get(formValues, `industry.sectors.${index}.title`, ""));
    }

    updateProgram.mutate(
      { section: "industry", data: updates },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <SectionModal
      title="Edit industry training"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={[
          { key: "industry.title", label: "Section title", value: "" },
          { key: "industry.subtitle", label: "Section subtitle", value: "", multiline: true },
        ]}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the section copy and sector card titles."
      />

      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: sectorCount }, (_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1">
              <FieldsForm
                fields={[{ key: `industry.sectors.${index}.title`, label: `Sector ${index + 1}`, value: "" }]}
                formValues={formValues}
                onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
              />
            </div>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              className="mt-1"
              onPress={() => handleRemoveSector(index)}
            >
              <Trash2 size={15} />
            </Button>
          </div>
        ))}

        <Button
          variant="bordered"
          color="primary"
          startContent={<Plus size={16} />}
          onPress={handleAddSector}
          className="w-full border-dashed"
        >
          Add Sector
        </Button>
      </div>
    </SectionModal>
  );
}
