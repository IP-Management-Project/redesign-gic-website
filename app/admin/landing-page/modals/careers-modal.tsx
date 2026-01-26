"use client";

import React from "react";
import { isEmpty, get } from "lodash";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, Textarea, Card, CardBody, Divider, Tabs, Tab,
} from "@heroui/react";

// DND Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { SectionModalProps } from "@/app/admin/landing-page/modals/types";
import { useHomePageCopy, useUpdateHomePageCopy } from "@/hooks/useHomePageCopy";

/** ===== Reusable Sortable Wrapper ===== */
interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      {children}
    </div>
  );
}

/** ===== Types & Defaults ===== */
type CareersDict = {
  careersKicker: string; careersTitle: string; careersDesc: string; careersNote: string;
};
type CareerRole = { id: string; title: string; growth: string; color: string; };
type CareersData = { partners: { id: string; value: string }[]; roles: CareerRole[]; };
type FormValues = Record<string, string>;

export default function CareersModal({ isOpen, onClose }: SectionModalProps) {
  const { data: homeCopy } = useHomePageCopy();
  const updateHomeCopy = useUpdateHomePageCopy();

  const [partnersList, setPartnersList] = React.useState<{ id: string; value: string }[]>([]);
  const [rolesList, setRolesList] = React.useState<CareerRole[]>([]);
  const [formValues, setFormValues] = React.useState<FormValues>({});
  const [activeKey, setActiveKey] = React.useState<string>("copy");

  // DND Kit Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  React.useEffect(() => {
    if (!isOpen) return;

    // We map to objects with IDs because dnd-kit requires stable unique identifiers
    const initialPartners = (homeCopy?.careers?.partners ?? []).map((p: string, i: number) => ({
      id: `partner-${i}-${Date.now()}`,
      value: p,
    }));

    const initialRoles = (homeCopy?.careers?.roles ?? []).map((r: any, i: number) => ({
      ...r,
      id: r.id || `role-${i}-${Date.now()}`,
    }));

    setPartnersList(initialPartners);
    setRolesList(initialRoles);

    // Flatten values for the form state
    const next: FormValues = {
      "dict.carrer.careersKicker": String(homeCopy?.dict?.carrer?.careersKicker ?? ""),
      "dict.carrer.careersTitle": String(homeCopy?.dict?.carrer?.careersTitle ?? ""),
      "dict.carrer.careersDesc": String(homeCopy?.dict?.carrer?.careersDesc ?? ""),
      "dict.carrer.careersNote": String(homeCopy?.dict?.carrer?.careersNote ?? ""),
    };
    setFormValues(next);
  }, [isOpen, homeCopy]);

  const setValue = (key: string, value: string) => setFormValues(prev => ({ ...prev, [key]: value }));

  /** ===== Handlers ===== */
  const handlePartnerDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPartnersList((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRoleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRolesList((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addPartner = () => {
    setPartnersList([{ id: `new-p-${Date.now()}`, value: "" }, ...partnersList]);
  };

  const addRole = () => {
    setRolesList([{ id: `new-r-${Date.now()}`, title: "", growth: "", color: "" }, ...rolesList]);
  };

  const handleSave = () => {
    const updates: Record<string, any> = {
      "dict.carrer.careersKicker": formValues["dict.carrer.careersKicker"],
      "dict.carrer.careersTitle": formValues["dict.carrer.careersTitle"],
      "dict.carrer.careersDesc": formValues["dict.carrer.careersDesc"],
      "dict.carrer.careersNote": formValues["dict.carrer.careersNote"],
    };

    // Construct array payloads based on current list order
    updates["careers.partners"] = partnersList.map(p => p.value);
    updates["careers.roles"] = rolesList.map(({ id, ...rest }) => rest);

    updateHomeCopy.mutate({ section: "careers", data: updates }, { onSuccess: onClose });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()} size="5xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Edit Careers</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody className="gap-4">
              <Tabs selectedKey={activeKey} onSelectionChange={(k) => setActiveKey(String(k))} variant="underlined" color="primary">
                <Tab key="copy" title="Header" />
                <Tab key="partners" title={`Partners (${partnersList.length})`} />
                <Tab key="roles" title={`Roles (${rolesList.length})`} />
              </Tabs>
              <Divider />

              {activeKey === "copy" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Kicker" value={formValues["dict.carrer.careersKicker"]} onValueChange={(v) => setValue("dict.carrer.careersKicker", v)} />
                  <Input label="Title" value={formValues["dict.carrer.careersTitle"]} onValueChange={(v) => setValue("dict.carrer.careersTitle", v)} />
                  <Textarea className="md:col-span-2" label="Description" value={formValues["dict.carrer.careersDesc"]} onValueChange={(v) => setValue("dict.carrer.careersDesc", v)} />
                </div>
              )}

              {activeKey === "partners" && (
                <div className="grid gap-4">
                  <Button color="primary" variant="flat" onPress={addPartner} className="self-end w-1/6">Add Partner</Button>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handlePartnerDragEnd}>
                    <SortableContext items={partnersList.map(p => p.id)} strategy={verticalListSortingStrategy}>
                      {partnersList.map((partner, index) => (
                        <SortableItem key={partner.id} id={partner.id}>
                          <Card className="border border-default-200 cursor-grab active:cursor-grabbing">
                            <CardBody className="flex flex-row items-center gap-4">
                              <div className="text-default-400">☰</div>
                              <Input
                                label={`Partner ${index + 1}`}
                                value={partner.value}
                                onValueChange={(v) => {
                                  const newList = [...partnersList];
                                  newList[index].value = v;
                                  setPartnersList(newList);
                                }}
                              />
                              <Button isIconOnly color="danger" variant="light" onPress={() => setPartnersList(partnersList.filter(p => p.id !== partner.id))}>
                                ✕
                              </Button>
                            </CardBody>
                          </Card>
                        </SortableItem>
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              )}

              {activeKey === "roles" && (
                <div className="grid gap-4">
                  <Button color="primary" variant="flat" onPress={addRole} className="w-1/6">Add Role</Button>
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleRoleDragEnd}>
                    <SortableContext items={rolesList.map(r => r.id)} strategy={verticalListSortingStrategy}>
                      {rolesList.map((role, index) => (
                        <SortableItem key={role.id} id={role.id}>
                          <Card className="border border-default-200 cursor-grab active:cursor-grabbing">
                            <CardBody className="flex flex-row items-center gap-4 p-4">
                              <div className="flex-none text-default-400 cursor-grab active:cursor-grabbing p-1">
                                ☰
                              </div>

                              <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Input
                                  size="sm"
                                  label="Title"
                                  placeholder="Role name"
                                  value={role.title}
                                  onValueChange={(v) => {
                                    const next = [...rolesList];
                                    next[index].title = v;
                                    setRolesList(next);
                                  }}
                                />
                                <Input
                                  size="sm"
                                  label="Growth"
                                  placeholder="e.g. +20%"
                                  value={role.growth}
                                  onValueChange={(v) => {
                                    const next = [...rolesList];
                                    next[index].growth = v;
                                    setRolesList(next);
                                  }}
                                />
                                <Input
                                  size="sm"
                                  label="Color"
                                  placeholder="hex or name"
                                  value={role.color}
                                  onValueChange={(v) => {
                                    const next = [...rolesList];
                                    next[index].color = v;
                                    setRolesList(next);
                                  }}
                                />
                              </div>
                              <Button
                                isIconOnly
                                className="flex-none"
                                color="danger"
                                variant="light"
                                onPress={() => setRolesList(rolesList.filter((r) => r.id !== role.id))}
                              >
                                ✕
                              </Button>
                            </CardBody>
                          </Card>
                        </SortableItem>
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              )}
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>Cancel</Button>
          <Button color="primary" onPress={handleSave} isLoading={updateHomeCopy.isPending}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}