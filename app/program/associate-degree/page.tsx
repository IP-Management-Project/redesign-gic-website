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
  Briefcase
} from "lucide-react";
import { Button } from "@heroui/button";
import { CurriculumSection } from "@/components/cirriculumn";

export default function AssociateDegreePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans selection:bg-blue-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Terminal size={14} />
            Professional Technical Track
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]">
            Associate <span className="text-blue-600">Degree</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            A specialized 2-year program designed for high school graduates to gain immediate 
            technical expertise and professional ethics for the modern IT workforce.
          </p>
        </div>
      </section>

      {/* 2. ADMISSION STATUS (DIRECT ENROLLMENT) */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                <CheckCircle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">Direct Admission Path</h2>
                <p className="text-blue-100 text-sm">Open enrollment for high school graduates — no entrance exam required for the Associate track.</p>
              </div>
            </div>
            {/* <Button className="bg-white text-blue-600 font-black px-10 h-14 rounded-2xl shadow-xl">
              ENROLL NOW
            </Button> */}
          </div>
        </div>
      </section>

      {/* 3. CORE IDENTITY & HISTORY */}
      <section className="py-24 border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-black tracking-tighter mb-6">Who We Are?</h2>
              <p className="text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Founded in 1998, GIC has formed more than one thousand technicians in computer science 
                who are now participating actively in the development of both public and private sectors.
              </p>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                Our curriculum covers fundamental theories while emphasizing hands-on skills in analysis, 
                design, and implementation of computer-based systems.
              </p>
            </motion.div>

            <motion.div {...fadeIn} className="grid grid-cols-2 gap-4">
              <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-blue-600/20 transition-all">
                <Cpu className="text-blue-600 mb-4" size={32} />
                <h4 className="font-black text-sm uppercase mb-2">Technical Skills</h4>
                <p className="text-xs text-slate-500">Mastering software solutions and network infrastructure.</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-blue-600/20 transition-all">
                <Users className="text-blue-600 mb-4" size={32} />
                <h4 className="font-black text-sm uppercase mb-2">Soft Skills</h4>
                <p className="text-xs text-slate-500">Communication and teamwork for real working environments.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL SPECIALIZATIONS */}
      <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-4 md:mx-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Industry Training</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We provide a solid technical foundation enhanced by professional ethics and patriotism.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "IT Software Solutions", icon: <Code2 /> },
              { title: "Network & Infrastructure", icon: <Settings /> },
              { title: "Telecommunications", icon: <Cpu /> },
              { title: "Business Intelligence", icon: <ShieldCheck /> },
              { title: "Finance & Banking", icon: <Briefcase /> },
              { title: "Media & Broadcasting", icon: <Users /> },
            ].map((sector, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-blue-500 transition-all group">
                <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform origin-left">
                  {sector.icon}
                </div>
                <h4 className="text-xl font-bold">{sector.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAREER IMPACT */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div {...fadeIn} className="lg:w-1/2">
              <h2 className="text-4xl font-black tracking-tighter mb-6">Beyond Graduation</h2>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
                Most of our graduates secure successful careers as IT professionals, researchers, 
                lecturers, and consultants. Many become workforce for government, academic 
                sectors, or run their own startups.
              </p>
              <div className="flex flex-wrap gap-3">
                {["iOS/Android Dev", "Data Mining", "Big Data", "System Admin"].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800/30">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="lg:w-1/2 relative p-8 rounded-[3rem] bg-gray-100 dark:bg-zinc-900">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <p className="text-sm font-bold">2-Year Full-Time Duration</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <p className="text-sm font-bold">Focus on Computer Science Foundations</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <p className="text-sm font-bold">Obligatory Industry Internships</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CurriculumSection />
    </div>
  );
}