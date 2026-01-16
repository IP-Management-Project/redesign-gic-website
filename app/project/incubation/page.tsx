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

const seasonalData = [
   { season: "Season 8", year: "2025", winner: "EcoPulse AI", teams: ["EcoPulse", "KhmerPay", "AgroTech"], desc: "Focus on AI-driven sustainability." },
   { season: "Season 7", year: "2024", winner: "CyberShield GIC", teams: ["CyberShield", "EduConnect", "LogiKh"], desc: "Emphasis on Cybersecurity and Education." },
   { season: "Season 6", year: "2023", winner: "SmartGrid KH", teams: ["SmartGrid", "HealthPoint", "V-Retail"], desc: "Innovations in Energy and Health-tech." },
   { season: "Season 5", year: "2022", winner: "L2K Romanizer", teams: ["L2K", "SwiftBiz", "SecureAuth"], desc: "Pioneering Khmer NLP applications." },
   { season: "Season 4", year: "2021", winner: "FarmFlow", teams: ["FarmFlow", "TrackIt", "MarketHub"], desc: "Agri-tech and supply chain focus." },
   { season: "Season 3", year: "2020", winner: "MedLink", teams: ["MedLink", "CodeCamp", "FinVibe"], desc: "Digital healthcare solutions." },
   { season: "Season 2", year: "2019", winner: "KhmerOCR Pro", teams: ["KhmerOCR", "BusLine", "EasyWash"], desc: "Early adoption of Computer Vision." },
   { season: "Season 1", year: "2018", winner: "GIC Startup 01", teams: ["Startup01", "WebReady", "LocalGuide"], desc: "The foundational year of TIC." },
];

const galleryItems = [
   {
      id: 1,
      label: "Team Collaboration",
      image: "https://scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/558978686_1238860318271947_3288537438497057440_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGvdOTtEsnN-7X4xRBIV97ULJlGAFp2GCksmUYAWnYYKb8JkR6v9nVy_L7h1XBfZBDepVR6gKwXz4C13n07_W9C&_nc_ohc=H2waghLz5l4Q7kNvwGPub8H&_nc_oc=AdkwycQwSeKHSvdM74lBA0C8BB5BkreWD6oWCorlaYMVlFDejV7RYtmYgOOLgw_hjRM&_nc_zt=23&_nc_ht=scontent.fpnh5-2.fna&_nc_gid=9kyxLlyEjGiV4Ss9vysIag&oh=00_AfpqGGMXqLZXm8G2fMSXZ76JzH_PV5Ux6fyPhnx8LL4coA&oe=696F85D0",
      span: "md:col-span-2 md:row-span-1"
   },
   {
      id: 2,
      label: "Deep-Tech R&D",
      image: "https://scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/559563753_1238859958271983_785469373472755855_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGQVQE8c3xwwjQs_8SqouYWxirwoCxE4JbGKvCgLETglq7YrFZyXzM9fRMXdmjzQ9yEse6lZlJalY2dW5P3bMJA&_nc_ohc=qPsYKzlPV5MQ7kNvwExo6gs&_nc_oc=AdlonmUeM7Krvp_i6LlbXsY_8B7TWFFcryY_mvfyFQlYfAq07gCgHb8Q2ZwXMytlPHo&_nc_zt=23&_nc_ht=scontent.fpnh5-3.fna&_nc_gid=VVudBt65y2m3UnaHj--FVA&oh=00_Afq4M8zyak3b9kBqAiqflY4cg4OghylXkzpDy_pNupo0TQ&oe=696F64C0",
      span: "md:col-span-1 md:row-span-2"
   },
   {
      id: 3,
      label: "Pitch Prep",
      image: "https://scontent.fpnh5-1.fna.fbcdn.net/v/t39.30808-6/557630731_1238859601605352_9035987190156655488_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEgentrVbWVfJSLqFeZswsi9N0UX4n_sQL03RRfif-xAgCiP0UKmtw1OOLm7s6SuJ3Ojp6CKlkfRwr9dxj72oCB&_nc_ohc=_CtkJLEFqoUQ7kNvwHEuJmO&_nc_oc=Adku00rY2jht2Sgc8ROgqKjkLj0_jls2ql7UE2szVQngLOu5_iUbHYaCjdnGBaNftrc&_nc_zt=23&_nc_ht=scontent.fpnh5-1.fna&_nc_gid=IBwWbWFHhXuCl3RCqe9HJA&oh=00_Afo4CEg_ebM9m4m4gFX0WMyX5XGNmzmk2tOcDGJNeehwVA&oe=696F73AC",
      span: "md:col-span-1 md:row-span-1"
   },
   {
      id: 4,
      label: "Mentorship",
      image: "https://scontent.fpnh5-4.fna.fbcdn.net/v/t39.30808-6/538405292_1202814045209908_793807315325429063_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHTsMeXF14N4yK0X77x0ZkLIcY4hNw8fJIhxjiE3Dx8kopjtVGODmu_rnBb3h-9KKRutk6OA8nd6It6p4wjxD3S&_nc_ohc=wy-K185nCrsQ7kNvwFeyLbq&_nc_oc=Adnud4-7-qO8KVhkZJf4uF0Igwt7EEXy2thbHSHnZqLDWc26yCODr3TgumBCmZ_VWbk&_nc_zt=23&_nc_ht=scontent.fpnh5-4.fna&_nc_gid=MpNzSaK3nkAywk1m-dfHew&oh=00_AfrPiXo6eFV7xlE8b0ZySxb1dSOLF5pvTqVjfUda4iTu9w&oe=696F877D",
      span: "md:col-span-1 md:row-span-1"
   },
   {
      id: 5,
      label: "Final Pitch",
      image: "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/511699120_1151205027037477_7611794635371917837_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfUuERfkxVUsGQLLFcapGndWd4wsNUJXp1Z3jCw1Qlei5ey7qScH-MQ7So8RKc2v9NevuwMrnBVfGVMxrzR5p-&_nc_ohc=bXyIEgt4gNMQ7kNvwFnCEin&_nc_oc=Adnt4apA7krU23VbirxxzLaeKWnR8XBIRHOB9rkDiqbXecEWTQlJmeHmi_X734PeIus&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=99Onz1diPShY2j2w4PuvUw&oh=00_Afo3Ga5vX7LxbGI7BXKrGMx3SCDGJo3wYt9kU60URuLfGg&oe=696F7780",
      span: "md:col-span-1 md:row-span-2"
   },
   {
      id: 6,
      label: "The TIC Community",
      image: "https://scontent.fpnh5-6.fna.fbcdn.net/v/t39.30808-6/529739917_1188654433292536_4362865142075681020_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGdb2T5xhLQ-ocZsAk0oUBYhjkUuQ4q_vyGORS5Dir-_B3iGDEp69uB8XZi9sXSZrN34FtyMDXsWBIYGKdfOkQD&_nc_ohc=kxq2Mntun1YQ7kNvwH9nWYW&_nc_oc=AdmezfEr9x6qXLorHmWUNdhzymnZHx72bzQFRx4fgpVR3bq-m_ZfIPIAXpm2HVZ4XKc&_nc_zt=23&_nc_ht=scontent.fpnh5-6.fna&_nc_gid=Yw-yo32kULhWGuPHYe-DnQ&oh=00_AfpEcRFOxo-XxQTlIztNOJpAReDddIwJfPdsRNMXt24sOw&oe=696F5F18",
      span: "md:col-span-2 md:row-span-2"
   },
   {
      id: 7,
      label: "Awards Night",
      image: "https://scontent.fpnh5-6.fna.fbcdn.net/v/t39.30808-6/510516476_1151203370370976_384403387145784598_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFAKonzoxvNotXn7trjv58hcP4E8vNOvXBw_gTy8069cC9ul70bg2Ly8Vnk0mjZlMF3Mfvr-YCIFCM3U0aPwbFE&_nc_ohc=gAItZlOPM3oQ7kNvwG6SsOO&_nc_oc=AdnJY7TzNkMOImCdzZhqC_AgpMxUhcfpzdw74Ou4fq2j66yh0oOe62P9pLk2kSsHQrM&_nc_zt=23&_nc_ht=scontent.fpnh5-6.fna&_nc_gid=VYapmksD1jl0n_6tYrRHgQ&oh=00_AfqZ0udB_x1oSYBpNoWwr-qNNrm6vYuoFHWP7WzfFyduCg&oe=696F62D1",
      span: "md:col-span-1 md:row-span-1"
   },
];

export default function TICShowcasePage() {
   const [selectedSeason, setSelectedSeason] = useState(0);

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
                                    <h3 className="text-5xl font-black tracking-tighter mb-2">{seasonalData[selectedSeason].season} Winner</h3>
                                    <p className="text-[#007d49] text-2xl font-black uppercase tracking-widest">{seasonalData[selectedSeason].winner}</p>
                                 </div>
                                 <div className="w-20 h-20 rounded-3xl bg-[#007d49] flex items-center justify-center shadow-2xl">
                                    <Rocket size={32} />
                                 </div>
                              </div>
                              <p className="text-xl text-[#c8c8c8] leading-relaxed mb-12 italic">"{seasonalData[selectedSeason].desc}"</p>
                           </div>

                           <div>
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#c8c8c8]/60 mb-6">Top Selected Teams</h4>
                              <div className="flex flex-wrap gap-4">
                                 {seasonalData[selectedSeason].teams.map(team => (
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