"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Globe,
    Quote,
    ArrowRightLeft,
    BookOpen,
    MapPin
} from "lucide-react";
import { GicSatelliteIcon, GicNetworkIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Input, Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
import Link from "next/link";
import { useExchangeSemesterData } from "@/hooks/useExchangeSemesterData";
import { useUpdateExchangeSemesterData } from "@/hooks/useUpdateExchangeSemesterData";

export default function ExchangePage() {
    const { data: exchangeData = [] } = useExchangeSemesterData();
    const { mutateAsync, isPending } = useUpdateExchangeSemesterData();
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };
    const [formValues, setFormValues] = useState({
        name: "",
        type: "",
        destination: "",
        focus: "",
        story: "",
        backgroundImg: "",
        portrait: "",
        activityImages: "",
        span: "md:col-span-1 md:row-span-1",
    });

    const handleChange = (field: keyof typeof formValues) => (value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddExperience = async () => {
        if (!formValues.name || !formValues.destination || !formValues.story) {
            addToast({
                title: "Missing information",
                description: "Please add name, destination, and a story before submitting.",
                severity: "warning",
            });
            return;
        }

        const activityImages = formValues.activityImages
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

        await mutateAsync({
            experience: {
                name: formValues.name,
                type: formValues.type || "Global Exchange",
                destination: formValues.destination,
                focus: formValues.focus || "International Experience",
                story: formValues.story,
                backgroundImg: formValues.backgroundImg || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
                portrait: formValues.portrait || "https://i.pravatar.cc/150?u=exchange",
                activityImages: activityImages.length > 0 ? activityImages : undefined,
                span: formValues.span,
            },
        });

        setFormValues((prev) => ({
            ...prev,
            name: "",
            type: "",
            destination: "",
            focus: "",
            story: "",
            backgroundImg: "",
            portrait: "",
            activityImages: "",
        }));
    };

    return (
        <div className="bg-white dark:bg-zinc-950 py-24 overflow-hidden">
            <div className="absolute top-20 right-[-10%] opacity-5 text-[#76879d] pointer-events-none">
                <GicSatelliteIcon size={600} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* HEADER SECTION (Unchanged) */}
                <section className="mb-20 border-l-8 border-[#26304d] pl-8">
                    <motion.div {...fadeIn}>
                        <span className="text-[#76879d] text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                            Global Academic Integration
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black text-[#26304d] dark:text-white uppercase tracking-tighter leading-none mb-6">
                            The <span className="text-[#76879d]">Bridge</span> <br /> of Innovation
                        </h1>
                        <p className="text-slate-500 font-medium max-w-2xl leading-relaxed italic">
                            "GIC exchange programs activate student potential by bridging the gap between
                            Cambodian engineering excellence and French industrial standards."
                        </p>
                    </motion.div>
                </section>

                <motion.section
                    {...fadeIn}
                    className="mb-16 rounded-[3rem] border border-[#76879d]/20 bg-white/80 dark:bg-zinc-900/80 shadow-2xl p-8 md:p-10 backdrop-blur-xl"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#76879d]">Student Management Portal</p>
                            <h2 className="text-3xl md:text-4xl font-black text-[#26304d] dark:text-white uppercase tracking-tighter">
                                Add an exchange experience
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 max-w-xl">
                                Capture new study abroad stories and highlight unforgettable moments.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-[#76879d]">
                            Live sync enabled
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Student name" value={formValues.name} onValueChange={handleChange("name")} placeholder="Student name" />
                        <Input label="Program type" value={formValues.type} onValueChange={handleChange("type")} placeholder="Khmer to France" />
                        <Input label="Destination" value={formValues.destination} onValueChange={handleChange("destination")} placeholder="Host university / country" />
                        <Input label="Focus" value={formValues.focus} onValueChange={handleChange("focus")} placeholder="e.g., AI & Robotics" />
                        <Textarea label="Experience story" value={formValues.story} onValueChange={handleChange("story")} placeholder="Share the experience story" minRows={3} />
                        <Input label="Background image URL" value={formValues.backgroundImg} onValueChange={handleChange("backgroundImg")} placeholder="https://..." />
                        <Input label="Portrait URL" value={formValues.portrait} onValueChange={handleChange("portrait")} placeholder="https://..." />
                        <Input
                            label="Activity images (comma separated)"
                            value={formValues.activityImages}
                            onValueChange={handleChange("activityImages")}
                            placeholder="https://..., https://..."
                        />
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Button
                            className="bg-[#26304d] text-white font-black uppercase tracking-widest text-xs h-12 px-6 rounded-2xl"
                            onPress={handleAddExperience}
                            isLoading={isPending}
                        >
                            Add exchange story
                        </Button>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                            New stories appear immediately in the grid below.
                        </p>
                    </div>
                </motion.section>

                {/* UPDATED STORY GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
                    {exchangeData.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            // Increased minimum height to accommodate new elements
                            className={`group relative rounded-[3.5rem] overflow-hidden border border-[#76879d]/20 shadow-2xl min-h-[450px] ${item.span}`}
                        >
                            <Link href={`exchange-semester/${item.id}`} key={item.id} className="group">
                                {/* Atmospheric Background Image */}
                                <img src={item.backgroundImg} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Exchange location background" />

                                {/* Content Overlay - Made darker for better text contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#26304d] via-[#26304d]/90 to-[#26304d]/50 p-8 md:p-10 flex flex-col">

                                    {/* 1. Student Profile Header */}
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="relative shrink-0">
                                            <div className="absolute inset-0 bg-[#76879d] rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
                                            <Avatar
                                                src={item.portrait}
                                                className="w-20 h-20 border-3 border-[#76879d] shadow-xl relative z-10"
                                                isBordered
                                            />
                                        </div>
                                        <div>
                                            <div className="px-3 py-1 bg-[#76879d] w-fit text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-2">
                                                {item.type}
                                            </div>
                                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none mb-1">{item.name}</h3>
                                            <div className="flex items-center gap-2 text-[#76879d] text-xs font-bold uppercase tracking-wider">
                                                <MapPin size={14} /> {item.destination}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Story Section */}
                                    <div className="relative mb-8">
                                        <Quote className="absolute -top-4 -left-2 text-[#76879d] opacity-30" size={40} />
                                        <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed relative z-10 italic pl-6">
                                            "{item.story}"
                                        </p>
                                    </div>
                                    {/* 3. Optional Activity Gallery */}
                                    {item.activityImages && item.activityImages.length > 0 && (
                                        <div className="mt-auto mb-6">
                                            <span className="text-[9px] text-[#76879d] font-black uppercase tracking-widest mb-3 block">Exchange Highlights</span>
                                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                                {item.activityImages.map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={img}
                                                        className="w-24 h-16 object-cover rounded-xl border border-[#76879d]/30 hover:border-[#76879d] hover:scale-105 transition-all shadow-sm"
                                                        alt="Activity thumbnail"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 4. Footer */}
                                    <div className={`pt-6 border-t border-white/10 flex items-center justify-between ${!item.activityImages ? 'mt-auto' : ''}`}>
                                        <div className="flex items-center gap-2 text-[10px] text-[#76879d] font-black uppercase tracking-widest">
                                            <BookOpen size={14} /> Focus: {item.focus}
                                        </div>
                                        <Globe className="text-white/50 group-hover:text-white transition-colors" size={20} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* 4. OBJECTIVES CALLOUT */}
                <motion.section
                    {...fadeIn}
                    className="mt-24 p-12 md:p-20 rounded-[4rem] bg-[#26304d] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden"
                >
                    <div className="max-w-xl relative z-10">
                        <h4 className="text-3xl font-black mb-6 uppercase tracking-tight flex items-center gap-4">
                            <ArrowRightLeft className="text-[#76879d]" /> International Potential
                        </h4>
                        <p className="text-[#76879d] font-medium leading-relaxed text-lg italic">
                            "We promote innovative STEM-based solutions for solving real-world problems by
                            learning from global perspectives and making best use of student technical skills."
                        </p>
                    </div>
                    <Button
                        className="bg-white text-[#26304d] font-black h-16 px-12 rounded-2xl shadow-xl uppercase tracking-widest text-xs shrink-0 z-10"
                    >
                        Exchange Opportunities
                    </Button>

                    {/* Subtle GIC Network Decoration in Background */}
                    <div className="absolute bottom-[-10%] left-[-5%] opacity-10 text-white pointer-events-none">
                        <GicNetworkIcon size={400} />
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
