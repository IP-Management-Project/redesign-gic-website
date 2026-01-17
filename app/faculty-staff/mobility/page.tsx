"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User2, 
  LayoutGrid, 
  GitGraph, 
  Mail, 
  GraduationCap, 
  Globe,
  ChevronRight
} from "lucide-react";

// 1. DATA STRUCTURE
const facultyData = {
  management: [
    { name: "LAY Heng", role: "Head of the Department", spec: "Ph.D. in Computer Science", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
    { name: "SEAK Leng", role: "Vice-Head of the Department", spec: "Master of Software Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
  ],
  lecturers: [
    { name: "PICH Reatrey", role: "Coordinator of International Program", spec: "Data Science Specialist" },
    { name: "Tongsreng Tal", role: "Lecturer", spec: "Cloud Infrastructure" },
    { name: "CHHUO Vanna", role: "Lecturer", spec: "Artificial Intelligence" },
    { name: "YOU Vanndy", role: "Lecturer", spec: "Network Security" },
    { name: "BOU Channa", role: "Lecturer", spec: "Web Development" },
    { name: "TOUCH Sereysethy", role: "Lecturer", spec: "Mobile Computing" },
    { name: "NOU Sotheany", role: "Lecturer", spec: "Software Architecture" },
  ],
  researchers: [
    { name: "VALY Dona", role: "Researcher", spec: "Natural Language Processing" },
    { name: "KONG Phutphalla", role: "Researcher", spec: "Image Processing & OCR" },
    { name: "SOK Kimheng", role: "Researcher", spec: "Machine Learning" },
  ],
  staff: [
    { name: "SRIN Sreyneth", role: "Administrator", spec: "Department Management" },
    { name: "SREY Sokhom", role: "Contents Developer", spec: "E-Learning Specialist" },
    { name: "CHOM Sreylam", role: "Contents Developer", spec: "Multimedia Design" },
  ]
};

export default function FacultyPage() {
  const [viewMode, setViewMode] = useState<"portrait" | "hierarchy">("portrait");

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER & TOGGLE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              Faculty <span className="text-blue-600">& Staff</span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium">
              Meet the experts, researchers, and visionaries driving the Global Innovation Center forward.
            </p>
          </div>

          {/* TOGGLE SWITCH */}
          <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-2xl border border-gray-200 dark:border-zinc-800">
            <button 
              onClick={() => setViewMode("portrait")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${viewMode === "portrait" ? "bg-white dark:bg-zinc-800 text-blue-600 shadow-sm" : "text-gray-500"}`}
            >
              <LayoutGrid size={18} /> Portrait View
            </button>
            <button 
              onClick={() => setViewMode("hierarchy")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${viewMode === "hierarchy" ? "bg-white dark:bg-zinc-800 text-blue-600 shadow-sm" : "text-gray-500"}`}
            >
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
              className="space-y-20"
            >
              {/* MANAGEMENT PORTRAITS */}
              <section>
                <div className="grid md:grid-cols-2 gap-8">
                  {facultyData.management.map((person) => (
                    <PortraitCard key={person.name} person={person} featured />
                  ))}
                </div>
              </section>

              {/* LECTURERS & OTHERS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...facultyData.lecturers, ...facultyData.researchers, ...facultyData.staff].map((person) => (
                  <PortraitCard key={person.name} person={person} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="hierarchy"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="relative py-10 overflow-x-auto"
            >
              <HierarchyView data={facultyData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 2. PORTRAIT CARD COMPONENT
function PortraitCard({ person, featured = false }: { person: any; featured?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-all hover:shadow-2xl hover:shadow-blue-600/10 ${featured ? 'p-8 md:p-12' : 'p-6'}`}
    >
      <div className={`flex ${featured ? 'flex-col md:flex-row' : 'flex-col'} gap-8 items-center`}>
        {/* Avatar */}
        <div className={`relative shrink-0 ${featured ? 'w-48 h-48 md:w-64 md:h-64' : 'w-32 h-32'} rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-zinc-800`}>
          {person.img ? (
            <img src={person.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={person.name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300"><User2 size={featured ? 64 : 32} /></div>
          )}
        </div>

        {/* Info */}
        <div className="flex-grow text-center md:text-left">
          <h3 className={`${featured ? 'text-3xl' : 'text-xl'} font-black tracking-tighter text-slate-900 dark:text-white mb-2`}>
            {person.name}
          </h3>
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">
            {person.role}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-zinc-400 text-sm italic">
            <GraduationCap size={16} /> {person.spec}
          </div>
          
          <div className="mt-6 flex justify-center md:justify-start gap-3">
             <button className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:text-blue-600 transition-colors"><Mail size={18} /></button>
             <button className="p-2 rounded-xl bg-gray-50 dark:bg-zinc-800 hover:text-blue-600 transition-colors"><Globe size={18} /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 3. HIERARCHY TREE VIEW
function HierarchyView({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center gap-12 min-w-[1000px]">
      {/* HEAD UNIT */}
      <div className="flex flex-col items-center">
        <HierarchyNode name={data.management[0].name} role={data.management[0].role} isHead />
        <div className="h-12 w-px bg-gray-200 dark:bg-zinc-800" />
        <HierarchyNode name={data.management[1].name} role={data.management[1].role} />
        
        {/* Connector Line Down */}
        <div className="h-12 w-px bg-gray-200 dark:bg-zinc-800" />
        <div className="h-px w-[80%] bg-gray-200 dark:bg-zinc-800" />
      </div>

      {/* BRANCHES */}
      <div className="grid grid-cols-3 w-full gap-8">
        
        {/* Column 1: Lecturers */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Lecturers</h4>
          {data.lecturers.map((p: any) => (
            <HierarchyNode key={p.name} name={p.name} role={p.role} small />
          ))}
        </div>

        {/* Column 2: Researchers */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Research Unit</h4>
          {data.researchers.map((p: any) => (
            <HierarchyNode key={p.name} name={p.name} role={p.role} small />
          ))}
        </div>

        {/* Column 3: Staff */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800" />
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Technical/Admin</h4>
          {data.staff.map((p: any) => (
            <HierarchyNode key={p.name} name={p.name} role={p.role} small />
          ))}
        </div>

      </div>
    </div>
  );
}

function HierarchyNode({ name, role, isHead = false, small = false }: any) {
  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm transition-all hover:border-blue-500 text-center ${isHead ? 'w-80 border-blue-500' : 'w-64'}`}>
      <h5 className={`font-black tracking-tight ${small ? 'text-sm' : 'text-lg'}`}>{name}</h5>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{role}</p>
    </div>
  );
}