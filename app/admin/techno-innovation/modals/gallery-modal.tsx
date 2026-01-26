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

const galleryFields = [
  { key: "gallery.titleMain", label: "Title (main)", value: "" },
  { key: "gallery.titleHighlight", label: "Title (highlight)", value: "" },
  { key: "gallery.subtitle", label: "Subtitle", value: "", multiline: true },
  { key: "gallery.footnote", label: "Footnote", value: "" },
  { key: "gallery.overlayKicker", label: "Overlay kicker", value: "" },
  { key: "gallery.overlaySubtitle", label: "Overlay subtitle", value: "" },
  { key: "gallery.ctaText", label: "CTA text", value: "", multiline: true },
  { key: "gallery.ctaLabel", label: "CTA label", value: "" },
  { key: "gallery.ctaHref", label: "CTA link", value: "" },
];

export default function GalleryModal({ isOpen, onClose }: SectionModalProps) {
  const { data } = useIncubationShowcaseData();
  const updateShowcase = useUpdateIncubationShowcaseData();

  const gallery = data?.gallery ?? {
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
    footnote: "",
    overlayKicker: "",
    overlaySubtitle: "",
    ctaText: "",
    ctaLabel: "",
    ctaHref: "",
  };

  const [formValues, setFormValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "gallery.titleMain": gallery.titleMain ?? "",
      "gallery.titleHighlight": gallery.titleHighlight ?? "",
      "gallery.subtitle": gallery.subtitle ?? "",
      "gallery.footnote": gallery.footnote ?? "",
      "gallery.overlayKicker": gallery.overlayKicker ?? "",
      "gallery.overlaySubtitle": gallery.overlaySubtitle ?? "",
      "gallery.ctaText": gallery.ctaText ?? "",
      "gallery.ctaLabel": gallery.ctaLabel ?? "",
      "gallery.ctaHref": gallery.ctaHref ?? "",
    });
  }, [gallery, isOpen]);

  const handleSave = () => {
    const updates: Record<string, string> = {
      "gallery.titleMain": String(get(formValues, "gallery.titleMain", "")),
      "gallery.titleHighlight": String(get(formValues, "gallery.titleHighlight", "")),
      "gallery.subtitle": String(get(formValues, "gallery.subtitle", "")),
      "gallery.footnote": String(get(formValues, "gallery.footnote", "")),
      "gallery.overlayKicker": String(get(formValues, "gallery.overlayKicker", "")),
      "gallery.overlaySubtitle": String(get(formValues, "gallery.overlaySubtitle", "")),
      "gallery.ctaText": String(get(formValues, "gallery.ctaText", "")),
      "gallery.ctaLabel": String(get(formValues, "gallery.ctaLabel", "")),
      "gallery.ctaHref": String(get(formValues, "gallery.ctaHref", "")),
    };

    updateShowcase.mutate(
      { section: "gallery", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <SectionModal
      title="Edit gallery section"
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      isSaving={updateShowcase.isPending}
    >
      <FieldsForm
        fields={galleryFields}
        formValues={formValues}
        onChange={(key, value) => setFormValues((prev) => ({ ...prev, [key]: value }))}
        description="Control the innovation gallery headline, overlay, and CTA content."
      />
    </SectionModal>
  );
}
