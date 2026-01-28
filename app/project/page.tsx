"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePages } from "@/hooks/usePageManager";
import { Card, CardBody, Button, Spinner, Chip } from "@heroui/react";
import { ArrowUpRight, Code2, Rocket, Globe } from "lucide-react";
import Link from "next/link";

export default function ProjectListingPage() {
  const { data: projects, isLoading } = usePages();

  if (isLoading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <Spinner label="Loading GIC Project Archive..." color="primary" />
    </div>
  );

  return (
    <div className="py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <section className="mb-20">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none mb-6">
          Innovation <br /> <span className="text-blue-600">Directory</span>
        </h1>
        <p className="max-w-2xl text-slate-500 text-lg font-medium leading-relaxed">
          Explore the full ecosystem of student-led initiatives, research outcomes, and 
          technological prototypes developed within the GIC community.
        </p>
      </section>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card 
              as={Link}
              href={`/project/${project.slug}`}
              className="group h-[450px] rounded-[3rem] border border-divider bg-white dark:bg-zinc-900 shadow-none hover:shadow-2xl hover:border-blue-600/20 transition-all duration-500 overflow-hidden"
            >
              <CardBody className="p-0 flex flex-col">
                {/* Visual Preview */}
                <div className="h-1/2 bg-slate-50 dark:bg-zinc-800 relative overflow-hidden flex items-center justify-center">
                  <iframe 
                    srcDoc={`<style>${project.css} body{zoom: 0.4; overflow:hidden;}</style>${project.html}`}
                    className="w-[250%] h-[250%] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent" />
                  <div className="absolute top-8 right-8 p-3 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <ArrowUpRight size={20} className="text-blue-600" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-10 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Chip size="sm" variant="flat" color="primary" className="font-black uppercase text-[9px] tracking-widest">
                        Project ID: {project.id}
                      </Chip>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                        {new Date(project.updatedAt).getFullYear()}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-divider/50">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center border-2 border-white dark:border-zinc-900"><Rocket size={14}/></div>
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center border-2 border-white dark:border-zinc-900"><Globe size={14}/></div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Learn More →</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}