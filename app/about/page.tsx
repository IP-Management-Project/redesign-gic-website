"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  TrendingUp, 
  Globe, 
  Briefcase, 
  Lightbulb, 
  History,
  Cpu,
  Languages,
  Search,
  ShieldCheck
} from "lucide-react";

export default function MissionVisionPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const visionPoints = [
    { text: "Actively participate in human resource development in ICT", icon: <Users size={20} /> },
    { text: "Contribute in the development of related domains", icon: <TrendingUp size={20} /> },
    { text: "Contribute in the development of higher education of the country", icon: <Globe size={20} /> },
    { text: "Conduct fruitful research that meet the needs of the country", icon: <Lightbulb size={20} /> },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans selection:bg-blue-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-gray-100 dark:border-zinc-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Target size={14} />
            Our Foundation
          </motion.div>
          <motion.h1 
            {...fadeIn}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]"
          >
            Mission & <span className="text-blue-600">Vision</span>
          </motion.h1>
          <motion.p {...fadeIn} className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Leading the digital evolution of Cambodia through academic excellence, 
            ethical professionalism, and impactful research.
          </motion.p>
        </div>
      </section>

            {/* 2. WHO WE ARE (The Core Identity) */}
      <section className="py-24 border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start">
            
            {/* History & Foundation */}
            <motion.div {...fadeIn} className="lg:col-span-5">
              <div className="inline-flex p-3 rounded-2xl bg-blue-600 text-white mb-6">
                <History size={28} />
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-6">About GIC</h2>
              <p className="text-lg text-slate-600 dark:text-zinc-400 leading-relaxed mb-6">
                The <span className="text-slate-900 dark:text-white font-bold italic">Département de Génie d’Informatique et Communication</span> (GIC) was established in 1998. Since our inception, we have formed more than one thousand engineers and technicians who are now participating actively in the development of both public and private sectors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 2. MISSION SECTION */}
      <section className="py-24 bg-gray-50/50 dark:bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                Our Mission
              </h2>
              <div className="space-y-6 text-slate-600 dark:text-zinc-400 text-lg leading-relaxed">
                <p>
                  Our main mission is to produce <span className="text-slate-900 dark:text-white font-bold">highly qualified graduates</span> from both undergraduate and higher education in computer science.
                </p>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                <div className="mb-4"><Target size={32} /></div>
                <h4 className="text-xl font-bold mb-2">Hard Skills</h4>
                <p className="text-blue-100 text-sm">Rigorous technical curriculum in software and systems engineering.</p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 mt-0 sm:mt-8">
                <div className="mb-4 text-blue-600"><Users size={32} /></div>
                <h4 className="text-xl font-bold mb-2">Soft Skills</h4>
                <p className="text-slate-500 dark:text-zinc-400 text-sm">Communication and teamwork essential for the modern workplace.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VISION SECTION */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center lg:flex-row gap-16">
            <motion.div {...fadeIn} className="lg:w-1/3">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                Our <br /><span className="text-blue-600">Vision</span>
              </h2>
              <p className="text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                To be the core engine of Cambodia's ICT development through 
                higher education and fruitful research.
              </p>
            </motion.div>

            <motion.div {...fadeIn} className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
              {visionPoints.map((point, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900/50 border border-transparent hover:border-blue-600/20 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    {point.icon}
                  </div>
                  <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                    {point.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* 5. CALL TO ACTION */}
      {/* <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="p-12 md:p-20 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px]" />
            <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Ready to join our mission?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-black font-black px-10 py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                APPLY NOW
              </button>
              <button className="bg-white/10 text-white font-black px-10 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md">
                CONTACT US
              </button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}