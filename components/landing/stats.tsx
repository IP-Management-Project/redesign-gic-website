"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { 
  GicSatellite, 
  GicMobile, 
  GicDesktop, 
  GicNetwork 
} from "@/lib/GicIcons";

// 1. Interfaces
interface StatCardProps {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  accentColor: string;
  isFeatured?: boolean; // New prop to handle the direct glow
}

interface StatsSectionProps {
  t: {
    statsKicker: string;
    statsTitle: string;
    statsDesc: string;
  };
  section?: string;
  container?: string;
}

// 2. Main Section
export default function StatsSection({ t, section = "", container = "" }: StatsSectionProps) {
  return (
    <section className={`${section} relative`}>
      <div className={`${container} relative z-10 mx-auto px-6`}>
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-3"
          >
            {t.statsKicker}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black tracking-tight"
          >
            {t.statsTitle}
          </motion.h2>
          <motion.p className="mt-4 text-default-500 max-w-xl text-base italic opacity-80">
            {t.statsDesc}
          </motion.p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            isFeatured // First one has direct glow
            label="Established" 
            value="2005" 
            helper="Two decades of academic excellence" 
            icon={<GicDesktop className="w-full h-full" />}
            accentColor="text-blue-500 dark:text-blue-400"
          />
          <StatCard 
            label="Community" 
            value="1,200+" 
            helper="Vibrant network of students and alumni" 
            icon={<GicNetwork className="w-full h-full" />}
            accentColor="text-indigo-500 dark:text-indigo-400"
          />
          <StatCard 
            label="Employment" 
            value="92%" 
            helper="Hired within 6 months of graduation" 
            icon={<GicSatellite className="w-full h-full" />}
            accentColor="text-cyan-500 dark:text-cyan-400"
          />
          <StatCard 
            label="Research" 
            value="12 Labs" 
            helper="Innovative groups driving local tech" 
            icon={<GicMobile className="w-full h-full" />}
            accentColor="text-primary"
          />
        </div>
      </div>
    </section>
  );
}

// 3. StatCard with Selective Glow & Soft Hover
function StatCard({ label, value, helper, icon, accentColor, isFeatured }: StatCardProps) {
  // Convert text-color to from-color for the gradient glow
  const glowGradient = accentColor.replace('text-', 'from-');

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <Card 
        className={`h-full border bg-background/40 backdrop-blur-md overflow-hidden group transition-all duration-500
          ${isFeatured ? 'border-primary/20 shadow-lg shadow-primary/5' : 'border-default-200/60 dark:border-default-100/10 shadow-none hover:shadow-lg hover:shadow-default-200/10'}
        `}
      >
        <CardBody className="p-7 relative flex flex-col justify-between min-h-[200px]">
          
          {/* Top-Right Icon Placement */}
          <div className={`absolute top-4 right-4 w-12 h-12 ${accentColor} opacity-15 group-hover:opacity-30 transition-all duration-700 pointer-events-none`}>
             {icon}
          </div>

          <div className="relative z-10">
            {/* Soft System Label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-mono font-medium uppercase tracking-widest text-default-400">
                get_{label.toLowerCase()}
              </span>
            </div>
            
            {/* The Value */}
            <div className={`text-4xl font-black tracking-tighter ${accentColor}`}>
              {value}
            </div>
          </div>

          {/* Helper Text */}
          <div className="relative z-10 mt-6 pt-4 border-t border-default-100/50">
            <p className="text-[13px] text-default-400 font-normal leading-snug group-hover:text-default-600 dark:group-hover:text-default-300 transition-colors duration-500">
              {helper}
            </p>
          </div>

          {/* Background Glow Logic 
              - First card: Static 20% opacity (direct)
              - Other cards: 0% opacity until hover
          */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${glowGradient}/20 to-transparent pointer-events-none transition-opacity duration-700
            ${isFeatured ? 'opacity-25' : 'opacity-0 group-hover:opacity-100'}
          `} />
        </CardBody>
      </Card>
    </motion.div>
  );
}