"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Cpu,
  Info
} from "lucide-react";
import Link from "next/link";
import { useNewsEventArticle } from "@/hooks/useNewsEventArticle";

export default function NewsEditorialPage({ params }: { params: { eventSlug: string } }) {
  const { eventSlug } = params;
  const { data: article } = useNewsEventArticle(eventSlug);

  if (!article) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* 1. CINEMATIC LANDSCAPE HERO */}
      <header className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/news" className="group flex items-center gap-2 text-[#76879d] mb-10 hover:text-[#26304d] transition-colors">
              <div className="w-8 h-8 rounded-full border border-[#c8c8c8] flex items-center justify-center group-hover:bg-[#26304d] group-hover:text-white transition-all">
                <ArrowLeft size={14} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Research Archives</span>
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[#26304d]"></span>
              <span className="text-xs font-black uppercase tracking-widest text-[#26304d]">{article.category}</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-[#26304d] dark:text-white uppercase tracking-tighter leading-[0.85] mb-12">
              {article.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-[#76879d]" : ""}>{word} </span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full aspect-[21/9] rounded-[4rem] overflow-hidden shadow-2xl border-b border-[#c8c8c8]/30"
          >
            <img src={article.heroImage} className="w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#26304d]/40 to-transparent" />
          </motion.div>

          <div className="flex flex-wrap items-center gap-12 py-10 border-b border-[#c8c8c8]/40">
            <MetaItem label="Date" value={article.date} />
            <MetaItem label="Domain" value={article.domain} />
            <MetaItem label="Reading" value={article.readingTime} />
          </div>
        </div>
      </header>

      {/* 2. DYNAMIC CONTENT AREA */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 relative">

        {/* Fixed Side Label */}
        <div className="hidden lg:block lg:col-span-1 sticky top-40 h-fit">
          <div className="flex flex-col gap-8 items-center border-r border-[#c8c8c8] pr-8">
            <div className="h-24 w-[1px] bg-[#c8c8c8]"></div>
            <span className="rotate-90 pl-16 text-[9px] font-black uppercase tracking-[0.4em] text-[#c8c8c8] whitespace-nowrap">Technical Brief</span>
          </div>
        </div>

        {/* Main Article Body (HTML Rendering) */}
        <div className="lg:col-span-7">
          {/* PRIMARY HTML SECTION */}
          {article.htmlBodyPrimary && (
            <div
              className="prose prose-xl dark:prose-invert max-w-none font-medium text-slate-600 dark:text-zinc-400 leading-relaxed mb-12 
                         prose-headings:text-[#26304d] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                         prose-strong:text-[#26304d] prose-strong:font-black"
              dangerouslySetInnerHTML={{ __html: article.htmlBodyPrimary }}
            />
          )}

          {/* SPOTLIGHT BLOCK */}
          {article.spotlight && (
            <div className="my-16 p-12 rounded-[3.5rem] bg-[#26304d] text-white relative overflow-hidden group">
              <Cpu className="absolute -right-10 -bottom-10 text-white/5 w-64 h-64 group-hover:scale-110 transition-transform duration-1000" />
              <h4 className="text-[#76879d] text-[10px] font-black uppercase tracking-[0.4em] mb-4">{article.spotlight.title}</h4>
              <p className="text-3xl font-black uppercase tracking-tighter leading-none mb-8">
                {article.spotlight.subtitle}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {article.spotlight.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold uppercase tracking-tight">
                    <ChevronRight size={16} className="text-[#76879d]" /> {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SECONDARY HTML SECTION (Appended below Spotlight) */}
          {article.htmlBodySecondary && (
            <div
              className="prose prose-xl dark:prose-invert max-w-none font-medium text-slate-600 dark:text-zinc-400 leading-relaxed
                         prose-headings:text-[#26304d] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
                         prose-li:marker:text-[#76879d] prose-strong:text-[#26304d]"
              dangerouslySetInnerHTML={{ __html: article.htmlBodySecondary }}
            />
          )}
        </div>

        {/* Dynamic Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {article.relatedBriefs.length > 0 && (
            <div className="p-10 rounded-[3.5rem] bg-[#76879d]/10 border border-[#76879d]/30">
              <h4 className="text-[10px] font-black text-[#26304d] uppercase tracking-[0.3em] mb-8">Related Briefs</h4>
              <div className="space-y-8">
                {article.relatedBriefs.map((brief, i) => (
                  <Link key={i} href="#" className="group block">
                    <p className="text-xs font-black text-[#76879d] mb-1">{brief.date}</p>
                    <p className="text-sm font-bold text-[#26304d] group-hover:text-[#76879d] transition-colors leading-tight uppercase">
                      {brief.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="p-10 rounded-[3.5rem] bg-[#26304d] text-white flex flex-col items-center text-center shadow-xl">
            <Info className="text-[#76879d] mb-4" size={32} />
            <p className="text-xs font-bold uppercase leading-relaxed">
              For technical inquiries regarding GIC R&D infrastructure, please contact the Server Management Team.
            </p>
          </div>
        </aside>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-[#c8c8c8]/30 text-center">
        <div className="text-[9px] font-black uppercase tracking-[0.5em] text-[#76879d]">
          Department of Information and Communication Engineering / Journal Archive
        </div>
      </footer>
    </div>
  );
}

function MetaItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] font-black text-[#76879d] uppercase tracking-widest mb-1">{label}</span>
      <span className="text-sm font-bold text-[#26304d] uppercase">{value}</span>
    </div>
  );
}
