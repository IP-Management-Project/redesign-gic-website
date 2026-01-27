"use client";

import React, { useState, useMemo } from "react";
import { 
  Button, Select, SelectItem, Modal, ModalContent, 
  ModalHeader, ModalBody, ModalFooter, useDisclosure, Input,
  Chip, Divider, Spinner
} from "@heroui/react";
import { 
  Plus, GripVertical, Edit3, Trash2, User, Save, 
  MousePointer2, CalendarRange, Clock, Trash
} from "lucide-react";
import { 
  DndContext, closestCenter, PointerSensor, useSensor, 
  useSensors, DragEndEvent, useDroppable, useDraggable 
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { 
  useTimetableData, useTimetableActions, 
  FIXED_SLOTS, TimetableSession 
} from "@/hooks/useTimetableData";

export default function TimetableAdmin() {
  const { data, isLoading } = useTimetableData();
  const { updateTimetable } = useTimetableActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Scoping Logic
  const [selectedYear, setSelectedYear] = useState("Year 3");
  const [selectedSem, setSelectedSem] = useState("Semester I");
  const [activeSession, setActiveSession] = useState<Partial<TimetableSession> | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  // Filtering data for the current view
  const filteredTimetable = useMemo(() => {
    return data?.timetable.filter(s => s.academicYear === selectedYear && s.semester === selectedSem) || [];
  }, [data, selectedYear, selectedSem]);

  // --- Handlers ---
  const handleSlotClick = (day: string, slot: string) => {
    setActiveSession({ 
      day, timeSlot: slot, id: crypto.randomUUID(), 
      academicYear: selectedYear, semester: selectedSem,
      subject: "", lecturer: "", type: "C"
    });
    onOpen();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !data) return;

    const [newDay, newSlot] = (over.id as string).split("|");
    const sessionId = active.id as string;

    // Check if destination is occupied
    const isOccupied = data.timetable.some(s => 
        s.day === newDay && s.timeSlot === newSlot && 
        s.academicYear === selectedYear && s.semester === selectedSem
    );
    if (isOccupied) return;

    const updated = data.timetable.map(s => 
      s.id === sessionId ? { ...s, day: newDay, timeSlot: newSlot } : s
    );
    updateTimetable(updated);
  };

  const handleDelete = (id: string) => {
    if (!data || !window.confirm("Delete this session?")) return;
    updateTimetable(data.timetable.filter(s => s.id !== id));
    onClose();
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;
    const fd = new FormData(e.currentTarget);
    const sessionData: TimetableSession = {
      ...activeSession as TimetableSession,
      subject: fd.get("subject") as string,
      lecturer: fd.get("lecturer") as string,
      type: fd.get("type") as any,
      code: fd.get("code") as string,
      group: fd.get("group") as string,
    };

    const exists = data.timetable.some(s => s.id === sessionData.id);
    const updated = exists 
      ? data.timetable.map(s => s.id === sessionData.id ? sessionData : s)
      : [...data.timetable, sessionData];

    updateTimetable(updated);
    onClose();
  };

  if (isLoading || !data) return (
    <div className="h-screen flex items-center justify-center"><Spinner label="Loading Studio..." /></div>
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
              className="w-48" label="Academic Year" size="sm" variant="bordered"
              selectedKeys={[selectedYear]} onSelectionChange={(k) => setSelectedYear(Array.from(k)[0] as string)}
             >
                {data.academicYears.map(y => <SelectItem key={y}>{y}</SelectItem>)}
             </Select>
             <Select 
              className="w-48" label="Semester" size="sm" variant="bordered"
              selectedKeys={[selectedSem]} onSelectionChange={(k) => setSelectedSem(Array.from(k)[0] as string)}
             >
                {data.semesters.map(s => <SelectItem key={s}>{s}</SelectItem>)}
             </Select>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-default-400">Current Scope</span>
            <Chip color="primary" variant="flat" className="font-bold">{selectedYear} • {selectedSem}</Chip>
        </div>
      </div>

      {/* Timetable Grid */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          
          {/* Time Sidebar */}
          <div className="hidden lg:flex flex-col gap-6 pt-16">
            {FIXED_SLOTS.map(slot => (
              <div key={slot} className="h-48 flex flex-col items-center justify-center border-r border-divider">
                <div className="flex items-center gap-1 text-foreground mb-1">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-sm font-black italic">{slot}</span>
                </div>
                <span className="text-[9px] font-bold text-default-400 uppercase tracking-widest">2h Block</span>
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {data.days.map(day => (
            <div key={day} className="space-y-6">
              <div className="p-4 bg-zinc-950 text-white text-center rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg">
                {day}
              </div>
              
              <div className="flex flex-col gap-6">
                {FIXED_SLOTS.map(slot => (
                  <SlotContainer 
                    key={`${day}-${slot}`} 
                    id={`${day}|${slot}`} 
                    session={filteredTimetable.find(s => s.day === day && s.timeSlot === slot)} 
                    onEdit={(s: any) => { setActiveSession(s); onOpen(); }}
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
                <div className="p-2 bg-blue-600/10 text-blue-600 rounded-lg"><CalendarRange size={24} /></div>
                {activeSession?.subject ? "Modify Session" : "Schedule New Block"}
              </div>
            </ModalHeader>
            <ModalBody className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-2 flex items-center justify-between bg-default-50 p-4 rounded-2xl border border-divider">
                <span className="text-[10px] font-black uppercase tracking-widest text-default-400">
                  Target: <span className="text-foreground">{activeSession?.day} @ {activeSession?.timeSlot}</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {activeSession?.academicYear}
                </span>
              </div>
              <Input name="subject" label="SUBJECT NAME" labelPlacement="outside" defaultValue={activeSession?.subject} isRequired variant="bordered" placeholder="e.g. Algorithm & Programming" />
              <Input name="lecturer" label="LECTURER NAME" labelPlacement="outside" defaultValue={activeSession?.lecturer} isRequired variant="bordered" placeholder="e.g. PHOK Ponna" />
              <Select name="type" label="SESSION TYPE" labelPlacement="outside" variant="bordered" defaultSelectedKeys={activeSession?.type ? [activeSession.type] : ["C"]}>
                <SelectItem key="C">Cours (C)</SelectItem>
                <SelectItem key="TD">Travaux Dirigés (TD)</SelectItem>
                <SelectItem key="TP">Travaux Pratiques (TP)</SelectItem>
              </Select>
              <Input name="code" label="COURSE CODE / CLASSROOM" labelPlacement="outside" defaultValue={activeSession?.code} variant="bordered" placeholder="e.g. Lab-01" />
              <Input name="group" label="STUDENT GROUP" labelPlacement="outside" defaultValue={activeSession?.group} variant="bordered" placeholder="e.g. Group A" />
            </ModalBody>
            <ModalFooter className="border-t border-divider py-4 flex justify-between">
              {activeSession?.subject ? (
                  <Button color="danger" variant="light" className="font-bold" startContent={<Trash size={16}/>} onPress={() => handleDelete(activeSession.id!)}>Delete</Button>
              ) : <div />}
              <div className="flex gap-2">
                <Button variant="light" className="font-bold" onPress={onClose}>Discard</Button>
                <Button color="primary" type="submit" className="font-black px-12 uppercase tracking-widest shadow-lg shadow-primary/20" startContent={<Save size={18}/>}>
                    Save Changes
                </Button>
              </div>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

// --- Internal Helper Components ---

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
          <div className="p-2 rounded-full bg-primary/10 text-primary"><Plus size={16} /></div>
          <span className="text-[9px] font-black uppercase tracking-widest text-primary">Add Block</span>
        </div>
      )}
    </div>
  );
}

function DraggableSession({ session, onEdit }: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: session.id });
  const typeColors = { C: "bg-blue-600", TD: "bg-amber-500", TP: "bg-emerald-500" };

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
      {/* Invisible layer for dragging handle */}
      <div {...listeners} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-2 pointer-events-auto">
          <Chip size="sm" className={`text-white font-black text-[8px] border-none shadow-sm ${typeColors[session.type as keyof typeof typeColors]}`}>
            {session.type}
          </Chip>
          <Button isIconOnly size="sm" variant="light" className="min-w-8 w-8 h-8 rounded-full bg-default-100/50" onPress={() => onEdit(session)}>
            <Edit3 size={14} className="text-default-500" />
          </Button>
        </div>

        <h4 className="text-[14px] font-black leading-tight line-clamp-2 text-foreground mb-1">{session.subject}</h4>
        
        <div className="mt-auto pt-4 flex flex-col gap-1">
          <p className="text-[10px] text-default-500 font-bold flex items-center gap-1">
            <User size={10} className="text-primary" /> {session.lecturer}
          </p>
          <div className="flex justify-between items-center text-[9px] font-mono text-default-400 pt-2 border-t border-divider/50">
             <span className="font-bold text-emerald-600 uppercase">{session.group || 'All'}</span>
             <span className="font-black text-primary">{session.code || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}