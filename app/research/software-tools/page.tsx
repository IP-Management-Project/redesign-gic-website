"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Bot, 
  Globe, 
  Home, 
  Zap, 
  ScanFace, 
  FileSearch, 
  Smartphone,
  Github,
  User,
  Star
} from "lucide-react";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";

const studentTools = [
  {
    title: "MultiSocialLive",
    author: "GIC Developers (Codera)",
    lecturer: "Department Faculty",
    desc: "A unified social media CMS allowing creators to manage Facebook, TikTok, and Instagram from a single dashboard with automated approval workflows.",
    tags: ["Next.js", "NestJS", "API Integration"],
    icon: <Globe className="text-blue-500" />,
    status: "R&D Product"
  },
  {
    title: "Rent House Management System",
    author: "Final Year Thesis Project",
    lecturer: "Thesis Committee",
    desc: "A comprehensive platform for landlords to manage tenants, lease agreements, and automated billing cycles for local rental markets.",
    tags: ["React", "PostgreSQL", "System Design"],
    icon: <Home className="text-emerald-500" />,
    status: "Thesis Project"
  },
  {
    title: "Codera AI Assistant",
    author: "Codera Team",
    lecturer: "Mr. VALY Dona",
    desc: "An intelligent digital employee that handles CRM ticket routing and basic resolution using Natural Language Understanding.",
    tags: ["AI", "NLU", "Python"],
    icon: <Bot className="text-purple-500" />,
    status: "Beta"
  },
  {
    title: "Kaoh Kantheay Sustainable Grid",
    author: "Sustainable Energy Group",
    lecturer: "Energy Engineering Dept",
    desc: "A simulation tool for designing a sustainable electricity supply system using hybrid renewable sources for Kaoh Kantheay Island.",
    tags: ["Modeling", "Energy Efficiency", "Load Estimation"],
    icon: <Zap className="text-amber-500" />,
    status: "Lab Project"
  },
  {
    title: "Khmer OCR Tool",
    author: "Khmer NLP Lab Students",
    lecturer: "Mr. VALY Dona",
    desc: "An advanced Optical Character Recognition engine specifically tuned for the complex ligatures and scripts of the Khmer language.",
    tags: ["Deep Learning", "Computer Vision", "NLP"],
    icon: <FileSearch className="text-red-500" />,
    status: "Active Research"
  },
  {
    title: "Biometric Attendance System",
    author: "GIC Systems Group",
    lecturer: "Infrastructure Team",
    desc: "A facial recognition platform for automated student attendance tracking, integrated with on-campus physical server nodes.",
    tags: ["Biometrics", "C++", "Security"],
    icon: <ScanFace className="text-indigo-500" />,
    status: "Deployment"
  }
];

export default function StudentShowcase() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <motion.div {...fadeIn} className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-blue-600" size={20} fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Innovation Showcase</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Student-Led Projects</h2>
          <p className="mt-4 text-slate-500 max-w-2xl font-medium">
            Interesting topics and high-impact solutions built by our students, recommended by their respective lecturers and research leads.
          </p>
        </motion.div>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentTools.map((tool, i) => (
            <motion.div 
              key={i} 
              {...fadeIn} 
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-8 rounded-[3rem] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-none hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 group h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <Chip variant="flat" size="sm" className="font-bold text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-none">
                      {tool.status}
                    </Chip>
                  </div>

                  <h3 className="text-2xl font-black mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  
                  <div className="flex flex-col gap-1 mb-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                      <User size={12} /> Built by: {tool.author}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600/60">
                      <Star size={12} /> Recommended: {tool.lecturer}
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed mb-8 italic">
                    {tool.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {tool.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-800 text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-divider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-grow bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-black h-12 rounded-xl">
                    VIEW PROJECT
                  </Button>
                  <Button isIconOnly variant="bordered" className="h-12 w-12 rounded-xl border-divider">
                    <Github size={20} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}