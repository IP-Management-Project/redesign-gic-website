"use client";

import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import {
  useHeadMessageData,
  useUpdateHeadMessageData,
} from "@/hooks/useHeadMessageData";

type CoreValueModalProps = SectionModalProps & {
  valueIndex: number | null;
};

export default function CoreValueModal({
  isOpen,
  valueIndex,
  onClose,
}: CoreValueModalProps) {
  const { data } = useHeadMessageData();
  const updateHeadMessage = useUpdateHeadMessageData();

  const values = data?.coreValues ?? [];
  const index = valueIndex ?? 0;
  const value = values[index] ?? { icon: "target", title: "", desc: "" };

  const fields = [
    {
      key: `coreValues.${index}.icon`,
      label: "Icon key (target|lightbulb|shield)",
      value: "",
    },
    { key: `coreValues.${index}.title`, label: "Value title", value: "" },
    {
      key: `coreValues.${index}.desc`,
      label: "Value description",
      value: "",
      multiline: true,
    },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>(
    {},
  );

  React.useEffect(() => {
    if (!isOpen || valueIndex === null) return;

    setFormValues({
      [`coreValues.${index}.icon`]: value.icon ?? "target",
      [`coreValues.${index}.title`]: value.title ?? "",
      [`coreValues.${index}.desc`]: value.desc ?? "",
    });
  }, [index, isOpen, value.desc, value.icon, value.title, valueIndex]);

  const handleSave = () => {
    if (valueIndex === null) return;

    const updates: Record<string, string> = {
      [`coreValues.${index}.icon`]: String(
        get(formValues, `coreValues.${index}.icon`, "target"),
      ),
      [`coreValues.${index}.title`]: String(
        get(formValues, `coreValues.${index}.title`, ""),
      ),
      [`coreValues.${index}.desc`]: String(
        get(formValues, `coreValues.${index}.desc`, ""),
      ),
    };

    updateHeadMessage.mutate(
      { section: `core-value-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      isOpen={isOpen}
      isSaving={updateHeadMessage.isPending}
      title={`Edit core value ${index + 1}`}
      onClose={onClose}
      onSave={handleSave}
    >
      <FieldsForm
        description="Use one of the supported icon keys: target, lightbulb, or shield."
        fields={fields}
        formValues={formValues}
        onChange={(key, value) =>
          setFormValues((prev) => ({ ...prev, [key]: value }))
        }
      />
    </SectionModal>
  );
}
