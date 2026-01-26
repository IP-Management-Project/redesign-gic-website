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

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const careersFields = [
  { key: "careers.title", label: "Section title", value: "" },
  {
    key: "careers.description",
    label: "Section description",
    value: "",
    multiline: true,
  },
  {
    key: "careers.tagsText",
    label: "Tags (one per line)",
    value: "",
    multiline: true,
  },
  {
    key: "careers.bulletsText",
    label: "Bullets (one per line)",
    value: "",
    multiline: true,
  },
];

export default function AssociateCareersModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useAssociateDegreeCopy();
  const updateProgram = useUpdateAssociateDegreeCopy();

  const careers = data?.careers ?? { title: "", description: "", tags: [], bullets: [] };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "careers.title": careers.title ?? "",
      "careers.description": careers.description ?? "",
      "careers.tagsText": (careers.tags ?? []).join("\n"),
      "careers.bulletsText": (careers.bullets ?? []).join("\n"),
    });
  }, [careers, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "careers.title": String(get(formValues, "careers.title", "")),
      "careers.description": String(get(formValues, "careers.description", "")),
    };

    const nextTags = parseLines(String(get(formValues, "careers.tagsText", "")));
    const nextBullets = parseLines(String(get(formValues, "careers.bulletsText", "")));

    const maxTags = Math.max(careers.tags.length, nextTags.length);
    const maxBullets = Math.max(careers.bullets.length, nextBullets.length);

    for (let index = 0; index < maxTags; index += 1) {
      updates[`careers.tags.${index}`] = nextTags[index] ?? "";
    }

    for (let index = 0; index < maxBullets; index += 1) {
      updates[`careers.bullets.${index}`] = nextBullets[index] ?? "";
    }

    updateProgram.mutate(
      { section: "careers", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit career impact"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateProgram.isPending}
    >
      <FieldsForm
        fields={careersFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Tags appear as badges and bullets appear in the right-hand summary card."
      />
    </SectionModal>
  );
}
