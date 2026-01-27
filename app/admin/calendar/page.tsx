"use client";

import React, { useState } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Select, SelectItem, Chip, Tooltip, Divider
} from "@heroui/react";
import { 
  Plus, Edit3, Trash2, Calendar as CalendarIcon, 
  Search, Filter, Save, AlertCircle, Clock 
} from "lucide-react";
import { useAcademicCalendarData, useCalendarActions, CalendarEvent } from "@/hooks/useAcademicCalendarData";

export default function CalendarAdminPage() {
  const { data, isLoading } = useAcademicCalendarData();
  const { upsertEvent, removeEvent } = useCalendarActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editingEvent, setEditingEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [search, setSearch] = useState("");

  const eventTypes: CalendarEvent["type"][] = ["Exam", "Admin", "Academic", "Holiday"];
  const typeColors: Record<CalendarEvent["type"], "primary" | "warning" | "secondary" | "success"> = {
    Exam: "primary",
    Admin: "warning",
    Academic: "secondary",
    Holiday: "success",
  };

  const filteredEvents = data?.events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.month.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    onOpen();
  };

  const handleCreate = () => {
    setEditingEvent({ 
      id: crypto.randomUUID(), 
      type: "Academic", 
      month: "August", 
      cite: 3 
    });
    onOpen();
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const event = {
      ...editingEvent,
      title: fd.get("title") as string,
      month: fd.get("month") as string,
      type: fd.get("type") as any,
      startDate: fd.get("startDate") as string,
      endDate: fd.get("endDate") as string || undefined,
      cite: Number(fd.get("cite")),
    } as CalendarEvent;

    upsertEvent(event);
    onClose();
  };

  if (isLoading || !data) return <div className="p-10 text-center uppercase font-black animate-pulse">Loading Registry...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">
            Academic <span className="text-primary">Registry</span>
          </h1>
          <p className="text-default-500 font-medium">Manage annual milestones, examination periods, and official holidays.</p>
        </div>
        <Button 
          color="primary" size="lg" className="font-bold shadow-xl shadow-primary/20"
          startContent={<Plus size={20} />} onPress={handleCreate}
        >
          Add Event
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex gap-4 p-4 bg-content1 rounded-2xl border border-divider shadow-sm">
        <Input 
          className="max-w-md" placeholder="Search events or months..." 
          startContent={<Search size={18} className="text-default-400" />}
          value={search} onValueChange={setSearch}
        />
      </div>

      {/* Management Table */}
      <Table 
        aria-label="Academic Calendar Table"
        classNames={{
          wrapper: "rounded-3xl border border-divider bg-content1 shadow-none overflow-hidden p-0",
          th: "bg-default-50 py-4 text-default-600 font-bold uppercase text-[10px] tracking-widest border-b border-divider",
          td: "py-4"
        }}
      >
        <TableHeader>
          <TableColumn>MONTH</TableColumn>
          <TableColumn>EVENT TITLE</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>DATE RANGE</TableColumn>
          <TableColumn align="end">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody items={filteredEvents} emptyContent="No events found for this session.">
          {(event) => (
            <TableRow key={event.id} className="hover:bg-default-50/50 transition-colors">
              <TableCell className="font-bold uppercase text-xs tracking-tighter text-primary">
                {event.month}
              </TableCell>
              <TableCell className="font-bold text-foreground">
                {event.title}
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat" color={typeColors[event.type]} className="font-black uppercase text-[9px]">
                  {event.type}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-default-500 text-xs font-mono font-bold">
                  <Clock size={14} className="text-default-300" />
                  {event.startDate} {event.endDate ? `→ ${event.endDate}` : ""}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Tooltip content="Edit Event">
                    <Button isIconOnly size="sm" variant="light" onPress={() => handleEdit(event)}>
                      <Edit3 size={16} className="text-default-400" />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Remove">
                    <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => {if(confirm("Delete event?")) removeEvent(event.id)}}>
                      <Trash2 size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* --- Upsert Modal --- */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" backdrop="blur">
        <ModalContent>
          <form onSubmit={onSave}>
            <ModalHeader className="flex items-center gap-3 py-6 border-b border-divider">
              <div className="p-2 bg-primary/10 text-primary rounded-lg"><CalendarIcon size={20} /></div>
              <h2 className="text-xl font-black uppercase tracking-tighter">
                {editingEvent?.title ? "Modify Milestone" : "New Academic Event"}
              </h2>
            </ModalHeader>
            <ModalBody className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                name="title" label="EVENT TITLE" labelPlacement="outside" 
                placeholder="e.g. Final Examination" defaultValue={editingEvent?.title} isRequired variant="bordered"
              />
              <Select 
                name="month" label="MONTH" labelPlacement="outside" variant="bordered"
                defaultSelectedKeys={editingEvent?.month ? [editingEvent.month] : []}
              >
                {data.months.map(m => <SelectItem key={m}>{m}</SelectItem>)}
              </Select>
              <Select 
                name="type" label="EVENT CATEGORY" labelPlacement="outside" variant="bordered"
                defaultSelectedKeys={editingEvent?.type ? [editingEvent.type] : []}
              >
                {eventTypes.map(t => <SelectItem key={t}>{t}</SelectItem>)}
              </Select>
              <Input 
                name="cite" label="CITATION INDEX" labelPlacement="outside" type="number"
                defaultValue={editingEvent?.cite?.toString()} variant="bordered"
              />
              <Input 
                name="startDate" label="START DATE" labelPlacement="outside" type="date"
                defaultValue={editingEvent?.startDate} isRequired variant="bordered"
              />
              <Input 
                name="endDate" label="END DATE (OPTIONAL)" labelPlacement="outside" type="date"
                defaultValue={editingEvent?.endDate} variant="bordered"
              />
            </ModalBody>
            <ModalFooter className="border-t border-divider py-4">
              <Button variant="light" className="font-bold" onPress={onClose}>Discard</Button>
              <Button color="primary" type="submit" className="font-black px-10 shadow-lg shadow-primary/20" startContent={<Save size={18}/>}>
                Confirm Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}