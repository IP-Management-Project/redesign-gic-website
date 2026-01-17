"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { ArrowUpRight, Beaker, ShieldCheck, Database, Zap } from "lucide-react";
import NextLink from "next/link";

type ResearchSectionProps = {
  t: {
    researchKicker: string;
    researchTitle: string;
    researchDesc: string;
  };
  section?: string;
  container?: string;
};

export default function ResearchSection({
  t,
  section = "",
  container = "",
}: ResearchSectionProps) {
  return (
    <section className={`${section} relative py-28 bg-background overflow-hidden`}>
      <div className={`${container} relative z-10 mx-auto px-6`}>
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.4em]">
              {t.researchKicker}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter"
          >
            {t.researchTitle}
          </motion.h2>
          <motion.p className="mt-6 text-default-500 max-w-2xl text-lg opacity-75">
            {t.researchDesc}
          </motion.p>
        </div>

        {/* Cinematic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
          
          {/* 1. Flagship Lab - Image Dominant */}
          <Card className="md:col-span-8 md:row-span-2 border border-default-100/50 bg-background group overflow-hidden shadow-none">
            <div className="absolute inset-0 z-0">
              <img
                src="http://googleusercontent.com/image_collection/image_retrieval/931209612433417686_0"
                alt="Khmer NLP Lab"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 dark:opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
            
            <CardHeader className="relative z-10 p-10 flex-col items-start h-full justify-end">
              <Chip 
                startContent={<Beaker size={14} />}
                variant="flat" 
                className="bg-primary/10 text-primary mb-4 border border-primary/20"
              >
                Flagship Lab
              </Chip>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                Khmer NLP Lab
              </h3>
              <p className="text-default-500 text-lg max-w-md leading-relaxed mb-8">
                Language technologies for Khmer speech, text, education platforms, and accessibility tools.
              </p>
              <Button 
                as={NextLink} 
                href="/research" 
                variant="light" 
                className="px-0 text-primary font-bold flex items-center gap-2 group/btn"
              >
                Explore Laboratory <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Button>
            </CardHeader>
          </Card>

          {/* 2. DADS Lab - Soft Professional */}
          <Card className="md:col-span-4 border border-default-200/60 dark:border-default-100/10 bg-default-50/30 backdrop-blur-sm shadow-none group">
            <CardBody className="p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-background border border-default-100 text-indigo-500 group-hover:text-primary transition-colors">
                  <Database size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-mono font-bold text-default-300">01_DATA</span>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">DADS Lab</h4>
                <p className="text-sm text-default-500 leading-relaxed italic">
                  Applied analytics for finance, smart city services, and public-sector decision support.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* 3. Security & Privacy - Image/Text Mix */}
          <Card className="md:col-span-4 border border-default-200/60 dark:border-default-100/10 bg-default-50/30 shadow-none group">
             <CardBody className="p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-xl bg-background border border-default-100 text-cyan-500 group-hover:text-primary transition-colors">
                  <ShieldCheck size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-mono font-bold text-default-300">02_SEC</span>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Security & Privacy</h4>
                <p className="text-sm text-default-500 leading-relaxed italic">
                  Cybersecurity, privacy engineering, and secure systems for modern infrastructure.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* 4. Featured Breakthrough - Visual/High-Impact */}
          <Card className="md:col-span-12 lg:col-span-12 border border-primary/20 bg-primary/5 shadow-none group overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none overflow-hidden hidden md:block">
               <img
                src="http://googleusercontent.com/image_collection/image_retrieval/931209612433417686_2"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <CardBody className="p-10 flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Featured breakthrough</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Revolutionizing Digital Literacy</h3>
                <p className="text-default-600 leading-relaxed">
                  Our new Khmer spelling checker + contextual AI model is improving digital literacy tools for over 2 million users in the region.
                </p>
              </div>
              <Button
                as={NextLink}
                href="/research"
                size="lg"
                color="primary"
                radius="full"
                className="mt-8 md:mt-0 px-10 font-bold"
              >
                Read the Impact Story
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
