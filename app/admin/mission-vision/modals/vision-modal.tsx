"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMissionVisionCopy, useUpdateMissionVisionCopy } from "@/hooks/useMissionVisionCopy";

const buildVisionFields = (pointsLength: number) => {
  const baseFields = [
    { key: "vision.titleMain", label: "Vision title main", value: "" },
    { key: "vision.titleHighlight", label: "Vision title highlight", value: "" },
    { key: "vision.description", label: "Vision description", value: "", multiline: true },
  ];

  const pointFields = Array.from({ length: pointsLength }, (_, index) => [
    {
      key: `visionPoints.${index}.text`,
      label: `Point ${index + 1} text`,
      value: "",
      multiline: true,
    },
    {
      key: `visionPoints.${index}.icon`,
      label: `Point ${index + 1} icon`,
      value: "",
    },
  ]).flat();

  return [...baseFields, ...pointFields];
};

export default function MissionVisionModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMissionVisionCopy();
  const updateMissionVision = useUpdateMissionVisionCopy();

  const vision = data?.vision ?? { titleMain: "", titleHighlight: "", description: "" };
  const points = data?.visionPoints ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    const nextValues: Record<string, string> = {
      "vision.titleMain": vision.titleMain ?? "",
      "vision.titleHighlight": vision.titleHighlight ?? "",
      "vision.description": vision.description ?? "",
    };

    points.forEach((point, index) => {
      nextValues[`visionPoints.${index}.text`] = point.text ?? "";
      nextValues[`visionPoints.${index}.icon`] = point.icon ?? "";
    });

    setFormValues(nextValues);
  }, [isOpen, points, vision.description, vision.titleHighlight, vision.titleMain]);

  const fields = buildVisionFields(points.length);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "vision.titleMain": String(get(formValues, "vision.titleMain", "")),
      "vision.titleHighlight": String(get(formValues, "vision.titleHighlight", "")),
      "vision.description": String(get(formValues, "vision.description", "")),
    };

    points.forEach((_, index) => {
      updates[`visionPoints.${index}.text`] = String(get(formValues, `visionPoints.${index}.text`, ""));
      updates[`visionPoints.${index}.icon`] = String(get(formValues, `visionPoints.${index}.icon`, ""));
    });

    updateMissionVision.mutate(
      { section: "vision", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit vision section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateMissionVision.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Icon options: users, trending, globe, lightbulb."
      />
    </SectionModal>
  );
}
