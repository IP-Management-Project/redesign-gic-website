"use client";

import React from "react";

import PageContent, { LandingSectionKey } from "@/app/page-content";
import HeroModal from "@/app/admin/landing-page/modals/hero-modal";
import StatsModal from "@/app/admin/landing-page/modals/stats-modal";
import PillarsModal from "@/app/admin/landing-page/modals/pillars-modal";
import FacultyModal from "@/app/admin/landing-page/modals/faculty-modal";
import PartnersModal from "@/app/admin/landing-page/modals/partners-modal";
import CareersModal from "@/app/admin/landing-page/modals/careers-modal";
import ResearchModal from "@/app/admin/landing-page/modals/research-modal";
import EventsModal from "@/app/admin/landing-page/modals/events-modal";
import CtaModal from "@/app/admin/landing-page/modals/cta-modal";

export default function LandingPageAdmin() {
  const [activeSection, setActiveSection] = React.useState<LandingSectionKey | null>(null);

  const handleEditSection = (section: LandingSectionKey) => {
    setActiveSection(section);
  };

  return (
    <div className="relative">
      <PageContent editable onEditSection={handleEditSection} />
      <HeroModal isOpen={activeSection === "hero"} onClose={() => setActiveSection(null)} />
      <StatsModal isOpen={activeSection === "stats"} onClose={() => setActiveSection(null)} />
      <PillarsModal isOpen={activeSection === "pillars"} onClose={() => setActiveSection(null)} />
      <FacultyModal isOpen={activeSection === "faculty"} onClose={() => setActiveSection(null)} />
      <PartnersModal isOpen={activeSection === "partners"} onClose={() => setActiveSection(null)} />
      <CareersModal isOpen={activeSection === "careers"} onClose={() => setActiveSection(null)} />
      <ResearchModal isOpen={activeSection === "research"} onClose={() => setActiveSection(null)} />
      <EventsModal isOpen={activeSection === "events"} onClose={() => setActiveSection(null)} />
      <CtaModal isOpen={activeSection === "cta"} onClose={() => setActiveSection(null)} />
    </div>
  );
}