"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Trophy, 
  Clock, 
  Rocket, 
  Mic2, 
  MapPin, 
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useSeminarEventsData } from "@/hooks/useSeminarEventsData";

export default function EventsPage() {
  const { data: events = [] } = useSeminarEventsData();
  const iconMap = {
    shield: <ShieldCheck />,
    trophy: <Trophy />,
    clock: <Clock />,
    rocket: <Rocket />,
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="py-24 border-b border-gray-100 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <Mic2 size={14} />
            Knowledge Exchange
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]">
            Seminars & <span className="text-blue-600">Events</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium italic">
            "Peer-reviewed papers, reports, and conference contributions."
          </p>
        </div>
      </section>

      {/* 2. FEATURED EVENT WITH IMAGE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn}>
            <Card className="grid md:grid-cols-2 gap-0 rounded-[4rem] bg-zinc-900 text-white border-none overflow-hidden shadow-2xl">
                {/* Image Side */}
                <div className="relative h-64 md:h-full">
                    <img 
                      src={events[0]?.image} 
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60" 
                      alt="Cybersecurity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-transparent to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent md:hidden" />
                </div>
                
                {/* Content Side */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                        <Chip color="primary" variant="flat" className="font-bold bg-blue-600 text-white uppercase text-[10px]">Featured Event</Chip>
                        <span className="text-blue-400 font-bold text-sm tracking-widest">{events[0]?.date}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                        {events[0]?.title}
                    </h2>
                    <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                        {events[0]?.desc}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-white text-zinc-950 font-black h-14 px-10 rounded-2xl">
                            REGISTER NOW <ArrowUpRight className="ml-2" />
                        </Button>
                        <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase">
                            <MapPin size={16} /> GIC Main Conference Hall
                        </div>
                    </div>
                </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS GRID */}
      <section className="py-24 bg-gray-50/50 dark:bg-zinc-900/20 rounded-[3rem] mx-4 md:mx-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(1).map((event, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }}>
                <Card className="rounded-[3rem] bg-white dark:bg-zinc-900 border border-divider shadow-none hover:shadow-xl transition-all group overflow-hidden h-full">
                    {/* Event Image */}
                    <div className="h-48 relative overflow-hidden">
                        <img 
                          src={event.image} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt={event.title} 
                        />
                        <div className="absolute top-4 left-4">
                            <Chip size="sm" className="bg-white/90 backdrop-blur-md text-zinc-950 font-black border-none uppercase text-[9px]">
                                {event.type}
                            </Chip>
                        </div>
                    </div>

                    <CardBody className="p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-black tracking-tighter text-blue-600">{event.date}</span>
                            <div className="p-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-slate-400">
                                {iconMap[event.icon]}
                            </div>
                        </div>
                        <h3 className="text-xl font-black mb-3 tracking-tight group-hover:text-blue-600 transition-colors h-14 line-clamp-2">
                            {event.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-8 line-clamp-3 leading-relaxed">
                            {event.desc}
                        </p>
                        <div className="mt-auto pt-6 border-t border-divider flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{event.status}</span>
                            <ChevronRight size={18} className="text-blue-600" />
                        </div>
                    </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
