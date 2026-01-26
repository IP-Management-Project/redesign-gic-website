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
  Switch,
  Image,
} from "@heroui/react";

import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHomePageCopy, useUpdateHomePageCopy } from "@/hooks/useHomePageCopy";

const emptyPartners = {
  partnersKicker: "",
  partnersTitle: "",
  partnersDesc: "",
};

const emptyPartnerSection = {
  feature: { image: "", kicker: "", title: "", desc: "" },
  stats: [] as Array<{ value: string; label: string }>,
  regions: [] as string[],
  affiliationsLabel: "",
  pathways: [] as Array<{
    title: string;
    desc: string;
    imgSrc: string;
    href: string;
    icon: string;
    isWide?: boolean;
  }>,
  partners: [] as Array<{ name: string; src: string; url: string }>,
};

type PartnerLogo = { name: string; src: string; url: string };
type FormValues = Record<string, string>;

function safeParseBool(value: string) {
  return (value ?? "").trim().toLowerCase() === "true";
}

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

/** ===== reorder helpers (native DnD) ===== */
function arrayMove<T>(arr: T[], from: number, to: number) {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function reorderPartnerFormValues(params: {
  prevForm: FormValues;
  prevPartners: PartnerLogo[];
  nextPartners: PartnerLogo[];
}) {
  const { prevForm, prevPartners, nextPartners } = params;

  const prevValues = prevPartners.map((_, i) => ({
    name: String(get(prevForm, `partners.partners.${i}.name`, "")),
    src: String(get(prevForm, `partners.partners.${i}.src`, "")),
    url: String(get(prevForm, `partners.partners.${i}.url`, "")),
  }));

  const mapValuesFor = (p: PartnerLogo) => {
    const idx = prevPartners.findIndex(
      (x) => x === p || (x.name === p.name && x.src === p.src && x.url === p.url),
    );
    if (idx >= 0) return prevValues[idx];
    return { name: p.name ?? "", src: p.src ?? "", url: p.url ?? "" };
  };

  const nextForm: FormValues = { ...prevForm };
  nextPartners.forEach((p, i) => {
    const v = mapValuesFor(p);
    nextForm[`partners.partners.${i}.name`] = v.name;
    nextForm[`partners.partners.${i}.src`] = v.src;
    nextForm[`partners.partners.${i}.url`] = v.url;
  });

  // clear dangling indices
  for (let i = nextPartners.length; i < prevPartners.length; i++) {
    delete nextForm[`partners.partners.${i}.name`];
    delete nextForm[`partners.partners.${i}.src`];
    delete nextForm[`partners.partners.${i}.url`];
  }

  return nextForm;
}

/** ===== Regions helpers (add/delete/reorder) ===== */
function reorderRegionsFormValues(params: {
  prevForm: FormValues;
  prevRegions: string[];
  nextRegions: string[];
}) {
  const { prevForm, prevRegions, nextRegions } = params;

  const prevValues = prevRegions.map((_, i) => String(get(prevForm, `partners.regions.${i}`, "")));

  const mapValuesFor = (region: string) => {
    const idx = prevRegions.findIndex((x) => x === region);
    if (idx >= 0) return prevValues[idx];
    return region ?? "";
  };

  const nextForm: FormValues = { ...prevForm };
  nextRegions.forEach((r, i) => {
    nextForm[`partners.regions.${i}`] = mapValuesFor(r);
  });

  // clear dangling indices
  for (let i = nextRegions.length; i < prevRegions.length; i++) {
    delete nextForm[`partners.regions.${i}`];
  }

  return nextForm;
}

/** ===== Logos editor: grid -> detail -> back (footer hides in detail) ===== */
function PartnersLogosEditor({
  partnersList,
  setPartnersList,
  formValues,
  setFormValues,
  selectedIndex,
  onSelect,
}: {
  partnersList: PartnerLogo[];
  setPartnersList: React.Dispatch<React.SetStateAction<PartnerLogo[]>>;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  selectedIndex: number | null;
  onSelect: (idx: number | null) => void;
}) {
  const dragFromRef = React.useRef<number | null>(null);

  const setValue = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const addPartnerFirst = () => {
    setPartnersList((prev) => [{ name: "", src: "", url: "" }, ...prev]);

    // shift form keys down by 1
    setFormValues((prevForm) => {
      const next = { ...prevForm };
      for (let i = partnersList.length; i >= 1; i--) {
        next[`partners.partners.${i}.name`] = String(get(prevForm, `partners.partners.${i - 1}.name`, ""));
        next[`partners.partners.${i}.src`] = String(get(prevForm, `partners.partners.${i - 1}.src`, ""));
        next[`partners.partners.${i}.url`] = String(get(prevForm, `partners.partners.${i - 1}.url`, ""));
      }
      next["partners.partners.0.name"] = "";
      next["partners.partners.0.src"] = "";
      next["partners.partners.0.url"] = "";
      return next;
    });

    onSelect(0);
  };

  const deletePartner = (index: number) => {
    setPartnersList((prev) => {
      const prevSnapshot = prev;
      const nextPartners = prev.filter((_, i) => i !== index);

      setFormValues((prevForm) => {
        // rebuild by shifting indices up
        const kept = prevSnapshot
          .map((_, i) => ({
            name: String(get(prevForm, `partners.partners.${i}.name`, "")),
            src: String(get(prevForm, `partners.partners.${i}.src`, "")),
            url: String(get(prevForm, `partners.partners.${i}.url`, "")),
          }))
          .filter((_, i) => i !== index);

        const next = { ...prevForm };
        kept.forEach((v, i) => {
          next[`partners.partners.${i}.name`] = v.name;
          next[`partners.partners.${i}.src`] = v.src;
          next[`partners.partners.${i}.url`] = v.url;
        });

        // clear dangling last
        const last = kept.length;
        delete next[`partners.partners.${last}.name`];
        delete next[`partners.partners.${last}.src`];
        delete next[`partners.partners.${last}.url`];

        return next;
      });

      return nextPartners;
    });

    onSelect(null);
  };

  const onDragStart = (index: number) => {
    dragFromRef.current = index;
  };

  const onDrop = (toIndex: number) => {
    const fromIndex = dragFromRef.current;
    dragFromRef.current = null;
    if (fromIndex == null || fromIndex === toIndex) return;

    setPartnersList((prev) => {
      const prevSnapshot = prev;
      const nextPartners = arrayMove(prev, fromIndex, toIndex);

      setFormValues((prevForm) =>
        reorderPartnerFormValues({
          prevForm,
          prevPartners: prevSnapshot,
          nextPartners,
        }),
      );

      // keep selected partner "same item"
      if (selectedIndex != null) {
        const selectedItem = prevSnapshot[selectedIndex];
        const nextIndex = nextPartners.findIndex((x) => x === selectedItem);
        onSelect(nextIndex >= 0 ? nextIndex : null);
      }

      return nextPartners;
    });
  };

  // ===== GRID VIEW =====
  if (selectedIndex == null) {
    return (
      <div className="grid gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-default-800">Partner logos</div>
            <div className="text-xs text-default-500">Click a logo to edit. Drag cards to reorder.</div>
          </div>
          <Button color="primary" variant="flat" onPress={addPartnerFirst}>
            Add partner
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partnersList.map((p, index) => {
            const name = String(get(formValues, `partners.partners.${index}.name`, p.name ?? "")) || "Untitled";
            const src = String(get(formValues, `partners.partners.${index}.src`, p.src ?? ""));
            const canPreview = isValidImageSrc(src);

            return (
              <Card
                key={index}
                isPressable
                onPress={() => onSelect(index)}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(index)}
                className="border border-default-200"
              >
                <CardBody className="gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-medium border border-default-200 bg-default-50">
                      {canPreview ? (
                        <Image src={src} alt={`${name} logo`} removeWrapper className="h-full w-full object-contain" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-default-500">
                          Logo
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-default-800">{name}</div>
                      <div className="text-xs text-default-500">Click to edit</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // ===== DETAIL VIEW =====
  const idx = selectedIndex;
  const nameKey = `partners.partners.${idx}.name`;
  const urlKey = `partners.partners.${idx}.url`;
  const srcKey = `partners.partners.${idx}.src`;

  const currentName = String(get(formValues, nameKey, partnersList[idx]?.name ?? ""));
  const currentUrl = String(get(formValues, urlKey, partnersList[idx]?.url ?? ""));
  const currentSrc = String(get(formValues, srcKey, partnersList[idx]?.src ?? ""));

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-default-800">Edit partner</div>
          <div className="text-xs text-default-500">Update name, website, and logo.</div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="flat" onPress={() => onSelect(null)}>
            Cancel
          </Button>
          <Button color="danger" variant="flat" onPress={() => deletePartner(idx)}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="text-sm font-semibold text-default-800">Details</CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-2">
          <Input label="School / Partner name" value={currentName} onValueChange={(v) => setValue(nameKey, v)} />
          <Input label="Website URL" value={currentUrl} onValueChange={(v) => setValue(urlKey, v)} />
        </CardBody>
      </Card>

      <ImageField
        label="Logo"
        value={currentSrc}
        onChange={(v) => setValue(srcKey, v)}
        description="Paste a link or upload a new logo."
        previewAlt={`${currentName || "Partner"} logo preview`}
      />
    </div>
  );
}

/** ===== Regions editor: add/delete/reorder (keeps payload order) ===== */
function RegionsEditor({
  regionsList,
  setRegionsList,
  formValues,
  setFormValues,
}: {
  regionsList: string[];
  setRegionsList: React.Dispatch<React.SetStateAction<string[]>>;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}) {
  const dragFromRef = React.useRef<number | null>(null);

  const setValue = (key: string, value: string) => setFormValues((prev) => ({ ...prev, [key]: value }));

  const addRegionFirst = () => {
    setRegionsList((prev) => ["", ...prev]);
    setFormValues((prevForm) => {
      const next = { ...prevForm };
      for (let i = regionsList.length; i >= 1; i--) {
        next[`partners.regions.${i}`] = String(get(prevForm, `partners.regions.${i - 1}`, ""));
      }
      next[`partners.regions.0`] = "";
      return next;
    });
  };

  const deleteRegion = (index: number) => {
    setRegionsList((prev) => {
      const prevSnapshot = prev;
      const nextRegions = prev.filter((_, i) => i !== index);

      setFormValues((prevForm) => {
        const kept = prevSnapshot
          .map((_, i) => String(get(prevForm, `partners.regions.${i}`, "")))
          .filter((_, i) => i !== index);

        const next = { ...prevForm };
        kept.forEach((v, i) => (next[`partners.regions.${i}`] = v));

        delete next[`partners.regions.${kept.length}`];
        return next;
      });

      return nextRegions;
    });
  };

  const onDragStart = (index: number) => {
    dragFromRef.current = index;
  };

  const onDrop = (toIndex: number) => {
    const fromIndex = dragFromRef.current;
    dragFromRef.current = null;
    if (fromIndex == null || fromIndex === toIndex) return;

    setRegionsList((prev) => {
      const prevSnapshot = prev;
      const nextRegions = arrayMove(prev, fromIndex, toIndex);

      setFormValues((prevForm) =>
        reorderRegionsFormValues({
          prevForm,
          prevRegions: prevSnapshot,
          nextRegions,
        }),
      );

      return nextRegions;
    });
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-default-800">Regions</div>
          <div className="text-xs text-default-500">Add, delete, and drag to reorder.</div>
        </div>
        <Button color="primary" variant="flat" onPress={addRegionFirst}>
          Add region
        </Button>
      </div>

      <div className="grid gap-3">
        {regionsList.map((_, index) => (
          <Card
            key={index}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(index)}
            className="border border-default-200"
          >
            <CardBody className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <Input
                label={`Region ${index + 1}`}
                value={String(get(formValues, `partners.regions.${index}`, "") ?? "")}
                onValueChange={(v) => setValue(`partners.regions.${index}`, v)}
              />
              <Button color="danger" variant="flat" onPress={() => deleteRegion(index)}>
                Delete
              </Button>
            </CardBody>
          </Card>
        ))}

        {regionsList.length === 0 ? (
          <div className="rounded-large border border-default-200 bg-default-50 p-4 text-sm text-default-600">
            No regions yet. Click “Add region”.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function PartnersModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();

  const copy = isEmpty(homeCopy?.dict) ? emptyPartners : homeCopy?.dict ?? emptyPartners;
  const partners = isEmpty(homeCopy?.partners) ? emptyPartnerSection : homeCopy?.partners ?? emptyPartnerSection;

  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [activeKey, setActiveKey] = React.useState<string>("copy");
  const [selectedPartnerIndex, setSelectedPartnerIndex] = React.useState<number | null>(null);

  // local lists for order/add/delete
  const [partnersList, setPartnersList] = React.useState<PartnerLogo[]>([]);
  const [regionsList, setRegionsList] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!isOpen) return;

    setPartnersList((partners.partners ?? []).map((p) => ({ name: p.name ?? "", src: p.src ?? "", url: p.url ?? "" })));
    setRegionsList([...(partners.regions ?? [])]);

    const next: FormValues = {
      "dict.partnersKicker": String(copy.partnersKicker ?? ""),
      "dict.partnersTitle": String(copy.partnersTitle ?? ""),
      "dict.partnersDesc": String(copy.partnersDesc ?? ""),

      "partners.feature.image": String(partners.feature?.image ?? ""),
      "partners.feature.kicker": String(partners.feature?.kicker ?? ""),
      "partners.feature.title": String(partners.feature?.title ?? ""),
      "partners.feature.desc": String(partners.feature?.desc ?? ""),

      "partners.affiliationsLabel": String(partners.affiliationsLabel ?? ""),
    };

    partners.stats?.forEach((stat, index) => {
      next[`partners.stats.${index}.value`] = String(stat?.value ?? "");
      next[`partners.stats.${index}.label`] = String(stat?.label ?? "");
    });

    (partners.regions ?? []).forEach((region, index) => {
      next[`partners.regions.${index}`] = String(region ?? "");
    });

    (partners.partners ?? []).forEach((p, index) => {
      next[`partners.partners.${index}.name`] = String(p?.name ?? "");
      next[`partners.partners.${index}.src`] = String(p?.src ?? "");
      next[`partners.partners.${index}.url`] = String(p?.url ?? "");
    });

    partners.pathways?.forEach((p, index) => {
      next[`partners.pathways.${index}.title`] = String(p?.title ?? "");
      next[`partners.pathways.${index}.desc`] = String(p?.desc ?? "");
      next[`partners.pathways.${index}.imgSrc`] = String(p?.imgSrc ?? "");
      next[`partners.pathways.${index}.href`] = String(p?.href ?? "");
      next[`partners.pathways.${index}.icon`] = String(p?.icon ?? "");
      next[`partners.pathways.${index}.isWide`] = String(p?.isWide ?? false);
    });

    setFormValues(next);
    setActiveKey("copy");
    setSelectedPartnerIndex(null);
  }, [isOpen, copy, partners]);

  const setValue = (key: string, value: string) => setFormValues((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const updates: Record<string, string | boolean> = {
      "dict.partnersKicker": String(get(formValues, "dict.partnersKicker", "")),
      "dict.partnersTitle": String(get(formValues, "dict.partnersTitle", "")),
      "dict.partnersDesc": String(get(formValues, "dict.partnersDesc", "")),

      "partners.feature.image": String(get(formValues, "partners.feature.image", "")),
      "partners.feature.kicker": String(get(formValues, "partners.feature.kicker", "")),
      "partners.feature.title": String(get(formValues, "partners.feature.title", "")),
      "partners.feature.desc": String(get(formValues, "partners.feature.desc", "")),

      "partners.affiliationsLabel": String(get(formValues, "partners.affiliationsLabel", "")),
    };

    partners.stats?.forEach((_, index) => {
      updates[`partners.stats.${index}.value`] = String(get(formValues, `partners.stats.${index}.value`, ""));
      updates[`partners.stats.${index}.label`] = String(get(formValues, `partners.stats.${index}.label`, ""));
    });

    // save regions from regionsList order
    regionsList.forEach((_, index) => {
      updates[`partners.regions.${index}`] = String(get(formValues, `partners.regions.${index}`, ""));
    });
    // clear removed tail (based on original length)
    for (let i = regionsList.length; i < (partners.regions?.length ?? 0); i++) {
      updates[`partners.regions.${i}`] = "";
    }

    // save partners from partnersList order
    partnersList.forEach((p, index) => {
      updates[`partners.partners.${index}.name`] = String(get(formValues, `partners.partners.${index}.name`, p.name ?? ""));
      updates[`partners.partners.${index}.src`] = String(get(formValues, `partners.partners.${index}.src`, p.src ?? ""));
      updates[`partners.partners.${index}.url`] = String(get(formValues, `partners.partners.${index}.url`, p.url ?? ""));
    });
    // clear removed tail (based on original length)
    for (let i = partnersList.length; i < (partners.partners?.length ?? 0); i++) {
      updates[`partners.partners.${i}.name`] = "";
      updates[`partners.partners.${i}.src`] = "";
      updates[`partners.partners.${i}.url`] = "";
    }

    partners.pathways?.forEach((_, index) => {
      updates[`partners.pathways.${index}.title`] = String(get(formValues, `partners.pathways.${index}.title`, ""));
      updates[`partners.pathways.${index}.desc`] = String(get(formValues, `partners.pathways.${index}.desc`, ""));
      updates[`partners.pathways.${index}.imgSrc`] = String(get(formValues, `partners.pathways.${index}.imgSrc`, ""));
      updates[`partners.pathways.${index}.href`] = String(get(formValues, `partners.pathways.${index}.href`, ""));
      updates[`partners.pathways.${index}.icon`] = String(get(formValues, `partners.pathways.${index}.icon`, ""));
      updates[`partners.pathways.${index}.isWide`] = safeParseBool(
        String(get(formValues, `partners.pathways.${index}.isWide`, "false")),
      );
    });

    updateHomeCopy.mutate({ section: "partners", data: updates }, { onSuccess: () => onClose() });
  };

  const isTab = (k: string) => activeKey === k;
  const pathwayIndex = activeKey.startsWith("pathway-") ? Number(activeKey.replace("pathway-", "")) : -1;

  const isEditingPartner = activeKey === "partners" && selectedPartnerIndex != null;

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} size="5xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Partners</ModalHeader>

            <ModalBody>
              <Card>
                <CardBody className="gap-4">
                  <Tabs
                    aria-label="Partners editor"
                    selectedKey={activeKey}
                    onSelectionChange={(k) => {
                      setActiveKey(String(k));
                      if (String(k) !== "partners") setSelectedPartnerIndex(null);
                    }}
                    variant="underlined"
                    color="primary"
                  >
                    <Tab key="copy" title="Copy" />
                    <Tab key="feature" title="Feature" />
                    <Tab key="stats" title={`Stats (${partners.stats?.length ?? 0})`} />
                    <Tab key="regions" title={`Regions (${regionsList.length})`} />
                    <Tab key="affiliations" title="Affiliations" />
                    <Tab key="partners" title={`Logos (${partnersList.length})`} />
                    {partners.pathways?.map((_, i) => (
                      <Tab key={`pathway-${i}`} title={`Pathway ${i + 1}`} />
                    ))}
                  </Tabs>

                  <Divider />

                  {/* COPY */}
                  {isTab("copy") && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Partners kicker"
                        value={String(get(formValues, "dict.partnersKicker", "") ?? "")}
                        onValueChange={(v) => setValue("dict.partnersKicker", v)}
                      />
                      <Input
                        label="Partners title"
                        value={String(get(formValues, "dict.partnersTitle", "") ?? "")}
                        onValueChange={(v) => setValue("dict.partnersTitle", v)}
                      />
                      <div className="md:col-span-2">
                        <Textarea
                          label="Partners description"
                          value={String(get(formValues, "dict.partnersDesc", "") ?? "")}
                          onValueChange={(v) => setValue("dict.partnersDesc", v)}
                          minRows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* FEATURE */}
                  {isTab("feature") && (
                    <div className="grid gap-4">
                      <ImageField
                        label="Feature image"
                        value={String(get(formValues, "partners.feature.image", "") ?? "")}
                        onChange={(v) => setValue("partners.feature.image", v)}
                        description="Shown in the partners highlight section."
                        previewAlt="Partners feature image preview"
                      />

                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Feature kicker"
                          value={String(get(formValues, "partners.feature.kicker", "") ?? "")}
                          onValueChange={(v) => setValue("partners.feature.kicker", v)}
                        />
                        <Input
                          label="Feature title"
                          value={String(get(formValues, "partners.feature.title", "") ?? "")}
                          onValueChange={(v) => setValue("partners.feature.title", v)}
                        />
                        <div className="md:col-span-2">
                          <Textarea
                            label="Feature description"
                            value={String(get(formValues, "partners.feature.desc", "") ?? "")}
                            onValueChange={(v) => setValue("partners.feature.desc", v)}
                            minRows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STATS */}
                  {isTab("stats") && (
                    <div className="grid gap-4 md:grid-cols-2">
                      {(partners.stats ?? []).map((_, index) => (
                        <React.Fragment key={index}>
                          <Input
                            label={`Stat ${index + 1} value`}
                            value={String(get(formValues, `partners.stats.${index}.value`, "") ?? "")}
                            onValueChange={(v) => setValue(`partners.stats.${index}.value`, v)}
                          />
                          <Input
                            label={`Stat ${index + 1} label`}
                            value={String(get(formValues, `partners.stats.${index}.label`, "") ?? "")}
                            onValueChange={(v) => setValue(`partners.stats.${index}.label`, v)}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* REGIONS (NOW add/delete/reorder) */}
                  {isTab("regions") && (
                    <RegionsEditor
                      regionsList={regionsList}
                      setRegionsList={setRegionsList}
                      formValues={formValues}
                      setFormValues={setFormValues}
                    />
                  )}

                  {/* AFFILIATIONS */}
                  {isTab("affiliations") && (
                    <div className="grid gap-4">
                      <Input
                        label="Affiliations label"
                        value={String(get(formValues, "partners.affiliationsLabel", "") ?? "")}
                        onValueChange={(v) => setValue("partners.affiliationsLabel", v)}
                      />
                    </div>
                  )}

                  {/* LOGOS / PARTNERS */}
                  {isTab("partners") && (
                    <PartnersLogosEditor
                      partnersList={partnersList}
                      setPartnersList={setPartnersList}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      selectedIndex={selectedPartnerIndex}
                      onSelect={setSelectedPartnerIndex}
                    />
                  )}

                  {/* PATHWAYS */}
                  {pathwayIndex >= 0 && (
                    <div className="grid gap-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Title"
                          value={String(get(formValues, `partners.pathways.${pathwayIndex}.title`, "") ?? "")}
                          onValueChange={(v) => setValue(`partners.pathways.${pathwayIndex}.title`, v)}
                        />
                        <Input
                          label="Icon"
                          value={String(get(formValues, `partners.pathways.${pathwayIndex}.icon`, "") ?? "")}
                          onValueChange={(v) => setValue(`partners.pathways.${pathwayIndex}.icon`, v)}
                        />

                        <div className="md:col-span-2">
                          <Textarea
                            label="Description"
                            value={String(get(formValues, `partners.pathways.${pathwayIndex}.desc`, "") ?? "")}
                            onValueChange={(v) => setValue(`partners.pathways.${pathwayIndex}.desc`, v)}
                            minRows={3}
                          />
                        </div>
                      </div>

                      <ImageField
                        label="Pathway image"
                        value={String(get(formValues, `partners.pathways.${pathwayIndex}.imgSrc`, "") ?? "")}
                        onChange={(v) => setValue(`partners.pathways.${pathwayIndex}.imgSrc`, v)}
                        description="Shown on the pathway card."
                        previewAlt="Pathway image preview"
                      />

                      <Input
                        label="Href"
                        value={String(get(formValues, `partners.pathways.${pathwayIndex}.href`, "") ?? "")}
                        onValueChange={(v) => setValue(`partners.pathways.${pathwayIndex}.href`, v)}
                      />

                      <div className="md:col-span-2 flex items-center justify-between gap-4 rounded-large border border-default-200 bg-default-50 px-4 py-3">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-default-800">Wide card</div>
                          <div className="text-xs text-default-500">Makes this pathway use the wide layout.</div>
                        </div>

                        <Switch
                          isSelected={safeParseBool(
                            String(get(formValues, `partners.pathways.${pathwayIndex}.isWide`, "false")),
                          )}
                          onValueChange={(checked) =>
                            setValue(`partners.pathways.${pathwayIndex}.isWide`, String(checked))
                          }
                        />
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </ModalBody>

            {/* Hide footer while editing a single partner (detail view) */}
            {!isEditingPartner ? (
              <ModalFooter>
                <Button variant="flat" onPress={onClose} isDisabled={updateHomeCopy.isPending}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSave} isLoading={updateHomeCopy.isPending}>
                  Save
                </Button>
              </ModalFooter>
            ) : null}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}