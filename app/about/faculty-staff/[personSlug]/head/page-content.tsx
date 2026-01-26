"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Award,
    BookOpen,
    Cpu,
    Mail,
    Linkedin,
    MapPin,
    ShieldCheck,
    ExternalLink,
    Milestone
} from "lucide-react";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useExecutiveBioData } from "@/hooks/useExecutiveBioData";

export default function ExecutiveDetailPage({ params }: { params: { personSlug: string } }) {
    const { personSlug } = params;
    const { data: executiveBio } = useExecutiveBioData(personSlug);

    if (!executiveBio) {
        return null;
    }

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7 }
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen pb-24">

            {/* 1. EXECUTIVE BANNER */}
            <section className="relative h-[45vh] bg-[#26304d] flex items-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
                <div className="absolute bottom-[-10%] right-[-5%] text-white/5 pointer-events-none">
                    <Cpu size={500} />
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                    <motion.div {...fadeIn}>
                        <Chip className="bg-[#76879d] text-white font-black uppercase tracking-[0.3em] h-8 px-4 mb-6">
                            Executive Profile
                        </Chip>
                        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                            Engineering <br /> <span className="text-[#76879d]">The Future</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* 2. PROFILE & BIO GRID */}
            <section className="max-w-7xl mx-auto px-6 -mt-32 relative z-20 grid lg:grid-cols-12 gap-12">

                {/* LEFT: Identity Card */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[4rem] p-10 shadow-2xl border border-[#c8c8c8]/50 bg-white dark:bg-zinc-900">
                        <div className="flex flex-col items-center text-center">
                            <Avatar
                                src={executiveBio.portrait}
                                className="w-48 h-48 border-8 border-white dark:border-zinc-800 shadow-xl mb-8"
                            />
                            <h2 className="text-3xl font-black text-[#26304d] uppercase tracking-tighter leading-tight">
                                {executiveBio.name}
                            </h2>
                            <p className="text-sm font-bold text-[#76879d] uppercase tracking-widest mt-2">
                                {executiveBio.designation}
                            </p>

                            <div className="flex gap-4 mt-8">
                                <Button isIconOnly variant="flat" className="rounded-2xl bg-[#26304d]/5 text-[#26304d]"><Linkedin size={20} /></Button>
                                <Button isIconOnly variant="flat" className="rounded-2xl bg-[#26304d]/5 text-[#26304d]"><Mail size={20} /></Button>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-[#c8c8c8]/30 space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-[#76879d] shrink-0" size={20} />
                                <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed">{executiveBio.office}</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="text-[#76879d] shrink-0" size={20} />
                                <p className="text-xs font-bold text-slate-500 uppercase leading-relaxed">{executiveBio.specialization}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* RIGHT: Biography & Vision */}
                <div className="lg:col-span-8 pt-40">
                    <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-[2px] w-12 bg-[#26304d]" />
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#76879d]">Visionary Leadership</span>
                        </div>

                        <div
                            className="prose prose-xl dark:prose-invert max-w-none prose-strong:text-[#26304d] prose-strong:font-black"
                            dangerouslySetInnerHTML={{ __html: executiveBio.bioHtml }}
                        />

                        {/* ACHIEVEMENTS / MILESTONES */}
                        <div className="mt-20">
                            <h3 className="text-2xl font-black text-[#26304d] uppercase tracking-tight mb-10 flex items-center gap-3">
                                <Milestone className="text-[#76879d]" /> Strategic Milestones
                            </h3>
                            <div className="space-y-6">
                                {executiveBio.achievements.map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900 border-l-8 border-[#26304d] group hover:bg-[#26304d] transition-all duration-500">
                                        <span className="text-xl font-black text-[#76879d] group-hover:text-white/50">{item.year}</span>
                                        <span className="font-bold text-[#26304d] dark:text-white uppercase text-sm tracking-tight group-hover:text-white">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. RESEARCH VISION DIAGRAM SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="p-16 rounded-[4rem] bg-[#26304d] text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h4 className="text-4xl font-black uppercase tracking-tighter mb-6">Research <br /> <span className="text-[#76879d]">Odyssey</span></h4>
                        <p className="text-[#76879d] font-medium leading-relaxed italic mb-10">
                            "We promote innovative STEM-based solutions for solving real-world problems by
                            aligning our R&D roadmap with international industrial standards."
                        </p>
                        <Button className="bg-white text-[#26304d] font-black h-14 px-10 rounded-2xl shadow-xl uppercase text-[10px] tracking-widest">
                            Explore GIC Publications <ExternalLink size={16} className="ml-2" />
                        </Button>
                    </div>

                    {/* Visual Diagram Placeholder for Vision */}
                    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
                        <BookOpen size={600} />
                    </div>
                </div>

            </section>

            {/* FOOTER STRIP */}
            <footer className="w-full py-12 border-t border-[#c8c8c8]/30 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#76879d]">
                    Official Executive Profile / Department of Information and Communication Engineering
                </p>
            </footer>
        </div>
    );
}
