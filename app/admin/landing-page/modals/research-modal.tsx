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
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tabs,
  Tab,
  Image,
} from "@heroui/react";

import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHomePageCopy, useUpdateHomePageCopy } from "@/hooks/useHomePageCopy";

const emptyResearch = {
  researchKicker: "",
  researchTitle: "",
  researchDesc: "",
};

const emptyShowcase = {
  hero: { image: "", chip: "", title: "", desc: "", ctaLabel: "", ctaHref: "" },
  featured: { image: "", kicker: "", title: "", alt: "" },
  labs: [] as Array<{ image: string; title: string; alt: string }>,
  impact: { kicker: "", title: "", desc: "", ctaLabel: "", ctaHref: "" },
  stats: [] as Array<{ label: string; value: string }>,
};

type FormValues = Record<string, string>;

/** ===== image helpers (url OR upload + preview) ===== */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
}

function isValidImageSrc(src?: string) {
  const v = (src ?? "").trim();
  if (!v) return false;
  return v.startsWith("http://") || v.startsWith("https://") || v.startsWith("data:image/");
}

function ImageField({
  label,
  value,
  onChange,
  description,
  previewAlt,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  description?: string;
  previewAlt?: string;
}) {
  const [isReading, setIsReading] = React.useState(false);
  const [fileName, setFileName] = React.useState("");

  const canPreview = isValidImageSrc(value);

  const onUpload = async (file?: File | null) => {
    if (!file) return;
    setIsReading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setFileName(file.name);
      onChange(dataUrl);
    } finally {
      setIsReading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-start gap-1">
        <div className="text-sm font-semibold text-default-800">{label}</div>
        {description ? <div className="text-xs text-default-500">{description}</div> : null}
      </CardHeader>

      <CardBody className="gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <Input
            label="Image URL"
            placeholder="https://..."
            value={value}
            onValueChange={onChange}
            description="Paste a link, or upload a new image below."
          />

          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-default-700">Upload image</div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onUpload(e.target.files?.[0])}
              className="block w-full cursor-pointer rounded-medium border border-default-200 bg-default-50 px-3 py-2 text-sm text-default-700 file:mr-4 file:rounded-medium file:border-0 file:bg-default-200 file:px-3 file:py-2 file:text-sm file:font-medium file:text-default-800 hover:bg-default-100"
            />
            <div className="text-xs text-default-500">
              {isReading ? "Reading image…" : fileName ? `Uploaded: ${fileName}` : "Uploads update preview instantly."}
            </div>
          </div>
        </div>

        <Divider />

        <div className="overflow-hidden rounded-large border border-default-200 bg-default-50">
          <div className="aspect-[16/7] w-full">
            {canPreview ? (
              <Image
                src={value}
                alt={previewAlt ?? "Image preview"}
                removeWrapper
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-medium text-default-700">No preview</div>
                  <div className="text-xs text-default-500">Add a valid https URL or upload an image.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

/** ===== reorder helpers ===== */
function arrayMove<T>(arr: T[], from: number, to: number) {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export default function ResearchModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();

  const research = isEmpty(homeCopy?.dict?.research) ? emptyResearch : homeCopy?.dict?.research ?? emptyResearch;
  const showcase = isEmpty(homeCopy?.researchShowcase) ? emptyShowcase : homeCopy?.researchShowcase ?? emptyShowcase;

  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [activeKey, setActiveKey] = React.useState<string>("copy"); // copy | hero | featured | labs | impact | stats
  const [labsList, setLabsList] = React.useState<Array<{ image: string; title: string; alt: string }>>([]);
  const dragFromLabs = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    setLabsList([...(showcase.labs ?? [])]);

    const next: FormValues = {
      "dict.research.researchKicker": String(research.researchKicker ?? ""),
      "dict.research.researchTitle": String(research.researchTitle ?? ""),
      "dict.research.researchDesc": String(research.researchDesc ?? ""),

      "researchShowcase.hero.image": String(showcase.hero?.image ?? ""),
      "researchShowcase.hero.chip": String(showcase.hero?.chip ?? ""),
      "researchShowcase.hero.title": String(showcase.hero?.title ?? ""),
      "researchShowcase.hero.desc": String(showcase.hero?.desc ?? ""),
      "researchShowcase.hero.ctaLabel": String(showcase.hero?.ctaLabel ?? ""),
      "researchShowcase.hero.ctaHref": String(showcase.hero?.ctaHref ?? ""),

      "researchShowcase.featured.image": String(showcase.featured?.image ?? ""),
      "researchShowcase.featured.kicker": String(showcase.featured?.kicker ?? ""),
      "researchShowcase.featured.title": String(showcase.featured?.title ?? ""),
      "researchShowcase.featured.alt": String(showcase.featured?.alt ?? ""),

      "researchShowcase.impact.kicker": String(showcase.impact?.kicker ?? ""),
      "researchShowcase.impact.title": String(showcase.impact?.title ?? ""),
      "researchShowcase.impact.desc": String(showcase.impact?.desc ?? ""),
      "researchShowcase.impact.ctaLabel": String(showcase.impact?.ctaLabel ?? ""),
      "researchShowcase.impact.ctaHref": String(showcase.impact?.ctaHref ?? ""),
    };

    (showcase.labs ?? []).forEach((lab, index) => {
      next[`researchShowcase.labs.${index}.image`] = String(lab?.image ?? "");
      next[`researchShowcase.labs.${index}.title`] = String(lab?.title ?? "");
      next[`researchShowcase.labs.${index}.alt`] = String(lab?.alt ?? "");
    });

    (showcase.stats ?? []).forEach((stat, index) => {
      next[`researchShowcase.stats.${index}.label`] = String(stat?.label ?? "");
      next[`researchShowcase.stats.${index}.value`] = String(stat?.value ?? "");
    });

    setFormValues(next);
    setActiveKey("copy");
  }, [isOpen, research, showcase]);

  const setValue = (key: string, value: string) => setFormValues((prev) => ({ ...prev, [key]: value }));
  const isTab = (k: string) => activeKey === k;

  /** ===== Labs add/delete/reorder (order must reflect payload) ===== */
  const addLabFirst = () => {
    setLabsList((prev) => [{ image: "", title: "", alt: "" }, ...prev]);

    setFormValues((prevForm) => {
      const next = { ...prevForm };
      for (let i = labsList.length; i >= 1; i--) {
        next[`researchShowcase.labs.${i}.image`] = String(get(prevForm, `researchShowcase.labs.${i - 1}.image`, ""));
        next[`researchShowcase.labs.${i}.title`] = String(get(prevForm, `researchShowcase.labs.${i - 1}.title`, ""));
        next[`researchShowcase.labs.${i}.alt`] = String(get(prevForm, `researchShowcase.labs.${i - 1}.alt`, ""));
      }
      next[`researchShowcase.labs.0.image`] = "";
      next[`researchShowcase.labs.0.title`] = "";
      next[`researchShowcase.labs.0.alt`] = "";
      return next;
    });

    setActiveKey("labs");
  };

  const deleteLab = (index: number) => {
    setLabsList((prev) => prev.filter((_, i) => i !== index));

    setFormValues((prevForm) => {
      const prevValues = labsList.map((_, i) => ({
        image: String(get(prevForm, `researchShowcase.labs.${i}.image`, "")),
        title: String(get(prevForm, `researchShowcase.labs.${i}.title`, "")),
        alt: String(get(prevForm, `researchShowcase.labs.${i}.alt`, "")),
      }));

      const kept = prevValues.filter((_, i) => i !== index);
      const next = { ...prevForm };

      kept.forEach((v, i) => {
        next[`researchShowcase.labs.${i}.image`] = v.image;
        next[`researchShowcase.labs.${i}.title`] = v.title;
        next[`researchShowcase.labs.${i}.alt`] = v.alt;
      });

      const last = kept.length;
      delete next[`researchShowcase.labs.${last}.image`];
      delete next[`researchShowcase.labs.${last}.title`];
      delete next[`researchShowcase.labs.${last}.alt`];

      return next;
    });
  };

  const onDragStartLab = (index: number) => {
    dragFromLabs.current = index;
  };

  const onDropLab = (toIndex: number) => {
    const fromIndex = dragFromLabs.current;
    dragFromLabs.current = null;
    if (fromIndex == null || fromIndex === toIndex) return;

    setLabsList((prev) => arrayMove(prev, fromIndex, toIndex));

    setFormValues((prevForm) => {
      const prevValues = labsList.map((_, i) => ({
        image: String(get(prevForm, `researchShowcase.labs.${i}.image`, "")),
        title: String(get(prevForm, `researchShowcase.labs.${i}.title`, "")),
        alt: String(get(prevForm, `researchShowcase.labs.${i}.alt`, "")),
      }));

      const moved = arrayMove(prevValues, fromIndex, toIndex);
      const next = { ...prevForm };

      moved.forEach((v, i) => {
        next[`researchShowcase.labs.${i}.image`] = v.image;
        next[`researchShowcase.labs.${i}.title`] = v.title;
        next[`researchShowcase.labs.${i}.alt`] = v.alt;
      });

      return next;
    });
  };

  const handleSave = () => {
    const updates: Record<string, string | boolean> = {
      "dict.research.researchKicker": String(get(formValues, "dict.research.researchKicker", "")),
      "dict.research.researchTitle": String(get(formValues, "dict.research.researchTitle", "")),
      "dict.research.researchDesc": String(get(formValues, "dict.research.researchDesc", "")),

      "researchShowcase.hero.image": String(get(formValues, "researchShowcase.hero.image", "")),
      "researchShowcase.hero.chip": String(get(formValues, "researchShowcase.hero.chip", "")),
      "researchShowcase.hero.title": String(get(formValues, "researchShowcase.hero.title", "")),
      "researchShowcase.hero.desc": String(get(formValues, "researchShowcase.hero.desc", "")),
      "researchShowcase.hero.ctaLabel": String(get(formValues, "researchShowcase.hero.ctaLabel", "")),
      "researchShowcase.hero.ctaHref": String(get(formValues, "researchShowcase.hero.ctaHref", "")),

      "researchShowcase.featured.image": String(get(formValues, "researchShowcase.featured.image", "")),
      "researchShowcase.featured.kicker": String(get(formValues, "researchShowcase.featured.kicker", "")),
      "researchShowcase.featured.title": String(get(formValues, "researchShowcase.featured.title", "")),
      "researchShowcase.featured.alt": String(get(formValues, "researchShowcase.featured.alt", "")),

      "researchShowcase.impact.kicker": String(get(formValues, "researchShowcase.impact.kicker", "")),
      "researchShowcase.impact.title": String(get(formValues, "researchShowcase.impact.title", "")),
      "researchShowcase.impact.desc": String(get(formValues, "researchShowcase.impact.desc", "")),
      "researchShowcase.impact.ctaLabel": String(get(formValues, "researchShowcase.impact.ctaLabel", "")),
      "researchShowcase.impact.ctaHref": String(get(formValues, "researchShowcase.impact.ctaHref", "")),
    };

    // labs in current order
    labsList.forEach((_, index) => {
      updates[`researchShowcase.labs.${index}.image`] = String(get(formValues, `researchShowcase.labs.${index}.image`, ""));
      updates[`researchShowcase.labs.${index}.title`] = String(get(formValues, `researchShowcase.labs.${index}.title`, ""));
      updates[`researchShowcase.labs.${index}.alt`] = String(get(formValues, `researchShowcase.labs.${index}.alt`, ""));
    });
    // clear removed tail (based on original length)
    for (let i = labsList.length; i < (showcase.labs?.length ?? 0); i++) {
      updates[`researchShowcase.labs.${i}.image`] = "";
      updates[`researchShowcase.labs.${i}.title`] = "";
      updates[`researchShowcase.labs.${i}.alt`] = "";
    }

    // stats (no reorder/add in this version; keep original indexing)
    (showcase.stats ?? []).forEach((_, index) => {
      updates[`researchShowcase.stats.${index}.label`] = String(get(formValues, `researchShowcase.stats.${index}.label`, ""));
      updates[`researchShowcase.stats.${index}.value`] = String(get(formValues, `researchShowcase.stats.${index}.value`, ""));
    });

    updateHomeCopy.mutate({ section: "research", data: updates }, { onSuccess: () => onClose() });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} size="5xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Research</ModalHeader>

            <ModalBody>
              <Card>
                <CardBody className="gap-4">
                  <Tabs
                    aria-label="Research editor"
                    selectedKey={activeKey}
                    onSelectionChange={(k) => setActiveKey(String(k))}
                    variant="underlined"
                    color="primary"
                  >
                    <Tab key="copy" title="Copy" />
                    <Tab key="hero" title="Hero" />
                    <Tab key="featured" title="Featured" />
                    <Tab key="labs" title={`Labs (${labsList.length})`} />
                    <Tab key="impact" title="Impact" />
                    <Tab key="stats" title={`Stats (${showcase.stats?.length ?? 0})`} />
                  </Tabs>

                  <Divider />

                  {/* COPY */}
                  {isTab("copy") && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Research kicker"
                        value={String(get(formValues, "dict.research.researchKicker", "") ?? "")}
                        onValueChange={(v) => setValue("dict.research.researchKicker", v)}
                      />
                      <Input
                        label="Research title"
                        value={String(get(formValues, "dict.research.researchTitle", "") ?? "")}
                        onValueChange={(v) => setValue("dict.research.researchTitle", v)}
                      />
                      <div className="md:col-span-2">
                        <Textarea
                          label="Research description"
                          value={String(get(formValues, "dict.research.researchDesc", "") ?? "")}
                          onValueChange={(v) => setValue("dict.research.researchDesc", v)}
                          minRows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* HERO */}
                  {isTab("hero") && (
                    <div className="grid gap-4">
                      <ImageField
                        label="Research hero image"
                        value={String(get(formValues, "researchShowcase.hero.image", "") ?? "")}
                        onChange={(v) => setValue("researchShowcase.hero.image", v)}
                        description="Shown in the research hero section."
                        previewAlt="Research hero image preview"
                      />

                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Hero chip"
                          value={String(get(formValues, "researchShowcase.hero.chip", "") ?? "")}
                          onValueChange={(v) => setValue("researchShowcase.hero.chip", v)}
                        />
                        <Input
                          label="Hero title"
                          value={String(get(formValues, "researchShowcase.hero.title", "") ?? "")}
                          onValueChange={(v) => setValue("researchShowcase.hero.title", v)}
                        />
                        <div className="md:col-span-2">
                          <Textarea
                            label="Hero description"
                            value={String(get(formValues, "researchShowcase.hero.desc", "") ?? "")}
                            onValueChange={(v) => setValue("researchShowcase.hero.desc", v)}
                            minRows={3}
                          />
                        </div>
                        <Input
                          label="Hero CTA label"
                          value={String(get(formValues, "researchShowcase.hero.ctaLabel", "") ?? "")}
                          onValueChange={(v) => setValue("researchShowcase.hero.ctaLabel", v)}
                        />
                        <Input
                          label="Hero CTA href"
                          value={String(get(formValues, "researchShowcase.hero.ctaHref", "") ?? "")}
                          onValueChange={(v) => setValue("researchShowcase.hero.ctaHref", v)}
                        />
                      </div>
                    </div>
                  )}

                  {/* FEATURED */}
                  {isTab("featured") && (
                    <div className="grid gap-4">
                      <ImageField
                        label="Featured lab image"
                        value={String(get(formValues, "researchShowcase.featured.image", "") ?? "")}
                        onChange={(v) => setValue("researchShowcase.featured.image", v)}
                        description="Large featured card image."
                        previewAlt="Featured lab image preview"
                      />

                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Featured kicker"
                          value={String(get(formValues, "researchShowcase.featured.kicker", "") ?? "")}
                          onValueChange={(v) => setValue("researchShowcase.featured.kicker", v)}
                        />
                        <Input
                          label="Featured title"
                          value={String(get(formValues, "researchShowcase.featured.title", "") ?? "")}
                          onValueChange={(v) => setValue("researchShowcase.featured.title", v)}
                        />
                        <Input
                          className="md:col-span-2"
                          label="Featured alt text"
                          value={String(get(formValues, "researchShowcase.featured.alt", "") ?? "")}
                          onValueChange={(v) => setValue("researchShowcase.featured.alt", v)}
                        />
                      </div>
                    </div>
                  )}

                  {/* LABS (add/delete/reorder + image upload/preview) */}
                  {isTab("labs") && (
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-default-800">Labs</div>
                          <div className="text-xs text-default-500">Drag to reorder. New lab added at top.</div>
                        </div>
                        <Button color="primary" variant="flat" onPress={addLabFirst}>
                          Add lab
                        </Button>
                      </div>

                      <div className="grid gap-4">
                        {labsList.map((_, index) => (
                          <Card
                            key={index}
                            draggable
                            onDragStart={() => onDragStartLab(index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => onDropLab(index)}
                            className="border border-default-200"
                          >
                            <CardHeader className="flex items-center justify-between">
                              <div className="text-sm font-semibold text-default-800">Lab {index + 1}</div>
                              <Button color="danger" variant="flat" onPress={() => deleteLab(index)}>
                                Delete
                              </Button>
                            </CardHeader>

                            <CardBody className="grid gap-4">
                              <ImageField
                                label="Lab image"
                                value={String(get(formValues, `researchShowcase.labs.${index}.image`, "") ?? "")}
                                onChange={(v) => setValue(`researchShowcase.labs.${index}.image`, v)}
                                description="Shown on the lab card."
                                previewAlt={`Lab ${index + 1} image preview`}
                              />

                              <div className="grid gap-4 md:grid-cols-2">
                                <Input
                                  label="Lab title"
                                  value={String(get(formValues, `researchShowcase.labs.${index}.title`, "") ?? "")}
                                  onValueChange={(v) => setValue(`researchShowcase.labs.${index}.title`, v)}
                                />
                                <Input
                                  label="Alt text"
                                  value={String(get(formValues, `researchShowcase.labs.${index}.alt`, "") ?? "")}
                                  onValueChange={(v) => setValue(`researchShowcase.labs.${index}.alt`, v)}
                                />
                              </div>
                            </CardBody>
                          </Card>
                        ))}

                        {labsList.length === 0 ? (
                          <div className="rounded-large border border-default-200 bg-default-50 p-4 text-sm text-default-600">
                            No labs yet. Click “Add lab”.
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}

                  {/* IMPACT */}
                  {isTab("impact") && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Impact kicker"
                        value={String(get(formValues, "researchShowcase.impact.kicker", "") ?? "")}
                        onValueChange={(v) => setValue("researchShowcase.impact.kicker", v)}
                      />
                      <Input
                        label="Impact title"
                        value={String(get(formValues, "researchShowcase.impact.title", "") ?? "")}
                        onValueChange={(v) => setValue("researchShowcase.impact.title", v)}
                      />
                      <div className="md:col-span-2">
                        <Textarea
                          label="Impact description"
                          value={String(get(formValues, "researchShowcase.impact.desc", "") ?? "")}
                          onValueChange={(v) => setValue("researchShowcase.impact.desc", v)}
                          minRows={3}
                        />
                      </div>
                      <Input
                        label="Impact CTA label"
                        value={String(get(formValues, "researchShowcase.impact.ctaLabel", "") ?? "")}
                        onValueChange={(v) => setValue("researchShowcase.impact.ctaLabel", v)}
                      />
                      <Input
                        label="Impact CTA href"
                        value={String(get(formValues, "researchShowcase.impact.ctaHref", "") ?? "")}
                        onValueChange={(v) => setValue("researchShowcase.impact.ctaHref", v)}
                      />
                    </div>
                  )}

                  {/* STATS */}
                  {isTab("stats") && (
                    <div className="grid gap-4 md:grid-cols-2">
                      {(showcase.stats ?? []).map((_, index) => (
                        <React.Fragment key={index}>
                          <Input
                            label={`Research stat ${index + 1} label`}
                            value={String(get(formValues, `researchShowcase.stats.${index}.label`, "") ?? "")}
                            onValueChange={(v) => setValue(`researchShowcase.stats.${index}.label`, v)}
                          />
                          <Input
                            label={`Research stat ${index + 1} value`}
                            value={String(get(formValues, `researchShowcase.stats.${index}.value`, "") ?? "")}
                            onValueChange={(v) => setValue(`researchShowcase.stats.${index}.value`, v)}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={onClose} isDisabled={updateHomeCopy.isPending}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave} isLoading={updateHomeCopy.isPending}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
