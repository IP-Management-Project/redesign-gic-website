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
import { addToast } from "@heroui/toast";

export default function LandingPageAdmin() {
  const [activeSection, setActiveSection] = React.useState<LandingSectionKey | null>(null);

  const handleEditSection = (section: LandingSectionKey) => {
    setActiveSection(section);
  };

  const handleCloseModal = () => {
    setActiveSection(null);
    addToast({
      title: "Some entries were skipped",
      description: "Check the bulk format: Generation | Name | Quote | Image URL.",
      severity: "success",
      color: "success",
    });
  };

  return (
    <div className="relative">
      <PageContent editable onEditSection={handleEditSection} />
      <HeroModal isOpen={activeSection === "hero"} onClose={handleCloseModal} />
      <StatsModal isOpen={activeSection === "stats"} onClose={handleCloseModal} />
      <PillarsModal isOpen={activeSection === "pillars"} onClose={handleCloseModal} />
      <FacultyModal isOpen={activeSection === "faculty"} onClose={handleCloseModal} />
      <PartnersModal isOpen={activeSection === "partners"} onClose={handleCloseModal} />
      <CareersModal isOpen={activeSection === "careers"} onClose={handleCloseModal} />
      <ResearchModal isOpen={activeSection === "research"} onClose={handleCloseModal} />
      <EventsModal isOpen={activeSection === "events"} onClose={handleCloseModal} />
      <CtaModal isOpen={activeSection === "cta"} onClose={handleCloseModal} />
    </div>
  );
}