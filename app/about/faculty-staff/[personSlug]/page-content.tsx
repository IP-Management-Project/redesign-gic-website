"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Linkedin, 
  Globe, 
  BookOpen, 
  Cpu, 
  Trophy, 
  FileText, 
  Microscope,
  GraduationCap,
  MapPin
} from "lucide-react";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tabs, Tab } from "@heroui/tabs";
import { useFacultyDetailData } from "@/hooks/useFacultyDetailData";

export default function FacultyDetailPage({ params }: { params: { personSlug: string } }) {
  const { personSlug } = params;
  const { data: facultyData } = useFacultyDetailData(personSlug);

  if (!facultyData) {
    return null;
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen pb-24">
      
      {/* 1. PROFILE HERO HEADER */}
      <section className="relative pt-32 pb-20 bg-[#26304d] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#76879d]/10 skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <Avatar 
                src="https://i.pravatar.cc/300?u=gic" 
                className="w-48 h-48 md:w-64 md:h-64 border-8 border-white dark:border-zinc-900 shadow-2xl" 
              />
            </motion.div>
            
            <motion.div {...fadeIn} className="text-center md:text-left pb-4">
              <Chip className="bg-[#76879d] text-white font-black uppercase tracking-widest text-[10px] mb-4">
                {facultyData.title}
              </Chip>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                {facultyData.name}
              </h1>
              <p className="text-[#76879d] text-xl md:text-2xl font-medium tracking-tight mb-6">
                {facultyData.position}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <SocialLink icon={<Mail size={18} />} label="Email" href={`mailto:${facultyData.email}`} />
                <SocialLink icon={<Linkedin size={18} />} label="LinkedIn" href="#" />
                <SocialLink icon={<Globe size={18} />} label="ResearcherID" href="#" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-16">
        
        {/* LEFT: BIO & RESEARCH */}
        <div className="lg:col-span-2 space-y-16">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-black text-[#26304d] uppercase mb-6 flex items-center gap-3">
              <BookOpen className="text-[#76879d]" /> Biography
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed font-medium">
              {facultyData.biography}
            </p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <Tabs aria-label="Faculty Tabs" variant="underlined" classNames={{
              tabList: "gap-6 border-b border-[#c8c8c8]",
              cursor: "w-full bg-[#26304d]",
              tab: "max-w-fit px-0 h-12 font-black uppercase text-xs tracking-widest",
              tabContent: "group-data-[selected=true]:text-[#26304d]"
            }}>
              <Tab key="research" title="Research Interests">
                <div className="flex flex-wrap gap-3 mt-8">
                  {facultyData.researchInterests.map((item, i) => (
                    <Chip key={i} variant="bordered" className="border-[#c8c8c8] text-[#26304d] font-bold uppercase text-[10px]">
                      {item}
                    </Chip>
                  ))}
                </div>
              </Tab>
              <Tab key="projects" title="Key Projects">
                <div className="space-y-4 mt-8">
                  {facultyData.projects.map((proj, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-[#c8c8c8] group hover:border-[#26304d] transition-all">
                      <Cpu className="text-[#76879d] group-hover:scale-110 transition-transform" />
                      <span className="font-black text-[#26304d] dark:text-white uppercase text-sm tracking-tight">{proj}</span>
                    </div>
                  ))}
                </div>
              </Tab>
            </Tabs>
          </motion.div>
        </div>

        {/* RIGHT: DETAILS & EDUCATION */}
        <aside className="space-y-8">
          <Card className="rounded-[3rem] border border-[#c8c8c8] shadow-none p-10 bg-white dark:bg-zinc-900">
            <h3 className="text-xl font-black text-[#26304d] uppercase mb-8 flex items-center gap-2">
              <GraduationCap className="text-[#76879d]" /> Academic Background
            </h3>
            <div className="space-y-8">
              {facultyData.education.map((edu, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-[#76879d]/30">
                  <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-[#76879d]" />
                  <p className="text-xs font-black uppercase text-[#76879d] mb-1">{edu.school}</p>
                  <p className="text-sm font-bold text-[#26304d] dark:text-white">{edu.degree}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* <Card className="rounded-[3rem] bg-[#26304d] text-white p-10 shadow-2xl">
            <h3 className="text-xl font-black uppercase mb-8 flex items-center gap-2">
               <MapPin className="text-[#76879d]" /> Location
            </h3>
            <p className="text-sm text-[#76879d] font-bold uppercase mb-8 leading-relaxed">
              {facultyData.office}
            </p>
            <Button 
              fullWidth 
              className="bg-[#76879d] text-white font-black h-14 rounded-2xl shadow-xl uppercase text-xs tracking-widest"
              startContent={<Mail size={18} />}
            >
              Contact Office
            </Button>
          </Card> */}
        </aside>
      </section>

      {/* 3. FOOTER CITATION */}
      {/* <section className="max-w-7xl mx-auto px-6 border-t border-[#c8c8c8] pt-12">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#76879d] opacity-60">
          GIC specialized researchers / Engineering the foundations of the digital world
        </p>
      </section> */}
    </div>
  );
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <Button 
      as="a" 
      href={href} 
      variant="bordered" 
      size="sm"
      className="border-[#76879d]/40 text-white font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-xl hover:bg-white hover:text-[#26304d] transition-all"
      startContent={icon}
    >
      {label}
    </Button>
  );
}
