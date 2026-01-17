"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import NextLink from "next/link";
import { SectionHeader } from "@/components/landing/section-header";

interface ResearchShowcaseProps {
  t: {
    researchKicker: string;
    researchTitle: string;
    researchDesc: string;
  };
  section: string;
  container: string;
}

export default function ResearchShowcase({ t, section, container }: ResearchShowcaseProps) {
  return (
    <section className={`${section} bg-background text-foreground py-20 transition-colors duration-500`}>
      <div className={container}>
        <SectionHeader
          kicker={t.researchKicker}
          titleText={t.researchTitle}
          desc={t.researchDesc}
          align="center"
        />

        {/* IMAGE-FIRST SHOWCASE */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Hero Card */}
          <Card className="md:col-span-7 border-none bg-content1 overflow-hidden min-h-[450px] md:min-h-[520px] shadow-sm">
            <div className="relative h-full w-full group">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                alt="Research & Innovation"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Theme-aware gradient: from-background ensures white in light and dark in dark mode */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent via-40% transition-colors duration-500" />

              <div className="absolute bottom-0 p-8 md:p-12 z-10">
                <Chip
                  color="primary"
                  variant="flat"
                  className="bg-primary/10 text-primary mb-6 font-bold"
                >
                  Research & Innovation
                </Chip>
                <h3 className="text-3xl md:text-5xl font-black leading-tight text-foreground tracking-tighter">
                  Building Khmer-first technology
                </h3>
                <p className="mt-4 text-default-600 dark:text-default-400 text-base md:text-lg max-w-xl leading-relaxed font-medium">
                  Turning research into real-world impact through AI and modern infrastructure.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button
                    as={NextLink}
                    href="/research"
                    className="bg-foreground text-background font-black px-8 h-12 rounded-xl"
                  >
                    Explore Research
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Right Image Stack */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            <Card className="border-none bg-content1 overflow-hidden group shadow-sm relative">
              <div className="h-[250px] w-full">
                <img
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800"
                  alt="Khmer NLP"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent via-50% transition-colors duration-500" />
                <div className="absolute bottom-0 p-8">
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Flagship Lab</div>
                  <div className="text-2xl font-black text-foreground">Khmer NLP Lab</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card className="border-none bg-content1 overflow-hidden relative group shadow-sm h-[200px]">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
                    alt="Analytics"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent via-60% transition-colors duration-500" />
                  <div className="absolute bottom-0 p-5">
                    <div className="text-lg font-black text-foreground leading-tight">DADS Lab</div>
                  </div>
              </Card>

              <Card className="border-none bg-content1 overflow-hidden relative group shadow-sm h-[200px]">
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
                    alt="Security & Privacy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent via-60% transition-colors duration-500" />
                  <div className="absolute bottom-0 p-5">
                    <div className="text-lg font-black text-foreground leading-tight">Security Lab</div>
                  </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Impact Strip */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-8 border-none bg-content2 dark:bg-content1 border border-divider shadow-sm">
            <CardBody className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-grow">
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Featured breakthrough</div>
                  <div className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                    Khmer spelling checker
                  </div>
                  <p className="mt-2 text-default-500 font-medium text-sm">
                    Strengthening digital literacy tools across learning platforms.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    as={NextLink}
                    href="/research/breakthrough"
                    className="bg-foreground text-background font-bold px-6 h-12 rounded-xl"
                  >
                    Read the story
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="md:col-span-4 border-none bg-content2 dark:bg-content1 border border-divider shadow-sm">
            <CardBody className="p-8 md:p-10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Core labs", value: "3" },
                  { label: "AI Focused", value: "NLP" },
                  { label: "Privacy", value: "Sec" },
                  { label: "Impact", value: "Data" },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-background rounded-2xl p-4 border border-divider flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-black text-foreground">{stat.value}</div>
                    <div className="text-[9px] text-default-400 uppercase font-black mt-1 tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
