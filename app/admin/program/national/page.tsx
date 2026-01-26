"use client";

import React from "react";

import EngineeringProgramPageContent, {
  EngineeringProgramSectionKey,
} from "@/app/program/engineering-degree/page-content";

import EngineeringHeroModal from "./modals/hero-modal";
import EngineeringMethodologyModal from "./modals/methodology-modal";
import EngineeringRoadmapModal from "./modals/roadmap-modal";

export default function NationalProgramAdminPage() {
  const [activeSection, setActiveSection] = React.useState<EngineeringProgramSectionKey | null>(null);

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
