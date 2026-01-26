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
import { useAcademicCalendarData } from "@/hooks/useAcademicCalendarData";
import type { CalendarEvent } from "@/hooks/useAcademicCalendarData";

export default function AcademicCalendar() {
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("grid");
  const { data } = useAcademicCalendarData();
  const months = data?.months ?? [];
  const calendarEvents = data?.events ?? [];
  const glossary = data?.glossary ?? [];

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
              {glossary.map((item) => (
                <div key={item.term}>
                  <h4 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-2">{item.term}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------
// MONTH GRID CARD
// --------------------------------------------------------------------------------
function MonthCard({ month, events }: { month: string; events: CalendarEvent[] }) {
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
function TimelineItem({ event }: { event: CalendarEvent }) {
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
