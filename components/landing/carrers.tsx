"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { SectionHeader } from "@/components/landing/section-header";

type CareersSectionProps = {
  t: {
    careersKicker: string;
    careersTitle: string;
    careersDesc: string;
    careersNote: string;
  };
  data: {
    partners: string[];
    roles: Array<{ title: string; growth: string; color: string }>;
  };
  section: string;
  container: string;
  editAction?: {
    label: string;
    onEdit: () => void;
  };
};

export default function CareersSection({
  t,
  data,
  section,
  container,
  editAction,
}: CareersSectionProps) {
  const partners = data.partners ?? [];
  const roles = data.roles ?? [];

  return (
    <section className={`${section} relative bg-zinc-950 py-20 text-white border-t border-white/5`}>
      {editAction ? (
        <div className="absolute right-6 top-6 z-20">
          <Button size="sm" variant="flat" onPress={editAction.onEdit}>
            {editAction.label}
          </Button>
        </div>
      ) : null}
      <div className={container}>
        <SectionHeader
          kicker={t.careersKicker}
          titleText={t.careersTitle}
          desc={t.careersDesc}
          align="center"
        />

        {/* INDUSTRY PARTNERS - Infinite Marquee Style */}
        <div className="mt-16 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
          
          <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
            {[...partners, ...partners].map((p, i) => (
              <div 
                key={i} 
                className="text-2xl md:text-4xl font-black tracking-tighter text-zinc-700 hover:text-zinc-200 transition-colors cursor-default"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* CAREER PATHS GRID */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => (
            <Card 
              key={role.title} 
              className="bg-zinc-900/50 border-white/5 hover:border-primary/50 transition-all group"
            >
              <CardBody className="p-8">
                <div className="flex justify-between items-start mb-6">
                   <div className={`h-2 w-10 rounded-full bg-current ${role.color}`} />
                   <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">In Demand</span>
                </div>
                
                <h4 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                  {role.title}
                </h4>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold">Market Growth</span>
                    <span className={`text-lg font-black ${role.color}`}>{role.growth}</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                    <span className="text-xs">↗</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* CTA STRIP */}
        <div className="mt-12 text-center">
            <p className="text-zinc-500 text-sm">
              {t.careersNote}
            </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
