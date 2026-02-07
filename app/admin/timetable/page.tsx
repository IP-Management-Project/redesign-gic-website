"use client";

import React, { useState, useMemo } from "react";
import {
  Button,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Chip,
  Spinner,
} from "@heroui/react";

import {
  Plus,
  Edit3,
  User,
  Save,
  CalendarRange,
  Clock,
  Trash,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

import { TimetableSession } from "@/types/timetable";
import { useTimetable, useTimetableActions } from "@/hooks/useTimetable";

export const FIXED_SLOTS = ["7-9", "9-11", "1-3", "3-5"];

const YEARS = ["Year 3", "Year 4", "Year 5", "Master 1", "Master 2"];
const SEMS = ["Semester I", "Semester II"];
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

export default function TimetableAdmin() {
  const [selectedYear, setSelectedYear] = useState("Year 3");
  const [selectedSem, setSelectedSem] = useState("Semester I");

  const [activeSession, setActiveSession] =
    useState<Partial<TimetableSession> | null>(null);

  const { data: timetable, isLoading } = useTimetable(
    selectedYear,
    selectedSem,
  );

  const { create, update, delete: remove } = useTimetableActions();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  // ---- DATA NORMALIZATION ----
  const sessions: TimetableSession[] = Array.isArray(timetable)
    ? timetable
    : (timetable as any)?.timetable || [];

  const filteredTimetable = useMemo(() => {
    return sessions.filter(
      (s) => s.academicYear === selectedYear && s.semester === selectedSem,
    );
  }, [sessions, selectedYear, selectedSem]);

  // ---- HANDLERS ----

  const handleSlotClick = (day: string, slot: string) => {
    setActiveSession({
      day,
      timeSlot: slot,
      academicYear: selectedYear,
      semester: selectedSem,
      subject: "",
      lecturer: "",
      type: "C",
    });
    onOpen();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const [newDay, newSlot] = (over.id as string).split("|");

    const session = sessions.find((s) => s.id === active.id);
    if (!session) return;

    const occupied = sessions.some(
      (s) => s.day === newDay && s.timeSlot === newSlot && s.id !== session.id,
    );

    if (occupied) return;

    await update({
      id: session.id,
      data: { day: newDay, timeSlot: newSlot },
    });
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    onClose();
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const payload = {
      academicYear: selectedYear,
      semester: selectedSem,
      day: activeSession?.day!,
      timeSlot: activeSession?.timeSlot!,
      subject: fd.get("subject") as string,
      lecturer: fd.get("lecturer") as string,
      type: fd.get("type") as any,
      code: fd.get("code") as string,
      group: fd.get("group") as string,
    };

    if (activeSession?.id) {
      await update({ id: activeSession.id, data: payload });
    } else {
      await create(payload);
    }

    onClose();
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner label="Loading Studio..." />
      </div>
    );

  return (
    <div className="max-w-[1600px] mx-auto ">
      {/* Header & Scoping */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-8 border-b border-divider gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            GIC Timetable
          </h1>

          <div className="flex items-center gap-3 mt-6">
            <Select
              className="w-48"
              label="Academic Year"
              size="sm"
              variant="bordered"
              selectedKeys={[selectedYear]}
              onSelectionChange={(k) =>
                setSelectedYear(Array.from(k)[0] as string)
              }
            >
              {YEARS.map((y) => (
                <SelectItem key={y}>{y}</SelectItem>
              ))}
            </Select>

            <Select
              className="w-48"
              label="Semester"
              size="sm"
              variant="bordered"
              selectedKeys={[selectedSem]}
              onSelectionChange={(k) =>
                setSelectedSem(Array.from(k)[0] as string)
              }
            >
              {SEMS.map((s) => (
                <SelectItem key={s}>{s}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <Chip color="primary" variant="flat" className="font-bold">
          {selectedYear} • {selectedSem}
        </Chip>
      </div>

      {/* Timetable Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Time Sidebar */}
          <div className="hidden lg:flex flex-col gap-6 pt-16">
            {FIXED_SLOTS.map((slot) => (
              <div
                key={slot}
                className="h-48 flex flex-col items-center justify-center border-r border-divider"
              >
                <div className="flex items-center gap-1 text-foreground mb-1">
                  <Clock size={14} className="text-blue-600" />
                  <span className="text-sm font-black italic">{slot}</span>
                </div>
                <span className="text-[9px] font-bold text-default-400 uppercase tracking-widest">
                  2h Block
                </span>
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {DAYS.map((day) => (
            <div key={day} className="space-y-6">
              <div className="p-4 bg-zinc-950 text-white text-center rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg">
                {day}
              </div>

              <div className="flex flex-col gap-6">
                {FIXED_SLOTS.map((slot) => (
                  <SlotContainer
                    key={`${day}-${slot}`}
                    id={`${day}|${slot}`}
                    session={filteredTimetable.find(
                      (s) => s.day === day && s.timeSlot === slot,
                    )}
                    onEdit={(s: any) => {
                      setActiveSession(s);
                      onOpen();
                    }}
                    onClick={() => handleSlotClick(day, slot)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </DndContext>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" backdrop="blur">
        <ModalContent>
          <form onSubmit={handleSave}>
            <ModalHeader className="text-2xl font-black uppercase tracking-tighter py-6 border-b border-divider">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 text-blue-600 rounded-lg">
                  <CalendarRange size={24} />
                </div>
                {activeSession?.subject
                  ? "Modify Session"
                  : "Schedule New Block"}
              </div>
            </ModalHeader>

            <ModalBody className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                name="subject"
                label="SUBJECT NAME"
                labelPlacement="outside"
                defaultValue={activeSession?.subject}
                isRequired
                variant="bordered"
              />
              <Input
                name="lecturer"
                label="LECTURER NAME"
                labelPlacement="outside"
                defaultValue={activeSession?.lecturer}
                isRequired
                variant="bordered"
              />

              <Select
                name="type"
                label="SESSION TYPE"
                labelPlacement="outside"
                variant="bordered"
                defaultSelectedKeys={[activeSession?.type || "C"]}
              >
                <SelectItem key="C">Cours (C)</SelectItem>
                <SelectItem key="TD">Travaux Dirigés (TD)</SelectItem>
                <SelectItem key="TP">Travaux Pratiques (TP)</SelectItem>
              </Select>

              <Input
                name="code"
                label="COURSE CODE"
                labelPlacement="outside"
                defaultValue={activeSession?.code}
                variant="bordered"
              />
              <Input
                name="group"
                label="STUDENT GROUP"
                labelPlacement="outside"
                defaultValue={activeSession?.group}
                variant="bordered"
              />
            </ModalBody>

            <ModalFooter className="border-t border-divider py-4 flex justify-between">
              {activeSession?.id ? (
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => handleDelete(activeSession.id!)}
                >
                  <Trash size={16} /> Delete
                </Button>
              ) : (
                <div />
              )}

              <Button color="primary" type="submit">
                <Save size={18} /> Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

// ---- Helper Components (UNCHANGED UI) ----

function SlotContainer({ id, session, onEdit, onClick }: any) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      onClick={!session ? onClick : undefined}
      className={`h-48 rounded-[2.5rem] border-2 border-dashed transition-all duration-300 p-2 relative group
        ${session ? "border-transparent bg-transparent" : "border-divider bg-default-50/50 hover:border-primary hover:bg-primary/5 cursor-pointer"}
        ${isOver ? "border-primary bg-primary/10 scale-[0.98]" : ""}
      `}
    >
      {session ? (
        <DraggableSession session={session} onEdit={onEdit} />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Plus size={16} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-primary">
            Add Block
          </span>
        </div>
      )}
    </div>
  );
}

function DraggableSession({ session, onEdit }: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: session.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`w-full h-full p-6 rounded-[2.2rem] bg-white dark:bg-zinc-900 border border-divider shadow-md group relative overflow-hidden flex flex-col justify-between
        ${isDragging ? "opacity-50 cursor-grabbing shadow-2xl scale-105" : "cursor-grab hover:border-primary transition-all duration-300"}
      `}
    >
      <div {...listeners} className="absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-2 pointer-events-auto">
          <Chip size="sm">{session.type}</Chip>

          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={() => onEdit(session)}
          >
            <Edit3 size={14} />
          </Button>
        </div>

        <h4 className="text-[14px] font-black">{session.subject}</h4>

        <div className="mt-auto">
          <p className="text-[10px] flex items-center gap-1">
            <User size={10} /> {session.lecturer}
          </p>
        </div>
      </div>
    </div>
  );
}
