"use client";

import React from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Avatar, Chip, Select, SelectItem, Tooltip, Textarea,
  Card, Spinner, Pagination
} from "@heroui/react";
import { 
  Search, Upload, Trash2, Edit3, AlertCircle, 
  FileText, RefreshCcw, UserPlus, CheckCircle2, X
} from "lucide-react";
import { useStudentGenerationData, type StudentEntry } from "@/hooks/useStudentGenerationData";

// --- Main Page Component ---
export default function StudentAdminPage() {
  const {
    // Data
    paginated,
    generations,
    isLoading,
    
    // State
    filters,
    form,
    isFormOpen,
    isBulkOpen,
    isDeleting,
    page,
    totalPages,

    // CSV Bulk
    csvPreview,
    csvError,
    
    // Setters
    setFilters,
    setForm,
    setIsFormOpen,
    setIsBulkOpen,
    setIsDeleting,
    setPage,
    
    // Actions
    openCreate,
    openEdit,
    closeForm,
    upsert,
    confirmDelete,
    parseCsvFile,
    bulkUpload,
    closeBulk,
    
    // Mutation states
    isCreating,
    isUpdating,
    isDeletePending,
    isBulkUploading,
  } = useStudentGenerationData({ perPage: 20 });

  // --- Handlers ---
  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
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
            onPress={() => setIsBulkOpen(true)}
          >
            Bulk CSV
          </Button>
          <Button 
            color="primary" 
            className="font-bold shadow-lg shadow-primary/20" 
            startContent={<UserPlus size={18}/>} 
            onPress={openCreate}
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
          value={filters.search}
          onValueChange={(value) => setFilters({ ...filters, search: value })}
          variant="flat"
        />
        <div className="flex gap-2">
          <Select 
            className="w-48"
            placeholder="All Generations"
            selectedKeys={[filters.genFilter]}
            onSelectionChange={(keys) => setFilters({ ...filters, genFilter: Array.from(keys)[0] as string })}
          >
            {generations.map((g) => (
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

      {/* --- Loading State --- */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" label="Loading yearbook data..." />
        </div>
      )}

      {/* --- Main Table --- */}
      {!isLoading && (
        <>
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
            <TableBody emptyContent="No records found. Try adjusting your search or add a new student.">
              {paginated.map((student) => (
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
                      <Button 
                        isIconOnly 
                        variant="light" 
                        radius="full" 
                        size="sm" 
                        onPress={() => openEdit(student)}
                      >
                        <Edit3 size={16} className="text-default-400" />
                      </Button>
                      <Button 
                        isIconOnly 
                        variant="light" 
                        radius="full" 
                        size="sm" 
                        color="danger" 
                        onPress={() => setIsDeleting(student.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* --- Pagination --- */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                showControls
                color="primary"
              />
            </div>
          )}
        </>
      )}

      {/* --- MODAL: CREATE / EDIT --- */}
      <Modal isOpen={isFormOpen} onClose={closeForm} size="2xl" backdrop="blur">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 py-6 border-b border-divider">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Edit3 size={20}/></div>
              <h2 className="text-xl font-bold">{form.id ? "Edit Profile" : "New Student Entry"}</h2>
            </div>
          </ModalHeader>
          <ModalBody className="py-8 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Student Name" 
                placeholder="e.g. Sok Rathana" 
                labelPlacement="outside" 
                variant="bordered" 
                value={form.name}
                onValueChange={(value) => handleFormChange("name", value)}
                isRequired
              />
              <Input 
                label="Generation" 
                placeholder="e.g. Gen 8" 
                labelPlacement="outside" 
                variant="bordered" 
                value={form.generation}
                onValueChange={(value) => handleFormChange("generation", value)}
                isRequired
                isDisabled={!!form.id} // Cannot change generation when editing
              />
            </div>
            <Input 
              label="Portrait Image URL" 
              placeholder="https://i.pravatar.cc/..." 
              labelPlacement="outside" 
              variant="bordered" 
              value={form.image}
              onValueChange={(value) => handleFormChange("image", value)}
            />
            <Textarea 
              label="Yearbook Quote" 
              placeholder="Enter an inspiring quote..." 
              labelPlacement="outside" 
              variant="bordered" 
              minRows={3} 
              value={form.quote}
              onValueChange={(value) => handleFormChange("quote", value)}
            />
          </ModalBody>
          <ModalFooter className="border-t border-divider py-4">
            <Button variant="light" className="font-bold" onPress={closeForm}>
              Discard
            </Button>
            <Button 
              color="primary" 
              className="font-bold px-8" 
              onPress={upsert}
              isLoading={isCreating || isUpdating}
              startContent={!isCreating && !isUpdating ? <CheckCircle2 size={16} /> : null}
            >
              {form.id ? "Update Profile" : "Create Entry"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* --- MODAL: BULK CSV UPLOAD WITH PREVIEW --- */}
      <Modal isOpen={isBulkOpen} onClose={closeBulk} size="4xl" backdrop="blur" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="py-6 border-b border-divider">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Upload size={20}/></div>
              <h2 className="text-xl font-bold">Bulk CSV Import</h2>
            </div>
          </ModalHeader>
          <ModalBody className="py-8 gap-6">
            {/* Drop zone */}
            <div className="relative border-2 border-dashed border-divider rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-default-50 hover:bg-default-100 transition-colors cursor-pointer group">
              <div className="p-4 bg-background rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                <FileText size={40} className="text-primary" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">
                  {csvPreview.length > 0 ? "Replace CSV File" : "Select CSV File"}
                </p>
                <p className="text-xs text-default-400 mt-2">
                  Header row required: <span className="font-mono">name, quote, image, generation</span>
                </p>
              </div>
              <input 
                type="file" accept=".csv" 
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) parseCsvFile(file);
                  e.target.value = ""; // allow re-selecting same file
                }}
              />
            </div>

            {/* CSV parse error */}
            {csvError && (
              <Card className="p-4 bg-danger-50 border border-danger-200 flex flex-row items-center gap-3">
                <AlertCircle size={20} className="text-danger shrink-0" />
                <p className="text-danger text-sm font-medium">{csvError}</p>
              </Card>
            )}

            {/* CSV preview table */}
            {csvPreview.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-base">
                    Preview 
                    <Chip size="sm" variant="flat" color="primary" className="ml-2 font-bold">
                      {csvPreview.length} {csvPreview.length === 1 ? "row" : "rows"}
                    </Chip>
                  </div>
                  <Button 
                    size="sm" 
                    variant="light" 
                    color="danger"
                    startContent={<X size={14}/>} 
                    onPress={() => { closeBulk(); setIsBulkOpen(true); }}
                  >
                    Clear
                  </Button>
                </div>

                <Table
                  aria-label="CSV preview"
                  shadow="none"
                  classNames={{
                    wrapper: "rounded-2xl border border-divider bg-content1 p-0 overflow-hidden max-h-80",
                    th: "bg-default-50 py-3 text-default-600 font-bold uppercase text-[10px] tracking-widest border-b border-divider",
                    td: "py-3 text-sm"
                  }}
                >
                  <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>GENERATION</TableColumn>
                    <TableColumn>QUOTE</TableColumn>
                    <TableColumn>IMAGE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {csvPreview.map((row, idx) => (
                      <TableRow key={idx} className="hover:bg-default-50/50 transition-colors">
                        <TableCell className="font-mono text-default-400 w-10">{idx + 1}</TableCell>
                        <TableCell className="font-semibold">{row.name}</TableCell>
                        <TableCell>
                          <Chip size="sm" variant="dot" color="secondary" className="border-none font-semibold">
                            {row.generation}
                          </Chip>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate italic text-default-500">
                          {row.quote || <span className="text-default-300">—</span>}
                        </TableCell>
                        <TableCell className="max-w-[120px] truncate text-default-400 text-xs font-mono">
                          {row.image || <span className="text-default-300">—</span>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </ModalBody>
          <ModalFooter className="border-t border-divider py-4">
            <Button variant="light" className="font-bold" onPress={closeBulk}>
              Cancel
            </Button>
            <Button 
              color="primary" 
              className="font-bold px-10" 
              isDisabled={csvPreview.length === 0} 
              onPress={bulkUpload}
              isLoading={isBulkUploading}
              startContent={!isBulkUploading ? <CheckCircle2 size={16}/> : null}
            >
              {isBulkUploading 
                ? "Importing..." 
                : `Import ${csvPreview.length} Student${csvPreview.length !== 1 ? "s" : ""}`
              }
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* --- MODAL: DELETE CONFIRMATION --- */}
      <Modal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        size="sm" 
        backdrop="blur" 
        hideCloseButton
      >
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
            <Button 
              color="danger" 
              className="font-black w-full text-lg shadow-lg shadow-danger/20" 
              onPress={confirmDelete}
              isLoading={isDeletePending}
            >
              {isDeletePending ? "Deleting..." : "Confirm Delete"}
            </Button>
            <Button 
              variant="light" 
              className="font-bold w-full" 
              onPress={() => setIsDeleting(null)}
              isDisabled={isDeletePending}
            >
              Keep Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  );
}