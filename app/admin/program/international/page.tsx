"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Plus, AlertCircle } from "lucide-react";

import InternationalProgramPageContent, {
  InternationalProgramSectionKey,
} from "@/app/program/international-program/page-content";
import {
  useInternationalProgramData,
  useCreateProgram,
} from "@/hooks/useInternationalProgramData";

import InternationalArchitectureModal from "./modals/architecture-modal";
import InternationalEnrollmentModal from "./modals/enrollment-modal";
import InternationalHeroModal from "./modals/hero-modal";
import InternationalPartnersModal from "./modals/partners-modal";

export default function InternationalProgramAdminPage() {
  const { isError } = useInternationalProgramData();
  const createProgram = useCreateProgram();
  const [activeSection, setActiveSection] = React.useState<InternationalProgramSectionKey | null>(null);

  const handleInitialize = () => {
    createProgram.mutate({
      title: "International Program",
      slug: "international",
      type: "international",
      isActive: true,
      displayOrder: 1
    });
  };

  // No record in the database yet — show initialize prompt
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="flex items-center gap-3 text-warning">
          <AlertCircle size={32} />
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Program Not Initialized
          </h2>
        </div>
        <p className="text-default-500 text-center max-w-md">
          The International Program doesn&apos;t exist in the database yet.
          Initialize it to start managing content.
        </p>
        <Button
          color="primary"
          size="lg"
          className="font-bold shadow-xl shadow-primary/20"
          startContent={<Plus size={20} />}
          onPress={handleInitialize}
          isLoading={createProgram.isPending}
        >
          Initialize International Program
        </Button>
        {createProgram.isError && (
          <p className="text-danger text-sm">
            Failed to initialize. Please try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <InternationalProgramPageContent editable onEditSection={setActiveSection} />
      <InternationalHeroModal isOpen={activeSection === "hero"} onClose={() => setActiveSection(null)} />
      <InternationalArchitectureModal
        isOpen={activeSection === "architecture"}
        onClose={() => setActiveSection(null)}
      />
      <InternationalPartnersModal
        isOpen={activeSection === "partners"}
        onClose={() => setActiveSection(null)}
      />
      <InternationalEnrollmentModal
        isOpen={activeSection === "enrollment"}
        onClose={() => setActiveSection(null)}
      />
    </div>
  );
}
