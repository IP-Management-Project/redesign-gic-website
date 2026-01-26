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

const signatureFields = [
  { key: "signatureName", label: "Signature name", value: "" },
  { key: "signatureTitle", label: "Signature title", value: "" },
];

export default function SignatureModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useHeadMessageData();
  const updateHeadMessage = useUpdateHeadMessageData();

  const signature = data ?? { signatureName: "", signatureTitle: "" };

  const [formValues, setFormValues] = React.useState<Record<string, string>>(
    {},
  );

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      signatureName: signature.signatureName ?? "",
      signatureTitle: signature.signatureTitle ?? "",
    });
  }, [isOpen, signature.signatureName, signature.signatureTitle]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      signatureName: String(get(formValues, "signatureName", "")),
      signatureTitle: String(get(formValues, "signatureTitle", "")),
    };

    updateHeadMessage.mutate(
      { section: "signature", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      isOpen={isOpen}
      isSaving={updateHeadMessage.isPending}
      title="Edit signature"
      onClose={onClose}
      onSave={handleSave}
    >
      <FieldsForm
        description="Update the signature block shown beneath the leadership message."
        fields={signatureFields}
        formValues={formValues}
        onChange={(key, value) =>
          setFormValues((prev) => ({ ...prev, [key]: value }))
        }
      />
    </SectionModal>
  );
}
