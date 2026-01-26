"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Globe, Cpu, BookOpen, ArrowRight } from "lucide-react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useProgramsData } from "@/hooks/useProgramsData";

export default function ProgramPage() {
  const { data: programs = [] } = useProgramsData();
  const iconMap = {
    cpu: <Cpu className="text-[#26304d]" />,
    book: <BookOpen className="text-[#26304d]" />,
    cap: <GraduationCap className="text-[#26304d]" />,
    globe: <Globe className="text-[#26304d]" />,
  };
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER SECTION */}
        <div className="mb-20 border-l-8 border-[#26304d] pl-8">
          <motion.div {...fadeIn}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 text-[#76879d]">
              Academic <span className="text-[#26304d]">Programs</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
              Activating student potential through leadership, creativity, and
              world-class technical innovation.
            </p>
          </motion.div>
        </div>

        {/* PROGRAM GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/program/${program.slug}`}>
                <Card className="p-10 rounded-[3rem] bg-white dark:bg-zinc-900 border border-[#76879d]/30 hover:border-[#26304d] shadow-none hover:shadow-2xl hover:shadow-[#26304d]/10 transition-all group h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#76879d]/10 flex items-center justify-center group-hover:text-white transition-colors">
                      {iconMap[program.icon]}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {program.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-[#76879d] border border-[#76879d]/40 px-3 py-1 rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-3xl font-black mb-4 group-hover:text-[#26304d] transition-colors uppercase tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-slate-500 dark:text-zinc-400 mb-8 leading-relaxed font-medium text-sm">
                    {program.desc}
                  </p>

                  <div className="flex items-center gap-2 text-[#26304d] font-black uppercase text-xs tracking-[0.2em] mt-auto">
                    View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* INSTITUTIONAL OBJECTIVES FOOTER */}
        <motion.div
          {...fadeIn}
          className="mt-20 p-12 rounded-[4rem] bg-[#26304d] text-white flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-xl">
            <h4 className="text-2xl font-black mb-4 uppercase tracking-tight">How's our student?</h4>
            <p className="text-[#76879d] font-medium leading-relaxed italic">
              "Explore the student life as an engineering student at ITC."
            </p>
          </div>
          <Button
            className="bg-white text-[#26304d] font-black h-16 px-10 rounded-2xl shadow-xl uppercase tracking-widest text-xs shrink-0"
            as={Link}
            href="/student"

          >
            Explore more
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
