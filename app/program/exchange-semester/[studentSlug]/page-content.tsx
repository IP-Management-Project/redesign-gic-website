"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  GraduationCap, 
  BookOpen, 
  Globe, 
  ArrowLeft,
  Quote,
  Cpu,
  ShieldCheck
} from "lucide-react";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { useExchangeStudentProfile } from "@/hooks/useExchangeStudentProfile";

export default function ExchangeDetailPage({ params }: { params: { studentSlug: string } }) {
  const { studentSlug } = params;
  const { data: studentData } = useExchangeStudentProfile(studentSlug);

  if (!studentData) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="relative h-[60vh] bg-[#26304d] overflow-hidden flex items-end">
        <div className="absolute inset-0 opacity-20">
           <img src={studentData.gallery[0]} className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#26304d] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 w-full pb-16 relative z-10">
          {/* <Link href="/exchange" className="inline-flex items-center gap-2 text-[#76879d] mb-8 hover:text-white transition-colors uppercase text-xs font-black tracking-widest">
            <ArrowLeft size={16} /> Back to Exchange Hub
          </Link> */}
          <div className="flex flex-col md:flex-row items-end gap-8">
            <Avatar 
              src={studentData.portrait} 
              className="w-40 h-40 border-4 border-[#76879d] shadow-2xl shrink-0" 
            />
            <div className="mb-2">
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                {studentData.name}
              </h1>
              <div className="flex flex-wrap gap-4 mt-4 text-[#76879d]">
                <span className="flex items-center gap-2 font-black uppercase text-xs tracking-widest"><MapPin size={16} /> {studentData.school}, {studentData.country}</span>
                <span className="flex items-center gap-2 font-black uppercase text-xs tracking-widest"><Calendar size={16} /> {studentData.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16">
        {/* Left: The Story */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black text-[#26304d] uppercase mb-8 border-b-4 border-[#c8c8c8] inline-block">
            The Journey
          </h2>
          <div className="relative mb-12">
            <Quote className="absolute -top-6 -left-8 text-[#76879d] opacity-20" size={60} />
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic">
              {studentData.mainStory}
            </p>
          </div>

          <h3 className="text-2xl font-black text-[#26304d] uppercase mb-8">Exchange Gallery</h3>
          <div className="grid grid-cols-2 gap-4">
             {studentData.gallery.map((img, idx) => (
               <div key={idx} className="rounded-[2.5rem] overflow-hidden border border-[#c8c8c8] h-64 shadow-xl">
                  <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Activity" />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Technical Stats & Learnings */}
        <div className="space-y-8">
          <div className="p-10 rounded-[3rem] bg-[#76879d]/10 border border-[#76879d]/20">
            <h4 className="text-xl font-black text-[#26304d] uppercase mb-6 flex items-center gap-2">
              <Cpu size={24} /> Technical Profile
            </h4>
            <div className="space-y-4">
              <ProfileStat label="Academic Year" value={studentData.year} />
              <ProfileStat label="Focus Area" value={studentData.focus} />
              <ProfileStat label="Institution" value={studentData.school} />
            </div>
          </div>

          <div className="p-10 rounded-[3rem] bg-[#26304d] text-white">
            <h4 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
              <ShieldCheck className="text-[#76879d]" /> Core Learnings
            </h4>
            <ul className="space-y-4">
              {studentData.learnings.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-[#76879d]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#76879d] mt-1.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#76879d] mb-1">{label}</p>
      <p className="text-sm font-bold text-[#26304d]">{value}</p>
    </div>
  );
}
