"use client";

import React from "react";

import LabsAndClubsPage, {
  type LabsSectionKey,
} from "@/app/research/labs/page-content";

import ClubsModal from "./modals/clubs-modal";
import ClubModal from "./modals/club-modal";
import DeploymentItemModal from "./modals/deployment-item-modal";
import DeploymentsModal from "./modals/deployments-modal";
import FacilitiesNodeModal from "./modals/facilities-node-modal";
import FacilitiesStudioModal from "./modals/facilities-studio-modal";
import FeaturedLabModal from "./modals/featured-lab-modal";
import HeaderModal from "./modals/header-modal";
import HeroModal from "./modals/hero-modal";
import ProjectModal from "./modals/project-modal";
import ResearchPortfolioModal from "./modals/research-portfolio-modal";

const parseSectionIndex = (section: LabsSectionKey | null, prefix: string) => {
  if (!section || !section.startsWith(`${prefix}-`)) return null;
  const value = Number(section.replace(`${prefix}-`, ""));
  return Number.isNaN(value) ? null : value;
};

export default function LaboratoryAdminPage() {
  const [activeSection, setActiveSection] = React.useState<LabsSectionKey | null>(null);

  const deploymentIndex = parseSectionIndex(activeSection, "deployment");
  const projectIndex = parseSectionIndex(activeSection, "project");
  const clubIndex = parseSectionIndex(activeSection, "club");

  return (
    <div className="relative">
      <LabsAndClubsPage editable onEditSection={setActiveSection} />

      <HeroModal isOpen={activeSection === "hero"} onClose={() => setActiveSection(null)} />
      <HeaderModal isOpen={activeSection === "labs-header"} onClose={() => setActiveSection(null)} />
      <FeaturedLabModal
        isOpen={activeSection === "featured-lab"}
        onClose={() => setActiveSection(null)}
      />
      <ResearchPortfolioModal
        isOpen={activeSection === "research-portfolio"}
        onClose={() => setActiveSection(null)}
      />
      <DeploymentsModal
        isOpen={activeSection === "deployments"}
        onClose={() => setActiveSection(null)}
      />
      <DeploymentItemModal
        isOpen={deploymentIndex !== null}
        deploymentIndex={deploymentIndex}
        onClose={() => setActiveSection(null)}
      />
      <ProjectModal
        isOpen={projectIndex !== null}
        projectIndex={projectIndex}
        onClose={() => setActiveSection(null)}
      />
      <ClubsModal isOpen={activeSection === "clubs"} onClose={() => setActiveSection(null)} />
      <ClubModal
        isOpen={clubIndex !== null}
        clubIndex={clubIndex}
        onClose={() => setActiveSection(null)}
      />
      <FacilitiesNodeModal
        isOpen={activeSection === "facilities-node"}
        onClose={() => setActiveSection(null)}
      />
      <FacilitiesStudioModal
        isOpen={activeSection === "facilities-studio"}
        onClose={() => setActiveSection(null)}
      />
    </div>
  );
}
