"use client";

import React, { useState } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Select, SelectItem, Chip, Tooltip, Textarea, Divider
} from "@heroui/react";
import { 
  Plus, Edit3, Trash2, Search, Save, 
  HelpCircle, Cpu, Rocket, Shield, MessageSquare 
} from "lucide-react";
import { useFaqData, useFaqActions, FaqItem } from "@/hooks/useFaqData";

export default function FaqAdminPage() {
  const { data, isLoading } = useFaqData();
  const { upsertFaq, removeFaq } = useFaqActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editingFaq, setEditingFaq] = useState<Partial<FaqItem> | null>(null);
  const [search, setSearch] = useState("");

  const icons = {
    cpu: <Cpu size={16} />,
    rocket: <Rocket size={16} />,
    shield: <Shield size={16} />
  };

  const filteredFaqs = data?.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.category.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleEdit = (item: FaqItem) => {
    setEditingFaq(item);
    onOpen();
  };

  const handleCreate = () => {
    setEditingFaq({ 
      id: crypto.randomUUID(), 
      category: "Academic", 
      icon: "cpu" 
    });
    onOpen();
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const item = {
      ...editingFaq,
      question: fd.get("question") as string,
      answer: fd.get("answer") as string,
      category: fd.get("category") as string,
      icon: fd.get("icon") as any,
    } as FaqItem;

    upsertFaq(item);
    onClose();
  };

  if (isLoading) return <div className="p-10 text-center font-black animate-pulse">Synchronizing Knowledge Base...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-8 border-b border-divider">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase italic">
            Knowledge <span className="text-primary">Studio</span>
          </h1>
          <p className="text-default-500 font-medium">Manage frequently asked questions and student support resources.</p>
        </div>
        <Button 
          color="primary" size="lg" className="font-black px-8 shadow-xl shadow-primary/20"
          startContent={<Plus size={20} />} onPress={handleCreate}
        >
          New Question
        </Button>
      </div>

      {/* Action Bar */}
      <div className="flex gap-4 p-4 bg-content1 rounded-[2rem] border border-divider shadow-sm">
        <Input 
          className="max-w-md" placeholder="Search by question or category..." 
          startContent={<Search size={18} className="text-default-400" />}
          value={search} onValueChange={setSearch}
          variant="flat"
        />
      </div>

      {/* Management Table */}
      <Table 
        aria-label="FAQ Management Table"
        classNames={{
          wrapper: "rounded-[1rem] border border-divider bg-content1 shadow-none overflow-hidden p-0",
          th: "bg-default-50 py-4 text-default-600 font-black uppercase text-[10px] tracking-widest border-b border-divider",
          td: "py-5"
        }}
      >
        <TableHeader>
          <TableColumn width={150}>CATEGORY</TableColumn>
          <TableColumn>QUESTION</TableColumn>
          <TableColumn>PREVIEW</TableColumn>
          <TableColumn align="end">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No records found in the current knowledge set.">
          {filteredFaqs.map((item) => (
            <TableRow key={item.id} className="hover:bg-default-50/50 transition-colors border-b border-divider last:border-none">
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    {icons[item.icon]}
                  </div>
                  <span className="font-black text-[10px] uppercase tracking-widest text-default-400">{item.category}</span>
                </div>
              </TableCell>
              <TableCell className="font-bold text-foreground max-w-xs">
                {item.question}
              </TableCell>
              <TableCell className="text-default-500 text-xs line-clamp-1 max-w-md italic">
                {item.answer}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Tooltip content="Edit FAQ">
                    <Button isIconOnly size="sm" variant="light" onPress={() => handleEdit(item)}>
                      <Edit3 size={16} className="text-default-400" />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete">
                    <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => {if(confirm("Permanently delete this FAQ?")) removeFaq(item.id)}}>
                      <Trash2 size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* --- Upsert Modal --- */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" backdrop="blur">
        <ModalContent>
          <form onSubmit={onSave}>
            <ModalHeader className="flex items-center gap-3 py-6 border-b border-divider">
              <div className="p-2 bg-primary/10 text-primary rounded-lg"><MessageSquare size={20} /></div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                {editingFaq?.question ? "Modify Resource" : "Create New Resource"}
              </h2>
            </ModalHeader>
            <ModalBody className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <Input 
                  name="question" label="QUESTION" labelPlacement="outside" 
                  placeholder="e.g. What are the requirements for TIC 2026?" 
                  defaultValue={editingFaq?.question} isRequired variant="bordered"
                />
              </div>
              <Select 
                name="category" label="CATEGORY" labelPlacement="outside" variant="bordered"
                defaultSelectedKeys={editingFaq?.category ? [editingFaq.category] : []}
              >
                {["Academic", "Competition", "Incubation", "General"].map(c => <SelectItem key={c} textValue={c}>{c}</SelectItem>)}
              </Select>
              <Select 
                name="icon" label="THEME ICON" labelPlacement="outside" variant="bordered"
                defaultSelectedKeys={editingFaq?.icon ? [editingFaq.icon] : []}
              >
                <SelectItem key="cpu" startContent={<Cpu size={16}/>}>Technology (CPU)</SelectItem>
                <SelectItem key="rocket" startContent={<Rocket size={16}/>}>Growth (Rocket)</SelectItem>
                <SelectItem key="shield" startContent={<Shield size={16}/>}>Support (Shield)</SelectItem>
              </Select>
              <div className="md:col-span-2">
                <Textarea 
                  name="answer" label="DETAILED ANSWER" labelPlacement="outside" 
                  placeholder="Provide a clear and concise explanation..."
                  defaultValue={editingFaq?.answer} isRequired variant="bordered"
                  minRows={4}
                />
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-divider py-4">
              <Button variant="light" className="font-bold" onPress={onClose}>Discard</Button>
              <Button color="primary" type="submit" className="font-black px-12 shadow-lg shadow-primary/20 uppercase tracking-widest" startContent={<Save size={18}/>}>
                Sync Knowledge
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}