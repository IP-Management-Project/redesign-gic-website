"use client";

import React from "react";
import { isEmpty, get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHomePageCopy, useUpdateHomePageCopy } from "@/hooks/useHomePageCopy";

const emptyLocale = {
  finalTitle: "",
  finalDesc: "",
  cta1: "",
};

const emptyFinalCta = {
  kicker: "",
  buttonHref: "",
};

export default function CtaModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();
  const localeCopy = isEmpty(homeCopy?.locales?.en)
    ? emptyLocale
    : homeCopy?.locales?.en ?? emptyLocale;
  const finalCta = isEmpty(homeCopy?.finalCta) ? emptyFinalCta : homeCopy?.finalCta ?? emptyFinalCta;
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  const fields = React.useMemo(
    () => [
      { key: "locales.en.finalTitle", label: "Final CTA title", value: localeCopy.finalTitle },
      {
        key: "locales.en.finalDesc",
        label: "Final CTA description",
        value: localeCopy.finalDesc,
        multiline: true,
      },
      { key: "locales.en.cta1", label: "CTA button label", value: localeCopy.cta1 },
      { key: "finalCta.kicker", label: "CTA kicker", value: finalCta.kicker },
      { key: "finalCta.buttonHref", label: "CTA button href", value: finalCta.buttonHref },
    ],
    [finalCta, localeCopy],
  );

  React.useEffect(() => {
    if (!isOpen) return;
    const nextValues = fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.key] = field.value;
      return acc;
    }, {});
    setFormValues(nextValues);
  }, [fields, isOpen]);

  const handleChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const updates = fields.reduce<Record<string, string | boolean>>((acc, field: any) => {
      const value = get(formValues, field.key, formValues[field.key] ?? "");
      const parse = field.parse;
      acc[field.key] = parse ? parse(String(value)) : String(value);
      return acc;
    }, {});

    updateHomeCopy.mutate(
      { section: "cta", data: updates },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <SectionModal
      title="Edit Final CTA"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateHomeCopy.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={handleChange}
        description="Update the final CTA heading and button details."
      />
    </SectionModal>
  );
}