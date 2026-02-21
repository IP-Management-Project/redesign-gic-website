"use client";

import React from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, Select, SelectItem, Textarea
} from "@heroui/react";
import { LayoutGrid } from "lucide-react";
import type { FacultyMember } from "@/hooks/useFacultyCentralize"; // Adjust import path

interface FacultyUpsertModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  form: Partial<FacultyMember>; // Or your specific FormType
  setForm: React.Dispatch<React.SetStateAction<any>>; // Using 'any' for the form state wrapper for simplicity, ideally stricter
  onSubmit: () => void;
}

export function FacultyUpsertModal({
  isOpen,
  onOpenChange,
  form,
  setForm,
  onSubmit
}: FacultyUpsertModalProps) {
  
  const handleUpdate = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
      backdrop="blur"
      classNames={{
        base: "bg-background",
        header: "border-b border-divider",
        footer: "border-t border-divider",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 py-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <LayoutGrid size={20} className="text-primary" />
                {form.id ? "Update Profile" : "Create New Profile"}
              </h2>
            </ModalHeader>
            <ModalBody className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <Input
                  className="md:col-span-2"
                  label="FULL NAME"
                  labelPlacement="outside"
                  placeholder="e.g. Prof. Alexander Wright"
                  value={form.name}
                  onValueChange={(v) => handleUpdate("name", v)}
                />

                {/* Group */}
                <Select
                  label="DEPARTMENT GROUP"
                  labelPlacement="outside"
                  selectedKeys={form.group ? [form.group] : []}
                  onSelectionChange={(keys) => handleUpdate("group", Array.from(keys)[0])}
                >
                  <SelectItem key="management">Management</SelectItem>
                  <SelectItem key="lecturers">Lecturers</SelectItem>
                  <SelectItem key="researchers">Researchers</SelectItem>
                  <SelectItem key="staff">Administrative Staff</SelectItem>
                </Select>

                {/* Role */}
                <Input
                  label="PRIMARY ROLE"
                  labelPlacement="outside"
                  placeholder="e.g. Dean of Research"
                  value={form.role}
                  onValueChange={(v) => handleUpdate("role", v)}
                />

                {/* Degree */}
                <Input
                  className="md:col-span-2"
                  label="DEGREES & AFFILIATIONS"
                  labelPlacement="outside"
                  placeholder="PhD, Stanford University"
                  value={form.degree}
                  onValueChange={(v) => handleUpdate("degree", v)}
                />

                {/* Images */}
                <Input
                  label="PORTRAIT IMAGE URL"
                  labelPlacement="outside"
                  placeholder="https://..."
                  value={form.portrait}
                  onValueChange={(v) => handleUpdate("portrait", v)}
                />
                <Input
                  label="UNIVERSITY LOGO URL"
                  labelPlacement="outside"
                  placeholder="https://..."
                  value={form.uniLogo}
                  onValueChange={(v) => handleUpdate("uniLogo", v)}
                />

                {/* Bio */}
                <Textarea
                  className="md:col-span-2"
                  label="BIO / RESEARCH SUMMARY"
                  labelPlacement="outside"
                  placeholder="Brief summary of academic focus..."
                  value={form.focus}
                  onValueChange={(v) => handleUpdate("focus", v)}
                  minRows={4}
                />
              </div>
            </ModalBody>
            <ModalFooter className="py-6">
              <Button variant="light" className="font-semibold" onPress={onClose}>
                Discard
              </Button>
              <Button color="primary" className="font-bold px-10" onPress={onSubmit}>
                {form.id ? "Save Changes" : "Publish Profile"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}