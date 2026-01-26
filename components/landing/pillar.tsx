"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Code2, Globe, Layers, Award } from "lucide-react";
import Link from "next/link";

// 1. Interface Definitions
interface PillarsSectionProps {
  t: {
    pillarsKicker: string;
    pillarsTitle: string;
    pillarsDesc: string;
    pillarsCtaLabel: string;
  };
  pillars: Array<{
    number: string;
    title: string;
    desc: string;
    icon: "code" | "globe" | "layers" | "award";
    color: "blue" | "indigo" | "cyan" | "purple";
    href: string;
  }>;
  section?: string;
  container?: string;
  editAction?: {
    label: string;
    onEdit: () => void;
  };
}

interface PillarCardProps {
  number: string | number;
  title: string;
  desc: string;
  icon: any;
  color: "blue" | "indigo" | "cyan" | "purple";
  href: string;
  ctaLabel: string;
}

// 2. Main Section
export default function PillarsSection({
  t,
  pillars,
  section = "",
  container = "",
  editAction,
}: PillarsSectionProps) {
  return (
    <section className={`${section} relative bg-background overflow-hidden`}>
      {editAction ? (
        <div className="absolute right-6 top-6 z-20">
          <Button size="sm" variant="flat" onPress={editAction.onEdit}>
            {editAction.label}
          </Button>
        </div>
      ) : null}
      {/* Background Decorative Element - Soft Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className={`${container} relative z-10 mx-auto px-6`}>
        {/* Header - Minimalist & Center Aligned */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
              {t.pillarsKicker}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter"
          >
            {t.pillarsTitle}
          </motion.h2>
          <motion.p className="mt-6 text-default-500 max-w-xl text-lg opacity-70">
            {t.pillarsDesc}
          </motion.p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const iconMap = {
              code: Code2,
              globe: Globe,
              layers: Layers,
              award: Award,
            };
            const Icon = iconMap[pillar.icon] ?? Code2;

            return (
              <PillarCard
                key={`${pillar.title}-${pillar.number}`}
                number={pillar.number}
                title={pillar.title}
                desc={pillar.desc}
                icon={Icon}
                color={pillar.color}
                href={pillar.href}
                ctaLabel={t.pillarsCtaLabel}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 3. PillarCard Component
function PillarCard({ number, title, desc, icon: Icon, color, href, ctaLabel }: PillarCardProps) {
  // Mapping object to ensure Tailwind compiles the classes
  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    blue: { border: "border-blue-500", bg: "bg-blue-500", text: "text-blue-500" },
    indigo: { border: "border-indigo-500", bg: "bg-indigo-500", text: "text-indigo-500" },
    cyan: { border: "border-cyan-500", bg: "bg-cyan-500", text: "text-cyan-500" },
    purple: { border: "border-purple-500", bg: "bg-purple-500", text: "text-purple-500" },
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <Link href={href} className="block h-full cursor-pointer">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="group h-full"
      >
        <Card className="h-full dark:border-none dark:bg-default-50/5 backdrop-blur-md shadow-none relative overflow-hidden transition-all duration-500">
          <CardBody className="p-10 relative flex flex-col items-start z-10">

            {/* Vertical Accent Line - FIXED */}
            <div className={`absolute left-0 top-10 bottom-10 w-[2px] ${theme.bg} opacity-30 group-hover:opacity-100 transition-all duration-700`} />
            {/* Icon Header - FIXED */}
            <div className={`mb-8 p-3 rounded-xl bg-background shadow-sm border border-default-200/50 ${theme.text} group-hover:scale-110 transition-transform duration-500`}>
              <Icon size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
              {title}
            </h3>

            <p className="text-default-500 text-sm leading-relaxed font-medium mb-10 opacity-80 group-hover:opacity-100 transition-opacity">
              {desc}
            </p>
            <div className="mt-auto flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-default-400 group-hover:text-primary transition-colors">
                {ctaLabel}
              </span>
              <div className="h-[1px] w-0 group-hover:w-12 bg-primary transition-all duration-700" />
            </div>
          </CardBody>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </Card>
      </motion.div>
    </Link>
  );
}
