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

const emptyStats = {
  statsKicker: "",
  statsTitle: "",
  statsDesc: "",
};

type StatItem = {
  label?: string;
  value?: string;
  helper?: string;
  icon?: string;
};

type FormValues = Record<string, string>;

export default function StatsModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();

  const stats = isEmpty(homeCopy?.dict?.stats) ? emptyStats : homeCopy?.dict?.stats ?? emptyStats;
  const statsItems: StatItem[] = isEmpty(homeCopy?.statsItems) ? [] : homeCopy?.statsItems ?? [];

  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [activeKey, setActiveKey] = React.useState<string>("header");

  React.useEffect(() => {
    if (!isOpen) return;

    const next: FormValues = {
      "dict.stats.statsKicker": String(stats.statsKicker ?? ""),
      "dict.stats.statsTitle": String(stats.statsTitle ?? ""),
      "dict.stats.statsDesc": String(stats.statsDesc ?? ""),
    };

    statsItems.forEach((item, index) => {
      next[`statsItems.${index}.label`] = String(item.label ?? "");
      next[`statsItems.${index}.value`] = String(item.value ?? "");
      next[`statsItems.${index}.helper`] = String(item.helper ?? "");
      next[`statsItems.${index}.icon`] = String(item.icon ?? "");
    });

    setFormValues(next);
    setActiveKey("header");
  }, [isOpen, stats, statsItems]);

  const setValue = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const updates: Record<string, string> = {
      "dict.stats.statsKicker": String(get(formValues, "dict.stats.statsKicker", "")),
      "dict.stats.statsTitle": String(get(formValues, "dict.stats.statsTitle", "")),
      "dict.stats.statsDesc": String(get(formValues, "dict.stats.statsDesc", "")),
    };

    statsItems.forEach((_, index) => {
      updates[`statsItems.${index}.label`] = String(get(formValues, `statsItems.${index}.label`, ""));
      updates[`statsItems.${index}.value`] = String(get(formValues, `statsItems.${index}.value`, ""));
      updates[`statsItems.${index}.helper`] = String(get(formValues, `statsItems.${index}.helper`, ""));
      updates[`statsItems.${index}.icon`] = String(get(formValues, `statsItems.${index}.icon`, ""));
    });

    updateHomeCopy.mutate(
      { section: "stats", data: updates },
      { onSuccess: () => onClose() },
    );
  };

  const isHeader = activeKey === "header";
  const statIndex = isHeader ? -1 : Number(String(activeKey).replace("stat-", ""));

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Stats</ModalHeader>

            <ModalBody>
              <Card>
                <CardBody className="gap-4">
                  <Tabs
                    aria-label="Stats editor"
                    selectedKey={activeKey}
                    onSelectionChange={(k) => setActiveKey(String(k))}
                    variant="underlined"
                    color="primary"
                  >
                    <Tab key="header" title="Header" />
                    {statsItems.map((_, index) => (
                      <Tab key={`stat-${index}`} title={`Stat ${index + 1}`} />
                    ))}
                  </Tabs>

                  <Divider />

                  {isHeader ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Stats kicker"
                        value={String(get(formValues, "dict.stats.statsKicker", "") ?? "")}
                        onValueChange={(v) => setValue("dict.stats.statsKicker", v)}
                      />
                      <Input
                        label="Stats title"
                        value={String(get(formValues, "dict.stats.statsTitle", "") ?? "")}
                        onValueChange={(v) => setValue("dict.stats.statsTitle", v)}
                      />
                      <div className="md:col-span-2">
                        <Textarea
                          label="Stats description"
                          value={String(get(formValues, "dict.stats.statsDesc", "") ?? "")}
                          onValueChange={(v) => setValue("dict.stats.statsDesc", v)}
                          minRows={3}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input
                        label="Label"
                        value={String(get(formValues, `statsItems.${statIndex}.label`, "") ?? "")}
                        onValueChange={(v) => setValue(`statsItems.${statIndex}.label`, v)}
                      />
                      <Input
                        label="Value"
                        value={String(get(formValues, `statsItems.${statIndex}.value`, "") ?? "")}
                        onValueChange={(v) => setValue(`statsItems.${statIndex}.value`, v)}
                      />
                      <Input
                        label="Helper"
                        value={String(get(formValues, `statsItems.${statIndex}.helper`, "") ?? "")}
                        onValueChange={(v) => setValue(`statsItems.${statIndex}.helper`, v)}
                      />
                      <Input
                        label="Icon"
                        value={String(get(formValues, `statsItems.${statIndex}.icon`, "") ?? "")}
                        onValueChange={(v) => setValue(`statsItems.${statIndex}.icon`, v)}
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
