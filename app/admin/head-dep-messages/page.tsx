"use client";

import React from "react";

import CoreValueModal from "./modals/core-value-modal";
import FooterModal from "./modals/footer-modal";
import MessageModal from "./modals/message-modal";
import PortraitModal from "./modals/portrait-modal";
import SignatureModal from "./modals/signature-modal";

import HeadMessagePage, {
  type HeadMessageSectionKey,
} from "@/app/about/message/page-content";

const parseSectionIndex = (
  section: HeadMessageSectionKey | null,
  prefix: string,
) => {
  if (!section || !section.startsWith(`${prefix}-`)) return null;
  const value = Number(section.replace(`${prefix}-`, ""));

  return Number.isNaN(value) ? null : value;
};

export default function HeadDepMessagesAdminPage() {
  const [activeSection, setActiveSection] =
    React.useState<HeadMessageSectionKey | null>(null);

  const coreValueIndex = parseSectionIndex(activeSection, "core-value");

  return (
    <div className="relative">
      <HeadMessagePage editable onEditSection={setActiveSection} />

      <PortraitModal
        isOpen={activeSection === "portrait"}
        onClose={() => setActiveSection(null)}
      />
      <MessageModal
        isOpen={activeSection === "message"}
        onClose={() => setActiveSection(null)}
      />
      <CoreValueModal
        isOpen={coreValueIndex !== null}
        valueIndex={coreValueIndex}
        onClose={() => setActiveSection(null)}
      />
      <SignatureModal
        isOpen={activeSection === "signature"}
        onClose={() => setActiveSection(null)}
      />
      <FooterModal
        isOpen={activeSection === "footer"}
        onClose={() => setActiveSection(null)}
      />
    </div>
  );
}
