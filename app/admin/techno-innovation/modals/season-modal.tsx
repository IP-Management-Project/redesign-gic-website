"use client";

import React from "react";
import { get } from "lodash";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useIncubationShowcaseData,
  useUpdateIncubationShowcaseData,
} from "@/hooks/useIncubationShowcaseData";

type SeasonModalProps = SectionModalProps & {
  seasonIndex: number | null;
};

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function SeasonModal({ isOpen, seasonIndex, onClose }: SeasonModalProps) {
  const { data } = useIncubationShowcaseData();
  const updateShowcase = useUpdateIncubationShowcaseData();

  const seasons = data?.seasons ?? [];
  const index = seasonIndex ?? 0;
  const season = seasons[index] ?? {
    season: "",
    year: "",
    winner: "",
    desc: "",
    teams: [],
  };

  const fields = [
    { key: `seasons.${index}.season`, label: "Season label", value: "" },
    { key: `seasons.${index}.year`, label: "Season year", value: "" },
    { key: `seasons.${index}.winner`, label: "Winner", value: "" },
    { key: `seasons.${index}.desc`, label: "Description", value: "", multiline: true },
    {
      key: `seasons.${index}.teamsText`,
      label: "Teams (one per line)",
      value: "",
      multiline: true,
    },
  ];

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen || seasonIndex === null) return;

    setFormValues({
      [`seasons.${index}.season`]: season.season ?? "",
      [`seasons.${index}.year`]: season.year ?? "",
      [`seasons.${index}.winner`]: season.winner ?? "",
      [`seasons.${index}.desc`]: season.desc ?? "",
      [`seasons.${index}.teamsText`]: (season.teams ?? []).join("\n"),
    });
  }, [index, isOpen, season, seasonIndex]);

  const handleSave = () => {
    if (seasonIndex === null) return;

    const updates: Record<string, string> = {
      [`seasons.${index}.season`]: String(get(formValues, `seasons.${index}.season`, "")),
      [`seasons.${index}.year`]: String(get(formValues, `seasons.${index}.year`, "")),
      [`seasons.${index}.winner`]: String(get(formValues, `seasons.${index}.winner`, "")),
      [`seasons.${index}.desc`]: String(get(formValues, `seasons.${index}.desc`, "")),
    };

    const teamsText = String(get(formValues, `seasons.${index}.teamsText`, ""));
    const nextTeams = parseLines(teamsText);
    const maxTeams = Math.max(season.teams?.length ?? 0, nextTeams.length);

    for (let teamIndex = 0; teamIndex < maxTeams; teamIndex += 1) {
      updates[`seasons.${index}.teams.${teamIndex}`] = nextTeams[teamIndex] ?? "";
    }

    updateShowcase.mutate(
      { section: `season-${index}`, data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title={`Edit season ${index + 1}`}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateShowcase.isPending}
    >
      <FieldsForm
        fields={fields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Update season details and provide one team per line."
      />
    </SectionModal>
  );
}
