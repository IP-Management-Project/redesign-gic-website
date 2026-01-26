"use client";

import React from "react";
import { Button } from "@heroui/button";
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
  Server,
} from "lucide-react";

import {
  type ServicesPageData,
  useServicesData,
} from "@/hooks/useServicesData";

export type ServicesSectionKey =
  | "header"
  | "capabilities"
  | "offerings"
  | "infrastructure"
  | "methodology";

type ServicesPageContentProps = {
  editable?: boolean;
  onEditSection?: (section: ServicesSectionKey) => void;
};

type EditAction = {
  label: string;
  onEdit: () => void;
};

const emptyServicesData: ServicesPageData = {
  header: { title: "", subtitle: "" },
  offerings: { title: "", subtitle: "" },
  infrastructure: {
    badge: "",
    titleMain: "",
    titleHighlight: "",
    description: "",
    controlTitle: "",
    controlDesc: "",
    performanceTitle: "",
    performanceDesc: "",
    statusLabel: "",
    uptimeLabel: "",
    uptimeValue: "",
  },
  methodology: { title: "", description: "", buttonLabel: "" },
  capabilities: [],
  mainServices: [],
  serverSpecs: [],
};

export default function ServicesPageContent({ editable = false, onEditSection }: ServicesPageContentProps) {
  const { data } = useServicesData();
  const services = data ?? emptyServicesData;

  const getEditAction = (section: ServicesSectionKey, label: string): EditAction | undefined =>
    editable && onEditSection
      ? {
          label,
          onEdit: () => onEditSection(section),
        }
      : undefined;

  const capabilityIcons = {
    globe: <Globe className="text-blue-600" />,
    search: <Search className="text-blue-600" />,
    code: <Code2 className="text-blue-600" />,
    cpu: <Cpu className="text-gray-400" />,
  } as const;

  const serviceIcons = {
    search: <Search size={24} />,
    chart: <BarChart3 size={24} />,
    scan: <ScanFace size={24} />,
    users: <Users size={24} />,
    cpu: <Cpu size={24} />,
    database: <Database size={24} />,
    layout: <Layout size={24} />,
    video: <Video size={24} />,
  } as const;

  const serverIcons = {
    storage: <HardDrive size={16} />,
    compute: <Network size={16} />,
    security: <Lock size={16} />,
  } as const;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const headerWords = services.header.title.trim().split(/\s+/).filter(Boolean);
  const headerHighlight = headerWords.pop() ?? "";
  const headerMain = headerWords.join(" ");

  return (
    <div className="bg-white pb-24 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* 1. HEADER */}
      <section className="relative border-b border-gray-100 py-24 dark:border-zinc-900">
        {getEditAction("header", "Edit header") ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-6 top-6 z-20">
              <Button size="sm" variant="flat" onPress={() => onEditSection?.("header")}>
                Edit header
              </Button>
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.h1
            {...fadeIn}
            className="mb-6 text-5xl font-black tracking-tighter md:text-7xl"
          >
            {headerMain ? `${headerMain} ` : null}
            <span className="text-blue-600">{headerHighlight || services.header.title}</span>
          </motion.h1>
          <motion.p
            {...fadeIn}
            className="mx-auto max-w-2xl text-lg font-medium text-slate-500 md:text-xl"
          >
            {services.header.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (Grid) */}
      <section className="relative py-24">
        {getEditAction("capabilities", "Edit capabilities") ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={() => onEditSection?.("capabilities")}>
              Edit capabilities
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.capabilities.map((cap, i) => (
              <motion.div
                key={`${cap.title}-${i}`}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="group rounded-[2rem] border border-transparent bg-gray-50 p-8 transition-all hover:border-blue-600/20 dark:bg-zinc-900/50"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-110 dark:bg-zinc-800">
                  {capabilityIcons[cap.icon]}
                </div>
                <h3 className="mb-3 flex items-center gap-2 text-xl font-black">
                  {cap.title}
                  {cap.isSoon ? (
                    <span className="rounded bg-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-500 dark:bg-zinc-800">
                      Soon
                    </span>
                  ) : null}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-zinc-400">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICE OFFERINGS (Full Width Grid) */}
      <section className="relative mx-4 overflow-hidden rounded-[3rem] bg-slate-900 py-20 dark:bg-zinc-900 md:mx-6">
        {getEditAction("offerings", "Edit offerings") ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={() => onEditSection?.("offerings")}>
              Edit offerings
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="mb-4 text-3xl font-black tracking-tighter text-white md:text-5xl">
              {services.offerings.title}
            </h2>
            <p className="font-medium text-slate-400">{services.offerings.subtitle}</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.mainServices.map((service, i) => (
              <motion.div
                key={`${service.title}-${i}`}
                {...fadeIn}
                whileHover={{ y: -5 }}
                className="group relative flex h-48 cursor-pointer flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-500/50 hover:bg-white/10"
              >
                <div className="origin-left text-blue-500 transition-transform group-hover:scale-110">
                  {serviceIcons[service.icon]}
                </div>
                <div>
                  <h4 className="mb-2 font-bold tracking-tight text-white">{service.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                    Read More <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INFRASTRUCTURE SECTION */}
      <section className="relative overflow-hidden py-24">
        {getEditAction("infrastructure", "Edit infrastructure") ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={() => onEditSection?.("infrastructure")}>
              Edit infrastructure
            </Button>
          </div>
        ) : null}

        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:border-blue-800/30 dark:bg-blue-900/20 dark:text-blue-400">
                <Server size={14} />
                {services.infrastructure.badge}
              </div>
              <h2 className="mb-6 text-4xl font-black tracking-tighter leading-tight md:text-6xl">
                {services.infrastructure.titleMain} <br />
                <span className="text-blue-600">{services.infrastructure.titleHighlight}</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-zinc-400">
                {services.infrastructure.description}
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{services.infrastructure.controlTitle}</h4>
                    <p className="mt-1 text-xs text-slate-500">{services.infrastructure.controlDesc}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{services.infrastructure.performanceTitle}</h4>
                    <p className="mt-1 text-xs text-slate-500">{services.infrastructure.performanceDesc}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 relative lg:order-2"
            >
              <div className="relative z-10 rounded-[2.5rem] border border-white/10 bg-slate-900 p-8 shadow-2xl dark:bg-zinc-900">
                <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-white">
                      {services.infrastructure.statusLabel}
                    </span>
                  </div>
                  <Settings2 size={16} className="text-zinc-500" />
                </div>

                <div className="space-y-4">
                  {services.serverSpecs.map((spec, i) => (
                    <div
                      key={`${spec.label}-${i}`}
                      className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-blue-600/10"
                    >
                      <div className="flex items-center gap-3 text-zinc-400 transition-colors group-hover:text-blue-500">
                        {serverIcons[spec.icon]}
                        <span className="text-xs font-bold">{spec.label}</span>
                      </div>
                      <span className="text-xs font-black uppercase text-white">{spec.val}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/5 pt-6">
                  <div className="mb-2 flex justify-between text-[10px] font-black uppercase text-zinc-500">
                    <span>{services.infrastructure.uptimeLabel}</span>
                    <span className="text-emerald-500">{services.infrastructure.uptimeValue}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: services.infrastructure.uptimeValue }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-blue-600/20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. METHODOLOGY STRIP */}
      <section className="relative py-24">
        {getEditAction("methodology", "Edit methodology") ? (
          <div className="mx-auto mb-6 flex max-w-7xl justify-end px-6">
            <Button size="sm" variant="flat" onPress={() => onEditSection?.("methodology")}>
              Edit methodology
            </Button>
          </div>
        ) : null}

        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between rounded-[3rem] bg-blue-600 p-12 text-white shadow-2xl shadow-blue-600/20 md:flex-row">
            <div className="mb-8 max-w-xl md:mb-0">
              <h3 className="mb-4 text-3xl font-black tracking-tight">{services.methodology.title}</h3>
              <p className="leading-relaxed text-blue-100">{services.methodology.description}</p>
            </div>
            <button className="rounded-2xl bg-white px-10 py-4 font-black text-blue-600 transition-all hover:bg-slate-900 hover:text-white">
              {services.methodology.buttonLabel}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
