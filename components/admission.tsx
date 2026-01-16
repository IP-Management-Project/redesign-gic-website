"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, ClipboardCheck } from "lucide-react";

interface AdmissionSectionProps {
  title?: string;
  description?: string;
  subjects?: string[];
  scholarshipText?: string;
  selectionText?: string;
}

export default function AdmissionSection({
  title = "How to Join GIC",
  description = "Entrance is highly competitive. Every October, high school graduates undergo a rigorous national entrance exam to secure a spot in one of the country's top engineering faculties.",
  subjects = ["Mathematics", "Physics", "Chemistry", "Logic Reasoning"],
  scholarshipText = "80 full 5-year scholarships awarded annually by MoEYS & ITC.",
  selectionText = "Only the top 1,500 students nationwide are eligible for enrollment.",
}: AdmissionSectionProps) {
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-zinc-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Info & Requirements */}
          <motion.div {...fadeIn} className="lg:col-span-5">
            <h2 className="text-4xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white">
              {title}
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 mb-8 leading-relaxed">
              {description}
            </p>

            <div className="space-y-4">
              {/* Scholarship Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center gap-6 shadow-sm">
                <Trophy className="text-blue-600 shrink-0" size={32} />
                <div>
                  <h4 className="font-black text-sm uppercase text-slate-900 dark:text-white">Scholarships</h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {scholarshipText}
                  </p>
                </div>
              </div>

              {/* Selection Cap Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center gap-6 shadow-sm">
                <ClipboardCheck className="text-blue-600 shrink-0" size={32} />
                <div>
                  <h4 className="font-black text-sm uppercase text-slate-900 dark:text-white">Selection Cap</h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {selectionText}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Subject Grid */}
          <motion.div 
            {...fadeIn} 
            className="lg:col-span-7 grid grid-cols-2 gap-4"
          >
            {subjects.map((subject) => (
              <div
                key={subject}
                className="p-10 rounded-[2.5rem] bg-slate-900 text-white flex flex-col justify-between h-48 group hover:bg-blue-600 transition-all duration-500 cursor-default shadow-xl shadow-slate-900/10"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 group-hover:text-white transition-colors">
                  Entrance Test
                </span>
                <h4 className="text-2xl font-black tracking-tight">{subject}</h4>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}