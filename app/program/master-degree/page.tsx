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
  CheckCircle2,
  GraduationCap,
  ChevronRight
} from "lucide-react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { CurriculumData, CurriculumSection } from "@/components/cirriculumn";

export default function MasterDegreePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const MASTER_DATA: CurriculumData = {
    "Semester I": [
      { subject: "Advanced Algorithms and Data Structures", code: "MSC101", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Object-Oriented Programming", code: "MSC102", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "Calculus for Machine Learning", code: "MSC103", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "Probability and Mathematical Statistics", code: "MSC104", hC: 32, hTD: 16, hTP: 0, credit: 3.0 },
      { subject: "Discrete Mathematics", code: "MSC105", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "Artificial Intelligence", code: "MSC106", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Scientific Communication", code: "MSC107", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    ],
    "Semester II": [
      { subject: "Neural Network and Deep Learning", code: "MSC201", hC: 32, hTD: 0, hTP: 32, credit: 4.0 },
      { subject: "Machine Learning", code: "MSC202", hC: 32, hTD: 0, hTP: 16, credit: 3.0 },
      { subject: "Computer Vision", code: "MSC203", hC: 32, hTD: 0, hTP: 16, credit: 3.0 },
      { subject: "Natural Language Processing", code: "MSC204", hC: 32, hTD: 0, hTP: 16, credit: 3.0 },
      { subject: "Data Mining", code: "MSC205", hC: 32, hTD: 0, hTP: 16, credit: 3.0 },
      { subject: "Information Security", code: "MSC206", hC: 16, hTD: 0, hTP: 16, credit: 2.0 },
    ],
    "Semester III": [
      { subject: "Research Methodology", code: "MSC301", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Project Management for Researching", code: "MSC302", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "IT Project Management", code: "MSC303", hC: 16, hTD: 16, hTP: 0, credit: 1.5 },
      { subject: "Entrepreneurship", code: "MSC304", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Cloud Computing", code: "MSC305", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    ],
    "Semester IV": [
      { subject: "Master Thesis / Final Research", code: "MSC401", hC: 0, hTD: 0, hTP: 0, credit: 20.0 },
    ]
  };

  const courseTypes = [
    {
      title: "Core Courses",
      icon: <BrainCircuit />,
      courses: ["Advanced Algorithms", "Object-Oriented Programming", "Calculus for Machine Learning", "Discrete Mathematics", "Artificial Intelligence"]
    },
    {
      title: "Specialized Courses",
      icon: <Cpu />,
      courses: ["Neural Network and Deep Learning", "Machine Learning", "Computer Vision", "Natural Language Processing", "Data Mining", "Information Security"]
    },
    {
      title: "Research & Electives",
      icon: <Search />,
      courses: ["Scientific Communication", "Research Methodology", "IT Project Management", "Entrepreneurship", "Cloud Computing"]
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-gray-100 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <GraduationCap size={14} />
            Graduate School of ITC
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]">
            Master of <span className="text-blue-600">Engineering</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            A prestigious two-academic-year program designed to provide advanced skills in
            Artificial Intelligence (AI) and Information Security.
          </p>
        </div>
      </section>

      {/* 2. PROGRAM OVERVIEW */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-black tracking-tighter mb-6">Advanced Research Trends</h2>
              <p className="text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed">
                This program aims to provide the essential skills to develop human resources in the
                current trends of computer science. We emphasize the need for AI applications,
                Blockchain technology, and Smart Information Systems.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-blue-600/20 transition-all">
                  <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                  <p className="text-sm font-bold">Focus on Information Security & Application Design.</p>
                </div>
                <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-blue-600/20 transition-all">
                  <Cpu className="text-blue-600 shrink-0" size={24} />
                  <p className="text-sm font-bold">Deployment of advanced AI and data-related technology.</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="grid grid-cols-1 gap-4">
              <Card className="p-8 bg-slate-900 text-white rounded-[2.5rem] border-none">
                <h3 className="text-2xl font-black mb-4">Career Opportunities</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Graduates become high-level researchers or developers in advanced fields,
                  with opportunities for Ph.D. level research.
                </p>
                <Divider className="bg-white/10 mb-6" />
                <div className="flex flex-wrap gap-2">
                  {["Researcher", "AI Developer", "System Architect", "Security Consultant"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CURRICULUM GRID */}
      <section className="py-24 bg-gray-50/50 dark:bg-zinc-900/20 rounded-[3rem] mx-4 md:mx-6">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Course Framework</h2>
            <p className="text-slate-500">Delivered over 4 semesters covering a minimum of 54 credits.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {courseTypes.map((type, i) => (
              <motion.div key={i} {...fadeIn} className="p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-6">
                  {type.icon}
                </div>
                <h4 className="text-xl font-black mb-6">{type.title}</h4>
                <ul className="space-y-3">
                  {type.courses.map(course => (
                    <li key={course} className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400">
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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <motion.div {...fadeIn} className="lg:col-span-7">
              <h2 className="text-4xl font-black tracking-tighter mb-8">Admission & Eligibility</h2>
              <div className="space-y-6">
                <div className="p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                  <h4 className="font-black text-blue-600 mb-2 uppercase text-xs tracking-widest">For ITC Students</h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li>• Engineering graduates: Start from Year 2 (1-year study).</li>
                    <li>• GIC Year 4 students: Start from Year 1 (2-year study).</li>
                  </ul>
                </div>
                <div className="p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                  <h4 className="font-black text-blue-600 mb-2 uppercase text-xs tracking-widest">External Applicants</h4>
                  <p className="text-sm text-slate-500">Bachelor's degree or equivalent in CS, IT, or related fields (2-year study duration).</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="lg:col-span-5 bg-blue-600 p-10 rounded-[3rem] text-white">
              <h3 className="text-3xl font-black mb-6">How to Apply</h3>
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <Calendar className="shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-blue-200">Application Deadline</p>
                    <p className="font-bold">30th September 5pm</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FileText className="shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase text-blue-200">Submission</p>
                    <p className="font-bold">Graduate School, Room B-110</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-white text-blue-600 font-black h-14 rounded-2xl">
                DOWNLOAD APPLICATION
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <CurriculumSection
        title="Master's Program Curriculum"
        description="A specialized 54-credit path focusing on AI, Deep Learning, and Advanced Research Methodology. All courses are delivered in English."
        data={MASTER_DATA}
      />
      {/* 5. CONTACT FOOTER */}
      <section className="py-24 border-t border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-12">Program Coordinator</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center mb-4"><Mail className="text-blue-600" /></div>
              <p className="font-bold">rathpisey@itc.edu.kh</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center mb-4"><Smartphone className="text-blue-600" /></div>
              <p className="font-bold">(+855) 96 631 12 21</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}