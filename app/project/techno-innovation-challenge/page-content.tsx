"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, History, Monitor, Rocket, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@heroui/button";

import TICIncubationHub, { type TicHubSectionKey } from "@/components/incubation-roadmap";
import { useIncubationShowcaseData } from "@/hooks/useIncubationShowcaseData";

export type TicShowcaseSectionKey =
  | TicHubSectionKey
  | "launchpad"
  | "heritage"
  | `season-${number}`
  | "gallery"
  | `gallery-item-${number}`;

type TICShowcasePageProps = {
  editable?: boolean;
  onEditSection?: (section: TicShowcaseSectionKey) => void;
};

const defaultLaunchpad = {
  titleMain: "",
  titleHighlight: "",
  description: "",
  features: [] as string[],
  images: [] as Array<{ src: string; alt: string }>,
};

const defaultHeritage = {
  title: "",
  subtitle: "",
  teamsLabel: "",
  winnerSuffix: "Winner",
};

const defaultGallery = {
  titleMain: "",
  titleHighlight: "",
  subtitle: "",
  footnote: "",
  overlayKicker: "",
  overlaySubtitle: "",
  ctaText: "",
  ctaLabel: "",
  ctaHref: "",
};

export default function TICShowcasePage({ editable = false, onEditSection }: TICShowcasePageProps) {
  const [selectedSeason, setSelectedSeason] = React.useState(0);
  const { data } = useIncubationShowcaseData();

  const launchpad = data?.launchpad ?? defaultLaunchpad;
  const heritage = data?.heritage ?? defaultHeritage;
  const galleryCopy = data?.gallery ?? defaultGallery;
  const seasonalData = data?.seasons ?? [];
  const galleryItems = data?.galleryItems ?? [];

  React.useEffect(() => {
    if (!seasonalData.length) return;
    if (selectedSeason >= seasonalData.length) {
      setSelectedSeason(0);
    }
  }, [seasonalData.length, selectedSeason]);

  const safeSeasonIndex = seasonalData.length
    ? Math.min(selectedSeason, seasonalData.length - 1)
    : 0;
  const selectedSeasonData = seasonalData[safeSeasonIndex];
  const selectedTeams = selectedSeasonData?.teams ?? [];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const getEditAction = (section: TicShowcaseSectionKey) =>
    editable && onEditSection ? () => onEditSection(section) : undefined;

  const launchpadImages = launchpad.images ?? [];
  const launchpadPrimaryImage = launchpadImages[0];
  const launchpadSecondaryImage = launchpadImages[1];

  return (
    <div className="bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans overflow-hidden">
      <TICIncubationHub editable={editable} onEditSection={onEditSection} />

      {/* 3. INCUBATION CENTER SHOWCASE: THE HUB */}
      <section className="py-24 bg-white dark:bg-zinc-950 relative">
        {editable ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-6 top-6 z-20">
              <Button size="sm" variant="flat" onPress={getEditAction("launchpad")}>
                Edit launchpad
              </Button>
            </div>
          </div>
        ) : null}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
                {launchpad.titleMain} <br />
                <span className="text-[#007d49]">{launchpad.titleHighlight}</span>
              </h2>
              <p className="text-slate-600 dark:text-zinc-400 mb-10 text-lg leading-relaxed">
                {launchpad.description}
              </p>
              <div className="space-y-4">
                {launchpad.features.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className="flex items-center gap-4 p-6 rounded-3xl bg-[#c8c8c8]/10 dark:bg-zinc-900 border border-[#c8c8c8]/30 hover:border-[#007d49]/50 transition-all"
                  >
                    {index === 0 ? (
                      <Monitor className="text-[#007d49]" />
                    ) : (
                      <Users className="text-[#007d49]" />
                    )}
                    <p className="text-sm font-bold uppercase tracking-widest">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="grid grid-cols-2 gap-4">
              {launchpadPrimaryImage?.src ? (
                <img
                  src={launchpadPrimaryImage.src}
                  className="rounded-[2.5rem] w-full h-80 object-cover shadow-xl border border-[#c8c8c8]/20"
                  alt={launchpadPrimaryImage.alt || "Incubation office"}
                />
              ) : (
                <div className="rounded-[2.5rem] w-full h-80 border border-dashed border-[#c8c8c8]/50" />
              )}
              {launchpadSecondaryImage?.src ? (
                <img
                  src={launchpadSecondaryImage.src}
                  className="rounded-[2.5rem] w-full h-80 object-cover mt-8 shadow-xl border border-[#c8c8c8]/20"
                  alt={launchpadSecondaryImage.alt || "Incubation collaboration"}
                />
              ) : (
                <div className="rounded-[2.5rem] w-full h-80 mt-8 border border-dashed border-[#c8c8c8]/50" />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. SEASONAL HERITAGE: THE SEASON EXPLORER (S1-S8) */}
      <section className="py-24 bg-zinc-950 text-white rounded-[4rem] mx-4 md:mx-6 overflow-hidden relative border border-[#c8c8c8]/10">
        {editable ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-6 top-6 z-20">
              <Button size="sm" variant="flat" onPress={getEditAction("heritage")}>
                Edit heritage
              </Button>
            </div>
          </div>
        ) : null}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <History className="text-[#007d49]" />
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">{heritage.title}</h2>
            </div>
            <p className="text-[#c8c8c8] max-w-2xl mx-auto text-lg">{heritage.subtitle}</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Season Selector */}
            <div className="lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 no-scrollbar">
              {seasonalData.map((season, index) => (
                <button
                  key={`${season.season}-${season.year}`}
                  onClick={() => setSelectedSeason(index)}
                  className={`px-8 py-5 rounded-2xl text-left transition-all shrink-0 ${
                    safeSeasonIndex === index
                      ? "bg-[#007d49] text-white shadow-xl scale-105"
                      : "bg-white/5 text-[#c8c8c8] hover:bg-white/10 border border-transparent hover:border-[#c8c8c8]/20"
                  }`}
                >
                  <span className="block text-[10px] font-black uppercase tracking-widest opacity-60">
                    {season.year}
                  </span>
                  <span className="text-xl font-black tracking-tighter">{season.season}</span>
                </button>
              ))}
            </div>

            {/* Selected Season Detail */}
            <div className="lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeSeasonIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-12 md:p-16 rounded-[4rem] bg-white/5 border border-[#c8c8c8]/20 backdrop-blur-xl h-full flex flex-col justify-between"
                >
                  {editable ? (
                    <div className="mb-6 flex justify-end">
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={getEditAction(`season-${safeSeasonIndex}`)}
                      >
                        Edit season {safeSeasonIndex + 1}
                      </Button>
                    </div>
                  ) : null}
                  <div>
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <h3 className="text-5xl font-black tracking-tighter mb-2">
                          {selectedSeasonData?.season} {heritage.winnerSuffix}
                        </h3>
                        <p className="text-[#007d49] text-2xl font-black uppercase tracking-widest">
                          {selectedSeasonData?.winner}
                        </p>
                      </div>
                      <div className="w-20 h-20 rounded-3xl bg-[#007d49] flex items-center justify-center shadow-2xl">
                        <Rocket size={32} />
                      </div>
                    </div>
                    <p className="text-xl text-[#c8c8c8] leading-relaxed mb-12 italic">
                      "{selectedSeasonData?.desc}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#c8c8c8]/60 mb-6">
                      {heritage.teamsLabel}
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {selectedTeams.map((team) => (
                        <div
                          key={team}
                          className="px-8 py-4 rounded-2xl bg-white/5 border border-[#c8c8c8]/20 font-black text-sm hover:border-[#007d49] transition-all cursor-default group"
                        >
                          <Sparkles className="inline-block mr-2 text-[#007d49] group-hover:animate-spin" size={16} /> {team}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INNOVATION IMPACT GALLERY */}
      <section className="py-24 bg-white dark:bg-zinc-950 relative">
        {editable ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-6 top-6 z-20">
              <Button size="sm" variant="flat" onPress={getEditAction("gallery")}>
                Edit gallery
              </Button>
            </div>
          </div>
        ) : null}
        <div className="max-w-7xl mx-auto px-6">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-4">
                <Flame className="text-[#007d49]" fill="currentColor" />
                {galleryCopy.titleMain} <span className="text-[#007d49]">{galleryCopy.titleHighlight}</span>
              </h2>
              <p className="mt-4 text-slate-500 font-medium max-w-xl border-l-4 border-[#007d49] pl-6 py-2">
                {galleryCopy.subtitle}
              </p>
            </motion.div>
            <div className="hidden md:block">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8c8c8]">
                {galleryCopy.footnote}
              </span>
            </div>
          </div>

          {/* GALLERY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[200px] gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative rounded-[2.5rem] overflow-hidden border border-[#c8c8c8]/30 shadow-lg ${item.span}`}
              >
                {editable ? (
                  <div className="absolute right-3 top-3 z-20">
                    <Button size="sm" variant="flat" onPress={getEditAction(`gallery-item-${index}`)}>
                      Edit item {index + 1}
                    </Button>
                  </div>
                ) : null}
                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  alt={`TIC Competition Moment - ${item.label}`}
                />

                {/* THEMATIC OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#007d49]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-1 text-white">
                    <Star size={12} fill="currentColor" />
                    <p className="text-[9px] font-black uppercase tracking-widest">{galleryCopy.overlayKicker}</p>
                  </div>
                  <h4 className="text-white text-base font-black leading-tight">{item.label}</h4>
                  <p className="text-white/70 text-[10px] mt-1 font-medium">{galleryCopy.overlaySubtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA SECTION */}
          <motion.div
            {...fadeIn}
            className="mt-16 flex flex-col md:flex-row items-center justify-between p-10 rounded-[3rem] bg-[#c8c8c8]/10 border border-[#c8c8c8]/30"
          >
            <p className="text-sm text-slate-500 font-bold max-w-md text-center md:text-left">
              {galleryCopy.ctaText}
            </p>
            <Button
              className="mt-6 md:mt-0 bg-[#007d49] text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-[#007d49]/20 flex items-center gap-2"
              href={galleryCopy.ctaHref}
            >
              {galleryCopy.ctaLabel} <Rocket size={18} />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
