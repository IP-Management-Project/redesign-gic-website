"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Search, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Filter,
  Users,
  Calendar,
  Quote
} from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Pagination } from "@heroui/pagination";
import { usePublicationsData } from "@/hooks/usePublicationsData";

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const { data: publicationsData = [] } = usePublicationsData();
  const perPage = 3;

  const filteredPubs = useMemo(() => {
    return publicationsData.filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" || pub.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [publicationsData, searchQuery, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredPubs.length / perPage));
  const paginatedPubs = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredPubs.slice(start, start + perPage);
  }, [filteredPubs, page, perPage]);

  React.useEffect(() => {
    setPage(1);
  }, [searchQuery, activeTab]);

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="py-24 border-b border-gray-100 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[1]">
              Scientific <span className="text-blue-600">Impact</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 font-medium">
              Peer-reviewed papers, technical reports, and conference contributions from the 
              Department of Information and Communication Engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTROLS (Search & Tabs) */}
      <section className="py-12 border-b border-divider sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="w-full md:w-96">
              <Input
                placeholder="Search by title or author..."
                startContent={<Search className="text-default-400" size={18} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="bordered"
                classNames={{ inputWrapper: "rounded-2xl" }}
              />
            </div>

            <Tabs 
              aria-label="Publication Categories" 
              color="primary" 
              variant="solid"
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              classNames={{
                tabList: "bg-gray-100 dark:bg-zinc-900 rounded-2xl p-1",
                cursor: "bg-blue-600 rounded-xl",
                tabContent: "font-black uppercase text-[10px] tracking-widest"
              }}
            >
              <Tab key="All" title="All Work" />
              <Tab key="Journal" title="Journals" />
              <Tab key="Conference" title="Conferences" />
              <Tab key="Report" title="Reports" />
            </Tabs>
          </div>
        </div>
      </section>

      {/* 3. PUBLICATIONS LIST */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-12">
            <AnimatePresence mode="popLayout">
              {paginatedPubs.map((pub, i) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-8 md:p-12 rounded-[3rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-none hover:shadow-2xl hover:shadow-blue-600/10 transition-all group">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left: Metadata */}
                      <div className="md:w-1/4 space-y-4">
                        <Chip 
                          variant="flat" 
                          className={`font-black uppercase text-[10px] border-none ${
                            pub.type === 'Journal' ? 'bg-blue-100 text-blue-600' : 
                            pub.type === 'Conference' ? 'bg-purple-100 text-purple-600' : 
                            'bg-emerald-100 text-emerald-600'
                          }`}
                        >
                          {pub.type}
                        </Chip>
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                          <Calendar size={14} /> {pub.year}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {pub.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-gray-50 dark:bg-zinc-800 text-[10px] font-bold text-slate-500 uppercase">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="md:w-3/4">
                        <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight group-hover:text-blue-600 transition-colors">
                          {pub.title}
                        </h3>
                        <p className="text-blue-600 font-bold mb-4 flex items-center gap-2">
                          <Users size={16} /> {pub.authors}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 italic mb-8 leading-relaxed">
                          Published in: <span className="font-bold text-slate-800 dark:text-white">{pub.venue}</span>
                        </p>
                        
                        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 mb-8">
                          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                            <Quote className="text-blue-600/20 mb-2" size={24} />
                            {pub.abstract}
                          </p>
                        </div>

                        <div className="flex gap-4">
                          <Button size="sm" color="primary" className="font-black h-12 rounded-xl bg-blue-600 text-white">
                            FULL TEXT <Download size={16} className="ml-2" />
                          </Button>
                          <Button size="sm" variant="bordered" className="font-black h-12 rounded-xl border-divider">
                            CITE <Quote size={16} className="ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Page <span className="font-semibold text-slate-900 dark:text-white">{page}</span> of{" "}
              <span className="font-semibold text-slate-900 dark:text-white">{totalPages}</span>
            </p>
            <Pagination
              page={page}
              total={totalPages}
              onChange={setPage}
              showControls
              className="mx-auto sm:mx-0"
            />
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION: COLLABORATION */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-12 md:p-20 rounded-[4rem] bg-zinc-950 text-white relative overflow-hidden text-center">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">
                Collaborate with <br /><span className="text-blue-600">Our Researchers</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
                Interested in our Khmer NLP research, High-Performance Computing, or Data Science projects? 
                Join our academic network or request specific datasets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 text-white font-black h-14 px-10 rounded-2xl">
                  REQUEST DATASETS
                </Button>
                <Button variant="bordered" className="text-white border-white/20 font-black h-14 px-10 rounded-2xl">
                  PARTNER WITH LABS
                </Button>
              </div>
            </div>
            {/* Glow Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/10 blur-[120px] pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
