"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Globe, GraduationCap, Microscope, PlaneTakeoff } from "lucide-react";
import PathwayCard from "../pathway-card";

// 1. Interfaces
interface PartnerSectionProps {
  t: {
    partnersKicker: string;
    partnersTitle: string;
    partnersDesc: string;
  };
  partners: {
    feature: {
      image: string;
      kicker: string;
      title: string;
      desc: string;
    };
    stats: Array<{ value: string; label: string }>;
    regions: string[];
    affiliationsLabel: string;
    pathways: Array<{
      title: string;
      desc: string;
      imgSrc: string;
      href: string;
      icon: "plane" | "graduation" | "microscope";
      isWide?: boolean;
    }>;
    partners: Array<{ name: string; src: string; url: string }>;
  };
  section?: string;
  container?: string;
  editAction?: {
    label: string;
    onEdit: () => void;
  };
}

// 2. Main Component
export default function PartnerSection({
  t,
  partners,
  section = "",
  container = "",
  editAction,
}: PartnerSectionProps) {
  const iconMap = {
    plane: PlaneTakeoff,
    graduation: GraduationCap,
    microscope: Microscope,
  };

  return (
    <section className={`${section} relative bg-background`}>
      {editAction ? (
        <div className="absolute right-6 top-6 z-20">
          <Button size="sm" variant="flat" onPress={editAction.onEdit}>
            {editAction.label}
          </Button>
        </div>
      ) : null}
      <div className={`${container} mx-auto px-6`}>

        {/* Header - Aligned with "Soft Professional" aesthetic */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4"
          >
            <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.4em]">
              {t.partnersKicker}
            </span>
          </motion.div>
          <motion.h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            {t.partnersTitle}
          </motion.h2>
          <motion.p className="mt-6 text-default-500 max-w-2xl text-lg opacity-70">
            {t.partnersDesc}
          </motion.p>
        </div>

        {/* Cinematic Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* A. Featured Cinematic Image - Showcasing Mobility */}
          <Card className="md:col-span-8 border-none bg-default-100 overflow-hidden h-[400px]">
            <div className="absolute inset-0">
              <img
                src={partners.feature.image}
                alt="International Campus"
                className="w-full h-full object-cover opacity-80 dark:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
            <div className="absolute bottom-8 left-8 z-10 max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <PlaneTakeoff size={16} className="text-primary" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                  {partners.feature.kicker}
                </span>
              </div>
              <h3 className="text-3xl font-black text-foreground">{partners.feature.title}</h3>
              <p className="mt-2 text-default-500 text-sm font-medium leading-relaxed">
                {partners.feature.desc}
              </p>
            </div>
          </Card>

          {/* B. Stats Box - Clean & Minimal */}
          <Card className="md:col-span-4 border border-default-200/50 bg-default-50/20 backdrop-blur-sm shadow-none p-8 flex flex-col justify-center text-center">
            <div className="space-y-10">
              {partners.stats.map((stat, index) => (
                <div key={`${stat.label}-${index}`}>
                  <div className={`text-5xl font-black ${index === 1 ? "text-indigo-500" : "text-primary"}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-default-400 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
              <div className="flex justify-center gap-2 pt-4">
                {partners.regions.map((region) => (
                  <Chip key={region} variant="flat" size="sm" className="bg-default-100 text-default-500 font-bold">
                    {region}
                  </Chip>
                ))}
              </div>
            </div>
          </Card>

          {/* C. Partner Logo Grid - Monochromatic & Subtle */}
          <Card className="md:col-span-12 border border-default-200/50 bg-background shadow-none">
            <CardBody className="p-12">
              <div className="flex items-center gap-4 mb-10">
                <Globe size={18} className="text-default-400" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-default-400">
                  {partners.affiliationsLabel}
                </span>
                <div className="h-[1px] flex-grow bg-default-100" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12 items-center">
                {partners.partners.map((p, index) => (
                  <a
                    key={`${p.name}-${index}`}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center group relative p-4 rounded-2xl hover:bg-default-100/50 transition-colors duration-300"
                    title={`Visit ${p.name} website`}
                  >
                    <img
                      src={p.src}
                      alt={p.name}
                      className="max-h-16 md:max-h-24 w-auto object-contain transition-all duration-500 
                    group-hover:grayscale-0 group-hover:scale-110"
                    />

                    {/* Subtle indicator that it's an external link */}
                    {/* <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div> */}
                  </a>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* D. Descriptive Pathways - Image + Detail */}
          {partners.pathways.map((pathway, index) => {
            const Icon = iconMap[pathway.icon] ?? PlaneTakeoff;

            return (
              <PathwayCard
                key={`${pathway.title}-${index}`}
                title={pathway.title}
                desc={pathway.desc}
                icon={<Icon size={20} />}
                imgSrc={pathway.imgSrc}
                isWide={pathway.isWide}
                href={pathway.href}
              />
            );
          })}

        </div>
      </div>
    </section>
  );
}
