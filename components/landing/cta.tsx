import React from "react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import NextLink from "next/link";

type FinalCTAProps = {
  t: {
    finalTitle: string;
    finalDesc: string;
    cta1: string;
  };
  container: string;
};

export default function FinalCTA({ t, container }: FinalCTAProps) {
  return (
    <section className="py-10 md:py-20 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Glows - Adjusted for Theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className={container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border border-divider bg-content1/50 dark:bg-content1/20 backdrop-blur-sm p-10 md:p-20 text-center"
        >
          {/* Subtle Grid Pattern Overlay (Optional) */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10">
            {/* Eyebrow / Kicker */}
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="inline-block mb-6 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-primary"
            >
              Start your journey
            </motion.div>

            {/* Title - responsive leading */}
            <h2 className="text-4xl md:text-6xl font-black text-foreground leading-[1.1] tracking-tight max-w-4xl mx-auto">
              {t.finalTitle}
            </h2>

            {/* Description */}
            <p className="mt-8 text-default-500 dark:text-default-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              {t.finalDesc}
            </p>

            {/* Actions */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button
                as={NextLink}
                href="/program"
                size="lg"
                className="bg-foreground text-background font-bold px-12 h-14 rounded-2xl shadow-xl shadow-default-200 dark:shadow-none hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto"
              >
                {t.cta1}
              </Button>

            </div>

            {/* Trust Line & Stats */}
            {/* <div className="mt-12 pt-8 border-t border-divider/50 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              <div className="flex flex-col items-center sm:items-start">
                 <span className="text-xs font-bold text-default-400 uppercase tracking-widest">Next Intake</span>
                 <span className="text-lg font-black">September 2026</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-divider" />
              <div className="flex flex-col items-center sm:items-start">
                 <span className="text-xs font-bold text-default-400 uppercase tracking-widest">Support</span>
                 <span className="text-lg font-black">100% Online Assistance</span>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
