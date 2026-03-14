"use client";

import React from "react";
import { get } from "lodash";
import { Button } from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useEngineeringProgramCopy,
  useUpdateEngineeringProgramCopy,
} from "@/hooks/useEngineeringProgramCopy";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function EngineeringMethodologyModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useEngineeringProgramCopy();
  const updateProgram = useUpdateEngineeringProgramCopy();

  const methodology = data?.methodology ?? {
    title: "",
    description: "",
    methods: [],
    researchTitle: "",
    researchDomains: [],
    downloadLabel: "",
  };

  const [methodCount, setMethodCount] = React.useState(methodology.methods.length);
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setMethodCount(methodology.methods.length);

    const nextValues: Record<string, string> = {
      "methodology.title": methodology.title ?? "",
      "methodology.description": methodology.description ?? "",
      "methodology.researchTitle": methodology.researchTitle ?? "",
      "methodology.downloadLabel": methodology.downloadLabel ?? "",
      "methodology.researchDomainsText": (methodology.researchDomains ?? []).join("\n"),
    };

    methodology.methods.forEach((method, index) => {
      nextValues[`methodology.methods.${index}.label`] = method.label ?? "";
      nextValues[`methodology.methods.${index}.title`] = method.title ?? "";
      nextValues[`methodology.methods.${index}.desc`] = method.desc ?? "";
    });

    setFormValues(nextValues);
  }, [isOpen, methodology]);

  const handleAddMethod = () => setMethodCount((prev) => prev + 1);

  const handleRemoveMethod = (indexToRemove: number) => {
    const newValues = { ...formValues };

    for (let i = indexToRemove; i < methodCount - 1; i++) {
      newValues[`methodology.methods.${i}.label`] = newValues[`methodology.methods.${i + 1}.label`] ?? "";
      newValues[`methodology.methods.${i}.title`] = newValues[`methodology.methods.${i + 1}.title`] ?? "";
      newValues[`methodology.methods.${i}.desc`] = newValues[`methodology.methods.${i + 1}.desc`] ?? "";
    }

    delete newValues[`methodology.methods.${methodCount - 1}.label`];
    delete newValues[`methodology.methods.${methodCount - 1}.title`];
    delete newValues[`methodology.methods.${methodCount - 1}.desc`];

    setFormValues(newValues);
    setMethodCount((prev) => prev - 1);
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "methodology.title": String(get(formValues, "methodology.title", "")),
      "methodology.description": String(get(formValues, "methodology.description", "")),
      "methodology.researchTitle": String(get(formValues, "methodology.researchTitle", "")),
      "methodology.downloadLabel": String(get(formValues, "methodology.downloadLabel", "")),
    };

    for (let index = 0; index < methodCount; index++) {
      updates[`methodology.methods.${index}.label`] = String(get(formValues, `methodology.methods.${index}.label`, ""));
      updates[`methodology.methods.${index}.title`] = String(get(formValues, `methodology.methods.${index}.title`, ""));
      updates[`methodology.methods.${index}.desc`] = String(get(formValues, `methodology.methods.${index}.desc`, ""));
    }

    const domainsText = String(get(formValues, "methodology.researchDomainsText", ""));
    const nextDomains = parseLines(domainsText);
    const maxDomains = Math.max(methodology.researchDomains?.length ?? 0, nextDomains.length);

    for (let index = 0; index < maxDomains; index++) {
      updates[`methodology.researchDomains.${index}`] = nextDomains[index] ?? "";
    }

    updateProgram.mutate(
      { section: "methodology", data: updates },
      { onSuccess: () => onClose() },
    );
  };

  return (
    <SectionModal
      title="Edit training methodology"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={[
          { key: "methodology.title", label: "Section title", value: "" },
          { key: "methodology.description", label: "Section description", value: "", multiline: true },
          { key: "methodology.researchTitle", label: "Research card title", value: "" },
          { key: "methodology.downloadLabel", label: "Download button label", value: "" },
          { key: "methodology.researchDomainsText", label: "Research domains (one per line)", value: "", multiline: true },
        ]}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Research domains appear as the list in the right-hand card."
      />

      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: methodCount }, (_, index) => (
          <div key={index} className="rounded-xl border border-default-200 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-default-600">Method {index + 1}</span>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onPress={() => handleRemoveMethod(index)}
              >
                <Trash2 size={15} />
              </Button>
            </div>
            <FieldsForm
              fields={[
                { key: `methodology.methods.${index}.label`, label: "Label (short code, e.g. C / TD / TP)", value: "" },
                { key: `methodology.methods.${index}.title`, label: "Title", value: "" },
                { key: `methodology.methods.${index}.desc`, label: "Description", value: "", multiline: true },
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
          onPress={handleAddMethod}
          className="w-full border-dashed"
        >
          Add Method
        </Button>
      </div>
    </SectionModal>
  );
}

