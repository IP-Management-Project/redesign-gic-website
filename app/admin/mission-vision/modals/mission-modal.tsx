"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useMissionVisionCopy, useUpdateMissionVisionCopy } from "@/hooks/useMissionVisionCopy";

const missionFields = [
  { key: "mission.title", label: "Mission title", value: "" },
  { key: "mission.bodyBefore", label: "Body text before highlight", value: "" },
  { key: "mission.bodyHighlight", label: "Highlighted text", value: "" },
  {
    key: "mission.bodyAfter",
    label: "Body text after highlight",
    value: "",
    multiline: true,
  },
  { key: "mission.hardSkillsTitle", label: "Hard skills title", value: "" },
  {
    key: "mission.hardSkillsDesc",
    label: "Hard skills description",
    value: "",
    multiline: true,
  },
  { key: "mission.softSkillsTitle", label: "Soft skills title", value: "" },
  {
    key: "mission.softSkillsDesc",
    label: "Soft skills description",
    value: "",
    multiline: true,
  },
];

export default function MissionVisionMissionModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useMissionVisionCopy();
  const updateMissionVision = useUpdateMissionVisionCopy();

  const mission =
    data?.mission ??
    {
      title: "",
      bodyBefore: "",
      bodyHighlight: "",
      bodyAfter: "",
      hardSkillsTitle: "",
      hardSkillsDesc: "",
      softSkillsTitle: "",
      softSkillsDesc: "",
    };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "mission.title": mission.title ?? "",
      "mission.bodyBefore": mission.bodyBefore ?? "",
      "mission.bodyHighlight": mission.bodyHighlight ?? "",
      "mission.bodyAfter": mission.bodyAfter ?? "",
      "mission.hardSkillsTitle": mission.hardSkillsTitle ?? "",
      "mission.hardSkillsDesc": mission.hardSkillsDesc ?? "",
      "mission.softSkillsTitle": mission.softSkillsTitle ?? "",
      "mission.softSkillsDesc": mission.softSkillsDesc ?? "",
    });
  }, [
    isOpen,
    mission.bodyAfter,
    mission.bodyBefore,
    mission.bodyHighlight,
    mission.hardSkillsDesc,
    mission.hardSkillsTitle,
    mission.softSkillsDesc,
    mission.softSkillsTitle,
    mission.title,
  ]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "mission.title": String(get(formValues, "mission.title", "")),
      "mission.bodyBefore": String(get(formValues, "mission.bodyBefore", "")),
      "mission.bodyHighlight": String(get(formValues, "mission.bodyHighlight", "")),
      "mission.bodyAfter": String(get(formValues, "mission.bodyAfter", "")),
      "mission.hardSkillsTitle": String(get(formValues, "mission.hardSkillsTitle", "")),
      "mission.hardSkillsDesc": String(get(formValues, "mission.hardSkillsDesc", "")),
      "mission.softSkillsTitle": String(get(formValues, "mission.softSkillsTitle", "")),
      "mission.softSkillsDesc": String(get(formValues, "mission.softSkillsDesc", "")),
    };

    updateMissionVision.mutate(
      { section: "mission", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit mission section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateMissionVision.isPending}
    >
      <FieldsForm
        fields={missionFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Split the mission statement around the highlighted phrase to keep the emphasis styling."
      />
    </SectionModal>
  );
}
