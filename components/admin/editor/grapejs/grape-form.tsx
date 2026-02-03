"use client";

import { Input, Textarea } from "@heroui/react";
import { Field, ImageUploadField } from "../../common/image-upload";

// grape-form.types.ts
export type GrapeFieldType =
  | "text"
  | "textarea"
  | "date"
  | "select"
  | "image";

export type GrapeFieldOption = {
  label: string;
  value: string;
};

export type GrapeFieldConfig<T> = {
  key: keyof T;
  label: string;
  type: GrapeFieldType;
  placeholder?: string;
  options?: GrapeFieldOption[];
  rows?: number;
};


type GrapeFormProps<T> = {
  values: T;
  onChange: (val: T) => void;
  fields: GrapeFieldConfig<T>[];
  onFileSelect?: (key: keyof T, file: File) => void;
  onRemoveFile?: (key: keyof T) => void;
};

export function GrapeForm<T extends Record<string, any>>({
  values,
  onChange,
  fields,
  onFileSelect,
  onRemoveFile,
}: GrapeFormProps<T>) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const value = values[field.key];

        const update = (val: any) =>
          onChange({ ...values, [field.key]: val });

        switch (field.type) {
          case "text":
            return (
              <Field key={String(field.key)} label={field.label}>
                <input
                  value={value ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => update(e.target.value)}
                />
              </Field>
            );

          case "date":
            return (
              <Field key={String(field.key)} label={field.label}>
                <input
                  type="date"
                  value={value?.split?.("T")?.[0] ?? ""}
                  onChange={(e) => update(e.target.value)}
                />
              </Field>
            );

          case "textarea":
            return (
              <Field key={String(field.key)} label={field.label}>
                <textarea
                  rows={field.rows ?? 3}
                  value={value ?? ""}
                  onChange={(e) => update(e.target.value)}
                />
              </Field>
            );

          case "select":
            return (
              <Field key={String(field.key)} label={field.label}>
                <select
                  value={value ?? ""}
                  onChange={(e) => update(e.target.value)}
                >
                  <option value="" disabled>
                    Select {field.label}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
            );

          case "image":
            return (
              <ImageUploadField
                key={String(field.key)}
                label={field.label}
                value={value}
                onFileSelect={(f) =>
                  onFileSelect?.(field.key, f)
                }
                onRemove={() =>
                  onRemoveFile?.(field.key)
                }
              />
            );
          case "text":
            return (
              <div key={String(field.key)}>
                <Input 
                  label={field.label}
                  variant="bordered"
                  size="sm"
                  value={value ?? ""}
                  placeholder={field.placeholder}
                  onValueChange={(v) => update(v)}
                  classNames={{ inputWrapper: "bg-[#27272a] border-white/10 text-white" }}
                />
              </div>
            );

          case "textarea":
            return (
              <div key={String(field.key)}>
                <Textarea
                  label={field.label}
                  variant="bordered"
                  size="sm"
                  value={value ?? ""}
                  placeholder={field.placeholder}
                  minRows={field.rows ?? 3}
                  onValueChange={(v) => update(v)}
                  classNames={{ inputWrapper: "bg-[#27272a] border-white/10 text-white" }}
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
