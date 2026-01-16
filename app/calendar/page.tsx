"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  LayoutGrid, 
  ListStart, 
  ChevronRight, 
  Flag, 
  BookOpen, 
  Clock,
  ArrowRight
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tabs, Tab } from "@heroui/tabs";

// 1. DATA FROM INSTITUTIONAL CALENDAR
const months = [
  "August", "September", "October", "November", "December", 
  "January", "February", "March", "April", "May", "June", "July"
];

const calendarEvents = [
  { month: "August", title: "Concours (Entrance Exam)", type: "Exam", date: "Aug 20-22", cite: 3 },
  { month: "September", title: "Jury de Septembre", type: "Admin", date: "Sep 04-12", cite: 3 },
  { month: "October", title: "Rentrée Scolaire", type: "Academic", date: "Oct 16", cite: 3 },
  { month: "October", title: "Fête des Morts (Pchum Ben)", type: "Holiday", date: "Oct", cite: 3 },
  { month: "November", title: "Fête des Eaux (Water Festival)", type: "Holiday", date: "Nov", cite: 3 },
  { month: "January", title: "Examen de Fin Semestre", type: "Exam", date: "Jan", cite: 3 },
  { month: "February", title: "CEVU / GEVU Councils", type: "Admin", date: "Feb", cite: 3 },
  { month: "June", title: "Fin Semestre (Final Exams)", type: "Exam", date: "Jun", cite: 3 },
  { month: "July", title: "Semaine de Rattrapage", type: "Academic", date: "Jul", cite: 3 },
];

export default function AcademicCalendar() {
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("grid");

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER & TOGGLE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              Academic <span className="text-blue-600">Schedule</span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium">
              A comprehensive guide to entrance exams , national holidays , and academic terms.
            </p>
          </div>

          <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-2xl border border-divider">
            <button 
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${viewMode === "grid" ? "bg-white dark:bg-zinc-800 text-blue-600 shadow-sm" : "text-gray-500"}`}
            >
              <LayoutGrid size={18} /> 12-Month Grid
            </button>
            <button 
              onClick={() => setViewMode("timeline")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all ${viewMode === "timeline" ? "bg-white dark:bg-zinc-800 text-blue-600 shadow-sm" : "text-gray-500"}`}
            >
              <ListStart size={18} /> Timeline View
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {months.map((month) => (
                <MonthCard 
                  key={month} 
                  month={month} 
                  events={calendarEvents.filter(e => e.month === month)} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {calendarEvents.map((event, i) => (
                <TimelineItem key={i} event={event} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* GLOSSARY / KEY DATES */}
        <div className="mt-20 p-10 rounded-[3rem] bg-zinc-900 text-white border border-white/5">
           <h3 className="text-2xl font-black mb-8">Calendar Glossary</h3>
           <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-2">Concours</h4>
                <p className="text-xs text-slate-400 leading-relaxed">The competitive national entrance examination period held annually in August.</p>
              </div>
              <div>
                <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-2">CEVU / GEVU</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Institutional councils (Conseil de l'Enseignement et de la Vie Universitaire) that manage academic life.</p>
              </div>
              <div>
                <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-2">Rattrapage</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Dedicated remedial weeks (Semaine de rattrapage) usually scheduled in July for students to catch up.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------
// MONTH GRID CARD
// --------------------------------------------------------------------------------
function MonthCard({ month, events }: { month: string, events: any[] }) {
  return (
    <Card className="p-6 rounded-[2rem] bg-gray-50 dark:bg-zinc-900 border border-divider shadow-none flex flex-col h-64 hover:border-blue-600/30 transition-all">
      <h3 className="text-lg font-black mb-4 border-b border-divider pb-2">{month}</h3>
      <div className="flex-grow space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {events.length > 0 ? events.map((event, i) => (
          <div key={i} className="group cursor-default">
            <div className="flex items-center gap-2 mb-1">
               <div className={`w-1.5 h-1.5 rounded-full ${
                 event.type === 'Holiday' ? 'bg-emerald-500' : 
                 event.type === 'Exam' ? 'bg-red-500' : 'bg-blue-500'
               }`} />
               <span className="text-[10px] font-black uppercase text-slate-400">{event.date}</span>
            </div>
            <p className="text-xs font-bold leading-tight group-hover:text-blue-600 transition-colors">
              {event.title} <span className="text-[9px] text-blue-500 font-medium"></span>
            </p>
          </div>
        )) : (
          <p className="text-[10px] text-slate-400 italic">No major events scheduled</p>
        )}
      </div>
    </Card>
  );
}

// --------------------------------------------------------------------------------
// TIMELINE LIST ITEM
// --------------------------------------------------------------------------------
function TimelineItem({ event }: { event: any }) {
  return (
    <Card className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-divider shadow-none hover:shadow-xl hover:shadow-blue-600/5 transition-all">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-32 text-center md:text-right shrink-0">
          <p className="text-[10px] font-black uppercase text-blue-600 mb-1">{event.month}</p>
          <h4 className="text-2xl font-black tracking-tighter">{event.date}</h4>
        </div>
        <div className="hidden md:block h-12 w-px bg-divider" />
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold tracking-tight">{event.title}</h3>
            <Chip size="sm" variant="flat" className="font-black text-[9px] border-none uppercase">
              {event.type}
            </Chip>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Institutional event as scheduled in the ITC academic calendar.
          </p>
        </div>
        <Button isIconOnly variant="light" className="text-blue-600 hover:bg-blue-50">
           <ArrowRight size={20} />
        </Button>
      </div>
    </Card>
  );
}