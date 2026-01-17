"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Trophy, Users, Flame, Star, ArrowRight,
  Monitor, Lightbulb, History, Target, Zap, Globe,
  Cpu, Calendar, CheckCircle2, ChevronRight, Handshake,
  ShieldCheck, Presentation, PenTool
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Divider } from "@heroui/divider";
import Image from "next/image";
import { ThreeDMarquee } from "./ui/3d-marquee";
import { useIncubationRoadmapData } from "@/hooks/useIncubationRoadmapData";

export default function TICIncubationHub() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const { data } = useIncubationRoadmapData();
  const ticRoadmap = data?.roadmap ?? [];
  const partners = data?.partners ?? [];
  const ministries = data?.ministries ?? [];
  const marqueeImages = data?.marqueeImages ?? [];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans overflow-hidden">

      {/* 1. BRANDED HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden border-b border-[#c8c8c8]/30 flex flex-col items-center justify-center bg-white dark:bg-black">

        {/* 1. 3D MARQUEE - Fixed Z-Index and Opacity */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <ThreeDMarquee
            className="h-full w-full opacity-80 dark:opacity-40"
            images={marqueeImages}
          />
        </div>

        {/* 2. OVERLAY - Ensures text is readable without hiding the marquee */}
        <div className="absolute inset-0 z-10 h-full w-full bg-white/40 dark:bg-black/60 backdrop-blur-[1px]" />

        {/* 3. CENTER CONTENT - Higher Z-Index */}
        <section className="relative py-24 dark:bg-zinc-900/10 border-b border-divider overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <motion.div {...fadeIn} className="flex flex-col items-center leading-none text-center mb-12">
              <h1 className="font-sans font-black tracking-[0.15em] text-[#1D56A5] text-5xl md:text-8xl">TECHNO</h1>
              <div className="flex flex-wrap items-center justify-center gap-x-4 mt-4">
                <h2 className="font-sans font-bold tracking-tight text-[#1D56A5] text-2xl md:text-5xl">INNOVATION</h2>
                <div className="bg-[#78D3D2] rounded-2xl px-6 py-2 flex items-center justify-center shadow-lg">
                  <h2 className="font-sans font-bold text-white tracking-tight text-2xl md:text-5xl uppercase">Challenge</h2>
                </div>
              </div>
              <h1 className="font-sans font-black tracking-[0.15em] text-[#1D56A5] text-4xl md:text-7xl mt-4">CAMBODIA</h1>
            </motion.div>
            <p className="text-lg md:text-2xl text-slate-500 dark:text-zinc-400 max-w-3xl mx-auto font-medium leading-relaxed italic">
              Organized by GIC "Activating student potential through leadership, creativity, and world-class technical innovation."
            </p>
          </div>
        </section>
        {/* Decorative Corner Glow */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#007d49]/10 blur-[120px] rounded-full pointer-events-none z-10" />
      </section>

      {/* 2. CORE OBJECTIVES SECTION */}
      <section className="py-24 border-b border-[#c8c8c8]/30 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-8 border-b-8 border-[#c8c8c8] inline-block pb-2">Our <span className="text-[#007d49]">Objectives</span></h2>
              <p className="text-lg text-slate-600 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                TIC aims to be the vibrant platform where Young Cambodian Students activate their potential
                and move their leadership, creativity, and innovation to the next level.
              </p>

              <div className="space-y-6">
                <ObjectiveItem
                  icon={<Target className="text-[#007d49]" />}
                  title="Reveal Potential"
                  desc="Showcase student excellence to stakeholders, ministries, and interested industrial bodies."
                />
                <ObjectiveItem
                  icon={<Zap className="text-[#007d49]" />}
                  title="Promote STEM Entrepreneurship"
                  desc="Drive technical and business innovation within Engineering and Technology tracks."
                />
                <ObjectiveItem
                  icon={<Lightbulb className="text-[#007d49]" />}
                  title="Real World Solutions"
                  desc="Utilize student skills to solve real-world problems through STEM-based innovation."
                />
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="relative">
              <div className="p-12 rounded-[4rem] bg-[#c8c8c8]/20 dark:bg-zinc-900 border border-[#c8c8c8]/50 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                    <History className="text-[#007d49]" /> Competition Ecosystem
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-8">
                    We bring together students, mentors, and investors to create a cycle of
                    continuous innovation and industrial readiness.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800 border border-[#c8c8c8] flex flex-col items-center text-center shadow-sm">
                      <Presentation className="text-[#007d49] mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Leadership</span>
                    </div>
                    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-800 border border-[#c8c8c8] flex flex-col items-center text-center shadow-sm">
                      <PenTool className="text-[#007d49] mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Creativity</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PARTNERS & MINISTRIES */}
      <section className="py-24 bg-[#c8c8c8]/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-widest text-[#007d49] mb-4">Ecosystem Partners</h2>
            <Divider className="w-24 mx-auto bg-[#c8c8c8] h-1.5 rounded-full" />
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 hover:opacity-100 transition-opacity">
            {partners.map((p, i) => (
              <Tooltip key={i} content={p.role} placement="bottom">
                <Image src={p.img} width={110} height={110} alt={p.name} className=" hover:grayscale-0 transition-all duration-500" />
              </Tooltip>
            ))}
          </div>

          <p className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] text-[#007d49]/60">Supported by National Institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-12 mt-8">
            {ministries.map((p, i) => (
              <Tooltip key={i} content={p.role} placement="bottom">
                <Image src={p.img} width={110} height={110} alt={p.name} className=" hover:grayscale-0 transition-all duration-500" />
              </Tooltip>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE 2025 ROADMAP */}
      <section className="py-24 bg-white dark:bg-zinc-950 rounded-[4rem] mx-4 md:mx-6 shadow-inner">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 border-l-8 border-[#007d49] pl-6">Program <span className="text-[#007d49]">Roadmap</span></h2>
            <p className="text-slate-500 font-medium">The official 2025 timeline from registration to pre-incubation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {ticRoadmap.map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.color} mb-6 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform relative z-10`}>
                  <Calendar size={24} />
                </div>
                <h4 className="font-black text-sm uppercase mb-1 tracking-widest text-[#007d49]">{item.stage}</h4>
                <p className="text-[10px] font-bold text-slate-400 mb-3">{item.date}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed px-4 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function ObjectiveItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-[#c8c8c8] hover:shadow-lg hover:border-[#007d49] transition-all group">
      <div className="shrink-0 p-3 bg-[#c8c8c8]/20 rounded-2xl group-hover:bg-[#007d49] group-hover:text-white transition-colors">{icon}</div>
      <div>
        <h4 className="text-lg font-black tracking-tight mb-2 uppercase group-hover:text-[#007d49] transition-colors">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
