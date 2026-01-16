"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Cpu, 
  Users, 
  Search, 
  Globe, 
  Layout, 
  Video, 
  ScanFace, 
  BarChart3,
  ArrowRight,
  HardDrive,
  Network,
  Settings2,
  Lock,
  Zap,
  ShieldCheck,
  Server
} from "lucide-react";

export default function ServicesPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const capabilities = [
    {
      title: "Social Contribution",
      desc: "We are willing to work in projects that contribute to the development of the country.",
      icon: <Globe className="text-blue-600" />
    },
    {
      title: "Research Capability",
      desc: "As an education institution, we have a very strong research capability working on local and international scales.",
      icon: <Search className="text-blue-600" />
    },
    {
      title: "Development Skill",
      desc: "Specialized tools, clean code, and effective methodology. We are open to learning and mastering new technology.",
      icon: <Code2 className="text-blue-600" />
    },
    {
      title: "Powerful Computing Unit",
      desc: "Coming soon... Advanced infrastructure to support high-performance data processing.",
      icon: <Cpu className="text-gray-400" />,
      isSoon: true
    }
  ];

  const mainServices = [
    { title: "Research Project", icon: <Search size={24} />, href: "/research" },
    { title: "Supply Chain Management", icon: <BarChart3 size={24} />, href: "/services/supply-chain" },
    { title: "Biometric Facial Attendance", icon: <ScanFace size={24} />, href: "/services/biometric" },
    { title: "IT Consultant", icon: <Users size={24} />, href: "/services/consultant" },
    { title: "High-Performance Computing", icon: <Cpu size={24} />, href: "/services/hpc" },
    { title: "Database Analysis & Design", icon: <Database size={24} />, href: "/services/database" },
    { title: "System Design & Development", icon: <Layout size={24} />, href: "/services/dev" },
    { title: "E-learning Service", icon: <Video size={24} />, href: "/services/elearning" },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 pb-24">
      
      {/* 1. HEADER */}
      <section className="py-24 border-b border-gray-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 {...fadeIn} className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Our <span className="text-blue-600">Services</span>
          </motion.h1>
          <motion.p {...fadeIn} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            An expert team of skillful programmers, experienced researchers, and top-tier students 
            committing to quality products for our clients.
          </motion.p>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (Grid) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((cap, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-gray-50 dark:bg-zinc-900/50 border border-transparent hover:border-blue-600/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {cap.icon}
                </div>
                <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                  {cap.title}
                  {cap.isSoon && <span className="text-[10px] bg-gray-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-gray-500 font-bold uppercase">Soon</span>}
                </h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICE OFFERINGS (Full Width Grid) */}
      <section className="py-20 bg-slate-900 dark:bg-zinc-900 rounded-[3rem] mx-4 md:mx-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">What we offer</h2>
            <p className="text-slate-400 font-medium">Ready-to-deploy solutions and custom engineering services.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainServices.map((service, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                whileHover={{ y: -5 }}
                className="group relative h-48 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="text-blue-500 group-hover:scale-110 transition-transform origin-left">
                  {service.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold tracking-tight mb-2">{service.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read More <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            <section className="py-24 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Server size={14} />
                On-Premise Infrastructure
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
                Self-Managed <br />
                <span className="text-blue-600">Cloud Sovereignty</span>
              </h2>
              <p className="text-slate-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                Unlike standard providers, we operate our own **physical server center** right here at the department. 
                This allows for full control over data residency, ultra-low latency, and bespoke configurations 
                managed entirely by our expert team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Full Data Control</h4>
                    <p className="text-xs text-slate-500 mt-1">End-to-end management of hardware and software security layers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">High Performance</h4>
                    <p className="text-xs text-slate-500 mt-1">Dedicated bare-metal resources optimized for heavy computation.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual Representation of the Server Center */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative z-10 bg-slate-900 dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                {/* Mock Server Dashboard Header */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black text-white uppercase tracking-widest">GIC Node-01 Active</span>
                  </div>
                  <Settings2 size={16} className="text-zinc-500" />
                </div>

                {/* Server Specs Grid */}
                <div className="space-y-4">
                  {[
                    { label: "Storage Capacity", val: "500TB NVMe", icon: <HardDrive size={16} /> },
                    { label: "Compute Power", val: "High-Performance HPC", icon: <Network size={16} /> },
                    { label: "Security Protocol", val: "Hardware Encryption", icon: <Lock size={16} /> },
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-blue-600/10 transition-colors">
                      <div className="flex items-center gap-3 text-zinc-400 group-hover:text-blue-500 transition-colors">
                        {spec.icon}
                        <span className="text-xs font-bold">{spec.label}</span>
                      </div>
                      <span className="text-xs font-black text-white uppercase">{spec.val}</span>
                    </div>
                  ))}
                </div>

                {/* Status Bar */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500 mb-2">
                    <span>Uptime Efficiency</span>
                    <span className="text-emerald-500">99.9%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "99.9%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-blue-600" 
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-blue-600/20 blur-3xl -z-10 rounded-[3rem]" />
            </motion.div>

          </div>
        </div>
      </section>


      {/* 4. METHODOLOGY STRIP */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between p-12 rounded-[3rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20">
            <div className="mb-8 md:mb-0 max-w-xl">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Our Development Philosophy</h3>
              <p className="text-blue-100 leading-relaxed">
                We manage projects with specialized tools and effective methodologies. 
                We embrace <span className="underline decoration-blue-300 font-bold">clean code</span> to 
                ensure long-term maintainability and performance.
              </p>
            </div>
            <button className="bg-white text-blue-600 font-black px-10 py-4 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
              LET'S WORK TOGETHER
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}