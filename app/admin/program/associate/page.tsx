"use client";

import React from "react";

import AssociateDegreePageContent, {
  AssociateProgramSectionKey,
} from "@/app/program/associate-degree/page-content";

import AssociateAdmissionModal from "./modals/admission-modal";
import AssociateCareersModal from "./modals/careers-modal";
import AssociateHeroModal from "./modals/hero-modal";
import AssociateIdentityModal from "./modals/identity-modal";
import AssociateIndustryModal from "./modals/industry-modal";

export default function AssociateProgramAdminPage() {
  const [activeSection, setActiveSection] = React.useState<AssociateProgramSectionKey | null>(null);

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
