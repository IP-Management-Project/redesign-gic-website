"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Rocket,
   Trophy,
   Users,
   Flame,
   Star,
   ArrowRight,
   Sparkles,
   Monitor,
   Lightbulb,
   History,
   Target,
   Zap,
   Globe,
   Cpu
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import TICIncubationHub from "@/components/incubation-roadmap";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";
import { useIncubationShowcaseData } from "@/hooks/useIncubationShowcaseData";

export default function TICShowcasePage() {
   const [selectedSeason, setSelectedSeason] = useState(0);
   const { data } = useIncubationShowcaseData();
   const seasonalData = data?.seasons ?? [];
   const galleryItems = data?.gallery ?? [];
   const selectedSeasonData = seasonalData[selectedSeason];

   const fadeIn = {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 }
   };

   return (
      <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans overflow-hidden">

         <TICIncubationHub />
         {/* 1. THE GLORY WALL: LATEST WINNING STARTUP */}
         {/* <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <motion.div {...fadeIn} className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2">
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-bounce">
                        <Trophy size={14} fill="currentColor" />
                        Latest Champion: Season 8
                     </div>
                     <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                        EcoPulse <span className="text-blue-500">AI</span>
                     </h1>
                     <p className="text-xl text-slate-400 mb-10 leading-relaxed font-medium">
                        The winner of TIC Season 8. Using deep learning to predict energy consumption
                        loads across microgrids in rural Cambodia, optimizing renewable distribution
                        by 35%.
                     </p>
                     <div className="flex flex-wrap gap-4">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                           <p className="text-[10px] font-black uppercase text-blue-500 mb-1">Impact Score</p>
                           <p className="text-2xl font-black">9.8/10</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                           <p className="text-[10px] font-black uppercase text-blue-500 mb-1">Technology</p>
                           <p className="text-2xl font-black">RAG & TimeSeries</p>
                        </div>
                     </div>
                  </div>

                  <motion.div className="lg:w-1/2 relative" {...fadeIn}>
                     <div className="aspect-video rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl relative group">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Winning Team" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent" />
                        <div className="absolute bottom-8 left-8">
                           <div className="bg-white text-zinc-950 p-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
                              View Victory Pitch
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            </div>
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
               <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse" />
               <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse delay-700" />
            </div>
         </section> */}

         {/* 3. INCUBATION CENTER SHOWCASE: THE HUB */}
         <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div {...fadeIn}>
                     <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">The Launchpad <br /> <span className="text-[#007d49]">Offices</span></h2>
                     <p className="text-slate-600 dark:text-zinc-400 mb-10 text-lg leading-relaxed">
                        Our 24/7 **Incubation Hub** provides teams with dedicated high-speed workstations,
                        private cloud servers, and meeting zones designed for rapid iteration. It's not
                        just an office; it's where Cambodia's future tech-leaders are forged.
                     </p>
                     <div className="space-y-4">
                        <div className="flex items-center gap-4 p-6 rounded-3xl bg-[#c8c8c8]/10 dark:bg-zinc-900 border border-[#c8c8c8]/30 hover:border-[#007d49]/50 transition-all">
                           <Monitor className="text-[#007d49]" />
                           <p className="text-sm font-bold uppercase tracking-widest">High-Performance Workstations</p>
                        </div>
                        <div className="flex items-center gap-4 p-6 rounded-3xl bg-[#c8c8c8]/10 dark:bg-zinc-900 border border-[#c8c8c8]/30 hover:border-[#007d49]/50 transition-all">
                           <Users className="text-[#007d49]" />
                           <p className="text-sm font-bold uppercase tracking-widest">Collaborative War Rooms</p>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div {...fadeIn} className="grid grid-cols-2 gap-4">
                     <img src="https://gic.itc.edu.kh/storage/site-contents/June2019/photo6339280396872689720.jpg" className="rounded-[2.5rem] w-full h-80 object-cover shadow-xl border border-[#c8c8c8]/20" alt="Office 1" />
                     <img src="https://gic.itc.edu.kh/storage/site-contents/June2019/photo63392803968726897171.jpg" className="rounded-[2.5rem] w-full h-80 object-cover mt-8 shadow-xl border border-[#c8c8c8]/20" alt="Office 2" />
                  </motion.div>
               </div>
            </div>
         </section>

         {/* 4. SEASONAL HERITAGE: THE SEASON EXPLORER (S1-S8) */}
         <section className="py-24 bg-zinc-950 text-white rounded-[4rem] mx-4 md:mx-6 overflow-hidden relative border border-[#c8c8c8]/10">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <motion.div {...fadeIn} className="text-center mb-20">
                  <div className="flex items-center justify-center gap-3 mb-6">
                     <History className="text-[#007d49]" />
                     <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">The Heritage Explorer</h2>
                  </div>
                  <p className="text-[#c8c8c8] max-w-2xl mx-auto text-lg">Navigating through 8 seasons of innovation, competition, and victory.</p>
               </motion.div>

               <div className="flex flex-col lg:flex-row gap-12">
                  {/* Season Selector */}
                  <div className="lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 no-scrollbar">
                     {seasonalData.map((data, i) => (
                        <button
                           key={i}
                           onClick={() => setSelectedSeason(i)}
                           className={`px-8 py-5 rounded-2xl text-left transition-all shrink-0 ${selectedSeason === i ? 'bg-[#007d49] text-white shadow-xl scale-105' : 'bg-white/5 text-[#c8c8c8] hover:bg-white/10 border border-transparent hover:border-[#c8c8c8]/20'}`}
                        >
                           <span className="block text-[10px] font-black uppercase tracking-widest opacity-60">{data.year}</span>
                           <span className="text-xl font-black tracking-tighter">{data.season}</span>
                        </button>
                     ))}
                  </div>

                  {/* Selected Season Detail */}
                  <div className="lg:w-3/4">
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={selectedSeason}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: -20 }}
                           className="p-12 md:p-16 rounded-[4rem] bg-white/5 border border-[#c8c8c8]/20 backdrop-blur-xl h-full flex flex-col justify-between"
                        >
                           <div>
                              <div className="flex justify-between items-start mb-10">
                                 <div>
                                    <h3 className="text-5xl font-black tracking-tighter mb-2">{selectedSeasonData?.season} Winner</h3>
                                    <p className="text-[#007d49] text-2xl font-black uppercase tracking-widest">{selectedSeasonData?.winner}</p>
                                 </div>
                                 <div className="w-20 h-20 rounded-3xl bg-[#007d49] flex items-center justify-center shadow-2xl">
                                    <Rocket size={32} />
                                 </div>
                              </div>
                              <p className="text-xl text-[#c8c8c8] leading-relaxed mb-12 italic">"{selectedSeasonData?.desc}"</p>
                           </div>

                           <div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#c8c8c8]/60 mb-6">Top Selected Teams</h4>
                              <div className="flex flex-wrap gap-4">
                                 {selectedSeasonData?.teams.map((team) => (
                                    <div key={team} className="px-8 py-4 rounded-2xl bg-white/5 border border-[#c8c8c8]/20 font-black text-sm hover:border-[#007d49] transition-all cursor-default group">
                                       <Sparkles className="inline-block mr-2 text-[#007d49] group-hover:animate-spin" size={16} /> {team}
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </motion.div>
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </section>

         {/* 5. INNOVATION IMPACT GALLERY */}
         <section className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6">
               {/* HEADER */}
               <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <motion.div {...fadeIn}>
                     <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-4">
                        <Flame className="text-[#007d49]" fill="currentColor" />
                        Innovation <span className="text-[#007d49]">in Action</span>
                     </h2>
                     <p className="mt-4 text-slate-500 font-medium max-w-xl border-l-4 border-[#007d49] pl-6 py-2">
                        A vibrant showcase of Young Cambodian Students activating their potential
                        through leadership and technical creativity.
                     </p>
                  </motion.div>
                  <div className="hidden md:block">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8c8c8]">
                        GIC Incubation Hub / TIC Seasons 1-8
                     </span>
                  </div>
               </div>

               {/* DYNAMIC BENTO GRID LOOP */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                  {galleryItems.map((item, i) => (
                     <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className={`group relative rounded-[2.5rem] overflow-hidden border border-[#c8c8c8]/30 shadow-lg ${item.span}`}
                     >
                        <img
                           src={item.image}
                           className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                           alt={`TIC Competition Moment - ${item.label}`}
                        />

                        {/* THEMATIC OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#007d49]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                           <div className="flex items-center gap-2 mb-1 text-white">
                              <Star size={12} fill="currentColor" />
                              <p className="text-[9px] font-black uppercase tracking-widest">GIC Excellence</p>
                           </div>
                           <h4 className="text-white text-base font-black leading-tight">
                              {item.label}
                           </h4>
                           <p className="text-white/70 text-[10px] mt-1 font-medium">
                              TIC Engineering Showcase
                           </p>
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* CTA SECTION */}
               <motion.div
                  {...fadeIn}
                  className="mt-16 flex flex-col md:flex-row items-center justify-between p-10 rounded-[3rem] bg-[#c8c8c8]/10 border border-[#c8c8c8]/30"
               >
                  <p className="text-sm text-slate-500 font-bold max-w-md text-center md:text-left">
                     Revealing student potential to stakeholders and solving real-world problems
                     through STEM-based innovation.
                  </p>
                  <Button
                     className="mt-6 md:mt-0 bg-[#007d49] text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-[#007d49]/20 flex items-center gap-2"
                     href="https://web.facebook.com/innovationchallengecambodia/photos"
                  >
                     EXPLORE SEASON 9 <Rocket size={18} />
                  </Button>
               </motion.div>
            </div>
         </section>
      </div>
   );
}

// --------------------------------------------------------------------------------
// OVERVIEW CARD COMPONENT
// --------------------------------------------------------------------------------
function OverviewCard({ icon, title, desc }: any) {
   return (
      <Card className="p-10 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900 border border-divider shadow-none hover:border-blue-600/30 transition-all group h-full">
         <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {icon}
         </div>
         <h4 className="text-xl font-black tracking-tight mb-3 uppercase">{title}</h4>
         <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">{desc}</p>
      </Card>
   );
}

function TechnoLogo() {
   return (
      <div className="flex items-center justify-center p-12 bg-white dark:bg-zinc-950 rounded-[3rem]">
         <div className="flex flex-col items-center leading-none text-center">
            {/* Row 1: TECHNO */}
            <h1
               className="font-sans font-[800] tracking-[0.15em] text-[#1D56A5]"
               style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
            >
               TECHNO
            </h1>

            {/* Row 2: INNOVATION CHALLENGE */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 mt-2">
               <h2
                  className="font-sans font-bold tracking-tight text-[#1D56A5]"
                  style={{ fontSize: "clamp(1.2rem, 4.5vw, 3rem)" }}
               >
                  INNOVATION
               </h2>

               <div
                  className="bg-[#78D3D2] rounded-lg px-4 py-1 flex items-center justify-center"
                  style={{ height: "fit-content" }}
               >
                  <h2
                     className="font-sans font-bold text-white tracking-tight"
                     style={{ fontSize: "clamp(1.2rem, 4.5vw, 3rem)" }}
                  >
                     CHALLENGE
                  </h2>
               </div>
            </div>

            {/* Row 3: CAMBODIA */}
            <h1
               className="font-sans font-bold tracking-[0.15em] text-[#1D56A5] mt-2"
               style={{ fontSize: "clamp(1.8rem, 7vw, 4.5rem)" }}
            >
               CAMBODIA
            </h1>
         </div>
      </div>
   );
}
