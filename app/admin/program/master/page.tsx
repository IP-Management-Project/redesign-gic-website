"use client";

import React from "react";

import MasterDegreePageContent, {
  MasterDegreeSectionKey,
} from "@/app/program/master-degree/page-content";

import MasterCareerModal from "./modals/career-modal";
import MasterCoordinatorModal from "./modals/coordinator-modal";
import MasterCurriculumModal from "./modals/curriculum-modal";
import MasterEligibilityModal from "./modals/eligibility-modal";
import MasterFrameworkModal from "./modals/framework-modal";
import MasterHeroModal from "./modals/hero-modal";
import MasterOverviewModal from "./modals/overview-modal";

export default function MasterProgramAdminPage() {
  const [activeSection, setActiveSection] = React.useState<MasterDegreeSectionKey | null>(null);

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
