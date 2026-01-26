"use client";

import React from "react";

import MissionVisionPageContent, { MissionVisionSectionKey } from "@/app/about/page-content";

import MissionVisionAboutModal from "./modals/about-modal";
import MissionVisionHeroModal from "./modals/hero-modal";
import MissionVisionMissionModal from "./modals/mission-modal";
import MissionVisionModal from "./modals/vision-modal";

export default function MissionVisionAdminPage() {
  const [activeSection, setActiveSection] = React.useState<MissionVisionSectionKey | null>(null);

  return (
    <div className="relative">
      <MissionVisionPageContent editable onEditSection={setActiveSection} />
      <MissionVisionHeroModal isOpen={activeSection === "hero"} onClose={() => setActiveSection(null)} />
      <MissionVisionAboutModal isOpen={activeSection === "about"} onClose={() => setActiveSection(null)} />
      <MissionVisionMissionModal isOpen={activeSection === "mission"} onClose={() => setActiveSection(null)} />
      <MissionVisionModal isOpen={activeSection === "vision"} onClose={() => setActiveSection(null)} />
    </div>
  );
}
