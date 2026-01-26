"use client";

import React from "react";

import ServicesPageContent, { ServicesSectionKey } from "@/app/about/services/page-content";

import ServicesCapabilitiesModal from "./modals/capabilities-modal";
import ServicesHeaderModal from "./modals/header-modal";
import ServicesInfrastructureModal from "./modals/infrastructure-modal";
import ServicesMethodologyModal from "./modals/methodology-modal";
import ServicesOfferingsModal from "./modals/offerings-modal";

export default function OurServicesAdminPage() {
  const [activeSection, setActiveSection] = React.useState<ServicesSectionKey | null>(null);

  return (
    <div className="relative">
      <ServicesPageContent editable onEditSection={setActiveSection} />
      <ServicesHeaderModal isOpen={activeSection === "header"} onClose={() => setActiveSection(null)} />
      <ServicesCapabilitiesModal
        isOpen={activeSection === "capabilities"}
        onClose={() => setActiveSection(null)}
      />
      <ServicesOfferingsModal
        isOpen={activeSection === "offerings"}
        onClose={() => setActiveSection(null)}
      />
      <ServicesInfrastructureModal
        isOpen={activeSection === "infrastructure"}
        onClose={() => setActiveSection(null)}
      />
      <ServicesMethodologyModal
        isOpen={activeSection === "methodology"}
        onClose={() => setActiveSection(null)}
      />
    </div>
  );
}
