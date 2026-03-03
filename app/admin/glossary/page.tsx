"use client";

import React, { useState } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Tooltip, Textarea
} from "@heroui/react";
import { 
  Plus, Edit3, Trash2, BookOpen, Search, Save 
} from "lucide-react";
import { useAcademicCalendarData, useGlossaryActions, GlossaryItem } from "@/hooks/useAcademicCalendarData";

export default function GlossaryAdminPage() {
  const { data, isLoading } = useAcademicCalendarData();
  const { createGlossaryItem, updateGlossaryItem, deleteGlossaryItem, isPending } = useGlossaryActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editingItem, setEditingItem] = useState<Partial<GlossaryItem> | null>(null);
  const [search, setSearch] = useState("");

  const filteredGlossary = data?.glossary.filter(item => 
    item.term.toLowerCase().includes(search.toLowerCase()) || 
    item.description.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleEdit = (item: GlossaryItem) => {
    setEditingItem(item);
    onOpen();
  };

  const handleCreate = () => {
    setEditingItem({ term: "", description: "" });
    onOpen();
  };

  const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    const itemData = {
      term: fd.get("term") as string,
      description: fd.get("description") as string,
    };

    try {
      if (editingItem?.id) {
        // Update existing item
        await updateGlossaryItem(editingItem.id, itemData);
      } else {
        // Create new item
        await createGlossaryItem(itemData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save glossary item:", error);
      alert("Failed to save glossary item. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this glossary term?")) {
      try {
        await deleteGlossaryItem(id);
      } catch (error) {
        console.error("Failed to delete glossary item:", error);
        alert("Failed to delete glossary item. Please try again.");
      }
    }
  };

  if (isLoading || !data) return <div className="p-10 text-center uppercase font-black animate-pulse">Loading Glossary...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">
            Academic <span className="text-primary">Glossary</span>
          </h1>
          <p className="text-default-500 font-medium">Manage terminology and definitions for academic calendar.</p>
        </div>
        <Button 
          color="primary" size="lg" className="font-bold shadow-xl shadow-primary/20"
          startContent={<Plus size={20} />} onPress={handleCreate}
        >
          Add Term
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex gap-4 p-4 bg-content1 rounded-2xl border border-divider shadow-sm">
        <Input 
          className="max-w-md" placeholder="Search terms or definitions..." 
          startContent={<Search size={18} className="text-default-400" />}
          value={search} onValueChange={setSearch}
        />
      </div>

      {/* Management Table */}
      <Table 
        aria-label="Glossary Table"
        classNames={{
          wrapper: "rounded-3xl border border-divider bg-content1 shadow-none overflow-hidden p-0",
          th: "bg-default-50 py-4 text-default-600 font-bold uppercase text-[10px] tracking-widest border-b border-divider",
          td: "py-4"
        }}
      >
        <TableHeader>
          <TableColumn>TERM</TableColumn>
          <TableColumn>DEFINITION</TableColumn>
          <TableColumn align="end">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody items={filteredGlossary} emptyContent="No glossary terms found.">
          {(item) => (
            <TableRow key={item.id || item.term} className="hover:bg-default-50/50 transition-colors">
              <TableCell className="font-bold text-foreground uppercase text-sm">
                {item.term}
              </TableCell>
              <TableCell className="text-default-600 max-w-2xl">
                {item.description}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Tooltip content="Edit Term">
                    <Button isIconOnly size="sm" variant="light" onPress={() => handleEdit(item)}>
                      <Edit3 size={16} className="text-default-400" />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Remove">
                    <Button 
                      isIconOnly size="sm" variant="light" color="danger" 
                      onPress={() => item.id && handleDelete(item.id)}
                      isDisabled={!item.id}
                    >
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
              <div className="p-2 bg-primary/10 text-primary rounded-lg"><BookOpen size={20} /></div>
              <h2 className="text-xl font-black uppercase tracking-tighter">
                {editingItem?.id ? "Modify Term" : "New Glossary Term"}
              </h2>
            </ModalHeader>
            <ModalBody className="py-8 space-y-6">
              <Input 
                name="term" 
                label="TERM" 
                labelPlacement="outside" 
                placeholder="e.g. Concours" 
                defaultValue={editingItem?.term} 
                isRequired 
                variant="bordered"
              />
              <Textarea 
                name="description" 
                label="DEFINITION" 
                labelPlacement="outside" 
                placeholder="Enter the definition or explanation of this term..."
                defaultValue={editingItem?.description} 
                isRequired 
                variant="bordered"
                minRows={4}
              />
            </ModalBody>
            <ModalFooter className="border-t border-divider py-4">
              <Button variant="light" className="font-bold" onPress={onClose}>Discard</Button>
              <Button 
                color="primary" 
                type="submit" 
                className="font-black px-10 shadow-lg shadow-primary/20" 
                startContent={<Save size={18}/>}
                isLoading={isPending}
              >
                Confirm Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
