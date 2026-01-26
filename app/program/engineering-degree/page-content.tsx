"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Microscope,
  Briefcase,
  Terminal,
  Cpu,
} from "lucide-react";
import { Button } from "@heroui/button";

import { CurriculumSection } from "@/components/cirriculumn";
import AdmissionSection from "@/components/admission";
import {
  type EngineeringProgramCopy,
  type EngineeringRoadmapStep,
  useEngineeringProgramCopy,
} from "@/hooks/useEngineeringProgramCopy";
import { useCurriculumManagementData } from "@/hooks/useCurriculumManagementData";

export type EngineeringProgramSectionKey = "hero" | "roadmap" | "methodology";

type EngineeringProgramPageProps = {
  editable?: boolean;
  onEditSection?: (section: EngineeringProgramSectionKey) => void;
};

type EditAction = {
  label: string;
  onEdit: () => void;
};

const emptyProgram: EngineeringProgramCopy = {
  hero: { badge: "", titleMain: "", titleHighlight: "", subtitle: "" },
  roadmap: { title: "", subtitle: "", steps: [] },
  methodology: {
    title: "",
    description: "",
    methods: [],
    researchTitle: "",
    researchDomains: [],
    downloadLabel: "",
  },
};

const roadmapIcons = [
  <BookOpen key="book" />,
  <Terminal key="terminal" />,
  <Briefcase key="briefcase" />,
  <Microscope key="microscope" />,
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function RoadmapStep({
  step,
  icon,
  isLast,
}: {
  step: EngineeringRoadmapStep;
  icon: React.ReactNode;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group flex gap-8"
    >
      <div className="flex flex-col items-center">
        <div className="z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-110">
          {icon}
        </div>
        {!isLast ? <div className="my-2 h-full w-px bg-divider" /> : null}
      </div>
      <div className="pb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
          {step.year}
        </span>
        <h3 className="mt-2 mb-4 text-2xl font-black tracking-tight">{step.title}</h3>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
          {step.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-transparent bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:border-blue-600/20 dark:bg-zinc-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MethodBox({ label, title, desc }: { label: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:border-blue-600">
      <div className="mb-2 text-2xl font-black text-blue-600">{label}</div>
      <div className="mb-2 text-xs font-black uppercase tracking-widest">{title}</div>
      <p className="text-[10px] leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}

export default function EngineeringProgramPage({
  editable = false,
  onEditSection,
}: EngineeringProgramPageProps) {
  const { data } = useEngineeringProgramCopy();
  const { data: curriculumProgram } = useCurriculumManagementData("national");
  const program = data ?? emptyProgram;

  const getEditAction = (section: EngineeringProgramSectionKey, label: string): EditAction | undefined =>
    editable && onEditSection
      ? {
          label,
          onEdit: () => onEditSection(section),
        }
      : undefined;

  const heroEdit = getEditAction("hero", "Edit hero");
  const roadmapEdit = getEditAction("roadmap", "Edit roadmap");
  const methodologyEdit = getEditAction("methodology", "Edit methodology");

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
            <Code2 size={14} />
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

      {/* 2. ENTRANCE & ELIGIBILITY SECTION */}
      <AdmissionSection />

      {/* 3. THE 5-YEAR JOURNEY ROADMAP */}
      <section className="relative py-24">
        {roadmapEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={roadmapEdit.onEdit}>
              {roadmapEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <h2 className="mb-4 text-4xl font-black tracking-tighter md:text-6xl">
              {program.roadmap.title}
            </h2>
            <p className="text-slate-500 dark:text-zinc-400">{program.roadmap.subtitle}</p>
          </motion.div>

          <div className="relative space-y-8">
            {program.roadmap.steps.map((step, index) => (
              <RoadmapStep
                key={`${step.year}-${index}`}
                step={step}
                icon={roadmapIcons[index] ?? roadmapIcons[roadmapIcons.length - 1]}
                isLast={index === program.roadmap.steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CURRICULUM METHODOLOGY */}
      <section className="relative mx-4 overflow-hidden rounded-[3rem] bg-slate-900 py-24 text-white md:mx-6">
        {methodologyEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={methodologyEdit.onEdit}>
              {methodologyEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeIn}>
              <h2 className="mb-8 text-4xl font-black tracking-tighter">{program.methodology.title}</h2>
              <p className="mb-10 leading-relaxed text-slate-400">{program.methodology.description}</p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {program.methodology.methods.map((method) => (
                  <MethodBox key={`${method.label}-${method.title}`} {...method} />
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="rounded-3xl border border-white/10 bg-white/5 p-10">
              <h4 className="mb-6 flex items-center gap-2 text-xl font-black">
                <Cpu className="text-blue-500" /> {program.methodology.researchTitle}
              </h4>
              <ul className="space-y-4">
                {program.methodology.researchDomains.map((domain) => (
                  <li
                    key={domain}
                    className="flex items-center justify-between border-b border-white/5 pb-2 font-bold text-slate-300"
                  >
                    {domain} <span className="text-xs text-blue-500">5th Year Focus</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full bg-blue-600 text-white font-black" size="lg">
                {program.methodology.downloadLabel}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <CurriculumSection data={curriculumProgram?.curriculum} legend={curriculumProgram?.legend} />
    </div>
  );
}
