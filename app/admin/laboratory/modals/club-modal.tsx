"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useLabsPageData, useUpdateLabsPageData } from "@/hooks/useLabsPageData";

type ClubModalProps = SectionModalProps & {
  clubIndex: number | null;
};

export default function ClubModal({ isOpen, clubIndex, onClose }: ClubModalProps) {
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const clubs = data?.clubs ?? [];
  const index = clubIndex ?? 0;
  const club = clubs[index] ?? { name: "", desc: "", icon: "code", color: "" };

  const fields = [
    { key: `clubs.${index}.name`, label: "Club name", value: "" },
    { key: `clubs.${index}.desc`, label: "Club description", value: "", multiline: true },
    { key: `clubs.${index}.icon`, label: "Icon key (code|terminal|lightbulb)", value: "" },
    { key: `clubs.${index}.color`, label: "Color class", value: "" },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || clubIndex === null) return;

    setFormValues({
      [`clubs.${index}.name`]: club.name ?? "",
      [`clubs.${index}.desc`]: club.desc ?? "",
      [`clubs.${index}.icon`]: club.icon ?? "code",
      [`clubs.${index}.color`]: club.color ?? "",
    });
  }, [club.color, club.desc, club.icon, club.name, clubIndex, index, isOpen]);

  const handleSave = () => {
    if (clubIndex === null) return;

    const updates: Record<string, string> = {
      [`clubs.${index}.name`]: String(get(formValues, `clubs.${index}.name`, "")),
      [`clubs.${index}.desc`]: String(get(formValues, `clubs.${index}.desc`, "")),
      [`clubs.${index}.icon`]: String(get(formValues, `clubs.${index}.icon`, "code")),
      [`clubs.${index}.color`]: String(get(formValues, `clubs.${index}.color`, "")),
    };

    updateLabs.mutate(
      { section: `club-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit club ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateLabs.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Ensure the icon key matches the supported values to keep the icons visible."
      />
    </SectionModal>
  );
}
