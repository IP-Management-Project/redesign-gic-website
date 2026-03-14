"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Plus, AlertCircle } from "lucide-react";

import AssociateDegreePageContent, {
  AssociateProgramSectionKey,
} from "@/app/program/associate-degree/page-content";
import {
  useAssociateDegreeCopy,
  useCreateAssociateProgram,
} from "@/hooks/useAssociateDegreeCopy";

import AssociateAdmissionModal from "./modals/admission-modal";
import AssociateCareersModal from "./modals/careers-modal";
import AssociateHeroModal from "./modals/hero-modal";
import AssociateIdentityModal from "./modals/identity-modal";
import AssociateIndustryModal from "./modals/industry-modal";

export default function AssociateProgramAdminPage() {
  const { isError } = useAssociateDegreeCopy();
  const createProgram = useCreateAssociateProgram();
  const [activeSection, setActiveSection] = React.useState<AssociateProgramSectionKey | null>(null);

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
          The Associate Degree doesn&apos;t exist in the database yet.
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
          Initialize Associate Degree
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
      <AssociateDegreePageContent editable onEditSection={setActiveSection} />
      <AssociateHeroModal isOpen={activeSection === "hero"} onClose={() => setActiveSection(null)} />
      <AssociateAdmissionModal isOpen={activeSection === "admission"} onClose={() => setActiveSection(null)} />
      <AssociateIdentityModal isOpen={activeSection === "identity"} onClose={() => setActiveSection(null)} />
      <AssociateIndustryModal isOpen={activeSection === "industry"} onClose={() => setActiveSection(null)} />
      <AssociateCareersModal isOpen={activeSection === "careers"} onClose={() => setActiveSection(null)} />
    </div>
  );
}
