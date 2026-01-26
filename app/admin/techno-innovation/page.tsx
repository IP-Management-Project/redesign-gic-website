"use client";

import React from "react";

import TICShowcasePage, {
  type TicShowcaseSectionKey,
} from "@/app/project/techno-innovation-challenge/page-content";

import HubEcosystemModal from "./modals/hub-ecosystem-modal";
import HubHeroModal from "./modals/hub-hero-modal";
import HubMinistryModal from "./modals/hub-ministry-modal";
import HubObjectiveModal from "./modals/hub-objective-modal";
import HubObjectivesModal from "./modals/hub-objectives-modal";
import HubPartnerModal from "./modals/hub-partner-modal";
import HubPartnersModal from "./modals/hub-partners-modal";
import HubRoadmapModal from "./modals/hub-roadmap-modal";
import HubRoadmapStageModal from "./modals/hub-roadmap-stage-modal";
import LaunchpadModal from "./modals/launchpad-modal";
import GalleryItemModal from "./modals/gallery-item-modal";
import GalleryModal from "./modals/gallery-modal";
import HeritageModal from "./modals/heritage-modal";
import SeasonModal from "./modals/season-modal";

const parseSectionIndex = (section: TicShowcaseSectionKey | null, prefix: string) => {
  if (!section || !section.startsWith(`${prefix}-`)) return null;
  const value = Number(section.replace(`${prefix}-`, ""));
  return Number.isNaN(value) ? null : value;
};

export default function TechnoInnovationAdminPage() {
  const [activeSection, setActiveSection] = React.useState<TicShowcaseSectionKey | null>(null);

  const seasonIndex = parseSectionIndex(activeSection, "season");
  const galleryItemIndex = parseSectionIndex(activeSection, "gallery-item");
  const hubObjectiveIndex = parseSectionIndex(activeSection, "hub-objective");
  const hubPartnerIndex = parseSectionIndex(activeSection, "hub-partner");
  const hubMinistryIndex = parseSectionIndex(activeSection, "hub-ministry");
  const hubRoadmapStageIndex = parseSectionIndex(activeSection, "hub-roadmap-stage");

  return (
    <div className="relative">
      <TICShowcasePage editable onEditSection={setActiveSection} />

      <LaunchpadModal isOpen={activeSection === "launchpad"} onClose={() => setActiveSection(null)} />
      <HeritageModal isOpen={activeSection === "heritage"} onClose={() => setActiveSection(null)} />
      <SeasonModal
        isOpen={seasonIndex !== null}
        seasonIndex={seasonIndex}
        onClose={() => setActiveSection(null)}
      />
      <GalleryModal isOpen={activeSection === "gallery"} onClose={() => setActiveSection(null)} />
      <GalleryItemModal
        isOpen={galleryItemIndex !== null}
        galleryIndex={galleryItemIndex}
        onClose={() => setActiveSection(null)}
      />

      <HubHeroModal isOpen={activeSection === "hub-hero"} onClose={() => setActiveSection(null)} />
      <HubObjectivesModal
        isOpen={activeSection === "hub-objectives"}
        onClose={() => setActiveSection(null)}
      />
      <HubObjectiveModal
        isOpen={hubObjectiveIndex !== null}
        objectiveIndex={hubObjectiveIndex}
        onClose={() => setActiveSection(null)}
      />
      <HubEcosystemModal
        isOpen={activeSection === "hub-ecosystem"}
        onClose={() => setActiveSection(null)}
      />
      <HubPartnersModal
        isOpen={activeSection === "hub-partners"}
        onClose={() => setActiveSection(null)}
      />
      <HubPartnerModal
        isOpen={hubPartnerIndex !== null}
        partnerIndex={hubPartnerIndex}
        onClose={() => setActiveSection(null)}
      />
      <HubMinistryModal
        isOpen={hubMinistryIndex !== null}
        ministryIndex={hubMinistryIndex}
        onClose={() => setActiveSection(null)}
      />
      <HubRoadmapModal
        isOpen={activeSection === "hub-roadmap"}
        onClose={() => setActiveSection(null)}
      />
      <HubRoadmapStageModal
        isOpen={hubRoadmapStageIndex !== null}
        stageIndex={hubRoadmapStageIndex}
        onClose={() => setActiveSection(null)}
      />
    </div>
  );
}
