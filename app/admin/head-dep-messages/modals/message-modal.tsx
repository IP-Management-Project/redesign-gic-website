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

const messageFields = [
  { key: "leadershipKicker", label: "Kicker label", value: "" },
  { key: "messageHtml", label: "Message HTML", value: "", multiline: true },
];

export default function MessageModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useHeadMessageData();
  const updateHeadMessage = useUpdateHeadMessageData();

  const message = data ?? {
    leadershipKicker: "",
    messageHtml: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>(
    {},
  );

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      leadershipKicker: message.leadershipKicker ?? "",
      messageHtml: message.messageHtml ?? "",
    });
  }, [isOpen, message]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      leadershipKicker: String(get(formValues, "leadershipKicker", "")),
      messageHtml: String(get(formValues, "messageHtml", "")),
    };

    updateHeadMessage.mutate(
      { section: "message", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      isOpen={isOpen}
      isSaving={updateHeadMessage.isPending}
      title="Edit leadership message"
      onClose={onClose}
      onSave={handleSave}
    >
      <FieldsForm
        description="Provide HTML markup for the message body to preserve formatting."
        fields={messageFields}
        formValues={formValues}
        onChange={(key, value) =>
          setFormValues((prev) => ({ ...prev, [key]: value }))
        }
      />
    </SectionModal>
  );
}
