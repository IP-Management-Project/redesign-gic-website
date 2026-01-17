"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import NextLink from "next/link";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Avatar } from "@heroui/avatar";
import { Terminal, Cpu, ArrowRight, Code } from "lucide-react";
import HeroSection from "@/components/landing/hero";
import StatsSection from "@/components/landing/stats";
import PillarsSection from "@/components/landing/pillar";
import PartnerSection from "@/components/landing/partner";
import FacultySlideshow from "@/components/landing/lecturers";
import FacultySlideshowFull from "@/components/landing/lecturers";
import CareersSection from "@/components/landing/carrers";
import EventsSlideshow from "@/components/landing/event";
import PressReleaseSlideshow from "@/components/landing/event";
import FinalCTA from "@/components/landing/cta";
import ResearchShowcase from "@/components/landing/research-showcase";
import { useHomeUniversityPartners } from "@/hooks/useHomeUniversityPartners";
import { useHomePageCopy } from "@/hooks/useHomePageCopy";
/**
 * NOTES (professional polish)
 * - Cleaner spacing + typographic rhythm
 * - Reduced “neon / gimmick” effects; keeps subtle brand gradients
 * - Consistent section headers, max widths, and subdued backgrounds
 * - Adds University Partners section (logos + partner pathways)
 * - Removes dynamic Tailwind class `bg-${color}` (won’t compile in production)
 */

const section = "py-20 md:py-28";
const container = "max-w-7xl mx-auto px-6";
function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <Card className="border-default-200 shadow-sm">
      <CardBody className="p-8">
        <div className="text-4xl font-black tracking-tight text-foreground">
          {value}
        </div>
        <div className="mt-3 text-sm font-bold uppercase tracking-wider text-default-500">
          {label}
        </div>
        <div className="mt-2 text-sm text-default-500">{helper}</div>
      </CardBody>
    </Card>
  );
}

function PillarCard({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) {
  return (
    <Card className="border-default-200 shadow-sm hover:shadow-md transition-shadow">
      <CardBody className="p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary">
            {index}
          </div>
          <div className="text-xl font-bold">{title}</div>
        </div>
        <p className="text-default-500 leading-relaxed">{desc}</p>
      </CardBody>
    </Card>
  );
}

function PartnerLogo({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-default-200 bg-background p-6 hover:bg-default-50 transition-colors">
      {/* Using Image (HeroUI) for consistency */}
      <Image
        src={src}
        alt={`${name} logo`}
        className="object-contain h-10 w-auto"
      />
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const locale = "en";
  const { data: universityPartners = [] } = useHomeUniversityPartners();

  const { data: homeCopy } = useHomePageCopy();
  const dict =
    homeCopy?.dict ??
    ({
      t: { facultyKicker: "", facultyTitle: "" },
      event: { newsKicker: "", newsTitle: "" },
      carrer: { careersKicker: "", careersTitle: "" },
      stats: { statsKicker: "", statsTitle: "", statsDesc: "" },
      research: { researchKicker: "", researchTitle: "", researchDesc: "" },
      pillars: { pillarsKicker: "", pillarsTitle: "", pillarsDesc: "" },
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }
  return (
    <div className="relative overflow-hidden bg-background">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] left-[-12%] h-[420px] w-[420px] rounded-full bg-blue-600/5 blur-[110px]" />
      </div>

      {/* HERO */}
      <HeroSection t={t} />

      {/* STATS */}
      <StatsSection
        t={dict.stats}
        section="my-20"
        container="max-w-7xl mx-auto px-6"
      />

      {/* PROGRAM PILLARS */}
      <PillarsSection
        t={dict.pillars}
        section="mb-20 " // Optional vertical spacing
        container="max-w-7xl mx-auto px-6" // Standard container
      />

      {/* FACULTY (kept, but cleaner) */}
      <FacultySlideshowFull
        t={dict.t}
        section="mb-20"
        container="max-w-7xl mx-auto px-6"
      />

      {/* NEW: UNIVERSITY PARTNERS */}
      <PartnerSection
        t={dict}
        universityPartners={universityPartners}
        section="mb-20"
        container="max-w-7xl"
      />

      {/* CAREERS / PARTNERS (more restrained) */}
      <CareersSection
        t={dict.carrer}
        section="bg-red-500" // Vertical margin
        container="max-w-7xl mx-auto px-6" // Standard container width
      />

      {/* RESEARCH (professional bento but calmer) */}
      <ResearchShowcase
        t={dict.research}
        section="mb- 0"
        container="max-w-7xl mx-auto px-6"
      />

      {/* EVENTS */}
      <PressReleaseSlideshow
        t={dict.event}
        section=""
        container="max-w-7xl mx-auto px-6"
      />

      {/* FINAL CTA */}
      <FinalCTA
        t={t}
        container="max-w-7xl pb-10 mx-auto px-6"
      />

    </div>
  );
}
