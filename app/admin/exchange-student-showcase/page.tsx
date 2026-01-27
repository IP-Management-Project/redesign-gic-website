"use client";

import React from "react";
import { 
  Button, Input, Card, Select, SelectItem, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Textarea, Pagination, Chip, Avatar, Tooltip
} from "@heroui/react";
import { Search, Plus, Globe, MapPin, Edit3, Trash2, RefreshCcw, LayoutGrid } from "lucide-react";
import { useExchangeStoriesCentralize } from "@/hooks/useExchangeStoriesCentralize";

export default function ExchangeStoriesAdminPage() {
  const {
    filtered, paginated, stats, filters, setFilters,
    form, setForm, isOpen, page, setPage, totalPages,
    openCreate, openEdit, upsert, remove, resetFilters, closeModal
  } = useExchangeStoriesCentralize();

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-black text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Exchange <span className="text-primary">Stories</span></h1>
            <p className="text-default-500 mt-1 text-medium">Manage student testimonials and global exchange highlights.</p>
          </div>
          <Button color="primary" size="lg" className="font-bold shadow-lg" startContent={<Plus size={20}/>} onPress={openCreate}>
            Add Story
          </Button>
        </div>

        {/* Adaptive Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Testimonials", val: stats.total, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Khmer Students Abroad", val: stats.khmerAbroad, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "International Students", val: stats.international, color: "text-purple-500", bg: "bg-purple-500/10" },
          ].map((s, i) => (
            <Card key={i} shadow="sm" className="border-none bg-content1 p-5 flex flex-col items-center text-center">
              <p className="text-[10px] uppercase font-black text-default-400 tracking-widest">{s.label}</p>
              <p className={`text-3xl font-black mt-1 ${s.color}`}>{s.val}</p>
            </Card>
          ))}
        </div>

        {/* Toolbar */}
        <Card className="p-4 mb-8 bg-content1/70 backdrop-blur-md border-none shadow-sm flex flex-col lg:flex-row gap-4">
          <Input 
            className="flex-1"
            placeholder="Search students, destinations, or focus..." 
            startContent={<Search size={18} className="text-default-400"/>}
            value={filters.query}
            onValueChange={(v) => setFilters(p => ({ ...p, query: v }))}
          />
          <div className="flex gap-2">
            <Select 
              className="w-56"
              labelPlacement="outside"
              selectedKeys={[filters.typeFilter]}
              onSelectionChange={(keys) => setFilters(p => ({ ...p, typeFilter: Array.from(keys)[0] as string }))}
            >
              <SelectItem key="ALL">All Directions</SelectItem>
              <SelectItem key="Khmer to France">Khmer to France</SelectItem>
              <SelectItem key="French to Cambodia">French to Cambodia</SelectItem>
            </Select>
            <Tooltip content="Reset Filters">
              <Button isIconOnly variant="flat" onPress={resetFilters}><RefreshCcw size={18}/></Button>
            </Tooltip>
          </div>
        </Card>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginated.map((item) => (
            <Card key={item.id} className="p-6 border border-divider bg-content1 hover:shadow-md transition-all">
               <div className="flex gap-5">
                  <Avatar src={item.portrait} className="w-24 h-24 shrink-0 shadow-lg" radius="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <Chip size="sm" color="primary" variant="flat" className="font-bold mb-2 uppercase text-[10px]">
                        {item.type}
                      </Chip>
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <Button isIconOnly size="sm" variant="light" onPress={() => openEdit(item)}><Edit3 size={16}/></Button>
                        <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => { if(confirm("Delete?")) remove(item.id)}}><Trash2 size={16}/></Button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold truncate">{item.name}</h3>
                    <div className="flex items-center gap-2 text-default-500 text-sm mt-1">
                      <MapPin size={14} className="text-primary" /> {item.destination}
                    </div>
                    <p className="mt-4 text-sm text-default-500 italic line-clamp-2 leading-relaxed">
                      "{item.story}"
                    </p>
                  </div>
               </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <Pagination total={totalPages} page={page} onChange={setPage} color="primary" showControls />
        </div>

        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={closeModal} size="3xl" scrollBehavior="inside">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 py-6">
               <h2 className="text-2xl font-black uppercase tracking-tighter">
                {form.id ? "Edit Student Story" : "Create New Story"}
               </h2>
            </ModalHeader>
            <ModalBody className="pb-10">
              <div className="grid grid-cols-2 gap-6">
                <Input label="FULL NAME" labelPlacement="outside" placeholder="Sok Pongra" value={form.name} onValueChange={(v) => setForm(p => ({ ...p, name: v }))} />
                <Select label="DIRECTION" labelPlacement="outside" selectedKeys={form.type ? [form.type] : []} onSelectionChange={(k) => setForm(p => ({ ...p, type: Array.from(k)[0] as string }))}>
                  <SelectItem key="Khmer to France">Khmer to France</SelectItem>
                  <SelectItem key="French to Cambodia">French to Cambodia</SelectItem>
                </Select>
                <Input label="DESTINATION" labelPlacement="outside" placeholder="INSA Rennes, France" value={form.destination} onValueChange={(v) => setForm(p => ({ ...p, destination: v }))} />
                <Input label="ACADEMIC FOCUS" labelPlacement="outside" placeholder="Cybersecurity" value={form.focus} onValueChange={(v) => setForm(p => ({ ...p, focus: v }))} />
                <Input className="col-span-2" label="PORTRAIT URL" labelPlacement="outside" value={form.portrait} onValueChange={(v) => setForm(p => ({ ...p, portrait: v }))} />
                <Textarea className="col-span-2" label="THE STORY" labelPlacement="outside" minRows={4} value={form.story} onValueChange={(v) => setForm(p => ({ ...p, story: v }))} />
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-divider">
              <Button variant="flat" onPress={closeModal}>Discard</Button>
              <Button color="primary" className="font-bold px-10" onPress={upsert}>Save Profile</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </div>
    </div>
  );
}