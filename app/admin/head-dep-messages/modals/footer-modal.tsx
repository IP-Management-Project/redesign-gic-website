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

const footerFields = [
  { key: "footerText", label: "Footer text", value: "", multiline: true },
];

export default function FooterModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useHeadMessageData();
  const updateHeadMessage = useUpdateHeadMessageData();

  const footer = data ?? { footerText: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>(
    {},
  );

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      footerText: footer.footerText ?? "",
    });
  }, [footer.footerText, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      footerText: String(get(formValues, "footerText", "")),
    };

    updateHeadMessage.mutate(
      { section: "footer", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      isOpen={isOpen}
      isSaving={updateHeadMessage.isPending}
      title="Edit footer"
      onClose={onClose}
      onSave={handleSave}
    >
      <FieldsForm
        description="Update the footer strip text displayed on the leadership page."
        fields={footerFields}
        formValues={formValues}
        onChange={(key, value) =>
          setFormValues((prev) => ({ ...prev, [key]: value }))
        }
      />
    </SectionModal>
  );
}
