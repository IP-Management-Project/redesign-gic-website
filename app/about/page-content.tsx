"use client";

import React from "react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import {
  Globe,
  History,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  type MissionVisionIconKey,
  useMissionVisionCopy,
} from "@/hooks/useMissionVisionCopy";

export type MissionVisionSectionKey = "hero" | "about" | "mission" | "vision";

type MissionVisionContentProps = {
  editable?: boolean;
  onEditSection?: (section: MissionVisionSectionKey) => void;
};

type EditAction = {
  label: string;
  onEdit: () => void;
};

const visionIcons: Record<MissionVisionIconKey, React.ReactNode> = {
  users: <Users size={20} />,
  trending: <TrendingUp size={20} />,
  globe: <Globe size={20} />,
  lightbulb: <Lightbulb size={20} />,
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function PageContent({ editable = false, onEditSection }: MissionVisionContentProps) {
  const { data } = useMissionVisionCopy();

  const getEditAction = (section: MissionVisionSectionKey, label: string): EditAction | undefined =>
    editable && onEditSection
      ? {
          label,
          onEdit: () => onEditSection(section),
        }
      : undefined;

  const heroEdit = getEditAction("hero", "Edit hero");
  const aboutEdit = getEditAction("about", "Edit about");
  const missionEdit = getEditAction("mission", "Edit mission");
  const visionEdit = getEditAction("vision", "Edit vision");

  const hero = data?.hero;
  const about = data?.about;
  const mission = data?.mission;
  const vision = data?.vision;
  const visionPoints = data?.visionPoints ?? [];

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

        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2">
          <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl dark:bg-blue-900/10" />
          <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-indigo-50 blur-3xl dark:bg-indigo-900/10" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.div
            {...fadeIn}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:border-blue-800/30 dark:bg-blue-900/20 dark:text-blue-400"
          >
            <Target size={14} />
            {hero?.badge}
          </motion.div>
          <motion.h1
            {...fadeIn}
            className="mb-8 text-5xl font-black tracking-tighter leading-[1.1] md:text-7xl"
          >
            {hero?.titleMain} <span className="text-blue-600">{hero?.titleHighlight}</span>
          </motion.h1>
          <motion.p
            {...fadeIn}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-zinc-400 md:text-xl"
          >
            {hero?.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. WHO WE ARE (The Core Identity) */}
      <section className="relative border-b border-gray-100 py-24 dark:border-zinc-900">
        {aboutEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={aboutEdit.onEdit}>
              {aboutEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-start">
            <motion.div {...fadeIn} className="lg:col-span-5">
              <div className="mb-6 inline-flex rounded-2xl bg-blue-600 p-3 text-white">
                <History size={28} />
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-tighter">{about?.title}</h2>
              <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-zinc-400">
                {about?.descriptionBefore}{" "}
                <span className="font-bold italic text-slate-900 dark:text-white">
                  {about?.departmentName}
                </span>{" "}
                {about?.descriptionAfter}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MISSION SECTION */}
      <section className="relative bg-gray-50/50 py-24 dark:bg-zinc-900/20">
        {missionEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={missionEdit.onEdit}>
              {missionEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div {...fadeIn}>
              <h2 className="mb-6 text-3xl font-black tracking-tighter md:text-5xl">
                {mission?.title}
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-zinc-400">
                <p>
                  {mission?.bodyBefore}{" "}
                  <span className="font-bold text-slate-900 dark:text-white">
                    {mission?.bodyHighlight}
                  </span>{" "}
                  {mission?.bodyAfter}
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div className="rounded-[2.5rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-600/20">
                <div className="mb-4">
                  <Target size={32} />
                </div>
                <h4 className="mb-2 text-xl font-bold">{mission?.hardSkillsTitle}</h4>
                <p className="text-sm text-blue-100">
                  {mission?.hardSkillsDesc}
                </p>
              </div>
              <div className="mt-0 rounded-[2.5rem] border border-gray-100 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 sm:mt-8">
                <div className="mb-4 text-blue-600">
                  <Users size={32} />
                </div>
                <h4 className="mb-2 text-xl font-bold">{mission?.softSkillsTitle}</h4>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  {mission?.softSkillsDesc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VISION SECTION */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {visionEdit ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={visionEdit.onEdit}>
              {visionEdit.label}
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <motion.div {...fadeIn} className="lg:w-1/3">
              <h2 className="mb-6 text-4xl font-black tracking-tighter leading-tight md:text-6xl">
                {vision?.titleMain} <br />
                <span className="text-blue-600">{vision?.titleHighlight}</span>
              </h2>
              <p className="font-medium leading-relaxed text-slate-500 dark:text-zinc-400">
                {vision?.description}
              </p>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="grid gap-6 sm:grid-cols-2 lg:w-2/3"
            >
              {visionPoints.map((point, index) => (
                <div
                  key={`${point.text}-${index}`}
                  className="group rounded-[2.5rem] border border-transparent bg-gray-50 p-10 transition-all hover:border-blue-600/20 dark:bg-zinc-900/50"
                >
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-blue-600 transition-transform group-hover:scale-110 dark:border-zinc-700 dark:bg-zinc-800">
                    {visionIcons[point.icon]}
                  </div>
                  <p className="text-lg font-black leading-tight text-slate-900 dark:text-white">
                    {point.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
