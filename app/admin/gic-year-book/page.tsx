"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Avatar, Chip, Select, SelectItem, Tooltip, Textarea,
  Card, Divider
} from "@heroui/react";
import { 
  Search, Plus, Upload, Trash2, Edit3, AlertCircle, 
  FileText, Download, RefreshCcw, UserPlus, CheckCircle2 
} from "lucide-react";
import { useStudentGenerationData } from "@/hooks/useStudentGenerationData";

// --- Types ---
export type StudentEntry = {
  id: string;
  name: string;
  quote: string;
  image: string;
  generation: string;
};

// --- Logic Hook ---
function useStudentAdmin(rawData: any) {
  const [localEntries, setLocalEntries] = useState<StudentEntry[]>([]);
  const [search, setSearch] = useState("");
  const [genFilter, setGenFilter] = useState("ALL");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (rawData?.generations) {
      const flattened: StudentEntry[] = [];
      Object.entries(rawData.generations).forEach(([gen, students]: [string, any]) => {
        students.forEach((s: any, index: number) => {
          flattened.push({ ...s, id: `${gen}-${index}-${Date.now()}`, generation: gen });
        });
      });
      setLocalEntries(flattened);
    }
  }, [rawData]);

  const generations = useMemo(() => 
    ["ALL", ...Array.from(new Set(localEntries.map((e) => e.generation)))], 
  [localEntries]);

  const filtered = useMemo(() => {
    return localEntries.filter((e) => {
      const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                            e.quote.toLowerCase().includes(search.toLowerCase());
      const matchesGen = genFilter === "ALL" || e.generation === genFilter;
      return matchesSearch && matchesGen;
    });
  }, [localEntries, search, genFilter]);

  return {
    entries: filtered,
    generations,
    search, setSearch,
    genFilter, setGenFilter,
    isDeleting, setIsDeleting,
    localEntries, setLocalEntries
  };
}

// --- Main Page Component ---
export default function StudentAdminPage() {
  const { data } = useStudentGenerationData();
  const admin = useStudentAdmin(data);
  
  // Modal States
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isBulkOpen, onOpen: onBulkOpen, onClose: onBulkClose } = useDisclosure();
  
  // Form States
  const [selected, setSelected] = useState<StudentEntry | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // --- Handlers ---

  const handleUpsert = () => {
    // In a real app, this would be a TanStack Mutation
    // For now, we simulate the UI update
    onFormClose();
  };

  const handleCsvProcess = async () => {
    if (!csvFile) return;
    const text = await csvFile.text();
    const rows = text.split("\n").filter(row => row.trim() !== "");
    
    const newEntries: StudentEntry[] = rows.slice(1).map((row, i) => {
      const [name, quote, image, generation] = row.split(",").map(s => s.trim());
      return { id: `bulk-${Date.now()}-${i}`, name, quote, image, generation };
    });

    admin.setLocalEntries(prev => [...newEntries, ...prev]);
    setCsvFile(null);
    onBulkClose();
  };

  const confirmDelete = () => {
    admin.setLocalEntries(prev => prev.filter(e => e.id !== admin.isDeleting));
    admin.setIsDeleting(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Student <span className="text-primary">Yearbook</span>
          </h1>
          <p className="text-default-500 mt-1 font-medium italic">
            "Capturing the legacy of GIC excellence, one generation at a time."
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="flat" 
            className="font-bold border border-divider" 
            startContent={<Upload size={18}/>} 
            onPress={onBulkOpen}
          >
            Bulk CSV
          </Button>
          <Button 
            color="primary" 
            className="font-bold shadow-lg shadow-primary/20" 
            startContent={<UserPlus size={18}/>} 
            onPress={() => { setSelected(null); onFormOpen(); }}
          >
            Add Student
          </Button>
        </div>
      </div>

      {/* --- Filter & Action Bar --- */}
      <Card className="p-4 border-none shadow-sm bg-content1/70 backdrop-blur-md flex flex-col md:flex-row gap-4">
        <Input 
          className="flex-1"
          placeholder="Search by student name or quote keywords..." 
          startContent={<Search size={18} className="text-default-400" />}
          value={admin.search}
          onValueChange={admin.setSearch}
          variant="flat"
        />
        <div className="flex gap-2">
          <Select 
            className="w-48"
            placeholder="All Generations"
            selectedKeys={[admin.genFilter]}
            onSelectionChange={(keys) => admin.setGenFilter(Array.from(keys)[0] as string)}
          >
            {admin.generations.map((g) => (
              <SelectItem key={g}>{g === "ALL" ? "All Generations" : g}</SelectItem>
            ))}
          </Select>
          <Tooltip content="Refresh Data">
            <Button isIconOnly variant="flat" onPress={() => window.location.reload()}>
              <RefreshCcw size={18} />
            </Button>
          </Tooltip>
        </div>
      </Card>

      {/* --- Main Table --- */}
      <Table 
        aria-label="Student database" 
        shadow="none"
        classNames={{ 
          wrapper: "rounded-3xl border border-divider bg-content1 p-0 overflow-hidden",
          th: "bg-default-50 py-4 text-default-600 font-bold uppercase text-[11px] tracking-widest border-b border-divider",
          td: "py-4 font-medium"
        }}
      >
        <TableHeader>
          <TableColumn>STUDENT IDENTITY</TableColumn>
          <TableColumn>CLASS GENERATION</TableColumn>
          <TableColumn>YEARBOOK QUOTE</TableColumn>
          <TableColumn align="end">MANAGEMENT</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No records found. Try adjusting your search.">
          {admin.entries.map((student) => (
            <TableRow key={student.id} className="hover:bg-default-50/50 transition-colors">
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar src={student.image} radius="lg" className="w-12 h-12 shadow-sm border border-divider" />
                  <span className="font-bold text-base">{student.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="dot" color="primary" className="font-bold border-none">
                  {student.generation}
                </Chip>
              </TableCell>
              <TableCell className="max-w-md italic text-default-500 leading-relaxed">
                "{student.quote}"
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button isIconOnly variant="light" radius="full" size="sm" onPress={() => { setSelected(student); onFormOpen(); }}>
                    <Edit3 size={16} className="text-default-400" />
                  </Button>
                  <Button isIconOnly variant="light" radius="full" size="sm" color="danger" onPress={() => admin.setIsDeleting(student.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* --- MODAL: CREATE / EDIT --- */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} size="2xl" backdrop="blur">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 py-6 border-b border-divider">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Edit3 size={20}/></div>
              <h2 className="text-xl font-bold">{selected ? "Edit Profile" : "New Student Entry"}</h2>
            </div>
          </ModalHeader>
          <ModalBody className="py-8 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Student Name" placeholder="e.g. Sok Rathana" labelPlacement="outside" variant="bordered" defaultValue={selected?.name} />
              <Input label="Generation" placeholder="e.g. Gen 8" labelPlacement="outside" variant="bordered" defaultValue={selected?.generation} />
            </div>
            <Input label="Portrait Image URL" placeholder="https://i.pravatar.cc/..." labelPlacement="outside" variant="bordered" defaultValue={selected?.image} />
            <Textarea label="Yearbook Quote" placeholder="Enter an inspiring quote..." labelPlacement="outside" variant="bordered" minRows={3} defaultValue={selected?.quote} />
          </ModalBody>
          <ModalFooter className="border-t border-divider py-4">
            <Button variant="light" className="font-bold" onPress={onFormClose}>Discard</Button>
            <Button color="primary" className="font-bold px-8" onPress={handleUpsert}>
              {selected ? "Update Profile" : "Create Entry"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* --- MODAL: BULK CSV UPLOAD --- */}
      <Modal isOpen={isBulkOpen} onClose={onBulkClose} size="md" backdrop="blur">
        <ModalContent>
          <ModalHeader className="py-6 border-b border-divider">Bulk CSV Import</ModalHeader>
          <ModalBody className="py-8">
            <div className="relative border-2 border-dashed border-divider rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-default-50 hover:bg-default-100 transition-colors cursor-pointer group">
              <div className="p-4 bg-background rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                <FileText size={40} className="text-primary" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">Select CSV File</p>
                <p className="text-xs text-default-400 mt-2">Required: name, quote, image, generation</p>
              </div>
              <input 
                type="file" accept=".csv" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              />
              {csvFile && (
                <Chip color="success" variant="flat" className="mt-2 font-bold" startContent={<CheckCircle2 size={14}/>}>
                  {csvFile.name}
                </Chip>
              )}
            </div>
          </ModalBody>
          <ModalFooter className="border-t border-divider py-4">
            <Button variant="light" className="font-bold" onPress={onBulkClose}>Cancel</Button>
            <Button color="primary" className="font-bold px-10" isDisabled={!csvFile} onPress={handleCsvProcess}>
              Start Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* --- MODAL: DELETE CONFIRMATION --- */}
      <Modal isOpen={!!admin.isDeleting} onClose={() => admin.setIsDeleting(null)} size="sm" backdrop="blur" hideCloseButton>
        <ModalContent>
          <ModalBody className="p-10 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6 animate-pulse">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-2xl font-black">Remove Profile?</h3>
            <p className="text-default-500 text-sm mt-3 leading-relaxed">
              This action will permanently remove the student from the yearbook database. This cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter className="flex flex-col gap-2 pb-10 px-10 border-none">
            <Button color="danger" className="font-black w-full text-lg shadow-lg shadow-danger/20" onPress={confirmDelete}>
              Confirm Delete
            </Button>
            <Button variant="light" className="font-bold w-full" onPress={() => admin.setIsDeleting(null)}>
              Keep Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  );
}