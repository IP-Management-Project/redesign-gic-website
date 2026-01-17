"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Award,
  PlaneTakeoff,
  GraduationCap,
  Library,
  BookOpen,
  Users,
  CheckCircle2
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import AdmissionSection from "@/components/admission";
import { CurriculumSection } from "@/components/cirriculumn";

export default function InternationalProgramPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const partners = [
    { name: "INSA Lyon", location: "Lyon, France", focus: "Master & PhD tracks" },
    { name: "INP Toulouse", location: "Toulouse, France", focus: "Joint-supervision" },
    { name: "UTC Compiègne", location: "Compiègne, France", focus: "Software Architecture" },
    { name: "Polytech Network", location: "France-wide", focus: "Specialized Labs" },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Globe size={14} />
            Global Academic Standards
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]">
            International <span className="text-blue-600">Program</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            A premium 5-year engineering curriculum modeled after the French educational system,
            bridging Cambodian talent with world-class European partnerships.
          </p>
        </div>
      </section>

      <AdmissionSection />
      {/* 2. THE DUAL-STAGE FRAMEWORK */}
      <section className="py-24 bg-gray-50/50 dark:bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-black tracking-tighter mb-6">Program Architecture</h2>
              <p className="text-slate-600 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
                Our program is structured to transform high-potential students into specialized engineers
                capable of competing in the global market.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 p-6 rounded-[2rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                    <Library size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-blue-600 mb-1">Years 1 - 2: Foundation</h4>
                    <p className="text-xs text-slate-500">The Tronc Commun: Mastering math, physics, chemistry, and humanities to build a multi-disciplinary base.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 rounded-[2rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black shrink-0">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-zinc-400 mb-1">Years 3 - 5: Specialization</h4>
                    <p className="text-xs text-slate-500">Focusing on advanced computer science, professional technologies, and research in AI and NLP.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="p-10 rounded-[3rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20">
              <PlaneTakeoff size={48} className="mb-8" />
              <h3 className="text-3xl font-black tracking-tighter mb-4">Global Mobility</h3>
              <p className="text-blue-100 leading-relaxed mb-8">
                The hallmark of our International Program is the opportunity for dual-degree paths,
                allowing students to earn degrees recognized both in Cambodia and Europe.
              </p>
              <ul className="space-y-3">
                {["Dual-degree paths with France", "International research tracks", "French & English language mastery"].map(item => (
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">European Partners</h2>
            <p className="text-slate-500 dark:text-zinc-400">Collaborating with elite French engineering institutions.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 hover:border-blue-600 transition-all group">
                <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform origin-left">
                  <Award size={32} />
                </div>
                <h4 className="text-xl font-black mb-1">{partner.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">{partner.location}</p>
                <p className="text-xs text-slate-500">{partner.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ENROLLMENT & SCHOLARSHIPS */}
      <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-4 md:mx-6 mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
                Secure Your <br /><span className="text-blue-500">Future</span>
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed font-medium">
                High school graduates are eligible for the national entrance exam held every October.
                Securing a spot means joining the top 1,500 students in the country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-blue-600/20">
                  APPLY FOR EXAM
                </Button>
                <Button variant="bordered" className="text-white border-white/20 font-black h-14 rounded-2xl">
                  VIEW REQUIREMENTS
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-white/5 border-white/10 p-8 rounded-[2rem]">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                    <GraduationCap size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black">80</h4>
                    <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Annual Scholarships Provided</p>
                  </div>
                </div>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-2">Duration</h4>
                  <p className="text-xl font-bold">5 Years</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-2">Status</h4>
                  <p className="text-xl font-bold">Top 1500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CurriculumSection />
    </div>
  );
}