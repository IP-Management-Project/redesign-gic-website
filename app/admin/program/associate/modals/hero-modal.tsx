"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useAssociateDegreeCopy,
  useUpdateAssociateDegreeCopy,
} from "@/hooks/useAssociateDegreeCopy";

const heroFields = [
  { key: "hero.badge", label: "Badge", value: "" },
  { key: "hero.titleMain", label: "Title main", value: "" },
  { key: "hero.titleHighlight", label: "Title highlight", value: "" },
  { key: "hero.subtitle", label: "Subtitle", value: "", multiline: true },
];

export default function AssociateHeroModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useAssociateDegreeCopy();
  const updateProgram = useUpdateAssociateDegreeCopy();

  const hero = data?.hero ?? { badge: "", titleMain: "", titleHighlight: "", subtitle: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "hero.badge": hero.badge ?? "",
      "hero.titleMain": hero.titleMain ?? "",
      "hero.titleHighlight": hero.titleHighlight ?? "",
      "hero.subtitle": hero.subtitle ?? "",
    });
  }, [hero.badge, hero.subtitle, hero.titleHighlight, hero.titleMain, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "hero.badge": String(get(formValues, "hero.badge", "")),
      "hero.titleMain": String(get(formValues, "hero.titleMain", "")),
      "hero.titleHighlight": String(get(formValues, "hero.titleHighlight", "")),
      "hero.subtitle": String(get(formValues, "hero.subtitle", "")),
    };

    updateProgram.mutate(
      { section: "hero", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit associate hero"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={heroFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update the associate program hero content."
      />
    </SectionModal>
  );
}
