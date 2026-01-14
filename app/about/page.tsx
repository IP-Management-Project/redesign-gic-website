"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Chip } from "@heroui/chip";
import { Globe, GraduationCap, Award, Rocket } from "lucide-react";

export default function GICHistoryTimeline() {
  const data = [
    {
      title: "2024 - 2026",
      content: (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Rocket size={18} className="text-primary" />
            <h3 className="text-xl font-black text-foreground">Digital Transformation Era</h3>
          </div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 leading-relaxed">
            GIC officially launched the **Global Innovation Center Pro** initiative, integrating AI-driven curriculum 
            and smart-lab infrastructures. We successfully expanded our research impact to 12 core labs focusing 
            on Khmer-first AI tools and high-performance computing.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
              alt="Smart Labs"
              className="h-20 w-full rounded-xl object-cover shadow-sm md:h-44 lg:h-60 grayscale hover:grayscale-0 transition-all duration-500"
            />
            <img
              src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800"
              alt="Research Labs"
              className="h-20 w-full rounded-xl object-cover shadow-sm md:h-44 lg:h-60 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2015 - 2023",
      content: (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-primary" />
            <h3 className="text-xl font-black text-foreground">International Expansion</h3>
          </div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            This decade marked the peak of our international cooperation with French Engineering schools 
            (INSA, INP Toulouse, and UTC). We established the **International Program** and the 
            **Master's in Software Engineering**.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <Chip size="sm" variant="flat" color="primary">INSA Lyon Partner</Chip>
            <Chip size="sm" variant="flat" color="secondary">Erasmus+ Collaboration</Chip>
            <Chip size="sm" variant="flat" color="success">Dual Degree Launch</Chip>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
              alt="Collaborative Learning"
              className="h-20 w-full rounded-xl object-cover shadow-sm md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
              alt="Graduation Ceremony"
              className="h-20 w-full rounded-xl object-cover shadow-sm md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2005 - 2014",
      content: (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} className="text-primary" />
            <h3 className="text-xl font-black text-foreground">Foundation & Roots</h3>
          </div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Founded within the Institut de Technologie du Cambodge, GIC began with a single mission: 
            to provide high-level computer science education to the brightest minds in Cambodia. 
            The first cohort of 50 students set the standard for excellence.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ First Engineering Batch Graduated
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Established Dept. of Information Tech
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ First Partnership with AUF
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800"
              alt="Campus Foundation"
              className="h-20 w-full rounded-xl object-cover shadow-sm md:h-44 lg:h-60 opacity-50"
            />
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
              alt="Classic Library"
              className="h-20 w-full rounded-xl object-cover shadow-sm md:h-44 lg:h-60 opacity-50"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip bg-background">
      <div className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground mb-4">
          The GIC Story
        </h2>
        <p className="text-default-500 text-lg max-w-2xl font-medium">
          Two decades of pioneering engineering education, bridging Cambodia's 
          brightest talents with global innovation.
        </p>
      </div>
      <Timeline data={data} />
    </div>
  );
}