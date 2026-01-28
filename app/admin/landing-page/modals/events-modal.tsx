"use client";

import React from "react";
import { isEmpty, get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHomePageCopy, useUpdateHomePageCopy } from "@/hooks/useHomePageCopy";

const emptyEvents = {
  newsKicker: "",
  newsTitle: "",
  newsDesc: "",
};

export default function EventsModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();
  const events = isEmpty(homeCopy?.dict?.event) ? emptyEvents : homeCopy?.dict?.event ?? emptyEvents;
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  const fields = React.useMemo(
    () => [
      { key: "dict.event.newsKicker", label: "Events kicker", value: events.newsKicker },
      { key: "dict.event.newsTitle", label: "Events title", value: events.newsTitle },
      {
        key: "dict.event.newsDesc",
        label: "Events description",
        value: events.newsDesc,
        multiline: true,
      },
    ],
    [events],
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
      { section: "events", data: updates },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <SectionModal
      title="Edit Events"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateHomeCopy.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={handleChange}
        description="Update the events section heading and description."
      />
    </SectionModal>
  );
}
