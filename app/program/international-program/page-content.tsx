"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Award,
  PlaneTakeoff,
  GraduationCap,
  Library,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

import AdmissionSection from "@/components/admission";
import { CurriculumSection } from "@/components/cirriculumn";
import {
  type InternationalProgramData,
  useInternationalProgramData,
} from "@/hooks/useInternationalProgramData";
import { useCurriculumManagementData } from "@/hooks/useCurriculumManagementData";

export type InternationalProgramSectionKey = "hero" | "architecture" | "partners" | "enrollment";

type InternationalProgramPageProps = {
  editable?: boolean;
  onEditSection?: (section: InternationalProgramSectionKey) => void;
};

type EditAction = {
  label: string;
  onEdit: () => void;
};

const emptyInternationalProgram: InternationalProgramData = {
  hero: { badge: "", titleMain: "", titleHighlight: "", subtitle: "" },
  architecture: {
    title: "",
    description: "",
    foundation: { title: "", description: "" },
    specialization: { title: "", description: "" },
    mobilityTitle: "",
    mobilityDescription: "",
  },
  partnersSection: { title: "", subtitle: "" },
  enrollment: {
    titleMain: "",
    titleHighlight: "",
    description: "",
    primaryCtaLabel: "",
    secondaryCtaLabel: "",
    scholarshipsLabel: "",
    duration: { label: "", value: "" },
    status: { label: "", value: "" },
  },
  partners: [],
  mobilityHighlights: [],
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function InternationalProgramPage({
  editable = false,
  onEditSection,
}: InternationalProgramPageProps) {
  const { data } = useInternationalProgramData();
  const { data: curriculumProgram } = useCurriculumManagementData("international");
  const program = data ?? emptyInternationalProgram;

  const getEditAction = (
    section: InternationalProgramSectionKey,
    label: string,
  ): EditAction | undefined =>
    editable && onEditSection
      ? {
          label,
          onEdit: () => onEditSection(section),
        }
      : undefined;

  const heroEdit = getEditAction("hero", "Edit hero");
  const architectureEdit = getEditAction("architecture", "Edit architecture");
  const partnersEdit = getEditAction("partners", "Edit partners");
  const enrollmentEdit = getEditAction("enrollment", "Edit enrollment");

  return (
    <div className="bg-white font-sans text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-gray-100 py-24 dark:border-zinc-900 md:py-32">
        {heroEdit ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-6 top-6 z-20">
              <Button size="sm" variant="flat" onPress={heroEdit.onEdit}>
                {heroEdit.label}
              </Button>
            </div>
          </div>
        ) : null}

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div
            {...fadeIn}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:border-blue-800/30 dark:bg-blue-900/20 dark:text-blue-400"
          >
            <Globe size={14} />
            {program.hero.badge}
          </motion.div>
          <h1 className="mb-8 text-5xl font-black tracking-tighter leading-[1] md:text-8xl">
            {program.hero.titleMain} <span className="text-blue-600">{program.hero.titleHighlight}</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-500 dark:text-zinc-400 md:text-xl">
            {program.hero.subtitle}
          </p>
        </div>
      </section>

      <AdmissionSection />

      {/* 2. THE DUAL-STAGE FRAMEWORK */}
      <section className="relative bg-gray-50/50 py-24 dark:bg-zinc-900/20">
        {architectureEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={architectureEdit.onEdit}>
              {architectureEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeIn}>
              <h2 className="mb-6 text-4xl font-black tracking-tighter">{program.architecture.title}</h2>
              <p className="mb-8 font-medium leading-relaxed text-slate-600 dark:text-zinc-400">
                {program.architecture.description}
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <Library size={24} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-black uppercase tracking-widest text-blue-600">
                      {program.architecture.foundation.title}
                    </h4>
                    <p className="text-xs text-slate-500">{program.architecture.foundation.description}</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-[2rem] border border-gray-100 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-black">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-black uppercase tracking-widest text-slate-900 dark:text-zinc-400">
                      {program.architecture.specialization.title}
                    </h4>
                    <p className="text-xs text-slate-500">{program.architecture.specialization.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="rounded-[3rem] bg-blue-600 p-10 text-white shadow-2xl shadow-blue-600/20"
            >
              <PlaneTakeoff size={48} className="mb-8" />
              <h3 className="mb-4 text-3xl font-black tracking-tighter">{program.architecture.mobilityTitle}</h3>
              <p className="mb-8 leading-relaxed text-blue-100">{program.architecture.mobilityDescription}</p>
              <ul className="space-y-3">
                {program.mobilityHighlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-bold">
                    <CheckCircle2 size={16} className="text-blue-200" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PARTNERSHIP GRID */}
      <section className="relative py-24">
        {partnersEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={partnersEdit.onEdit}>
              {partnersEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeIn} className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black tracking-tighter md:text-6xl">
              {program.partnersSection.title}
            </h2>
            <p className="text-slate-500 dark:text-zinc-400">{program.partnersSection.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {program.partners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="group rounded-[2.5rem] border border-gray-100 bg-gray-50 p-8 transition-all hover:border-blue-600 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <div className="mb-6 origin-left text-blue-600 transition-transform group-hover:scale-110">
                  <Award size={32} />
                </div>
                <h4 className="mb-1 text-xl font-black">{partner.name}</h4>
                <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-blue-600">
                  {partner.location}
                </p>
                <p className="text-xs text-slate-500">{partner.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ENROLLMENT & SCHOLARSHIPS */}
      <section className="relative mx-4 mb-24 overflow-hidden rounded-[3rem] bg-slate-900 py-24 text-white md:mx-6">
        {enrollmentEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={enrollmentEdit.onEdit}>
              {enrollmentEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="absolute right-0 top-0 h-96 w-96 bg-blue-600/20 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeIn}>
              <h2 className="mb-8 text-4xl font-black tracking-tighter leading-tight md:text-6xl">
                {program.enrollment.titleMain} <br />
                <span className="text-blue-500">{program.enrollment.titleHighlight}</span>
              </h2>
              <p className="mb-10 font-medium leading-relaxed text-slate-400">
                {program.enrollment.description}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="h-14 rounded-2xl bg-blue-600 px-10 font-black text-white shadow-xl shadow-blue-600/20">
                  {program.enrollment.primaryCtaLabel}
                </Button>
                <Button variant="bordered" className="h-14 rounded-2xl border-white/20 font-black text-white">
                  {program.enrollment.secondaryCtaLabel}
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              <Card className="rounded-[2rem] border-white/10 bg-white/5 p-8">
                <div className="flex items-center gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    <GraduationCap size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black">80</h4>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      {program.enrollment.scholarshipsLabel}
                    </p>
                  </div>
                </div>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <h4 className="mb-2 text-xs font-black uppercase tracking-widest text-blue-500">
                    {program.enrollment.duration.label}
                  </h4>
                  <p className="text-xl font-bold">{program.enrollment.duration.value}</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <h4 className="mb-2 text-xs font-black uppercase tracking-widest text-blue-500">
                    {program.enrollment.status.label}
                  </h4>
                  <p className="text-xl font-bold">{program.enrollment.status.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CurriculumSection data={curriculumProgram?.curriculum} legend={curriculumProgram?.legend} />
    </div>
  );
}
