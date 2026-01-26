"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Beaker,
  Code2,
  FileCode2,
  Globe,
  Lightbulb,
  Microscope,
  Terminal,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";

import { useLabsPageData } from "@/hooks/useLabsPageData";

export type LabsSectionKey =
  | "hero"
  | "labs-header"
  | "featured-lab"
  | "research-portfolio"
  | "deployments"
  | `deployment-${number}`
  | `project-${number}`
  | "clubs"
  | `club-${number}`
  | "facilities-node"
  | "facilities-studio";

type LabsAndClubsPageProps = {
  editable?: boolean;
  onEditSection?: (section: LabsSectionKey) => void;
};

const defaultHero = { titleMain: "", titleHighlight: "", subtitle: "" };
const defaultHeader = { kicker: "", title: "" };
const defaultFeaturedLab = {
  name: "",
  leadLabel: "",
  leadName: "",
  leadEmail: "",
  badgeLabel: "",
  visionLabel: "",
  visionQuote: "",
  interestsLabel: "",
  applicationsLabel: "",
  repositoryLabel: "",
  repositoryHref: "",
};
const defaultResearchPortfolio = { title: "", description: "" };
const defaultDeployments = { title: "", items: [] as Array<{ name: string; status: string }>, ctaLabel: "" };
const defaultClubsCopy = { titleMain: "", titleHighlight: "", description: "", ctaLabel: "" };
const defaultFacilities = {
  nodeHub: {
    kicker: "",
    titleMain: "",
    titleHighlight: "",
    description: "",
    image: "",
    footnote: "",
  },
  studio: {
    title: "",
    description: "",
    equipmentLabel: "",
    equipmentValue: "",
    partnershipLabel: "",
    partnershipValue: "",
    note: "",
  },
};

export default function LabsAndClubsPage({ editable = false, onEditSection }: LabsAndClubsPageProps) {
  const { data } = useLabsPageData();
  const hero = data?.hero ?? defaultHero;
  const labsHeader = data?.labsHeader ?? defaultHeader;
  const featuredLab = data?.featuredLab ?? defaultFeaturedLab;
  const researchPortfolio = data?.researchPortfolio ?? defaultResearchPortfolio;
  const deployments = data?.deployments ?? defaultDeployments;
  const clubsCopy = data?.clubsCopy ?? defaultClubsCopy;
  const facilities = data?.facilities ?? defaultFacilities;
  const projects = data?.projects ?? [];
  const clubs = data?.clubs ?? [];
  const researchInterests = data?.researchInterests ?? [];
  const expectedApplications = data?.expectedApplications ?? [];

  const clubIcons = {
    code: <Code2 />,
    terminal: <Terminal />,
    lightbulb: <Lightbulb />,
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const getEditAction = (section: LabsSectionKey) =>
    editable && onEditSection ? () => onEditSection(section) : undefined;

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      {/* 1. HERO SECTION */}
      <section className="py-24 border-b border-gray-100 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-900/10 relative">
        {editable ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-6 top-6 z-20">
              <Button size="sm" variant="flat" onPress={getEditAction("hero")}>
                Edit hero
              </Button>
            </div>
          </div>
        ) : null}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 {...fadeIn} className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]">
            {hero.titleMain} <span className="text-blue-600">{hero.titleHighlight}</span>
          </motion.h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. RESEARCH LABORATORIES */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <motion.div {...fadeIn} className="mb-16 relative">
            {editable ? (
              <div className="mb-6 flex justify-end">
                <Button size="sm" variant="flat" onPress={getEditAction("labs-header")}>
                  Edit header
                </Button>
              </div>
            ) : null}
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600">
                <Beaker size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">{labsHeader.kicker}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">{labsHeader.title}</h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* 1. THE FEATURED LAB */}
            <motion.div {...fadeIn} className="lg:col-span-8 relative">
              {editable ? (
                <div className="mb-4 flex justify-end">
                  <Button size="sm" variant="flat" onPress={getEditAction("featured-lab")}>
                    Edit featured lab
                  </Button>
                </div>
              ) : null}
              <Card className="p-10 md:p-14 rounded-[3.5rem] bg-zinc-900 text-white border-none relative overflow-hidden h-full shadow-2xl">
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                        <Globe size={32} />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight">{featuredLab.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                            {featuredLab.leadLabel} {featuredLab.leadName}
                          </span>
                          <div className="h-1 w-1 rounded-full bg-zinc-700" />
                          <span className="text-zinc-500 text-xs font-medium italic">{featuredLab.leadEmail}</span>
                        </div>
                      </div>
                    </div>
                    <Chip color="primary" variant="flat" className="font-bold border-none bg-blue-600/20 text-blue-400">
                      {featuredLab.badgeLabel}
                    </Chip>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">
                        {featuredLab.visionLabel}
                      </h4>
                      <p className="text-2xl font-black leading-tight mb-8">"{featuredLab.visionQuote}"</p>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">
                          {featuredLab.interestsLabel}
                        </h4>
                        {researchInterests.map((interest) => (
                          <div key={interest} className="flex items-center gap-3 text-sm font-bold text-zinc-300">
                            <Zap size={14} className="text-blue-500" /> {interest}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6 text-center">
                          {featuredLab.applicationsLabel}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {expectedApplications.map((app) => (
                            <div
                              key={app}
                              className="p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-center uppercase tracking-widest hover:bg-blue-600 transition-colors cursor-default"
                            >
                              {app}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="light"
                        className="text-white font-black mt-8 w-full border border-white/10 h-14 rounded-2xl group"
                        href={featuredLab.repositoryHref}
                      >
                        {featuredLab.repositoryLabel}{" "}
                        <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-50 pointer-events-none" />
              </Card>
            </motion.div>

            {/* 2. PROJECT TIMELINE GRID */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20 flex flex-col justify-center h-full relative">
                {editable ? (
                  <div className="mb-4 flex justify-end">
                    <Button size="sm" variant="flat" onPress={getEditAction("research-portfolio")}>
                      Edit portfolio
                    </Button>
                  </div>
                ) : null}
                <Microscope size={40} className="mb-6 opacity-80" />
                <h3 className="text-2xl font-black tracking-tight mb-4">{researchPortfolio.title}</h3>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">{researchPortfolio.description}</p>
              </motion.div>

              <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="h-full">
                <Card className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 h-full flex flex-col justify-between shadow-none">
                  <div className="space-y-6">
                    {editable ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="flat" onPress={getEditAction("deployments")}>
                          Edit deployments
                        </Button>
                      </div>
                    ) : null}
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">{deployments.title}</h4>
                    <div className="space-y-4">
                      {deployments.items.map((item, index) => {
                        const isActive = item.status.toUpperCase().includes("ACTIVE");
                        const chipClass = isActive
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-blue-500/10 text-blue-500";

                        return (
                          <div key={`${item.name}-${index}`} className="space-y-2">
                            {editable ? (
                              <div className="flex justify-end">
                                <Button size="sm" variant="flat" onPress={getEditAction(`deployment-${index}`)}>
                                  Edit item {index + 1}
                                </Button>
                              </div>
                            ) : null}
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-divider">
                              <span className="text-xs font-bold">{item.name}</span>
                              <Chip size="sm" className={`${chipClass} font-bold border-none`}>
                                {item.status}
                              </Chip>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <Button className="w-full mt-8 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-black h-14 rounded-2xl">
                    {deployments.ctaLabel}
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* 3. CURRENT PROJECTS LIST */}
          <div className="mt-12">
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${index}`}
                  {...fadeIn}
                  transition={{ delay: 0.1 * index }}
                  className="p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 hover:border-blue-600/30 transition-all group relative"
                >
                  {editable ? (
                    <div className="mb-4 flex justify-end">
                      <Button size="sm" variant="flat" onPress={getEditAction(`project-${index}`)}>
                        Edit project {index + 1}
                      </Button>
                    </div>
                  ) : null}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileCode2 size={24} />
                    </div>
                    <span className="text-[10px] font-black text-zinc-400 group-hover:text-blue-500 transition-colors uppercase tracking-widest">
                      {project.period}
                    </span>
                  </div>
                  <h4 className="text-xs font-black uppercase text-blue-600 mb-2 tracking-widest">{project.title}</h4>
                  <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                    {project.topic}
                  </h3>
                  <Divider className="my-6 opacity-50" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                      Funded: {project.funder}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STUDENT CLUBS & COMMUNITY */}
      <section className="py-24 bg-zinc-950 text-white rounded-[3rem] mx-4 md:mx-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div {...fadeIn} className="lg:w-1/3 text-center lg:text-left">
              {editable ? (
                <div className="mb-6 flex justify-center lg:justify-start">
                  <Button size="sm" variant="flat" onPress={getEditAction("clubs")}>
                    Edit clubs copy
                  </Button>
                </div>
              ) : null}
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-zinc-950 mb-8 mx-auto lg:mx-0 shadow-xl">
                <Users size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                {clubsCopy.titleMain} <br />
                <span className="text-blue-500">{clubsCopy.titleHighlight}</span>
              </h2>
              <p className="text-slate-400 font-medium">{clubsCopy.description}</p>
            </motion.div>

            <motion.div {...fadeIn} className="lg:w-2/3 grid sm:grid-cols-1 gap-4 w-full">
              {clubs.map((club, index) => (
                <div
                  key={`${club.name}-${index}`}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all flex flex-col md:flex-row items-center gap-8 group"
                >
                  <div className={`w-14 h-14 shrink-0 rounded-2xl ${club.color} flex items-center justify-center text-white shadow-lg`}>
                    {clubIcons[club.icon]}
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h4 className="text-xl font-bold mb-1">{club.name}</h4>
                    <p className="text-sm text-slate-400">{club.desc}</p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    {editable ? (
                      <Button size="sm" variant="flat" onPress={getEditAction(`club-${index}`)}>
                        Edit club {index + 1}
                      </Button>
                    ) : null}
                    <Button variant="light" className="text-white font-bold group-hover:text-blue-500">
                      {clubsCopy.ctaLabel} <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. LAB FACILITIES SHOWCASE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* PHYSICAL SERVER CENTER */}
            <motion.div {...fadeIn} className="relative group">
              {editable ? (
                <div className="mb-4 flex justify-end">
                  <Button size="sm" variant="flat" onPress={getEditAction("facilities-node")}>
                    Edit node hub
                  </Button>
                </div>
              ) : null}
              <div className="p-12 h-full rounded-[3.5rem] bg-slate-900 text-white overflow-hidden flex flex-col justify-between border border-white/5">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {facilities.nodeHub.kicker}
                    </span>
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tighter">
                    {facilities.nodeHub.titleMain} <span className="text-blue-500">{facilities.nodeHub.titleHighlight}</span>
                  </h3>
                  <p className="text-slate-400 mb-8 leading-relaxed font-medium">{facilities.nodeHub.description}</p>
                </div>

                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <img
                    src={facilities.nodeHub.image}
                    className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt="GIC Server Center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-white">
                    <span className="text-[10px] font-black uppercase tracking-widest">{facilities.nodeHub.footnote}</span>
                    <ArrowUpRight size={18} className="text-blue-500" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* E-LEARNING DEVELOPMENT STUDIO */}
            <motion.div {...fadeIn} className="relative h-full flex flex-col">
              {editable ? (
                <div className="mb-4 flex justify-end">
                  <Button size="sm" variant="flat" onPress={getEditAction("facilities-studio")}>
                    Edit studio
                  </Button>
                </div>
              ) : null}
              <div className="p-12 h-full rounded-[3.5rem] bg-blue-600 text-white flex flex-col justify-between shadow-2xl shadow-blue-600/20">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                    <Video size={28} />
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tight">{facilities.studio.title}</h3>
                  <p className="text-blue-100 mb-10 leading-relaxed font-medium">{facilities.studio.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20">
                      <span className="text-[10px] font-black uppercase text-blue-200">{facilities.studio.equipmentLabel}</span>
                      <p className="text-lg font-bold">{facilities.studio.equipmentValue}</p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20">
                      <span className="text-[10px] font-black uppercase text-blue-200">{facilities.studio.partnershipLabel}</span>
                      <p className="text-lg font-bold">{facilities.studio.partnershipValue}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex items-center gap-4 p-5 rounded-2xl bg-black/10 border border-white/10">
                  <div className="w-3 h-3 rounded-full bg-blue-300" />
                  <p className="text-xs font-bold uppercase tracking-widest">{facilities.studio.note}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
