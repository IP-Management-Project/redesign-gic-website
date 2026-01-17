"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Microscope,
  Briefcase,
  Trophy,
  ClipboardCheck,
  Terminal,
  Cpu
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import { CurriculumSection } from "@/components/cirriculumn";
import AdmissionSection from "@/components/admission";

export default function EngineeringProgramPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Code2 size={14} />
            Academic Excellence
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]">
            Engineering <span className="text-blue-600">Degree</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive 5-year program at the Global Innovation Center designed to
            transform high-potential students into world-class software and systems engineers.
          </p>
        </div>
      </section>

      {/* 2. ENTRANCE & ELIGIBILITY SECTION */}
      <AdmissionSection />
      {/* 3. THE 5-YEAR JOURNEY ROADMAP */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">The Academic Roadmap</h2>
            <p className="text-slate-500 dark:text-zinc-400">From foundation to specialization and research.</p>
          </motion.div>

          <div className="relative space-y-8">
            {/* Year 1-2: Tronc Commun */}
            <RoadmapStep
              year="Years 1 - 2"
              title="Tronc Commun (Foundation)"
              desc="A multi-disciplinary foundation in Math, Physics, and Chemistry, paired with soft skills in Marketing, Philosophy, and Khmer History."
              tags={["Math", "Physics", "English/French", "Technical Drawing"]}
              icon={<BookOpen />}
            />

            {/* Year 3: Fundamentals */}
            <RoadmapStep
              year="Year 3"
              title="Computer Science Fundamentals"
              desc="Deep dive into fundamental theories. Mastering the core principles of algorithms, data structures, and the logic of computation."
              tags={["Core Theory", "Algorithms", "Programming Logic"]}
              icon={<Terminal />}
            />

            {/* Year 4: Professional */}
            <RoadmapStep
              year="Year 4"
              title="Technologies & Professional Practice"
              desc="Bridging theory and industry. Includes a mandatory vacation internship to apply skills in real-world environments."
              tags={["Professional Courses", "System Architecture", "Internship"]}
              icon={<Briefcase />}
            />

            {/* Year 5: Research & Thesis */}
            <RoadmapStep
              year="Year 5"
              title="Advanced Research & Graduation"
              desc="Specialization in AI, NLP, and Distributed Systems. Concludes with a 12-week final internship and a defended thesis."
              tags={["AI", "NLP", "Software Project Management", "Thesis Defense"]}
              icon={<Microscope />}
              isLast
            />
          </div>
        </div>
      </section>

      {/* 4. CURRICULUM METHODOLOGY */}
      <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-4 md:mx-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-black tracking-tighter mb-8">Training Methodology</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Our curriculum follows the French engineering school standard, balancing
                theoretical lectures with intense practical sessions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <MethodBox label="C" title="Cours" desc="Theoretical lectures & concepts." />
                <MethodBox label="TD" title="Travaux Dirigés" desc="Guided tutorials & exercises." />
                <MethodBox label="TP" title="Travaux Practiques" desc="Hands-on laboratory sessions." />
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="p-10 bg-white/5 rounded-3xl border border-white/10">
              <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                <Cpu className="text-blue-500" /> Advanced Research Domains
              </h4>
              <ul className="space-y-4">
                {["Artificial Intelligence", "Natural Language Processing", "Image Processing", "Distributed Systems"].map(item => (
                  <li key={item} className="flex justify-between items-center border-b border-white/5 pb-2 font-bold text-slate-300">
                    {item} <span className="text-blue-500 text-xs">5th Year Focus</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-8 bg-blue-600 text-white font-black" size="lg">
                DOWNLOAD FULL CURRICULUM (PDF)
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <CurriculumSection />
    </div>
  );
}

// --------------------------------------------------------------------------------
// ROADMAP STEP COMPONENT
// --------------------------------------------------------------------------------
function RoadmapStep({ year, title, desc, tags, icon, isLast = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex gap-8 group"
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 z-10 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {!isLast && <div className="w-px h-full bg-divider my-2" />}
      </div>
      <div className="pb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">{year}</span>
        <h3 className="text-2xl font-black mt-2 mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 dark:text-zinc-400 max-w-2xl mb-6 text-sm leading-relaxed">
          {desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-900 text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-transparent hover:border-blue-600/20 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// --------------------------------------------------------------------------------
// METHODOLOGY BOX
// --------------------------------------------------------------------------------
function MethodBox({ label, title, desc }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-600 transition-all">
      <div className="text-2xl font-black text-blue-600 mb-2">{label}</div>
      <div className="text-xs font-black uppercase tracking-widest mb-2">{title}</div>
      <p className="text-[10px] text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}