import React from "react";
import { motion } from "framer-motion";
import { GicDesktopIcon, GicMobileIcon, GicNetworkIcon, GicSatelliteIcon } from "../icons";

type HeroSectionProps = {
  t: {
    heroTitle1: string;
    heroTitle2: string;
  };
};

export default function HeroSection({ t }: HeroSectionProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          // src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072" 
          // src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070"
          src="/landing/server.png"
          className="w-full h-full object-cover opacity-60"
          alt="Networking Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* GIC Decorative Elements (Floating) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[20%] left-[15%] text-blue-500 w-24 h-24"
        >
          <GicSatelliteIcon  size={200}/>
        </motion.div>
        <motion.div 
          animate={{ y: [0, 25, 0], opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[25%] left-[20%] text-cyan-400 w-16 h-16"
        >
          <GicMobileIcon size={200} />
        </motion.div>
        <motion.div 
          animate={{ x: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }} 
          transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
          className="absolute top-[25%] right-[18%] text-indigo-500 w-28 h-28"
        >
          <GicDesktopIcon size={200}/>
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }} 
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-[20%] right-[15%] text-blue-300 w-32 h-32"
        >
          <GicNetworkIcon size={200}/>
        </motion.div>
      </div>

      {/* Centered Content Layer */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          {/* Logo Title (GIC Text) */}
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-blue-500 tracking-[0.5em] text-4xl uppercase font-bold">
              Génie Informatique et Communications
            </span>
          </motion.div>

          {/* Main Hero Text */}
          <motion.h1 
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black text-white leading-tight"
          >
            {t.heroTitle1} <br />
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              {t.heroTitle2}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light"
          >
            Engineering the foundations of the digital world through 
            <span className="text-white italic"> Advanced Networking</span>, 
            <span className="text-white italic"> Software Systems</span>, and 
            <span className="text-white italic"> Telecommunications</span>.
          </motion.p>

          {/* Scroll Indicator (Replaces Button for "Display Only" Feel) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Discover More</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.05] z-10 pointer-events-none" />
    </section>
  );
}
