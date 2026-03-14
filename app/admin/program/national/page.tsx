"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Plus, AlertCircle } from "lucide-react";

import EngineeringProgramPageContent, {
  EngineeringProgramSectionKey,
} from "@/app/program/engineering-degree/page-content";
import {
  useEngineeringProgramCopy,
  useCreateEngineeringProgram,
} from "@/hooks/useEngineeringProgramCopy";

import EngineeringHeroModal from "./modals/hero-modal";
import EngineeringMethodologyModal from "./modals/methodology-modal";
import EngineeringRoadmapModal from "./modals/roadmap-modal";

export default function NationalProgramAdminPage() {
  const { isError } = useEngineeringProgramCopy();
  const createProgram = useCreateEngineeringProgram();
  const [activeSection, setActiveSection] = React.useState<EngineeringProgramSectionKey | null>(null);

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
          The Engineering Program doesn&apos;t exist in the database yet.
          Initialize it to start managing content.
        </p>
        <Button
          color="primary"
          size="lg"
          className="font-bold shadow-xl shadow-primary/20"
          startContent={<Plus size={20} />}
          onPress={() => createProgram.mutate()}
          isLoading={createProgram.isPending}
        >
          Initialize Engineering Program
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
      <EngineeringProgramPageContent editable onEditSection={setActiveSection} />
      <EngineeringHeroModal isOpen={activeSection === "hero"} onClose={() => setActiveSection(null)} />
      <EngineeringRoadmapModal isOpen={activeSection === "roadmap"} onClose={() => setActiveSection(null)} />
      <EngineeringMethodologyModal
        isOpen={activeSection === "methodology"}
        onClose={() => setActiveSection(null)}
      />
    </div>
  );
}

