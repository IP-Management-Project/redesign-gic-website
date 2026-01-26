"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  ShieldCheck,
  Search,
  BrainCircuit,
  Calendar,
  FileText,
  Mail,
  Smartphone,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { CurriculumSection } from "@/components/cirriculumn";
import {
  type MasterDegreeData,
  useMasterDegreeData,
} from "@/hooks/useMasterDegreeData";

export type MasterDegreeSectionKey =
  | "hero"
  | "overview"
  | "career"
  | "framework"
  | "eligibility"
  | "curriculum"
  | "coordinator";

type MasterDegreePageProps = {
  editable?: boolean;
  onEditSection?: (section: MasterDegreeSectionKey) => void;
};

type EditAction = {
  label: string;
  onEdit: () => void;
};

const emptyMasterDegree: MasterDegreeData = {
  hero: { badge: "", titleMain: "", titleHighlight: "", subtitle: "" },
  overview: { title: "", description: "", highlights: [] },
  career: { title: "", description: "", tags: [] },
  framework: { title: "", description: "" },
  eligibility: {
    title: "",
    cards: [],
    applyTitle: "",
    deadlineLabel: "",
    deadlineValue: "",
    submissionLabel: "",
    submissionValue: "",
    downloadLabel: "",
  },
  coordinator: {
    title: "",
    contacts: { email: "", phone: "" },
  },
  curriculumSection: { title: "", description: "" },
  curriculum: {},
  courseTypes: [],
};

const iconMap = {
  brain: <BrainCircuit />,
  cpu: <Cpu />,
  search: <Search />,
} as const;

const highlightIcons = [
  <ShieldCheck key="shield" className="text-blue-600 shrink-0" size={24} />,
  <Cpu key="cpu" className="text-blue-600 shrink-0" size={24} />,
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function MasterDegreePage({ editable = false, onEditSection }: MasterDegreePageProps) {
  const { data } = useMasterDegreeData();
  const program = data ?? emptyMasterDegree;

  const getEditAction = (section: MasterDegreeSectionKey, label: string): EditAction | undefined =>
    editable && onEditSection
      ? {
          label,
          onEdit: () => onEditSection(section),
        }
      : undefined;

  const heroEdit = getEditAction("hero", "Edit hero");
  const overviewEdit = getEditAction("overview", "Edit overview");
  const careerEdit = getEditAction("career", "Edit careers");
  const frameworkEdit = getEditAction("framework", "Edit framework");
  const eligibilityEdit = getEditAction("eligibility", "Edit eligibility");
  const curriculumEdit = getEditAction("curriculum", "Edit curriculum section");
  const coordinatorEdit = getEditAction("coordinator", "Edit coordinator");

  return (
    <div className="bg-white font-sans text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-slate-50 py-24 dark:border-zinc-900 dark:bg-zinc-900/10 md:py-32">
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
            <GraduationCap size={14} />
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

      {/* 2. PROGRAM OVERVIEW */}
      <section className="relative py-24">
        {overviewEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={overviewEdit.onEdit}>
              {overviewEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeIn}>
              <h2 className="mb-6 text-4xl font-black tracking-tighter">{program.overview.title}</h2>
              <p className="mb-6 leading-relaxed text-slate-600 dark:text-zinc-400">
                {program.overview.description}
              </p>
              <div className="space-y-4">
                {program.overview.highlights.map((highlight, index) => (
                  <div
                    key={`${highlight.text}-${index}`}
                    className="flex gap-4 rounded-2xl border border-transparent bg-gray-50 p-5 transition-all hover:border-blue-600/20 dark:bg-zinc-900"
                  >
                    {highlightIcons[index] ?? highlightIcons[0]}
                    <p className="text-sm font-bold">{highlight.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="grid grid-cols-1 gap-4">
              {careerEdit ? (
                <div className="flex justify-end">
                  <Button size="sm" variant="flat" onPress={careerEdit.onEdit}>
                    {careerEdit.label}
                  </Button>
                </div>
              ) : null}
              <Card className="rounded-[2.5rem] border-none bg-slate-900 p-8 text-white">
                <h3 className="mb-4 text-2xl font-black">{program.career.title}</h3>
                <p className="mb-6 text-sm text-slate-400">{program.career.description}</p>
                <Divider className="mb-6 bg-white/10" />
                <div className="flex flex-wrap gap-2">
                  {program.career.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CURRICULUM GRID */}
      <section className="relative mx-4 rounded-[3rem] bg-gray-50/50 py-24 dark:bg-zinc-900/20 md:mx-6">
        {frameworkEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={frameworkEdit.onEdit}>
              {frameworkEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeIn} className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black tracking-tighter md:text-6xl">
              {program.framework.title}
            </h2>
            <p className="text-slate-500">{program.framework.description}</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {program.courseTypes.map((type, index) => (
              <motion.div
                key={`${type.title}-${index}`}
                {...fadeIn}
                className="rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                  {iconMap[type.icon]}
                </div>
                <h4 className="mb-6 text-xl font-black">{type.title}</h4>
                <ul className="space-y-3">
                  {type.courses.map((course) => (
                    <li
                      key={course}
                      className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400"
                    >
                      <ChevronRight size={14} className="text-blue-600" /> {course}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ELIGIBILITY & APPLY */}
      <section className="relative py-24">
        {eligibilityEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={eligibilityEdit.onEdit}>
              {eligibilityEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-12">
            <motion.div {...fadeIn} className="lg:col-span-7">
              <h2 className="mb-8 text-4xl font-black tracking-tighter">{program.eligibility.title}</h2>
              <div className="space-y-6">
                {program.eligibility.cards.map((card, index) => (
                  <div key={`${card.title}-${index}`} className="rounded-[2rem] border border-gray-100 p-8 dark:border-zinc-800">
                    <h4 className="mb-2 text-xs font-black uppercase tracking-widest text-blue-600">
                      {card.title}
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                      {card.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="rounded-[3rem] bg-blue-600 p-10 text-white lg:col-span-5">
              <h3 className="mb-6 text-3xl font-black">{program.eligibility.applyTitle}</h3>
              <div className="mb-10 space-y-6">
                <div className="flex gap-4">
                  <Calendar className="shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-blue-200">{program.eligibility.deadlineLabel}</p>
                    <p className="font-bold">{program.eligibility.deadlineValue}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FileText className="shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-blue-200">{program.eligibility.submissionLabel}</p>
                    <p className="font-bold">{program.eligibility.submissionValue}</p>
                  </div>
                </div>
              </div>
              <Button className="h-14 w-full rounded-2xl bg-white font-black text-blue-600">
                {program.eligibility.downloadLabel}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative">
        {curriculumEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={curriculumEdit.onEdit}>
              {curriculumEdit.label}
            </Button>
          </div>
        ) : null}
        <CurriculumSection
          title={program.curriculumSection.title}
          description={program.curriculumSection.description}
          data={program.curriculum}
        />
      </section>

      {/* 5. CONTACT FOOTER */}
      <section className="relative border-t border-gray-100 py-24 dark:border-zinc-900">
        {coordinatorEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={coordinatorEdit.onEdit}>
              {coordinatorEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-12 text-3xl font-black">{program.coordinator.title}</h2>
          <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-900">
                <Mail className="text-blue-600" />
              </div>
              <p className="font-bold">{program.coordinator.contacts.email}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-900">
                <Smartphone className="text-blue-600" />
              </div>
              <p className="font-bold">{program.coordinator.contacts.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
