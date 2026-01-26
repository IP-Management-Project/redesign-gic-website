"use client";

import React from "react";
import { Input, Textarea } from "@heroui/input";
import { get } from "lodash";

import type { ModalProps } from "@/app/admin/landing-page/modals/types";

type FieldsFormProps = ModalProps & {
  description?: string;
};

export default function FieldsForm({ fields, formValues, onChange, description }: FieldsFormProps) {
  return (
    <div className="space-y-4">
      {description ? <p className="text-sm text-default-500">{description}</p> : null}
      {fields.map((field) =>
        field.multiline ? (
          <Textarea
            key={field.key}
            label={field.label}
            value={String(get(formValues, field.key, formValues[field.key] ?? ""))}
            minRows={3}
            onValueChange={(value) => onChange(field.key, value)}
          />
        ) : (
          <Input
            key={field.key}
            label={field.label}
            value={String(get(formValues, field.key, formValues[field.key] ?? ""))}
            onValueChange={(value) => onChange(field.key, value)}
          />
        ),
      )}
    </div>
  );
}
