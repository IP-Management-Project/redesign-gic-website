"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  Download, 
  GraduationCap,
  BookOpen
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

// 1. DATA STRUCTURE FOR FILTERING
const academicYears = ["Year 3", "Year 4", "Year 5", "Master 1", "Master 2"];
const semesters = ["Semester I", "Semester II"];

type SessionType = "C" | "TD" | "TP";

type TimetableSession = {
  day: string;
  time: string;
  subject: string;
  type: SessionType;
  lecturer: string;
  code?: string;
  group?: string;
};

type TimetableData = Record<string, Record<string, TimetableSession[]>>;

// Example dynamic data reflecting the provided image
const timetableData: TimetableData = {
  "Year 3": {
    "Semester I": [
      { day: "Lundi", time: "7h00 - 8h55", subject: "Statistique", type: "C", lecturer: "PHOK Ponna", code: "snk2rpb" },
      { day: "Mardi", time: "7h00 - 8h55", subject: "Anglais", type: "C", lecturer: "TBD", code: "9c3yiph" },
      { day: "Mardi", time: "13h00 - 14h55", subject: "Algorithms & Programming I", type: "C", lecturer: "BOU Channa", code: "yjdxx1g" },
      { day: "Jeudi", time: "9h10 - 11h05", subject: "Combinational & Sequential Logic I", type: "C", lecturer: "HENG Rathpisey", code: "skje0zr" },
      { day: "Vendredi", time: "13h00 - 14h55", subject: "Combinational & Sequential Logic I", type: "TP", lecturer: "HENG Rathpisey", group: "Group A" },
    ]
  }
};

export default function TimetableHub() {
  const [year, setYear] = useState("Year 3");
  const [semester, setSemester] = useState("Semester I");

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER & GLOBAL FILTERS */}
        <section className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-divider pb-12">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none">
              GIC <span className="text-blue-600">Timetable</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Access real-time schedules for Engineering and Master's programs.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 bg-gray-100 dark:bg-zinc-900 p-2 rounded-[2rem] border border-divider">
            <Select 
              label="Select Year" 
              className="w-40" 
              size="sm"
              selectedKeys={[year]}
              onSelectionChange={(keys) => setYear(Array.from(keys)[0] as string)}
            >
              {academicYears.map((academicYear) => (
                <SelectItem key={academicYear} textValue={academicYear}>
                  {academicYear}
                </SelectItem>
              ))}
            </Select>
            <Select 
              label="Semester" 
              className="w-40" 
              size="sm"
              selectedKeys={[semester]}
              onSelectionChange={(keys) => setSemester(Array.from(keys)[0] as string)}
            >
              {semesters.map((term) => (
                <SelectItem key={term} textValue={term}>
                  {term}
                </SelectItem>
              ))}
            </Select>
          </div>
        </section>

        {/* TIMETABLE GRID */}
        <div className="grid lg:grid-cols-5 gap-4">
          {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"].map((day) => (
            <div key={day} className="flex flex-col gap-4">
              <div className="text-center p-4 bg-zinc-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">
                {day}
              </div>
              
              <AnimatePresence mode="wait">
                <div className="space-y-4">
                  {timetableData[year]?.[semester]
                    ?.filter((entry) => entry.day === day)
                    .map((session, index) => (
                      <SessionCard key={`${session.subject}-${index}`} session={session} />
                    ))}
                </div>
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* LEGEND & DOWNLOAD */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 p-10 rounded-[3rem] bg-gray-50 dark:bg-zinc-900 border border-divider">
          <div className="flex flex-wrap gap-6">
            <LegendItem color="bg-blue-600" label="Cours (Lecture)" />
            <LegendItem color="bg-amber-500" label="Travaux Dirigés (Tutorial)" />
            <LegendItem color="bg-emerald-500" label="Travaux Pratiques (Lab)" />
          </div>
          <Button color="primary" className="font-black h-14 px-10 rounded-2xl" startContent={<Download size={18} />}>
            EXPORT SCHEDULE PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

function SessionCard({ session }: { session: TimetableSession }) {
  const typeColors: Record<SessionType, string> = {
    C: "bg-blue-600",
    TD: "bg-amber-500",
    TP: "bg-emerald-500",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-5 rounded-[2rem] bg-white dark:bg-zinc-800 border border-divider shadow-sm hover:border-blue-600/30 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-[9px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-widest">
          <Clock size={10} /> {session.time}
        </span>
        <div className={`px-2 py-0.5 rounded text-[8px] font-black text-white ${typeColors[session.type]}`}>
          {session.type}
        </div>
      </div>
      
      <h4 className="text-sm font-black leading-tight mb-2 group-hover:text-blue-600 transition-colors">
        {session.subject}
      </h4>
      <p className="text-[10px] text-slate-500 font-bold uppercase mb-4 flex items-center gap-1">
        <GraduationCap size={12} className="text-blue-500" /> {session.lecturer}
      </p>

      {session.group && (
        <div className="pt-2 border-t border-divider flex justify-between items-center">
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{session.group}</span>
          <span className="text-[9px] text-slate-400 font-mono italic">{session.code || 'Lab-Res'}</span>
        </div>
      )}
    </motion.div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</span>
    </div>
  );
}
