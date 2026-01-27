"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  User, 
  BookOpen, 
  Download, 
  Info
} from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { Tooltip } from "@heroui/tooltip";
import { Divider } from "@heroui/divider";

import { useTimetableData, FIXED_SLOTS, type TimetableSession } from "@/hooks/useTimetableData";

export default function TimetableClientPage() {
  const { data, isLoading } = useTimetableData();
  
  const [selectedYear, setSelectedYear] = useState("Year 3");
  const [selectedSem, setSelectedSem] = useState("Semester I");

  const filteredTimetable = useMemo(() => {
    return data?.timetable.filter(
      (s) => s.academicYear === selectedYear && s.semester === selectedSem
    ) || [];
  }, [data, selectedYear, selectedSem]);

  if (isLoading || !data) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <Spinner label="Syncing Academic Schedule..." color="primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-12 md:py-24">
      <div className="max-w-[1600px] mx-auto px-20">
        
        {/* --- HEADER --- */}
        <header className="mb-20 flex flex-col  lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none uppercase ">
              GIC <span className="text-blue-600">Timetable</span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium text-lg uppercase tracking-widest">
              Digital Course Orchestration • 2025/2026
            </p>
          </div>

          <div className="flex flex-wrap gap-4 bg-gray-50 dark:bg-zinc-900 p-3 rounded-[2rem] border border-divider">
            <Select 
              label="Year Group" 
              className="w-44" 
              variant="bordered"
              selectedKeys={[selectedYear]}
              onSelectionChange={(keys) => setSelectedYear(Array.from(keys)[0] as string)}
            >
              {data.academicYears.map((y) => (
                <SelectItem key={y} textValue={y}>{y}</SelectItem>
              ))}
            </Select>
            <Select 
              label="Semester" 
              className="w-44" 
              variant="bordered"
              selectedKeys={[selectedSem]}
              onSelectionChange={(keys) => setSelectedSem(Array.from(keys)[0] as string)}
            >
              {data.semesters.map((s) => (
                <SelectItem key={s} textValue={s}>{s}</SelectItem>
              ))}
            </Select>
          </div>
        </header>

        {/* --- GRID --- */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-x-8">
          
          {/* Sidebar: Time Metadata */}
          <div className="hidden lg:flex flex-col gap-0 pt-20">
            {FIXED_SLOTS.map((slot, idx) => (
              <div key={slot} className="h-56 flex flex-col items-center justify-center relative">
                <div className="flex items-center gap-2 text-foreground font-black italic text-lg">
                  <Clock size={16} className="text-blue-600" />
                  {slot}
                </div>
                <span className="text-[10px] font-bold text-default-400 uppercase tracking-widest mt-1">2h Block</span>
                {idx !== FIXED_SLOTS.length - 1 && <Divider className="absolute bottom-0 w-1/2 left-1/4 opacity-50" />}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {data.days.map((day) => (
            <div key={day} className="flex flex-col gap-0">
              <div className="text-center p-5 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl mb-10">
                {day}
              </div>
              
              <div className="flex flex-col">
                {FIXED_SLOTS.map((slot, idx) => {
                  const session = filteredTimetable.find(s => s.day === day && s.timeSlot === slot);
                  return (
                    <div key={`${day}-${slot}`} className="h-56 flex flex-col items-stretch relative py-4">
                      <AnimatePresence mode="wait">
                        {session && (
                          <SessionCard key={session.id} session={session} />
                        )}
                      </AnimatePresence>
                      
                      {/* Sub-block Divider */}
                      {idx !== FIXED_SLOTS.length - 1 && (
                        <Divider className="absolute bottom-0 w-full opacity-30" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-32 p-12 rounded-[3rem] bg-zinc-950 text-white flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap gap-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
              <span className="text-[11px] font-black uppercase tracking-widest opacity-60">Lecture (C)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              <span className="text-[11px] font-black uppercase tracking-widest opacity-60">Tutorial (TD)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <span className="text-[11px] font-black uppercase tracking-widest opacity-60">Laboratory (TP)</span>
            </div>
          </div>
          
          <Button 
            className="font-black h-16 px-12 rounded-2xl bg-white text-black hover:bg-blue-600 hover:text-white transition-all shadow-2xl" 
            startContent={<Download size={20} />}
          >
            DOWNLOAD PLANNER
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- SESSION COMPONENT ---

function SessionCard({ session }: { session: TimetableSession }) {
  const colors = {
    C: "border-blue-600/20 bg-blue-600/5",
    TD: "border-amber-500/20 bg-amber-500/5",
    TP: "border-emerald-500/20 bg-emerald-500/5",
  };

  const chipColors = {
    C: "bg-blue-600",
    TD: "bg-amber-500",
    TP: "bg-emerald-500",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className={`w-full h-full p-6 rounded-3xl border ${colors[session.type]} flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500`}
    >
      <div className="flex justify-between items-start">
        <Chip size="sm" className={`text-white font-black text-[8px] border-none ${chipColors[session.type]}`}>
          {session.type}
        </Chip>
        <div className="text-default-300 opacity-20">
          <BookOpen size={20} />
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-black leading-tight mb-2 uppercase tracking-tight">
          {session.subject}
        </h4>
        <div className="flex items-center gap-2 text-[11px] text-default-500 font-bold uppercase tracking-wide">
          <User size={12} className="text-primary" /> {session.lecturer}
        </div>
      </div>

      <div className="pt-3 border-t border-divider/50 flex justify-between items-center">
        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
          {session.group || 'GIC'}
        </span>
        <span className="text-[9px] font-mono font-bold text-default-400">
          {session.code || 'Lab-Res'}
        </span>
      </div>
    </motion.div>
  );
}