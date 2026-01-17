"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import NextLink from "next/link";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Avatar } from "@heroui/avatar";
import { Terminal, Cpu, ArrowRight, Code } from "lucide-react";
import HeroSection from "@/components/landing/hero";
import StatsSection from "@/components/landing/stats";
import PillarsSection from "@/components/landing/pillar";
import PartnerSection from "@/components/landing/partner";
import FacultySlideshow from "@/components/landing/lecturers";
import FacultySlideshowFull from "@/components/landing/lecturers";
import CareersSection from "@/components/landing/carrers";
import EventsSlideshow from "@/components/landing/event";
import PressReleaseSlideshow from "@/components/landing/event";
import FinalCTA from "@/components/landing/cta";
import ResearchShowcase from "@/components/landing/research-showcase";
/**
 * NOTES (professional polish)
 * - Cleaner spacing + typographic rhythm
 * - Reduced “neon / gimmick” effects; keeps subtle brand gradients
 * - Consistent section headers, max widths, and subdued backgrounds
 * - Adds University Partners section (logos + partner pathways)
 * - Removes dynamic Tailwind class `bg-${color}` (won’t compile in production)
 */

const dict = {
  t: {
    facultyKicker: "Our Expertise",
    facultyTitle: "Meet Our Distinguished Faculty",
  },
  event: {
    newsKicker: "Media Center",
    newsTitle: "Latest News & Events",
  },
  carrer: {
    careersKicker: "Industry & Careers",
    careersTitle: "Where our students go",
  },
  stats: {
    statsKicker: "Our Department in Numbers",
    statsTitle: "Driving Innovation Since 2005",
    statsDesc: "A look at the milestones that define our commitment to engineering excellence and student success.",
  },
  research: {
    researchKicker: "Research & Innovation",
    researchTitle: "Transforming Theory into Technology",
    researchDesc: "Our department leads innovation in Khmer NLP, Secure Systems, and Data Analytics.",
  },
  pillars: {
    pillarsKicker: "Educational Framework",
    pillarsTitle: "Three Pillars of Excellence",
    pillarsDesc: "Our programs are designed to take you from foundational engineering to high-level research and professional leadership.",
  },
  partnersKicker: "Global Footprint",
  partnersTitle: "International Cooperation",
  partnersDesc: "GIC maintains deep-rooted ties with leading technical institutes worldwide to foster academic mobility and cutting-edge research.",
};

// 2. Mock University Data (Excluding Thailand)
// These are typical partners for ITC / GIC department
const universityPartners = [
  {
    name: "INSA Lyon",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Logo_INSA_Lyon.svg"
  },
  {
    name: "Tokyo Institute of Technology",
    src: "https://upload.wikimedia.org/wikipedia/en/b/b3/Tokyo_Institute_of_Technology_logo.svg"
  },
  {
    name: "Korea University",
    src: "https://upload.wikimedia.org/wikipedia/en/a/a1/Korea_University_logo.svg"
  },
  {
    name: "UTC (Université de Technologie de Compiègne)",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Logo_UTC.svg"
  },
  {
    name: "Kyoto University",
    src: "https://upload.wikimedia.org/wikipedia/en/1/1b/Kyoto_University_logo.svg"
  },
  {
    name: "Polytech Group",
    src: "https://upload.wikimedia.org/wikipedia/fr/4/4e/Logo_R%C3%A9seau_Polytech.svg"
  },
];
const section = "py-20 md:py-28";
const container = "max-w-7xl mx-auto px-6";
function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <Card className="border-default-200 shadow-sm">
      <CardBody className="p-8">
        <div className="text-4xl font-black tracking-tight text-foreground">
          {value}
        </div>
        <div className="mt-3 text-sm font-bold uppercase tracking-wider text-default-500">
          {label}
        </div>
        <div className="mt-2 text-sm text-default-500">{helper}</div>
      </CardBody>
    </Card>
  );
}

function PillarCard({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) {
  return (
    <Card className="border-default-200 shadow-sm hover:shadow-md transition-shadow">
      <CardBody className="p-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary">
            {index}
          </div>
          <div className="text-xl font-bold">{title}</div>
        </div>
        <p className="text-default-500 leading-relaxed">{desc}</p>
      </CardBody>
    </Card>
  );
}

function PartnerLogo({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-default-200 bg-background p-6 hover:bg-default-50 transition-colors">
      {/* Using Image (HeroUI) for consistency */}
      <Image
        src={src}
        alt={`${name} logo`}
        className="object-contain h-10 w-auto"
      />
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const locale = "en";

  const t = {
    en: {
      chip: "France–Cambodia Academic Partnership",
      heroTitle1: "A University-Grade Hub for",
      heroTitle2: "Digital Engineering & Research",
      heroSubtitle:
        "A modern, internationally aligned department preparing engineers and innovators through rigorous academics, applied research, and industry collaboration.",
      cta1: "Explore Programs",
      cta2: "Research & Labs",
      trust: "Accredited pathways • Global mobility • Industry-ready curriculum",
      statsKicker: "Department at a glance",
      statsTitle: "Outcomes that speak",
      statsDesc:
        "Built on strong teaching, active labs, and partnerships across academia and industry.",
      pillarsKicker: "Academics",
      pillarsTitle: "Programs designed for impact",
      pillarsDesc:
        "Clear pathways from undergraduate engineering to graduate research and professional upskilling.",
      researchKicker: "Research & Innovation",
      researchTitle: "Labs advancing Cambodia’s digital future",
      researchDesc:
        "Language tech, AI, systems, and cybersecurity—focused on real deployments and measurable outcomes.",
      partnersKicker: "University partners",
      partnersTitle: "International university network",
      partnersDesc:
        "Collaborations that enable exchanges, dual-degree pathways, joint supervision, and lab internships.",
      facultyKicker: "Faculty",
      facultyTitle: "Experienced, research-active mentors",
      mobilityKicker: "Mobility",
      mobilityTitle: "International Mobility Hub",
      careersKicker: "Industry",
      careersTitle: "Career hub & partners",
      eventsKicker: "Admissions",
      eventsTitle: "Upcoming events & deadlines",
      finalTitle: "Ready to shape the future?",
      finalDesc:
        "Join a community built for excellence—where education meet research and international opportunity.",
      apply: "Apply now",
      footerNote:
        "Russian Blvd, Phnom Penh, Cambodia. World-class engineering education with global standards.",
    },
    km: {
      chip: "ភាពជាដៃគូអាណាព្យាបាល កម្ពុជា–បារាំង",
      heroTitle1: "មជ្ឈមណ្ឌលស្តង់ដារសាកលវិទ្យាល័យសម្រាប់",
      heroTitle2: "វិស្វកម្មឌីជីថល និងស្រាវជ្រាវ",
      heroSubtitle:
        "ផ្នែកសិក្សាទំនើបដែលផ្គូផ្គងស្តង់ដារអន្តរជាតិ ដើម្បីបណ្តុះវិស្វករ និងអ្នកច្នៃប្រឌិតតាមរយៈការសិក្សាគង់វង្ស ស្រាវជ្រាវអនុវត្ត និងសហការណ៍ឧស្សាហកម្ម។",
      cta1: "ស្វែងយល់កម្មវិធីសិក្សា",
      cta2: "ស្រាវជ្រាវ & មន្ទីរពិសោធន៍",
      trust: "ផ្លូវសិក្សាស្តង់ដារ • ការផ្លាស់ប្តូរអន្តរជាតិ • មេរៀនត្រៀមការងារ",
      statsKicker: "ទិដ្ឋភាពទូទៅ",
      statsTitle: "លទ្ធផលដែលបញ្ជាក់",
      statsDesc:
        "ផ្អែកលើការបង្រៀនរឹងមាំ មន្ទីរពិសោធន៍សកម្ម និងដៃគូអប់រំ/ឧស្សាហកម្ម។",
      pillarsKicker: "វិស័យសិក្សា",
      pillarsTitle: "កម្មវិធីសិក្សាដែលមានអត្ថប្រយោជន៍",
      pillarsDesc:
        "ផ្លូវច្បាស់លាស់ពីបរិញ្ញាបត្រវិស្វកម្ម ទៅអនុបណ្ឌិត/បណ្ឌិត និងវគ្គវិជ្ជាជីវៈ។",
      researchKicker: "ស្រាវជ្រាវ & ច្នៃប្រឌិត",
      researchTitle: "មន្ទីរពិសោធន៍ដឹកនាំអនាគតឌីជីថលកម្ពុជា",
      researchDesc:
        "បច្ចេកវិទ្យាភាសា AI ប្រព័ន្ធ និងសន្តិសុខ—ផ្តោតលើការអនុវត្តពិត។",
      partnersKicker: "សាកលវិទ្យាល័យដៃគូ",
      partnersTitle: "បណ្តាញសាកលវិទ្យាល័យអន្តរជាតិ",
      partnersDesc:
        "សហការណ៍សម្រាប់ប្តូរនិស្សិត បរិញ្ញាបត្ររួម ការណែនាំស្រាវជ្រាវ និងអនុវត្តការងារមន្ទីរពិសោធន៍។",
      facultyKicker: "គ្រូបង្រៀន",
      facultyTitle: "អ្នកណែនាំមានបទពិសោធន៍",
      mobilityKicker: "អន្តរជាតិ",
      mobilityTitle: "មជ្ឈមណ្ឌលចល័តភាពអន្តរជាតិ",
      careersKicker: "ឧស្សាហកម្ម",
      careersTitle: "មជ្ឈមណ្ឌលអាជីព & ដៃគូ",
      eventsKicker: "ការចូលរៀន",
      eventsTitle: "ព្រឹត្តិការណ៍ & កាលកំណត់ខាងមុខ",
      finalTitle: "ត្រៀមបង្កើតអនាគត?",
      finalDesc:
        "ចូលរួមសហគមន៍ដែលផ្អែកលើគុណភាព—ការសិក្សាប្រកបដោយស្រាវជ្រាវ និងឱកាសអន្តរជាតិ។",
      apply: "ដាក់ពាក្យ",
      footerNote:
        "Russian Blvd, ភ្នំពេញ, កម្ពុជា។ ការអប់រំវិស្វកម្មស្តង់ដារអន្តរជាតិ។",
    },
  }[locale];

  // Replace with your real partner logos (assets or public URLs).
  // Avoid random external URLs in production if you can.
  const universityPartners = [
  {
    name: "INP Toulouse",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/ytMunojNDCf9kr9eTj81.png",
    url: "https://www.inp-toulouse.fr/en/index.html"
  },
  {
    name: "INSA Lyon",
    src: "https://gic.itc.edu.kh/storage/partner2/September2019/jds0Jf9YMh9LBFRQGh2H.jpg",
    url: "https://www.insa-lyon.fr/en/"
  },
  {
    name: "UTC Compiègne",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/I5w9XZwVkjVoOWDe5Hwo.PNG",
    url: "https://www.utc.fr/en/"
  },
  {
    name: "Polytech",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/wSGFlxRo9PeNI8KlxBSv.png",
    url: "https://www.polytech-reseau.org/en/"
  },
  {
    name: "INSA Lyon",
    src: "https://gic.itc.edu.kh/storage/partner2/September2019/jds0Jf9YMh9LBFRQGh2H.jpg",
    url: "https://www.insa-lyon.fr/en/"
  },
  {
    name: "UTC Compiègne",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/I5w9XZwVkjVoOWDe5Hwo.PNG",
    url: "https://www.utc.fr/en/"
  },
  {
    name: "Polytech",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/wSGFlxRo9PeNI8KlxBSv.png",
    url: "https://www.polytech-reseau.org/en/"
  },
];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }
  return (
    <div className="relative overflow-hidden bg-background">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] left-[-12%] h-[420px] w-[420px] rounded-full bg-blue-600/5 blur-[110px]" />
      </div>

      {/* HERO */}
      <HeroSection t={t} />

      {/* STATS */}
      <StatsSection
        t={dict.stats}
        section="my-20"
        container="max-w-7xl mx-auto px-6"
      />

      {/* PROGRAM PILLARS */}
      <PillarsSection
        t={dict.pillars}
        section="mb-20 " // Optional vertical spacing
        container="max-w-7xl mx-auto px-6" // Standard container
      />

      {/* FACULTY (kept, but cleaner) */}
      <FacultySlideshowFull
        t={dict.t}
        section="mb-20"
        container="max-w-7xl mx-auto px-6"
      />

      {/* NEW: UNIVERSITY PARTNERS */}
      <PartnerSection
        t={dict}
        universityPartners={universityPartners}
        section="mb-20"
        container="max-w-7xl"
      />

      {/* CAREERS / PARTNERS (more restrained) */}
      <CareersSection
        t={dict.carrer}
        section="bg-red-500" // Vertical margin
        container="max-w-7xl mx-auto px-6" // Standard container width
      />

      {/* RESEARCH (professional bento but calmer) */}
      <ResearchShowcase
        t={dict.research}
        section="mb- 0"
        container="max-w-7xl mx-auto px-6"
      />

      {/* EVENTS */}
      <PressReleaseSlideshow
        t={dict.event}
        section=""
        container="max-w-7xl mx-auto px-6"
      />

      {/* FINAL CTA */}
      <FinalCTA
        t={t}
        container="max-w-7xl pb-10 mx-auto px-6"
      />

    </div>
  );
}
