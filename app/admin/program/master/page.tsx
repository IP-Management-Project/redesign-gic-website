"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Plus, AlertCircle } from "lucide-react";

import MasterDegreePageContent, {
  MasterDegreeSectionKey,
} from "@/app/program/master-degree/page-content";
import { useMasterDegreeData, useCreateMasterProgram } from "@/hooks/useMasterDegreeData";

import MasterCareerModal from "./modals/career-modal";
import MasterCoordinatorModal from "./modals/coordinator-modal";
import MasterCurriculumModal from "./modals/curriculum-modal";
import MasterEligibilityModal from "./modals/eligibility-modal";
import MasterFrameworkModal from "./modals/framework-modal";
import MasterHeroModal from "./modals/hero-modal";
import MasterOverviewModal from "./modals/overview-modal";

export default function MasterProgramAdminPage() {
  const [activeSection, setActiveSection] = React.useState<MasterDegreeSectionKey | null>(null);
  const { isError } = useMasterDegreeData();
  const createProgram = useCreateMasterProgram();

  const handleInitialize = () => {
    createProgram.mutate();
  };

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
          The Master Degree Program doesn&apos;t exist in the database yet.
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
          Initialize Master Degree Program
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
      <MasterDegreePageContent editable onEditSection={setActiveSection} />
      <MasterHeroModal isOpen={activeSection === "hero"} onClose={() => setActiveSection(null)} />
      <MasterOverviewModal isOpen={activeSection === "overview"} onClose={() => setActiveSection(null)} />
      <MasterCareerModal isOpen={activeSection === "career"} onClose={() => setActiveSection(null)} />
      <MasterFrameworkModal isOpen={activeSection === "framework"} onClose={() => setActiveSection(null)} />
      <MasterEligibilityModal
        isOpen={activeSection === "eligibility"}
        onClose={() => setActiveSection(null)}
      />
      <MasterCurriculumModal isOpen={activeSection === "curriculum"} onClose={() => setActiveSection(null)} />
      <MasterCoordinatorModal
        isOpen={activeSection === "coordinator"}
        onClose={() => setActiveSection(null)}
      />
    </div>
  );
}
