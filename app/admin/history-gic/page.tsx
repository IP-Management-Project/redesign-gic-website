"use client";

import React from "react";

import HistoryPageContent, { HistorySectionKey } from "@/app/about/history/page-content";

import HistoryEntryModal from "./modals/entry-modal";
import HistoryHeroModal from "./modals/hero-modal";

export default function HistoryGicAdminPage() {
  const [activeSection, setActiveSection] = React.useState<HistorySectionKey | null>(null);

  const parsedEntryIndex =
    activeSection && activeSection.startsWith("entry-")
      ? Number(activeSection.replace("entry-", ""))
      : null;
  const entryIndex = parsedEntryIndex !== null && !Number.isNaN(parsedEntryIndex) ? parsedEntryIndex : null;

  return (
    <div className="relative">
      <HistoryPageContent editable onEditSection={setActiveSection} />
      <HistoryHeroModal isOpen={activeSection === "hero"} onClose={() => setActiveSection(null)} />
      <HistoryEntryModal
        isOpen={entryIndex !== null}
        entryIndex={entryIndex}
        onClose={() => setActiveSection(null)}
      />
    </div>
  );
}
