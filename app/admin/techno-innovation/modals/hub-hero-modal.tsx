"use client";

import React from "react";
import { get } from "lodash";
import { Input } from "@heroui/input";
import { Button as HeroUIButton } from "@heroui/button";

import FieldsForm from "@/app/admin/landing-page/modals/fields-form";
import SectionModal from "@/app/admin/landing-page/modals/section-modal";
import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import {
  useIncubationRoadmapData,
  useUpdateIncubationRoadmapData,
} from "@/hooks/useIncubationRoadmapData";

const heroFields = [
  { key: "hero.subtitle", label: "Hero subtitle", value: "", multiline: true },
];

export default function HubHeroModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationRoadmapData();
  const updateRoadmap = useUpdateIncubationRoadmapData();

  const hero = data?.hero ?? { subtitle: "" };
  const marqueeImages = data?.marqueeImages ?? [];

  const [formValues, setFormValues] = React.useState<Record<string, string>>(
    {},
  );
  const [marqueeList, setMarqueeList] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "hero.subtitle": hero.subtitle ?? "",
    });
    setMarqueeList(marqueeImages);
  }, [hero.subtitle, isOpen, marqueeImages]);

  const handleImageChange = (index: number, value: string) => {
    setMarqueeList((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleAddImage = () => {
    setMarqueeList((prev) => [...prev, ""]);
  };

  const handleRemoveImage = (index: number) => {
    setMarqueeList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updates: Record<string, unknown> = {
      "hero.subtitle": String(get(formValues, "hero.subtitle", "")),
    };

    const cleanedImages = marqueeList
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    updates.marqueeImages = cleanedImages;

    updateRoadmap.mutate(
      { section: "hub-hero", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit hub hero"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateRoadmap.isPending}
    >
      <FieldsForm
        fields={heroFields}
        formValues={formValues}
        onChange={(key, value) =>
          setFormValues((prev) => ({ ...prev, [key]: value }))
        }
        description="Update the hero subtitle displayed over the marquee."
      />

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Marquee images</p>
          <HeroUIButton size="sm" variant="bordered" onPress={handleAddImage}>
            Add image
          </HeroUIButton>
        </div>
        {marqueeList.length === 0 ? (
          <p className="text-sm text-default-500">
            No images yet. Add one to start.
          </p>
        ) : null}
        {marqueeList.map((url, index) => (
          <div key={`${index}-${url}`} className="flex items-center gap-2">
            <Input
              fullWidth
              label={`Image ${index + 1} URL`}
              value={url}
              onValueChange={(value) => handleImageChange(index, value)}
            />
            <HeroUIButton
              size="sm"
              variant="bordered"
              color="danger"
              onPress={() => handleRemoveImage(index)}
            >
              Delete
            </HeroUIButton>
          </div>
        ))}
      </div>
    </SectionModal>
  );
}
