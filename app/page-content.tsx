"use client";

import React from "react";

import { useHomePageCopy } from "@/hooks/useHomePageCopy";

import FinalCTA from "@/components/landing/cta";
import HeroSection from "@/components/landing/hero";
import StatsSection from "@/components/landing/stats";
import PillarsSection from "@/components/landing/pillar";
import PartnerSection from "@/components/landing/partner";
import CareersSection from "@/components/landing/carrers";
import PressReleaseSlideshow from "@/components/landing/event";
import FacultySlideshowFull from "@/components/landing/lecturers";
import ResearchShowcase from "@/components/landing/research-showcase";

/**
 * NOTES (professional polish)
 * - Cleaner spacing + typographic rhythm
 * - Reduced “neon / gimmick” effects; keeps subtle brand gradients
 * - Consistent section headers, max widths, and subdued backgrounds
 * - Adds University Partners section (logos + partner pathways)
 * - Removes dynamic Tailwind class `bg-${color}` (won’t compile in production)
 */

// const section = "py-20 md:py-28";
// const container = "max-w-7xl mx-auto px-6";

export type LandingSectionKey =
  | "hero"
  | "stats"
  | "pillars"
  | "faculty"
  | "partners"
  | "careers"
  | "research"
  | "events"
  | "cta";

type HomePageContentProps = {
  editable?: boolean;
  onEditSection?: (section: LandingSectionKey) => void;
};

export default function Home({ editable = false, onEditSection }: HomePageContentProps) {
  const locale = "en";

  const { data: homeCopy } = useHomePageCopy();
  const dict =
    homeCopy?.dict ??
    ({
      t: { facultyKicker: "", facultyTitle: "", facultyDesc: "" },
      event: { newsKicker: "", newsTitle: "", newsDesc: "" },
      carrer: { careersKicker: "", careersTitle: "", careersDesc: "", careersNote: "" },
      stats: { statsKicker: "", statsTitle: "", statsDesc: "" },
      research: { researchKicker: "", researchTitle: "", researchDesc: "" },
      pillars: { pillarsKicker: "", pillarsTitle: "", pillarsDesc: "", pillarsCtaLabel: "" },
      partnersKicker: "",
      partnersTitle: "",
      partnersDesc: "",
    } as const);
  const t =
    homeCopy?.locales[locale] ??
    ({
      chip: "",
      heroTitle1: "",
      heroTitle2: "",
      heroSubtitle: "",
      cta1: "",
      cta2: "",
      trust: "",
      statsKicker: "",
      statsTitle: "",
      statsDesc: "",
      pillarsKicker: "",
      pillarsTitle: "",
      pillarsDesc: "",
      researchKicker: "",
      researchTitle: "",
      researchDesc: "",
      partnersKicker: "",
      partnersTitle: "",
      partnersDesc: "",
      facultyKicker: "",
      facultyTitle: "",
      mobilityKicker: "",
      mobilityTitle: "",
      careersKicker: "",
      careersTitle: "",
      eventsKicker: "",
      eventsTitle: "",
      finalTitle: "",
      finalDesc: "",
      apply: "",
      footerNote: "",
    } as const);
  const hero =
    homeCopy?.hero ??
    ({
      backgroundImage: "",
      logoText: "",
      discoverLabel: "",
    } as const);
  const statsItems = homeCopy?.statsItems ?? [];
  const pillars = homeCopy?.pillars ?? [];
  const partners = homeCopy?.partners ?? {
    feature: { image: "", kicker: "", title: "", desc: "" },
    stats: [],
    regions: [],
    affiliationsLabel: "",
    pathways: [],
    partners: [],
  };
  const careers = homeCopy?.careers ?? { partners: [], roles: [] };
  const researchShowcase = homeCopy?.researchShowcase ?? {
    hero: { image: "", chip: "", title: "", desc: "", ctaLabel: "", ctaHref: "" },
    featured: { image: "", title: "", alt: "" },
    labs: [],
    impact: { kicker: "", title: "", desc: "", ctaLabel: "", ctaHref: "" },
    stats: [],
  };
  const finalCta = homeCopy?.finalCta ?? { kicker: "", buttonHref: "" };

  const getEditAction = (section: LandingSectionKey, label: string) =>
    editable && onEditSection
      ? {
          label,
          onEdit: () => onEditSection(section),
        }
      : undefined;

  // const x = useMotionValue(0);
  // const y = useMotionValue(0);
  // const rotateX = useTransform(y, [-100, 100], [10, -10]);
  // const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
  //   const rect = event.currentTarget.getBoundingClientRect();
  //   x.set(event.clientX - rect.left - rect.width / 2);
  //   y.set(event.clientY - rect.top - rect.height / 2);
  // }
  return (
    <div className="relative overflow-hidden bg-background">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] left-[-12%] h-[420px] w-[420px] rounded-full bg-blue-600/5 blur-[110px]" />
      </div>

      {/* HERO */}
      <HeroSection t={t} hero={hero} editAction={getEditAction("hero", "Edit hero")} />

      {/* STATS */}
      <StatsSection
        t={dict.stats}
        statsItems={statsItems}
        section="my-20"
        container="max-w-7xl mx-auto px-6"
        editAction={getEditAction("stats", "Edit stats")}
      />

      {/* PROGRAM PILLARS */}
      <PillarsSection
        t={dict.pillars}
        pillars={pillars}
        section="mb-20 "
        container="max-w-7xl mx-auto px-6"
        editAction={getEditAction("pillars", "Edit pillars")}
      />

      {/* FACULTY (kept, but cleaner) */}
      <FacultySlideshowFull
        t={dict.t}
        section="mb-20"
        container="max-w-7xl mx-auto px-6"
        editAction={getEditAction("faculty", "Edit faculty")}
      />

      {/* NEW: UNIVERSITY PARTNERS */}
      <PartnerSection
        t={dict}
        partners={partners}
        section="mb-20"
        container="max-w-7xl"
        editAction={getEditAction("partners", "Edit partners")}
      />

      {/* CAREERS / PARTNERS (more restrained) */}
      <CareersSection
        t={dict.carrer}
        data={careers}
        section="bg-red-500"
        container="max-w-7xl mx-auto px-6"
        editAction={getEditAction("careers", "Edit careers")}
      />

      {/* RESEARCH (professional bento but calmer) */}
      <ResearchShowcase
        t={dict.research}
        data={researchShowcase}
        section="mb- 0"
        container="max-w-7xl mx-auto px-6"
        editAction={getEditAction("research", "Edit research")}
      />

      {/* EVENTS */}
      <PressReleaseSlideshow
        t={dict.event}
        section=""
        container="max-w-7xl mx-auto px-6"
        editAction={getEditAction("events", "Edit events")}
      />

      {/* FINAL CTA */}
      <FinalCTA
        t={t}
        data={finalCta}
        container="max-w-7xl pb-10 mx-auto px-6"
        editAction={getEditAction("cta", "Edit final CTA")}
      />
    </div>
  );
}
