"use client";

import React from "react";
import { Card } from "@heroui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PathwayCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  imgSrc: string;
  isWide?: boolean;
}

export default function PathwayCard({ title, desc, icon, imgSrc, isWide = false }: PathwayCardProps) {
  return (
    <Card className={`${isWide ? 'md:col-span-12' : 'md:col-span-6'} h-[300px] border border-default-200/50 bg-background overflow-hidden shadow-none group transition-all duration-500 hover:border-primary/30`}>
      <div className="flex h-full flex-col md:flex-row">
        
        {/* Content Side */}
        <div className="p-8 flex flex-col justify-between md:w-1/2 relative z-10">
          <div>
            <div className="text-primary mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 origin-left transition-all duration-500">
              {icon}
            </div>
            <h4 className="text-xl font-black mb-3 text-foreground group-hover:text-primary transition-colors">
              {title}
            </h4>
            <p className="text-sm text-default-500 leading-relaxed font-medium pr-4 line-clamp-3">
              {desc}
            </p>
          </div>

          {/* INTERACTIVE FOOTER: Line expands and text slides in */}
          <div className="flex items-center gap-3 overflow-hidden">
            {/* The Line */}
            <div className="h-[1px] bg-primary transition-all duration-700 ease-in-out w-8 group-hover:w-12 opacity-30 group-hover:opacity-100" />
            
            {/* Sliding "View More" Text */}
            <motion.div
              className="flex items-center gap-1.5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                View More
              </span>
              <ArrowRight size={12} className="text-primary" />
            </motion.div>
          </div>
        </div>

        {/* Image Side */}
        <div className="md:w-1/2 relative overflow-hidden h-full bg-default-100">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-95 dark:opacity-40 group-hover:grayscale-0"
          />
          {/* Subtle overlay for better image-to-text blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden md:block" />
        </div>
      </div>
    </Card>
  );
}