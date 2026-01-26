"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCcw, Home } from "lucide-react";
import { Button } from "@heroui/button";
import Link from "next/link";
import { GicDesktopIcon, GicMobileIcon, GicSatelliteIcon } from "@/components/icons";

export default function Error404Page() {
  const float = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* BACKGROUND DECORATIVE NETWORK */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <GicMobileIcon className="w-full h-full text-[#26304d]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        
        {/* ANIMATED 404 VISUAL */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.div {...float}>
             <GicSatelliteIcon className="w-24 h-24 text-[#76879d]" />
          </motion.div>
          <h1 className="text-[12rem] font-black tracking-tighter text-[#26304d] leading-none select-none">
            404
          </h1>
        </div>

        {/* ERROR MESSAGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#26304d] mb-4">
            Cannot find you page
          </h2>
          <p className="text-[#76879d] font-medium mb-12 leading-relaxed">
            The page you are looking for has been de-indexed or moved beyond our current 
            network range. Let's redirect your connection back to the GIC Hub.
          </p>
        </motion.div>

        {/* NAVIGATION ACTIONS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Button 
            as={Link}
            href="/"
            className="bg-[#26304d] text-white font-black h-16 px-10 rounded-2xl shadow-xl hover:scale-105 transition-transform"
            startContent={<Home size={20} />}
          >
            RETURN HOME
          </Button>
          
        </motion.div>

        {/* TECHNICAL FOOTER */}
        <div className="mt-20 pt-8 border-t border-[#76879d]/20 w-full">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#76879d]/60">
             GIC Engineering & Systems / Error Code: NULL_ROUTE_EXCEPTION
           </p>
        </div>
      </div>
    </div>
  );
}