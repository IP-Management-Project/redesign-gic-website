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

const portraitFields = [
  { key: "headName", label: "Head name", value: "" },
  { key: "title", label: "Title", value: "" },
  {
    key: "specialization",
    label: "Specialization",
    value: "",
    multiline: true,
  },
  { key: "portrait", label: "Portrait image URL", value: "" },
  { key: "email", label: "Email", value: "" },
  { key: "linkedin", label: "LinkedIn URL", value: "" },
];

export default function PortraitModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useHeadMessageData();
  const updateHeadMessage = useUpdateHeadMessageData();

  const message = data ?? {
    headName: "",
    title: "",
    specialization: "",
    portrait: "",
    email: "",
    linkedin: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>(
    {},
  );

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      headName: message.headName ?? "",
      title: message.title ?? "",
      specialization: message.specialization ?? "",
      portrait: message.portrait ?? "",
      email: message.email ?? "",
      linkedin: message.linkedin ?? "",
    });
  }, [isOpen, message]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      headName: String(get(formValues, "headName", "")),
      title: String(get(formValues, "title", "")),
      specialization: String(get(formValues, "specialization", "")),
      portrait: String(get(formValues, "portrait", "")),
      email: String(get(formValues, "email", "")),
      linkedin: String(get(formValues, "linkedin", "")),
    };

    updateHeadMessage.mutate(
      { section: "portrait", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      isOpen={isOpen}
      isSaving={updateHeadMessage.isPending}
      title="Edit head portrait"
      onClose={onClose}
      onSave={handleSave}
    >
      <FieldsForm
        description="Update the head of department profile and contact links."
        fields={portraitFields}
        formValues={formValues}
        onChange={(key, value) =>
          setFormValues((prev) => ({ ...prev, [key]: value }))
        }
      />
    </SectionModal>
  );
}
