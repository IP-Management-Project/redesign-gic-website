"use client";

import React from "react";
import { isEmpty, get } from "lodash";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Image,
  Card,
  CardBody,
  Divider,
} from "@heroui/react";

import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHomePageCopy, useUpdateHomePageCopy } from "@/hooks/useHomePageCopy";

const emptyHero = {
  backgroundImage: "",
  logoText: "",
  discoverLabel: "",
};

const emptyLocale = {
  heroTitle1: "",
  heroTitle2: "",
  heroSubtitle: "",
};

type FormKey =
  | "hero.backgroundImage"
  | "hero.logoText"
  | "hero.discoverLabel"
  | "locales.en.heroTitle1"
  | "locales.en.heroTitle2"
  | "locales.en.heroSubtitle";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
}

export default function HeroModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();

  const hero = isEmpty(homeCopy?.hero) ? emptyHero : homeCopy?.hero ?? emptyHero;
  const localeCopy = isEmpty(homeCopy?.locales?.en)
    ? emptyLocale
    : homeCopy?.locales?.en ?? emptyLocale;

  const [formValues, setFormValues] = React.useState<Record<FormKey, string>>({
    "hero.backgroundImage": "",
    "hero.logoText": "",
    "hero.discoverLabel": "",
    "locales.en.heroTitle1": "",
    "locales.en.heroTitle2": "",
    "locales.en.heroSubtitle": "",
  });

  const [selectedImageName, setSelectedImageName] = React.useState<string>("");
  const [isReadingImage, setIsReadingImage] = React.useState(false);

  const currentBg = formValues["hero.backgroundImage"]?.trim();
  const hasBg = Boolean(currentBg);

  React.useEffect(() => {
    if (!isOpen) return;

    setFormValues({
      "hero.backgroundImage": hero.backgroundImage ?? "",
      "hero.logoText": hero.logoText ?? "",
      "hero.discoverLabel": hero.discoverLabel ?? "",
      "locales.en.heroTitle1": localeCopy.heroTitle1 ?? "",
      "locales.en.heroTitle2": localeCopy.heroTitle2 ?? "",
      "locales.en.heroSubtitle": localeCopy.heroSubtitle ?? "",
    });

    setSelectedImageName("");
    setIsReadingImage(false);
  }, [isOpen, hero.backgroundImage, hero.logoText, hero.discoverLabel, localeCopy]);

  const setValue = (key: FormKey, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleUploadImage = async (file?: File | null) => {
    if (!file) return;

    setIsReadingImage(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setSelectedImageName(file.name);
      // Store the uploaded image directly in the form value so the preview + save use it.
      // If your backend requires a hosted URL instead of a data URL, swap this to your uploader result URL.
      setValue("hero.backgroundImage", dataUrl);
    } finally {
      setIsReadingImage(false);
    }
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "hero.backgroundImage": get(formValues, "hero.backgroundImage", ""),
      "hero.logoText": get(formValues, "hero.logoText", ""),
      "hero.discoverLabel": get(formValues, "hero.discoverLabel", ""),
      "locales.en.heroTitle1": get(formValues, "locales.en.heroTitle1", ""),
      "locales.en.heroTitle2": get(formValues, "locales.en.heroTitle2", ""),
      "locales.en.heroSubtitle": get(formValues, "locales.en.heroSubtitle", ""),
    };

    updateHomeCopy.mutate(
      { section: "hero", data: updates },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} size="4xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Hero</ModalHeader>

            <ModalBody className="gap-5">
              {/* Preview */}
              <Card className="overflow-hidden">
                <CardBody className="p-0">
                  <div className="relative">
                    <div className="h-96 w-full bg-red-300">
                      {hasBg ? (
                        <Image
                          src={currentBg}
                          alt="GIC background preview"
                          removeWrapper
                          width={200}
                          height={500}
                          className="h-100 w-full objec t-cover"
                        /> 
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-default-100">
                          <div className="text-center">
                            <div className="text-base font-semibold">No background image yet</div>
                            <div className="text-sm text-default-500">
                              Upload an image or paste a URL below.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Overlay preview text */}
                    <div className="pointer-events-none absolute inset-0 flex items-end">
                      <div className="w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
                        <div className="max-w-2xl">
                          <div className="text-sm font-medium text-white/80">
                            {formValues["hero.logoText"] || "Logo text"}
                          </div>
                          <div className="mt-2 text-2xl font-semibold leading-tight text-white">
                            {(formValues["locales.en.heroTitle1"] || "Hero title line 1") + " "}
                            <span className="opacity-95">
                              {formValues["locales.en.heroTitle2"] || "Hero title line 2"}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-white/80">
                            {formValues["locales.en.heroSubtitle"] || "Hero subtitle goes here."}
                          </div>
                          <div className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs text-white/90 backdrop-blur">
                            {formValues["hero.discoverLabel"] || "Discover"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(selectedImageName || isReadingImage) && (
                    <>
                      <Divider />
                      <div className="px-4 py-3 text-sm text-default-600">
                        {isReadingImage ? "Reading image…" : `Using uploaded image: ${selectedImageName}`}
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>

              {/* Image controls */}
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  label="Hero background image URL"
                  placeholder="https://..."
                  value={formValues["hero.backgroundImage"]}
                  onValueChange={(v) => setValue("hero.backgroundImage", v)}
                  description="Paste an image URL, or upload an image to replace it."
                />

                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium text-default-700">Upload new background image</div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadImage(e.target.files?.[0])}
                    className="block w-full cursor-pointer rounded-medium border border-default-200 bg-default-50 px-3 py-2 text-sm text-default-700 file:mr-4 file:rounded-medium file:border-0 file:bg-default-200 file:px-3 file:py-2 file:text-sm file:font-medium file:text-default-800 hover:bg-default-100"
                  />
                  <div className="text-xs text-default-500">
                    Tip: This updates the preview immediately. Saving will store what you see.
                  </div>
                </div>
              </div>

              <Divider />

              {/* Text fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Hero logo text"
                  value={formValues["hero.logoText"]}
                  onValueChange={(v) => setValue("hero.logoText", v)}
                />
                <Input
                  label="Discover label"
                  value={formValues["hero.discoverLabel"]}
                  onValueChange={(v) => setValue("hero.discoverLabel", v)}
                />
                <Input
                  label="Hero title line 1"
                  value={formValues["locales.en.heroTitle1"]}
                  onValueChange={(v) => setValue("locales.en.heroTitle1", v)}
                />
                <Input
                  label="Hero title line 2"
                  value={formValues["locales.en.heroTitle2"]}
                  onValueChange={(v) => setValue("locales.en.heroTitle2", v)}
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Hero subtitle"
                    value={formValues["locales.en.heroSubtitle"]}
                    onValueChange={(v) => setValue("locales.en.heroSubtitle", v)}
                    minRows={3}
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={onClose} isDisabled={updateHomeCopy.isPending}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSave}
                isLoading={updateHomeCopy.isPending}
                isDisabled={isReadingImage}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
