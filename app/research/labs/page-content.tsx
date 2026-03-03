"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Beaker,
  Globe,
  Code2,
  Terminal,
  Users,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  Video,
  Zap,
  Microscope,
  FileCode2,
} from "lucide-react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { useLabsPageData } from "@/hooks/useLabsPageData";
import { LabsSectionKey } from "@/app/admin/laboratory/page";

type LabsAndClubsPageProps = {
  editable?: boolean;
  onEditSection?: (section: LabsSectionKey) => void;
  onDeleteSection?: (section: LabsSectionKey) => void;
};

export default function LabsAndClubsPage({
  editable,
  onEditSection,
  onDeleteSection,
}: LabsAndClubsPageProps) {
  const { data } = useLabsPageData();
  const hero = data?.hero ?? {};
  const labsHeader = data?.labsHeader ?? {};
  const featuredLab = data?.featuredLab ?? {};
  const researchPortfolio = data?.researchPortfolio ?? {};
  const deployments = data?.deployments ?? { items: [] };
  const clubsCopy = data?.clubsCopy ?? {};
  const facilities = data?.facilities ?? {};
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

  const EditButton = ({
    section,
    tone = "light",
    label = "Edit",
  }: {
    section: LabsSectionKey;
    tone?: "light" | "dark" | "primary";
    label?: string;
  }) => {
    if (!editable || !onEditSection) return null;

    const toneClass =
      tone === "dark"
        ? "bg-white/10 text-white border border-white/30 hover:bg-white/20"
        : tone === "primary"
          ? "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700"
          : "bg-blue-600/10 text-blue-600 border border-blue-600/30 hover:bg-blue-600/20";

    return (
      <Button
        size="sm"
        variant="flat"
        className={`!py-1 !px-3 text-[11px] font-bold uppercase tracking-wide ${toneClass}`}
        onPress={() => onEditSection(section)}
      >
        {label}
      </Button>
    );
  };

  const DeleteButton = ({
    section,
    label = "Delete",
    tone = "danger",
  }: {
    section: LabsSectionKey;
    label?: string;
    tone?: "danger" | "inverted";
  }) => {
    if (!editable || !onDeleteSection) return null;

    const toneClass =
      tone === "inverted"
        ? "bg-white/10 text-white border border-white/30 hover:bg-white/20"
        : "bg-red-600/10 text-red-600 border border-red-600/30 hover:bg-red-600/20";

    return (
      <Button
        size="sm"
        variant="flat"
        className={`!py-1 !px-3 text-[11px] font-bold uppercase tracking-wide ${toneClass}`}
        onPress={() => onDeleteSection(section)}
      >
        {label}
      </Button>
    );
  };

  const heroTitleMain = hero.titleMain?.trim() || "Labs &";
  const heroTitleHighlight = hero.titleHighlight?.trim() || "Innovation";
  const heroSubtitle =
    hero.subtitle?.trim() ||
    "Where theory meets practice. Explore our specialized research units and dynamic student-led communities.";
  const labsHeaderKicker = labsHeader.kicker?.trim() || "Research Excellence";
  const labsHeaderTitle =
    labsHeader.title?.trim() || "Advanced Laboratory Grid";
  const featuredBadge = featuredLab.badgeLabel?.trim() || "LEADING LAB";
  const featuredVisionLabel =
    featuredLab.visionLabel?.trim() || "Laboratory Vision";
  const featuredInterestsLabel =
    featuredLab.interestsLabel?.trim() || "Research Interests";
  const featuredApplicationsLabel =
    featuredLab.applicationsLabel?.trim() || "Expected Applications";
  const repositoryLabel =
    featuredLab.repositoryLabel?.trim() || "EXPLORE LAB REPOSITORY";
  const repositoryHref = featuredLab.repositoryHref?.trim() || "#";
  const researchPortfolioTitle =
    researchPortfolio.title?.trim() || "Research Portfolio";
  const researchPortfolioDescription =
    researchPortfolio.description?.trim() ||
    "Our projects are backed by international institutions and national ministries, aiming to digitize Khmer heritage and advance local AI.";
  const deploymentsTitle = deployments.title?.trim() || "Active Deployments";
  const deploymentsItems = deployments.items ?? [];
  const deploymentsCtaLabel = deployments.ctaLabel?.trim() || "PARTNER WITH US";
  const clubsTitleMain = clubsCopy.titleMain?.trim() || "Student";
  const clubsTitleHighlight = clubsCopy.titleHighlight?.trim() || "Clubs";
  const clubsDescription =
    clubsCopy.description?.trim() ||
    "GIC is more than just lectures. Join our clubs to sharpen your soft skills, collaborate on startups, and participate in national events.";
  const clubsCtaLabel = clubsCopy.ctaLabel?.trim() || "JOIN NOW";
  const nodeHub = facilities.nodeHub ?? {};
  const studio = facilities.studio ?? {};

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      {/* 1. HERO SECTION */}
      <section className="py-24 border-b border-gray-100 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <div className="absolute right-0 top-0">
            <EditButton section="hero" />
          </div>
          <motion.h1
            {...fadeIn}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]"
          >
            {heroTitleMain}{" "}
            <span className="text-blue-600">{heroTitleHighlight}</span>
          </motion.h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. RESEARCH LABORATORIES */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <motion.div
            {...fadeIn}
            className="mb-16 flex flex-col gap-4 relative"
          >
            <div className="absolute right-0 top-0 flex gap-2">
              <EditButton section="labs-header" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600">
                <Beaker size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">
                {labsHeaderKicker}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              {labsHeaderTitle}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* 1. THE FEATURED LAB: KHMER NLP LAB */}
            <motion.div {...fadeIn} className="lg:col-span-8 relative">
              <div className="absolute right-10 top-3  z-20">
                <EditButton section="featured-lab" tone="dark" />
              </div>
              <Card className="p-10 md:p-14 rounded-[3.5rem] bg-zinc-900 text-white border-none relative overflow-hidden h-full shadow-2xl">
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                        <Globe size={32} />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight">
                          {featuredLab.name?.trim() || "Vila Lab"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                            {featuredLab.leadLabel?.trim() || "Led by"}{" "}
                            {featuredLab.leadName?.trim() || "Mr. VALY Dona"}
                          </span>
                          <div className="h-1 w-1 rounded-full bg-zinc-700" />
                          <span className="text-zinc-500 text-xs font-medium italic">
                            {featuredLab.leadEmail?.trim() ||
                              "dona.valy@gmail.com"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Chip
                      color="primary"
                      variant="flat"
                      className="font-bold border-none bg-blue-600/20 text-blue-400"
                    >
                      {featuredBadge}
                    </Chip>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">
                        {featuredVisionLabel}
                      </h4>
                      <p className="text-2xl font-black leading-tight mb-8">
                        {featuredLab.visionQuote?.trim() ||
                          "Be the leading Khmer Natural Language Processing Lab in Cambodia."}
                      </p>
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">
                          {featuredInterestsLabel}
                        </h4>
                        {researchInterests.map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center gap-3 text-sm font-bold text-zinc-300"
                          >
                            <Zap size={14} className="text-blue-500" />{" "}
                            {interest}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6 text-center">
                          {featuredApplicationsLabel}
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
                        onPress={() =>
                          repositoryHref &&
                          window.open(repositoryHref, "_blank")
                        }
                      >
                        {repositoryLabel}{" "}
                        <ArrowUpRight
                          size={18}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Decorative Mesh Background */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-50 pointer-events-none" />
              </Card>
            </motion.div>

            {/* 2. PROJECT TIMELINE GRID */}
            <div className="lg:col-span-4 flex flex-col gap-6 relative">
              <div className="absolute right-0 -top-12 flex gap-2">
                <EditButton section="research-portfolio" tone="primary" />
              </div>
              <motion.div
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20 flex flex-col justify-center h-full"
              >
                <Microscope size={40} className="mb-6 opacity-80" />
                <h3 className="text-2xl font-black tracking-tight mb-4">
                  {researchPortfolioTitle}
                </h3>
                <p className="text-blue-100 text-sm font-medium leading-relaxed">
                  {researchPortfolioDescription}
                </p>
              </motion.div>

              <motion.div
                {...fadeIn}
                transition={{ delay: 0.3 }}
                className="h-full relative"
              >
                <div className="absolute right-4 top-4 z-20">
                  <EditButton section="deployments" />
                </div>
                <Card className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 h-full flex flex-col justify-between shadow-none">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                      {deploymentsTitle}
                    </h4>
                    <div className="space-y-4">
                      {deploymentsItems.map((item, index) => (
                        <div
                          key={`${item.name}-${index}`}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-divider"
                        >
                          <span className="text-xs font-bold">{item.name}</span>
                          <Chip
                            size="sm"
                            className="bg-emerald-500/10 text-emerald-500 font-bold border-none"
                          >
                            {item.status}
                          </Chip>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-8 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-black h-14 rounded-2xl">
                    {deploymentsCtaLabel}
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* 3. CURRENT PROJECTS LIST */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 relative">
            <div className="absolute right-0 -top-12 flex gap-2">
              <EditButton section="project-0" />
              <EditButton
                section={`project-${projects.length}`}
                label="Add"
                tone="primary"
              />
            </div>
            {projects.map((project, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: 0.1 * i }}
                className="p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 hover:border-blue-600/30 transition-all group relative"
              >
                <div className="absolute right-4 top-4 flex gap-2">
                  <EditButton section={`project-${i}`} />
                  <DeleteButton section={`project-${i}`} />
                </div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileCode2 size={24} />
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 group-hover:text-blue-500 transition-colors uppercase tracking-widest">
                    {project.period}
                  </span>
                </div>
                <h4 className="text-xs font-black uppercase text-blue-600 mb-2 tracking-widest">
                  {project.title}
                </h4>
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
      </section>

      {/* 3. STUDENT CLUBS & COMMUNITY */}
      <section className="py-24 bg-zinc-950 text-white rounded-[3rem] mx-4 md:mx-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="absolute right-5 -top-15 flex gap-2">
            <EditButton section="clubs" tone="dark" />
            <EditButton
              section={`club-${clubs.length}`}
              label="Add"
              tone="primary"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              {...fadeIn}
              className="lg:w-1/3 text-center lg:text-left"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-zinc-950 mb-8 mx-auto lg:mx-0 shadow-xl">
                <Users size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                {clubsTitleMain} <br />
                <span className="text-blue-500">{clubsTitleHighlight}</span>
              </h2>
              <p className="text-slate-400 font-medium">{clubsDescription}</p>
            </motion.div>

            <motion.div
              {...fadeIn}
              className="lg:w-2/3 grid sm:grid-cols-1 gap-4 w-full"
            >
              {clubs.map((club, i) => (
                <div
                  key={i}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all flex flex-col md:flex-row items-center gap-8 group relative"
                >
                  <div className="absolute right-4 top-4">
                    <div className="flex gap-2">
                      <EditButton section={`club-${i}`} tone="dark" />
                      <DeleteButton section={`club-${i}`} />
                    </div>
                  </div>
                  <div
                    className={`w-14 h-14 shrink-0 rounded-2xl ${club.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {clubIcons[club.icon]}
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h4 className="text-xl font-bold mb-1">{club.name}</h4>
                    <p className="text-sm text-slate-400">{club.desc}</p>
                  </div>
                  <Button
                    variant="light"
                    className="text-white font-bold group-hover:text-blue-500"
                  >
                    {clubsCtaLabel} <ArrowRight size={16} />
                  </Button>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. LAB FACILITIES SHOWCASE */}
      {/* SECTION B: PHYSICAL INFRASTRUCTURE (Updated for Student Experience) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 relative">
            {/* PHYSICAL SERVER CENTER */}
            <motion.div {...fadeIn} className="relative group">
              <div className="p-12 h-full rounded-[3.5rem] bg-slate-900 text-white overflow-hidden flex flex-col justify-between border border-white/5">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {nodeHub.kicker?.trim() || "On-Campus Infrastructure"}
                    </span>
                    <div className="absolute right-0 top-2 flex gap-2">
                      <EditButton section="facilities-node" tone="dark" />
                      <DeleteButton section="facilities-node" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tighter">
                    {nodeHub.titleMain?.trim() || "Physical"}{" "}
                    <span className="text-blue-500">
                      {nodeHub.titleHighlight?.trim() || "Node Hub"}
                    </span>
                  </h3>
                  <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                    {nodeHub.description?.trim() ||
                      "GIC manages its own On-Campus Server Center. Students don't just learn theory; they get physical access to manage high-performance computing nodes and experiment with private cloud configurations."}
                  </p>
                </div>

                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <img
                    src={
                      nodeHub.image?.trim() ||
                      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800"
                    }
                    className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt="GIC Server Center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-white">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {nodeHub.footnote?.trim() || "Bare Metal Access"}
                    </span>
                    <ArrowUpRight size={18} className="text-blue-500" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* E-LEARNING DEVELOPMENT STUDIO */}
            <motion.div {...fadeIn} className="relative h-full flex flex-col">
              <div className="p-12 h-full rounded-[3.5rem] bg-blue-600 text-white flex flex-col justify-between shadow-2xl shadow-blue-600/20">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                    <Video size={28} />
                  </div>
                  <div className="absolute right-0 top-2 flex gap-2 z-10">
                    <EditButton section="facilities-studio" tone="dark" />
                    <DeleteButton section="facilities-studio" tone="inverted" />
                  </div>

                  <h3 className="text-4xl font-black mb-6 tracking-tight">
                    {studio.title?.trim() || "E-Learning Studio"}
                  </h3>

                  <p className="text-blue-100 mb-10 leading-relaxed font-medium">
                    {studio.description?.trim() ||
                      "Equipped by the ASEAN Cyber University project, this professional studio provides hands-on experience in digital content production for blended learning used nationwide."}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20">
                      <span className="text-[10px] font-black uppercase text-blue-200">
                        {studio.equipmentLabel?.trim() || "Equipment"}
                      </span>
                      <p className="text-lg font-bold">
                        {studio.equipmentValue?.trim() || "Professional Studio"}
                      </p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-[2rem] border border-white/20">
                      <span className="text-[10px] font-black uppercase text-blue-200">
                        {studio.partnershipLabel?.trim() || "Partnership"}
                      </span>
                      <p className="text-lg font-bold">
                        {studio.partnershipValue?.trim() || "ASEAN Cyber Uni"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex items-center gap-4 p-5 rounded-2xl bg-black/10 border border-white/10">
                  <div className="w-3 h-3 rounded-full bg-blue-300" />
                  <p className="text-xs font-bold uppercase tracking-widest">
                    {studio.note?.trim() ||
                      "Students can book studio time for media projects"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
