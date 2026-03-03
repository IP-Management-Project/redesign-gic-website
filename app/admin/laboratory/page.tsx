"use client";

import React from "react";

import LabsAndClubsPage from "@/app/research/labs/page-content";

import {
  useLabsPageData,
  useUpdateLabsPageData,
} from "@/hooks/useLabsPageData";

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

// ✅ Define the union type your modals/sections support
export type LabsSectionKey =
  | "hero"
  | "labs-header"
  | "featured-lab"
  | "research-portfolio"
  | "deployments"
  | `deployment-${number}`
  | `project-${number}`
  | "clubs"
  | `club-${number}`
  | "facilities-node"
  | "facilities-studio";

const parseSectionIndex = (section: LabsSectionKey | null, prefix: string) => {
  if (!section || !section.startsWith(`${prefix}-`)) return null;
  const value = Number(section.replace(`${prefix}-`, ""));
  return Number.isNaN(value) ? null : value;
};

export default function LaboratoryAdminPage() {
  const [activeSection, setActiveSection] =
    React.useState<LabsSectionKey | null>(null);
  const { data } = useLabsPageData();
  const updateLabs = useUpdateLabsPageData();

  const deploymentIndex = parseSectionIndex(activeSection, "deployment");
  const projectIndex = parseSectionIndex(activeSection, "project");
  const clubIndex = parseSectionIndex(activeSection, "club");

  const handleDeleteSection = React.useCallback(
    (section: LabsSectionKey) => {
      if (!data) return;

      const confirmMessage =
        section === "facilities-node"
          ? "Delete all Physical Node Hub content? This cannot be undone."
          : section === "facilities-studio"
            ? "Delete all E-learning Studio content? This cannot be undone."
            : section.startsWith("project-")
              ? "Delete this project?"
              : section.startsWith("club-")
                ? "Delete this club?"
                : "Delete this section?";

      if (typeof window !== "undefined" && !window.confirm(confirmMessage))
        return;

      if (section.startsWith("project-")) {
        const index = parseSectionIndex(section, "project");
        const projects = data.projects ?? [];
        if (index === null || index < 0 || index >= projects.length) return;
        const updated = projects.filter((_, idx) => idx !== index);
        updateLabs.mutate({ section, data: { projects: updated } });
        return;
      }

      if (section.startsWith("club-")) {
        const index = parseSectionIndex(section, "club");
        const clubs = data.clubs ?? [];
        if (index === null || index < 0 || index >= clubs.length) return;
        const updated = clubs.filter((_, idx) => idx !== index);
        updateLabs.mutate({ section, data: { clubs: updated } });
        return;
      }

      if (section === "facilities-node") {
        updateLabs.mutate({
          section,
          data: {
            "facilities.nodeHub.kicker": "",
            "facilities.nodeHub.titleMain": "",
            "facilities.nodeHub.titleHighlight": "",
            "facilities.nodeHub.description": "",
            "facilities.nodeHub.image": "",
            "facilities.nodeHub.footnote": "",
          },
        });
        return;
      }

      if (section === "facilities-studio") {
        updateLabs.mutate({
          section,
          data: {
            "facilities.studio.title": "",
            "facilities.studio.description": "",
            "facilities.studio.equipmentLabel": "",
            "facilities.studio.equipmentValue": "",
            "facilities.studio.partnershipLabel": "",
            "facilities.studio.partnershipValue": "",
            "facilities.studio.note": "",
          },
        });
      }
    },
    [data, updateLabs],
  );

  return (
    <div className="relative">
      {/* ✅ LabsAndClubsPage now must accept these props */}
      <LabsAndClubsPage
        editable
        onEditSection={setActiveSection}
        onDeleteSection={handleDeleteSection}
      />

      <HeroModal
        isOpen={activeSection === "hero"}
        onClose={() => setActiveSection(null)}
      />
      <HeaderModal
        isOpen={activeSection === "labs-header"}
        onClose={() => setActiveSection(null)}
      />
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

      <ClubsModal
        isOpen={activeSection === "clubs"}
        onClose={() => setActiveSection(null)}
      />
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
