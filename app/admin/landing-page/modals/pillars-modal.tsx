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
  Divider,
  Tabs,
  Tab,
} from "@heroui/react";

import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHomePageCopy, useUpdateHomePageCopy } from "@/hooks/useHomePageCopy";

const emptyPillars = {
  pillarsKicker: "",
  pillarsTitle: "",
  pillarsDesc: "",
  pillarsCtaLabel: "",
};

type PillarItem = {
  number?: string;
  title?: string;
  desc?: string;
  icon?: string;
  color?: string;
  href?: string;
};

type FormValues = Record<string, string>;

export default function PillarsModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();

  const pillarsMeta = isEmpty(homeCopy?.dict?.pillars)
    ? emptyPillars
    : homeCopy?.dict?.pillars ?? emptyPillars;

  const pillars: PillarItem[] = isEmpty(homeCopy?.pillars) ? [] : homeCopy?.pillars ?? [];

  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [activeKey, setActiveKey] = React.useState<string>("header");

  React.useEffect(() => {
    if (!isOpen) return;

    const next: FormValues = {
      "dict.pillars.pillarsKicker": String(pillarsMeta.pillarsKicker ?? ""),
      "dict.pillars.pillarsTitle": String(pillarsMeta.pillarsTitle ?? ""),
      "dict.pillars.pillarsDesc": String(pillarsMeta.pillarsDesc ?? ""),
      "dict.pillars.pillarsCtaLabel": String(pillarsMeta.pillarsCtaLabel ?? ""),
    };

    pillars.forEach((item, index) => {
      next[`pillars.${index}.number`] = String(item.number ?? "");
      next[`pillars.${index}.title`] = String(item.title ?? "");
      next[`pillars.${index}.desc`] = String(item.desc ?? "");
      next[`pillars.${index}.icon`] = String(item.icon ?? "");
      next[`pillars.${index}.color`] = String(item.color ?? "");
      next[`pillars.${index}.href`] = String(item.href ?? "");
    });

    setFormValues(next);
    setActiveKey("header");
  }, [isOpen, pillarsMeta, pillars]);

  const setValue = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "dict.pillars.pillarsKicker": String(get(formValues, "dict.pillars.pillarsKicker", "")),
      "dict.pillars.pillarsTitle": String(get(formValues, "dict.pillars.pillarsTitle", "")),
      "dict.pillars.pillarsDesc": String(get(formValues, "dict.pillars.pillarsDesc", "")),
      "dict.pillars.pillarsCtaLabel": String(get(formValues, "dict.pillars.pillarsCtaLabel", "")),
    };

    pillars.forEach((_, index) => {
      updates[`pillars.${index}.number`] = String(get(formValues, `pillars.${index}.number`, ""));
      updates[`pillars.${index}.title`] = String(get(formValues, `pillars.${index}.title`, ""));
      updates[`pillars.${index}.desc`] = String(get(formValues, `pillars.${index}.desc`, ""));
      updates[`pillars.${index}.icon`] = String(get(formValues, `pillars.${index}.icon`, ""));
      updates[`pillars.${index}.color`] = String(get(formValues, `pillars.${index}.color`, ""));
      updates[`pillars.${index}.href`] = String(get(formValues, `pillars.${index}.href`, ""));
    });

    updateHomeCopy.mutate(
      { section: "pillars", data: updates },
      { onSuccess: () => onClose() },
    );
  };

  const isHeader = activeKey === "header";
  const pillarIndex = isHeader ? -1 : Number(String(activeKey).replace("pillar-", ""));

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} size="5xl" scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Pillars</ModalHeader>

            <ModalBody>
              <Card>
                <CardBody className="gap-4">
                  <Tabs
                    aria-label="Pillars editor"
                    selectedKey={activeKey}
                    onSelectionChange={(k) => setActiveKey(String(k))}
                    variant="underlined"
                    color="primary"
                  >
                    <Tab key="header" title="Header" />
                    {pillars.map((_, index) => (
                      <Tab key={`pillar-${index}`} title={`Pillar ${index + 1}`} />
                    ))}
                  </Tabs>

                  <Divider />

                  {isHeader ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Pillars kicker"
                        value={String(get(formValues, "dict.pillars.pillarsKicker", "") ?? "")}
                        onValueChange={(v) => setValue("dict.pillars.pillarsKicker", v)}
                      />
                      <Input
                        label="Pillars title"
                        value={String(get(formValues, "dict.pillars.pillarsTitle", "") ?? "")}
                        onValueChange={(v) => setValue("dict.pillars.pillarsTitle", v)}
                      />
                      <div className="md:col-span-2">
                        <Textarea
                          label="Pillars description"
                          value={String(get(formValues, "dict.pillars.pillarsDesc", "") ?? "")}
                          onValueChange={(v) => setValue("dict.pillars.pillarsDesc", v)}
                          minRows={3}
                        />
                      </div>
                      <Input
                        className="md:col-span-2"
                        label="Pillars CTA label"
                        value={String(get(formValues, "dict.pillars.pillarsCtaLabel", "") ?? "")}
                        onValueChange={(v) => setValue("dict.pillars.pillarsCtaLabel", v)}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Number"
                        value={String(get(formValues, `pillars.${pillarIndex}.number`, "") ?? "")}
                        onValueChange={(v) => setValue(`pillars.${pillarIndex}.number`, v)}
                      />
                      <Input
                        label="Title"
                        value={String(get(formValues, `pillars.${pillarIndex}.title`, "") ?? "")}
                        onValueChange={(v) => setValue(`pillars.${pillarIndex}.title`, v)}
                      />

                      <div className="md:col-span-2">
                        <Textarea
                          label="Description"
                          value={String(get(formValues, `pillars.${pillarIndex}.desc`, "") ?? "")}
                          onValueChange={(v) => setValue(`pillars.${pillarIndex}.desc`, v)}
                          minRows={3}
                        />
                      </div>

                      <Input
                        label="Icon"
                        value={String(get(formValues, `pillars.${pillarIndex}.icon`, "") ?? "")}
                        onValueChange={(v) => setValue(`pillars.${pillarIndex}.icon`, v)}
                      />
                      <Input
                        label="Color"
                        value={String(get(formValues, `pillars.${pillarIndex}.color`, "") ?? "")}
                        onValueChange={(v) => setValue(`pillars.${pillarIndex}.color`, v)}
                      />
                      <Input
                        className="md:col-span-2"
                        label="Href"
                        value={String(get(formValues, `pillars.${pillarIndex}.href`, "") ?? "")}
                        onValueChange={(v) => setValue(`pillars.${pillarIndex}.href`, v)}
                      />
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
