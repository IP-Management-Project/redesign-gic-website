"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Settings,
  Cpu,
  Users,
  ShieldCheck,
  Code2,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { Button } from "@heroui/button";

import { CurriculumSection } from "@/components/cirriculumn";
import {
  type AssociateProgramCopy,
  useAssociateDegreeCopy,
} from "@/hooks/useAssociateDegreeCopy";
import { useCurriculumManagementData } from "@/hooks/useCurriculumManagementData";

export type AssociateProgramSectionKey =
  | "hero"
  | "admission"
  | "identity"
  | "industry"
  | "careers";

type AssociateDegreePageProps = {
  editable?: boolean;
  onEditSection?: (section: AssociateProgramSectionKey) => void;
};

type EditAction = {
  label: string;
  onEdit: () => void;
};

const emptyAssociateProgram: AssociateProgramCopy = {
  hero: { badge: "", titleMain: "", titleHighlight: "", subtitle: "" },
  admission: { title: "", description: "" },
  identity: { title: "", paragraph1: "", paragraph2: "", features: [] },
  industry: { title: "", subtitle: "", sectors: [] },
  careers: { title: "", description: "", tags: [], bullets: [] },
};

const featureIcons = [<Cpu key="cpu" size={32} />, <Users key="users" size={32} />];
const sectorIcons = [
  <Code2 key="code" />,
  <Settings key="settings" />,
  <Cpu key="cpu" />,
  <ShieldCheck key="shield" />,
  <Briefcase key="briefcase" />,
  <Users key="users" />,
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AssociateDegreePage({ editable = false, onEditSection }: AssociateDegreePageProps) {
  const { data } = useAssociateDegreeCopy();
  const { data: curriculumProgram } = useCurriculumManagementData("associate");
  const program = data ?? emptyAssociateProgram;

  const getEditAction = (section: AssociateProgramSectionKey, label: string): EditAction | undefined =>
    editable && onEditSection
      ? {
          label,
          onEdit: () => onEditSection(section),
        }
      : undefined;

  const heroEdit = getEditAction("hero", "Edit hero");
  const admissionEdit = getEditAction("admission", "Edit admission");
  const identityEdit = getEditAction("identity", "Edit identity");
  const industryEdit = getEditAction("industry", "Edit industry");
  const careersEdit = getEditAction("careers", "Edit careers");

  return (
    <div className="bg-white font-sans text-slate-900 selection:bg-blue-100 dark:bg-zinc-950 dark:text-zinc-100">
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
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:border-emerald-800/30 dark:bg-emerald-900/20 dark:text-emerald-400"
          >
            <Terminal size={14} />
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

      {/* 2. ADMISSION STATUS (DIRECT ENROLLMENT) */}
      <section className="relative bg-blue-600 py-12 text-white">
        {admissionEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={admissionEdit.onEdit}>
              {admissionEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
                <CheckCircle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">{program.admission.title}</h2>
                <p className="text-sm text-blue-100">{program.admission.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE IDENTITY & HISTORY */}
      <section className="relative border-b border-gray-100 py-24 dark:border-zinc-900">
        {identityEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={identityEdit.onEdit}>
              {identityEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeIn}>
              <h2 className="mb-6 text-4xl font-black tracking-tighter">{program.identity.title}</h2>
              <p className="mb-6 leading-relaxed text-slate-600 dark:text-zinc-400">{program.identity.paragraph1}</p>
              <p className="font-medium leading-relaxed text-slate-600 dark:text-zinc-400">
                {program.identity.paragraph2}
              </p>
            </motion.div>

            <motion.div {...fadeIn} className="grid grid-cols-2 gap-4">
              {program.identity.features.map((feature, index) => (
                <div
                  key={`${feature.title}-${index}`}
                  className="rounded-[2rem] border border-transparent bg-gray-50 p-8 transition-all hover:border-blue-600/20 dark:bg-zinc-900"
                >
                  <div className="mb-4 text-blue-600">{featureIcons[index] ?? featureIcons[0]}</div>
                  <h4 className="mb-2 text-sm font-black uppercase">{feature.title}</h4>
                  <p className="text-xs text-slate-500">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL SPECIALIZATIONS */}
      <section className="relative mx-4 overflow-hidden rounded-[3rem] bg-slate-900 py-24 text-white md:mx-6">
        {industryEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={industryEdit.onEdit}>
              {industryEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div {...fadeIn} className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black tracking-tighter md:text-6xl">{program.industry.title}</h2>
            <p className="mx-auto max-w-2xl text-slate-400">{program.industry.subtitle}</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {program.industry.sectors.map((sector, index) => (
              <div
                key={`${sector.title}-${index}`}
                className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-10 transition-all hover:border-blue-500"
              >
                <div className="mb-6 origin-left text-blue-500 transition-transform group-hover:scale-110">
                  {sectorIcons[index] ?? sectorIcons[0]}
                </div>
                <h4 className="text-xl font-bold">{sector.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAREER IMPACT */}
      <section className="relative py-24">
        {careersEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={careersEdit.onEdit}>
              {careersEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <motion.div {...fadeIn} className="lg:w-1/2">
              <h2 className="mb-6 text-4xl font-black tracking-tighter">{program.careers.title}</h2>
              <p className="mb-6 leading-relaxed text-slate-600 dark:text-zinc-400">{program.careers.description}</p>
              <div className="flex flex-wrap gap-3">
                {program.careers.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:border-blue-800/30 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              {...fadeIn}
              className="relative rounded-[3rem] bg-gray-100 p-8 dark:bg-zinc-900 lg:w-1/2"
            >
              <div className="space-y-4">
                {program.careers.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <p className="text-sm font-bold">{bullet}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CurriculumSection data={curriculumProgram?.curriculum} legend={curriculumProgram?.legend} />
    </div>
  );
}
