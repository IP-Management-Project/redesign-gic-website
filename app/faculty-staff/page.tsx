"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  Globe, 
  Mail, 
  GraduationCap, 
  GitGraph, 
  LayoutGrid, 
  Award,
  Search,
  Cpu,
  User2
} from "lucide-react";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";

// 1. COMPLETE DATA STRUCTURE
const facultyData = {
  management: [
    {
      name: "Head Dep",
      role: "Head of the Department",
      degree: "Information Technology, Ph.D.",
      portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      uniLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/ITC_Logo.svg/1200px-ITC_Logo.svg.png",
      focus: "Institutional leadership and strategic development of GIC."
    },
    {
      name: "Vice Head",
      role: "Vice-Head of Department",
      degree: "Software Engineering, Master",
      portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      uniLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/ITC_Logo.svg/1200px-ITC_Logo.svg.png",
      focus: "Overseeing academic programs and department infrastructure."
    },
  ],
  lecturers: [
    { name: "Lecturer", role: "Coordinator", degree: "International Program, Coordinator", portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Managing international cooperation and joint-degree programs." },
    { name: "Lecturer", role: "Lecturer", degree: "Cloud Computing, Lecturer", portrait: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Specializing in distributed systems and network architecture." },
    { name: "Lecturer", role: "Lecturer", degree: "Artificial Intelligence, Lecturer", portrait: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Researching machine learning models for Khmer language." },
    { name: "Lecturer", role: "Lecturer", degree: "Cybersecurity, Lecturer", portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Focusing on secure software lifecycles and encryption." },
    { name: "Lecturer", role: "Lecturer", degree: "Web Technologies, Lecturer", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Modern web frameworks and scalable frontend design." },
    { name: "TOUCH Sereysethy", role: "Lecturer", degree: "Mobile Development, Lecturer", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "iOS and Android native application development." },
    { name: "NOU Sotheany", role: "Lecturer", degree: "Software Quality, Lecturer", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Testing methodologies and software maintenance." },
  ],
  researchers: [
    { name: "VALY Dona", role: "Researcher", degree: "NLP Specialist, Researcher", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Advancing Khmer Natural Language Processing." },
    { name: "KONG Phutphalla", role: "Researcher", degree: "Computer Vision, Researcher", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Optical Character Recognition (OCR) for Khmer script." },
    { name: "SOK Kimheng", role: "Researcher", degree: "Data Science, Researcher", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Data analysis and predictive modeling." },
  ],
  staff: [
    { name: "SRIN Sreyneth", role: "Administrator", degree: "Administration, Staff", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Department operations and student coordination." },
    { name: "SREY Sokhom", role: "Developer", degree: "Contents, Developer", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "E-learning platform content development." },
    { name: "CHOM Sreylam", role: "Developer", degree: "Contents, Developer", portrait: "", uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png", focus: "Multimedia assets and educational tools." },
  ]
};

export default function FacultyPage() {
  const [viewMode, setViewMode] = useState<"portrait" | "hierarchy">("portrait");

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-gray-100 dark:border-zinc-900 pb-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4">
              Faculty <span className="text-blue-600">& Staff</span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium text-lg">
              The engineers and researchers shaping the future of GIC.
            </p>
          </div>

          <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-2xl border border-gray-200 dark:border-zinc-800">
            <button onClick={() => setViewMode("portrait")} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${viewMode === "portrait" ? "bg-white dark:bg-zinc-800 text-blue-600 shadow-sm" : "text-gray-500"}`}>
              <LayoutGrid size={18} /> Portraits
            </button>
            <button onClick={() => setViewMode("hierarchy")} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${viewMode === "hierarchy" ? "bg-white dark:bg-zinc-800 text-blue-600 shadow-sm" : "text-gray-500"}`}>
              <GitGraph size={18} /> Hierarchy
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "portrait" ? (
            <motion.div 
              key="portrait"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {facultyData.management.map((leader) => <ExecutiveCard key={leader.name} leader={leader} />)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
                {[...facultyData.lecturers, ...facultyData.researchers, ...facultyData.staff].map((prof) => (
                  <PortraitCard key={prof.name} prof={prof} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="hierarchy"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="overflow-x-auto py-12"
            >
              <HierarchyView data={facultyData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------
// HIERARCHY VIEW LOGIC
// --------------------------------------------------------------------------------
function HierarchyView({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center min-w-[1200px]">
      {/* Management Root */}
      <div className="flex flex-col items-center">
        <div className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-blue-600/20">
          {data.management[0].name}
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100">{data.management[0].role}</p>
        </div>
        <div className="h-8 w-px bg-blue-600/30" />
        <div className="px-6 py-3 bg-white dark:bg-zinc-900 border-2 border-blue-600 rounded-xl font-bold">
          {data.management[1].name}
          <p className="text-[9px] font-bold uppercase tracking-widest text-default-500">{data.management[1].role}</p>
        </div>
        
        {/* Main Trunk */}
        <div className="h-12 w-px bg-divider" />
        <div className="h-px w-[80%] bg-divider" />
      </div>

      {/* Department Branches */}
      <div className="grid grid-cols-3 w-full mt-0">
        
        {/* Academic Branch */}
        <div className="flex flex-col items-center border-t border-divider">
          <div className="h-8 w-px bg-divider" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Academic Unit</span>
          <div className="flex flex-col gap-3">
            {data.lecturers.map((p: any) => <HierarchyNode key={p.name} name={p.name} role={p.role} />)}
          </div>
        </div>

        {/* Research Branch */}
        <div className="flex flex-col items-center border-t border-divider">
          <div className="h-8 w-px bg-divider" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Research Unit</span>
          <div className="flex flex-col gap-3">
            {data.researchers.map((p: any) => <HierarchyNode key={p.name} name={p.name} role={p.role} color="purple" />)}
          </div>
        </div>

        {/* Support/Tech Branch */}
        <div className="flex flex-col items-center border-t border-divider">
          <div className="h-8 w-px bg-divider" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Technical & Admin</span>
          <div className="flex flex-col gap-3">
            {data.staff.map((p: any) => <HierarchyNode key={p.name} name={p.name} role={p.role} color="emerald" />)}
          </div>
        </div>

      </div>
    </div>
  );
}

function HierarchyNode({ name, role, color = "blue" }: any) {
  const colors: any = {
    blue: "border-blue-500/20 text-blue-600 bg-blue-50/50",
    purple: "border-purple-500/20 text-purple-600 bg-purple-50/50",
    emerald: "border-emerald-500/20 text-emerald-600 bg-emerald-50/50"
  };
  return (
    <div className={`w-64 p-4 rounded-xl border bg-white dark:bg-zinc-900 shadow-sm transition-all hover:scale-105 hover:shadow-md ${colors[color] || colors.blue}`}>
      <h5 className="font-black text-sm text-foreground">{name}</h5>
      <p className="text-[9px] font-bold uppercase tracking-widest text-default-400">{role}</p>
    </div>
  );
}

// --------------------------------------------------------------------------------
// CARDS (Portrait & Executive)
// --------------------------------------------------------------------------------

function ExecutiveCard({ leader }: { leader: any }) {
  return (
    <Card className="group relative h-[450px] w-full border border-divider overflow-hidden bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-none hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500">
      <div className="flex h-full flex-col md:flex-row">
        <div className="md:w-2/5 h-1/2 md:h-full relative overflow-hidden">
          <img src={leader.portrait} className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white dark:to-zinc-900 hidden md:block" />
        </div>
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-blue-600" size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{leader.role}</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2 tracking-tighter">{leader.name}</h3>
          <p className="text-default-500 font-bold text-sm mb-6 flex items-center gap-2">
            <GraduationCap size={16} className="text-blue-500" /> {leader.degree}
          </p>
          <Divider className="my-6 opacity-50" />
          <p className="text-sm text-default-600 italic leading-relaxed mb-8 opacity-80">"{leader.focus}"</p>
          <div className="flex gap-4">
            <Button size="sm" variant="flat" color="primary" className="font-bold">Contact Office</Button>
            <Button size="sm" variant="light" className="font-bold">Full Profile →</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PortraitCard({ prof }: { prof: any }) {
  return (
    <Card className="group relative h-[600px] w-full border-none overflow-hidden bg-zinc-900 rounded-3xl">
      {prof.portrait ? (
        <img src={prof.portrait} alt={prof.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-800"><User2 size={120} /></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent via-10% opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 p-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
            <img src={prof.uniLogo} alt="Logo" className="h-full w-full object-contain" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 leading-tight">
            {prof.degree.includes(',') ? prof.degree.split(',')[1] : prof.degree}
          </span>
        </div>
        <h3 className="text-2xl font-black text-white leading-tight">{prof.name}</h3>
        <p className="text-zinc-400 text-sm mt-1 mb-4">{prof.degree.includes(',') ? prof.degree.split(',')[0] : prof.role}</p>
        <Divider className="bg-white/10 mb-4" />
        <p className="text-xs text-zinc-300 line-clamp-2 italic mb-2 opacity-80">{prof.focus}</p>
        <div className="h-0 group-hover:h-10 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center">
          <button className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">View Full Profile <span className="text-blue-500 text-lg">→</span></button>
        </div>
      </div>
    </Card>
  );
}
