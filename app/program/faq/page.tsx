"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Cpu, Rocket, ShieldCheck } from "lucide-react";

const faqData = [
  {
    category: "Academic",
    icon: <Cpu size={20} />,
    question: "How long is the Engineering Degree program?",
    answer: "The Engineering Degree is a 3-year specialized program spanning from Year 3 to Year 5, focusing on ICT and Electrical Engineering tracks."
  },
  {
    category: "Competition",
    icon: <Rocket size={20} />,
    question: "When does TIC 2025 registration begin?",
    answer: "Official registration for TIC 2025 opens on April 22 and concludes on May 16, 2025."
  },
  {
    category: "Incubation",
    icon: <ShieldCheck size={20} />,
    question: "Who can access the GIC Incubation Hub?",
    answer: "Teams participating in the Techno Innovation Challenge and registered engineering students have 24/7 access to workstations and HPC nodes."
  }
];

export default function GicFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-[#26304d] uppercase tracking-tighter mb-4">
            Common <span className="text-[#76879d]">Queries</span>
          </h2>
          <div className="h-1.5 w-24 bg-[#26304d] mx-auto" />
        </div>

        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div key={i} className="border border-[#76879d]/20 rounded-[2rem] overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left bg-white dark:bg-zinc-900 hover:bg-[#76879d]/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-[#26304d]">{item.icon}</div>
                  <span className="font-black text-[#26304d] dark:text-white uppercase tracking-tight text-lg">
                    {item.question}
                  </span>
                </div>
                <ChevronDown 
                  className={`text-[#76879d] transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}