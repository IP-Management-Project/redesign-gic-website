"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Chip, Tabs, Tab, Spinner, Divider
} from "@heroui/react";
import { Plus, GripVertical, Edit3, Trash2, BookOpen, LayoutGrid } from "lucide-react";

// DnD Kit
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
  KeyboardSensor
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, verticalListSortingStrategy, useSortable,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useCurriculumData, useCurriculumActions, CurriculumCourse } from "@/hooks/useCurriculumData";

// --- Sortable Row Component (Native HTML for DnD Compatibility) ---
function SortableRow({ course, onEdit, onDelete }: { course: CurriculumCourse, onEdit: any, onDelete: any }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: course.code
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`border-b border-divider transition-colors ${isDragging ? "bg-primary/5 shadow-inner" : "bg-background hover:bg-default-50"}`}
    >
      <td className="p-4">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-default-300 hover:text-primary transition-colors p-1">
          <GripVertical size={18} />
        </div>
      </td>
      <td className="p-4 font-mono text-xs text-default-400">{course.code}</td>
      <td className="p-4 font-bold text-foreground">{course.subject}</td>
      <td className="p-4 text-sm">{course.hC}h</td>
      <td className="p-4 text-sm">{course.hTD}h</td>
      <td className="p-4 text-sm">{course.hTP}h</td>
      <td className="p-4">
        <Chip variant="flat" color="primary" size="sm" className="font-black">{course.credit}</Chip>
      </td>
      <td className="p-4">
        <div className="flex justify-end gap-1">
          <Button isIconOnly size="sm" variant="light" onPress={() => onEdit(course)}><Edit3 size={16} /></Button>
          <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => onDelete(course.code)}><Trash2 size={16} /></Button>
        </div>
      </td>
    </tr>
  );
}

export default function CurriculumAdminPage() {
  const params = useParams();
  const { data, isLoading } = useCurriculumData();
  const { reorder, upsert, remove } = useCurriculumActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeSem, setActiveSem] = useState<string>("Semester V");
  const [editing, setEditing] = useState<CurriculumCourse | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && data) {
      const items = data.curriculum[activeSem] || [];
      const oldIndex = items.findIndex(i => i.code === active.id);
      const newIndex = items.findIndex(i => i.code === over.id);
      reorder(activeSem, arrayMove(items, oldIndex, newIndex));
    }
  };

  if (!mounted || isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Spinner size="lg" label="Syncing Curriculum Studio..." />
      </div>
    );
  }

  const semesterItems = data?.curriculum[activeSem] || [];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 duration-500 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-[2rem] bg-primary/10 text-primary shadow-inner">
            <BookOpen size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              {params?.programKey || 'National'} / {activeSem}
            </h1>
          </div>
        </div>
        <Button
          color="primary" size="lg"
          className="font-black px-8 shadow-xl shadow-primary/20 uppercase tracking-widest"
          startContent={<Plus />}
          onPress={() => { setEditing(null); onOpen(); }}
        >
          Add Subject
        </Button>
      </div>

      <Divider className="opacity-50" />

      {/* Semester Selection */}
      <Tabs
        variant="underlined"
        color="primary"
        selectedKey={activeSem}
        onSelectionChange={(k) => setActiveSem(k as string)}
        classNames={{ tabList: "gap-8 p-0", tab: "h-12 px-0 font-bold", cursor: "bg-primary" }}
      >
        {Object.keys(data?.curriculum || {}).map(sem => (
          <Tab key={sem} title={sem} />
        ))}
      </Tabs>

      {/* Styled Native Table for DnD Compatibility */}
      <div className="rounded-[1rem] border border-divider bg-content1 shadow-sm overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-default-50/50 border-b border-divider">
                <th className="p-4 text-default-600 font-bold uppercase text-[10px] tracking-widest w-[60px]">Handle</th>
                <th className="p-4 text-default-600 font-bold uppercase text-[10px] tracking-widest">Code</th>
                <th className="p-4 text-default-600 font-bold uppercase text-[10px] tracking-widest">Subject Name</th>
                <th className="p-4 text-default-600 font-bold uppercase text-[10px] tracking-widest">C</th>
                <th className="p-4 text-default-600 font-bold uppercase text-[10px] tracking-widest">TD</th>
                <th className="p-4 text-default-600 font-bold uppercase text-[10px] tracking-widest">TP</th>
                <th className="p-4 text-default-600 font-bold uppercase text-[10px] tracking-widest">Credit</th>
                <th className="p-4 text-default-600 font-bold uppercase text-[10px] tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <SortableContext items={semesterItems.map(c => c.code)} strategy={verticalListSortingStrategy}>
                {semesterItems.map(course => (
                  <SortableRow
                    key={course.code}
                    course={course}
                    onEdit={(c: any) => { setEditing(c); onOpen(); }}
                    onDelete={(code: string) => { if (confirm("Remove subject?")) remove(activeSem, code); }}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
        {semesterItems.length === 0 && (
          <div className="p-20 text-center text-default-400 italic">No subjects listed in this sequence.</div>
        )}
      </div>

      {/* Modal Section */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" backdrop="blur" scrollBehavior="inside">
        <ModalContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const course: CurriculumCourse = {
              subject: fd.get("subject") as string,
              code: fd.get("code") as string,
              hC: Number(fd.get("hC")),
              hTD: Number(fd.get("hTD")),
              hTP: Number(fd.get("hTP")),
              credit: Number(fd.get("credit")),
              order: editing?.order ?? 0
            };
            upsert(activeSem, course);
            onClose();
          }}>
            <ModalHeader className="flex items-center gap-3 py-6 border-b border-divider">
              <div className="p-2 bg-primary/10 text-primary rounded-lg"><LayoutGrid size={20} /></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                {editing ? `Modify ${editing.code}` : "New Curriculum Entry"}
              </h2>
            </ModalHeader>
            <ModalBody className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input name="code" label="COURSE CODE" labelPlacement="outside" defaultValue={editing?.code} isRequired variant="bordered" placeholder="GICIXXXX" />
              <Input name="subject" label="SUBJECT NAME" labelPlacement="outside" defaultValue={editing?.subject} isRequired variant="bordered" placeholder="Enter full name" />
              <Input name="hC" label="LECTURE HOURS" type="number" labelPlacement="outside" defaultValue={editing?.hC.toString()} variant="bordered" />
              <Input name="hTD" label="TUTORIAL HOURS" type="number" labelPlacement="outside" defaultValue={editing?.hTD.toString()} variant="bordered" />
              <Input name="hTP" label="LAB HOURS" type="number" labelPlacement="outside" defaultValue={editing?.hTP.toString()} variant="bordered" />
              <Input name="credit" label="TOTAL CREDITS" type="number" step="0.1" labelPlacement="outside" defaultValue={editing?.credit.toString()} isRequired variant="bordered" />
            </ModalBody>
            <ModalFooter className="border-t border-divider py-4">
              <Button variant="light" onPress={onClose} className="font-bold">Discard</Button>
              <Button color="primary" type="submit" className="font-black px-12 uppercase tracking-widest shadow-lg shadow-primary/20">Save Subject</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}