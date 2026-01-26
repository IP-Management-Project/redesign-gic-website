"use client";

import React from "react";

import InternationalProgramPageContent, {
  InternationalProgramSectionKey,
} from "@/app/program/international-program/page-content";

import InternationalArchitectureModal from "./modals/architecture-modal";
import InternationalEnrollmentModal from "./modals/enrollment-modal";
import InternationalHeroModal from "./modals/hero-modal";
import InternationalPartnersModal from "./modals/partners-modal";

export default function InternationalProgramAdminPage() {
  const [activeSection, setActiveSection] = React.useState<InternationalProgramSectionKey | null>(null);

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
