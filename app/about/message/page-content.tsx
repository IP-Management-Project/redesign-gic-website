"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Linkedin,
  Mail,
  Quote,
  ShieldCheck,
  Target,
} from "lucide-react";
import { Button } from "@heroui/button";

import { GicNetworkIcon, GicSatelliteIcon } from "@/components/icons";
import {
  type HeadMessageCoreValue,
  useHeadMessageData,
} from "@/hooks/useHeadMessageData";

export type HeadMessageSectionKey =
  | "portrait"
  | "message"
  | `core-value-${number}`
  | "signature"
  | "footer";

type HeadMessagePageProps = {
  editable?: boolean;
  onEditSection?: (section: HeadMessageSectionKey) => void;
};

const defaultMessageData = {
  headName: "",
  title: "",
  specialization: "",
  email: "",
  linkedin: "",
  portrait: "",
  leadershipKicker: "",
  messageHtml: "",
  coreValues: [] as HeadMessageCoreValue[],
  signatureName: "",
  signatureTitle: "",
  footerText: "",
};

export default function HeadMessagePage({
  editable = false,
  onEditSection,
}: HeadMessagePageProps) {
  const { data: messageData } = useHeadMessageData();
  const data = messageData ?? defaultMessageData;

  const iconMap: Record<HeadMessageCoreValue["icon"], React.ReactNode> = {
    target: <Target className="text-[#76879d]" />,
    lightbulb: <Lightbulb className="text-[#76879d]" />,
    shield: <ShieldCheck className="text-[#76879d]" />,
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const getEditAction = (section: HeadMessageSectionKey) =>
    editable && onEditSection ? () => onEditSection(section) : undefined;

  const mailHref = data.email ? `mailto:${data.email}` : undefined;
  const linkedinHref = data.linkedin || undefined;

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen relative overflow-hidden">
      <div className="absolute top-20 right-[-10%] opacity-5 text-[#76879d] pointer-events-none">
        <GicSatelliteIcon size={600} />
      </div>
      <div className="absolute bottom-[10%] left-[-3%] opacity-5 text-[#26304d] pointer-events-none">
        <GicNetworkIcon size={500} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 sticky top-32"
            initial={{ opacity: 0, x: -50 }}
          >
            {editable ? (
              <div className="mb-4 flex justify-end">
                <Button
                  size="sm"
                  variant="flat"
                  onPress={getEditAction("portrait")}
                >
                  Edit portrait
                </Button>
              </div>
            ) : null}
            <div className="relative">
              <div className="absolute -inset-4 border-2 border-[#76879d]/20 rounded-[4rem] -rotate-3" />
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-b-8 border-[#26304d]">
                <img
                  alt={data.headName}
                  className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  src={data.portrait}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26304d]/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
                    {data.headName}
                  </h2>
                  <p className="text-[#76879d] font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
                    {data.title}
                  </p>
                  {data.specialization ? (
                    <p className="text-white/80 text-xs font-semibold mt-3">
                      {data.specialization}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center lg:justify-end gap-4">
              <Button
                isIconOnly
                className="rounded-full border-[#c8c8c8] text-[#26304d]"
                href={mailHref}
                isDisabled={!mailHref}
                variant="bordered"
              >
                <Mail size={20} />
              </Button>
              <Button
                isIconOnly
                className="rounded-full border-[#c8c8c8] text-[#26304d]"
                href={linkedinHref}
                isDisabled={!linkedinHref}
                variant="bordered"
              >
                <Linkedin size={20} />
              </Button>
            </div>
          </motion.div>

          <div className="lg:col-span-7 pt-10">
            <motion.div {...fadeIn}>
              {editable ? (
                <div className="mb-4 flex justify-end">
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={getEditAction("message")}
                  >
                    Edit message
                  </Button>
                </div>
              ) : null}
              <div className="flex items-center gap-3 mb-8">
                <span className="w-12 h-[2px] bg-[#26304d]" />
                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#76879d]">
                  {data.leadershipKicker}
                </span>
              </div>

              <div className="relative mb-12">
                <Quote
                  className="absolute -top-10 -left-10 text-[#76879d] opacity-20"
                  size={100}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: data.messageHtml }}
                  className="prose prose-xl dark:prose-invert max-w-none text-slate-600 dark:text-zinc-400 font-medium leading-relaxed prose-strong:text-[#26304d] prose-strong:font-black prose-p:mb-6"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-[#c8c8c8]/40">
                {(data.coreValues ?? []).map((value, index) => (
                  <div key={`${value.title}-${index}`} className="group">
                    {editable ? (
                      <div className="mb-3 flex justify-end">
                        <Button
                          size="sm"
                          variant="flat"
                          onPress={getEditAction(`core-value-${index}`)}
                        >
                          Edit value {index + 1}
                        </Button>
                      </div>
                    ) : null}
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#26304d] group-hover:text-white transition-all">
                      {iconMap[value.icon]}
                    </div>
                    <h4 className="font-black text-[#26304d] uppercase text-xs tracking-widest mb-1">
                      {value.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-tight">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>

              {editable ? (
                <div className="mt-6 flex justify-end">
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={getEditAction("signature")}
                  >
                    Edit signature
                  </Button>
                </div>
              ) : null}

              <div className="mt-20 flex items-center gap-6">
                <div className="h-[1px] w-24 bg-[#c8c8c8]" />
                <div className="text-center">
                  <p className="font-black text-[#26304d] uppercase tracking-tighter text-2xl">
                    {data.signatureName}
                  </p>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#76879d]">
                    {data.signatureTitle}
                  </p>
                </div>
                <div className="h-[1px] w-24 bg-[#c8c8c8]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="w-full py-10 bg-gray-50 dark:bg-zinc-900 border-t border-[#c8c8c8]/30 relative">
        {editable ? (
          <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute right-6 top-6 z-20">
              <Button
                size="sm"
                variant="flat"
                onPress={getEditAction("footer")}
              >
                Edit footer
              </Button>
            </div>
          </div>
        ) : null}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#76879d]">
            {data.footerText}
          </p>
        </div>
      </footer>
    </div>
  );
}
