import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type HomeDict = {
  t: {
    facultyKicker: string;
    facultyTitle: string;
    facultyDesc: string;
  };
  event: {
    newsKicker: string;
    newsTitle: string;
    newsDesc: string;
  };
  carrer: {
    careersKicker: string;
    careersTitle: string;
    careersDesc: string;
    careersNote: string;
  };
  stats: {
    statsKicker: string;
    statsTitle: string;
    statsDesc: string;
  };
  research: {
    researchKicker: string;
    researchTitle: string;
    researchDesc: string;
  };
  pillars: {
    pillarsKicker: string;
    pillarsTitle: string;
    pillarsDesc: string;
    pillarsCtaLabel: string;
  };
  partnersKicker: string;
  partnersTitle: string;
  partnersDesc: string;
};

export type HomeHero = {
  backgroundImage: string;
  logoText: string;
  discoverLabel: string;
};

export type HomeStatItem = {
  id: string;
  label: string;
  value: string;
  helper: string;
  icon: "desktop" | "network" | "satellite" | "mobile";
  accentColor: string;
  isFeatured?: boolean;
};

export type HomePillarItem = {
  number: string;
  title: string;
  desc: string;
  icon: "code" | "globe" | "layers" | "award";
  color: "blue" | "indigo" | "cyan" | "purple";
  href: string;
};

export type UniversityPartner = {
  name: string;
  src: string;
  url: string;
};

export type PartnerFeature = {
  image: string;
  kicker: string;
  title: string;
  desc: string;
};

export type PartnerStat = {
  value: string;
  label: string;
};

export type PartnerPathway = {
  title: string;
  desc: string;
  imgSrc: string;
  href: string;
  icon: "plane" | "graduation" | "microscope";
  isWide?: boolean;
};

export type PartnerSectionContent = {
  feature: PartnerFeature;
  stats: PartnerStat[];
  regions: string[];
  affiliationsLabel: string;
  pathways: PartnerPathway[];
  partners: UniversityPartner[];
};

export type CareerRole = {
  title: string;
  growth: string;
  color: string;
};

export type CareersSectionContent = {
  partners: string[];
  roles: CareerRole[];
};

export type ResearchHero = {
  image: string;
  chip: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ResearchFeature = {
  image: string;
  kicker?: string;
  title: string;
  alt: string;
};

export type ResearchImpact = {
  kicker: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ResearchStat = {
  label: string;
  value: string;
};

export type ResearchShowcaseContent = {
  hero: ResearchHero;
  featured: ResearchFeature;
  labs: ResearchFeature[];
  impact: ResearchImpact;
  stats: ResearchStat[];
};

export type FinalCtaContent = {
  kicker: string;
  buttonHref: string;
};

export type HomeLocaleCopy = {
  chip: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  cta1: string;
  cta2: string;
  trust: string;
  statsKicker: string;
  statsTitle: string;
  statsDesc: string;
  pillarsKicker: string;
  pillarsTitle: string;
  pillarsDesc: string;
  researchKicker: string;
  researchTitle: string;
  researchDesc: string;
  partnersKicker: string;
  partnersTitle: string;
  partnersDesc: string;
  facultyKicker: string;
  facultyTitle: string;
  mobilityKicker: string;
  mobilityTitle: string;
  careersKicker: string;
  careersTitle: string;
  eventsKicker: string;
  eventsTitle: string;
  finalTitle: string;
  finalDesc: string;
  apply: string;
  footerNote: string;
};

export type HomeCopy = {
  dict: HomeDict;
  locales: Record<"en" | "km", HomeLocaleCopy>;
  hero: HomeHero;
  statsItems: HomeStatItem[];
  pillars: HomePillarItem[];
  partners: PartnerSectionContent;
  careers: CareersSectionContent;
  researchShowcase: ResearchShowcaseContent;
  finalCta: FinalCtaContent;
};

export type HomePageUpdatePayload = {
  section: string;
  data: Record<string, string | boolean>;
};

const homeCopy: HomeCopy = {
  dict: {
    t: {
      facultyKicker: "Our Expertise",
      facultyTitle: "Meet Our Distinguished Faculty",
      facultyDesc: "PhD-qualified faculty with international experience.",
    },
    event: {
      newsKicker: "Media Center",
      newsTitle: "Latest News & Events",
      newsDesc: "Official news and media updates from the Department of Information and Tech Engineering.",
    },
    carrer: {
      careersKicker: "Industry & Careers",
      careersTitle: "Where our students go",
      careersDesc:
        "Bridging the gap between academia and industry. Our graduates power the digital transformation of Cambodia's leading enterprises.",
      careersNote: "And 20+ other industry partners and growing...",
    },
    stats: {
      statsKicker: "Our Department in Numbers",
      statsTitle: "Driving Innovation Since 2005",
      statsDesc:
        "A look at the milestones that define our commitment to engineering excellence and student success.",
    },
    research: {
      researchKicker: "Research & Innovation",
      researchTitle: "Transforming Theory into Technology",
      researchDesc: "Our department leads innovation in Khmer NLP, Secure Systems, and Data Analytics.",
    },
    pillars: {
      pillarsKicker: "Educational Framework",
      pillarsTitle: "Three Pillars of Excellence",
      pillarsDesc:
        "Our programs are designed to take you from foundational engineering to high-level research and professional leadership.",
      pillarsCtaLabel: "Explore Program",
    },
    partnersKicker: "Global Footprint",
    partnersTitle: "International Cooperation",
    partnersDesc:
      "GIC maintains deep-rooted ties with leading technical institutes worldwide to foster academic mobility and cutting-edge research.",
  },
  hero: {
    backgroundImage: "/landing/server.png",
    logoText: "Génie Informatique et Communications",
    discoverLabel: "Discover More",
  },
  statsItems: [
    {
      id: "established",
      label: "Established",
      value: "2005",
      helper: "Two decades of academic excellence",
      icon: "desktop",
      accentColor: "text-blue-500 dark:text-blue-400",
      isFeatured: true,
    },
    {
      id: "community",
      label: "Community",
      value: "1,200+",
      helper: "Vibrant network of students and alumni",
      icon: "network",
      accentColor: "text-indigo-500 dark:text-indigo-400",
    },
    {
      id: "employment",
      label: "Employment",
      value: "92%",
      helper: "Hired within 6 months of graduation",
      icon: "satellite",
      accentColor: "text-cyan-500 dark:text-cyan-400",
    },
    {
      id: "research",
      label: "Research",
      value: "12 Labs",
      helper: "Innovative groups driving local tech",
      icon: "mobile",
      accentColor: "text-primary",
    },
  ],
  pillars: [
    {
      number: "01",
      title: "Engineering Program",
      desc: "A five-year track designed to produce high-level engineers with mastery in software and systems.",
      icon: "code",
      color: "blue",
      href: "/program/engineering-degree",
    },
    {
      number: "02",
      title: "International Program",
      desc: "A premium track featuring international standards and dual-degree opportunities with global partners.",
      icon: "globe",
      color: "indigo",
      href: "/program/international-program",
    },
    {
      number: "03",
      title: "Associate Degree",
      desc: "A focused two-year technical program providing foundational skills for the tech workforce.",
      icon: "layers",
      color: "cyan",
      href: "/program/associate-degree",
    },
    {
      number: "04",
      title: "Master's Degree",
      desc: "Advanced specialization in AI, Cybersecurity, or Data Science for research or leadership roles.",
      icon: "award",
      color: "purple",
      href: "/program/master-degree",
    },
  ],
  partners: {
    feature: {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
      kicker: "sys.init_mobility()",
      title: "Global Pathways",
      desc: "Expanding academic horizons through structured credit transfers and cross-continental research supervision.",
    },
    stats: [
      { value: "20+", label: "Active_Partners" },
      { value: "EU/Asia", label: "Core_Regions" },
    ],
    regions: ["France", "Japan", "Korea"],
    affiliationsLabel: "Affiliated Universities",
    pathways: [
      {
        title: "Semester Exchange",
        desc: "Study abroad with credit transfer and structured advising at partner institutes in France, Japan, and Korea.",
        icon: "plane",
        imgSrc: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1949",
        href: "program/exchange-semester",
      },
      {
        title: "Dual Degree",
        desc: "Complete your engineering degree in France or partner institutions via aligned curricula and selection tracks.",
        icon: "graduation",
        imgSrc:
          "https://media.istockphoto.com/id/143071511/photo/graduates-with-diplomas-smiling-together.jpg?s=1024x1024&w=is&k=20&c=c50OPwsKWAgUNFd7ETdKxFLuxgA5wsTDHpnAsAD5UW4=",
        href: "program/exchange-semester",
      },
      {
        title: "Joint Research",
        desc: "Co-advised theses and joint publications with partner labs focusing on AI, Cloud, and Security.",
        icon: "microscope",
        imgSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
        isWide: true,
        href: "research/labs",
      },
    ],
    partners: [
      {
        name: "INP Toulouse",
        src: "https://gic.itc.edu.kh/storage/partner2/June2019/ytMunojNDCf9kr9eTj81.png",
        url: "https://www.inp-toulouse.fr/en/index.html",
      },
      {
        name: "INSA Lyon",
        src: "https://gic.itc.edu.kh/storage/partner2/September2019/jds0Jf9YMh9LBFRQGh2H.jpg",
        url: "https://www.insa-lyon.fr/en/",
      },
      {
        name: "UTC Compiègne",
        src: "https://gic.itc.edu.kh/storage/partner2/June2019/I5w9XZwVkjVoOWDe5Hwo.PNG",
        url: "https://www.utc.fr/en/",
      },
      {
        name: "Polytech",
        src: "https://gic.itc.edu.kh/storage/partner2/June2019/wSGFlxRo9PeNI8KlxBSv.png",
        url: "https://www.polytech-reseau.org/en/",
      },
      {
        name: "INSA Lyon",
        src: "https://gic.itc.edu.kh/storage/partner2/September2019/jds0Jf9YMh9LBFRQGh2H.jpg",
        url: "https://www.insa-lyon.fr/en/",
      },
      {
        name: "UTC Compiègne",
        src: "https://gic.itc.edu.kh/storage/partner2/June2019/I5w9XZwVkjVoOWDe5Hwo.PNG",
        url: "https://www.utc.fr/en/",
      },
      {
        name: "Polytech",
        src: "https://gic.itc.edu.kh/storage/partner2/June2019/wSGFlxRo9PeNI8KlxBSv.png",
        url: "https://www.polytech-reseau.org/en/",
      },
    ],
  },
  careers: {
    partners: ["Smart", "Huawei", "ABA Bank", "BRED Bank", "TotalEnergies", "Wing"],
    roles: [
      { title: "DevOps Engineer", growth: "+25%", color: "text-blue-500" },
      { title: "Full-Stack Developer", growth: "+40%", color: "text-emerald-500" },
      { title: "Data Scientist", growth: "+32%", color: "text-purple-500" },
      { title: "Cybersecurity Analyst", growth: "+18%", color: "text-red-500" },
    ],
  },
  researchShowcase: {
    hero: {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
      chip: "Research & Innovation",
      title: "Building Khmer-first technology",
      desc: "Turning research into real-world impact through AI and modern infrastructure.",
      ctaLabel: "Explore Research",
      ctaHref: "https://www.facebook.com/vilalabitc",
    },
    featured: {
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
      kicker: "Flagship Lab",
      title: "Khmer NLP Lab",
      alt: "Khmer NLP",
    },
    labs: [
      {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
        title: "DADS Lab",
        alt: "Analytics",
      },
      {
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
        title: "Security Lab",
        alt: "Security & Privacy",
      },
    ],
    impact: {
      kicker: "Featured breakthrough",
      title: "Khmer spelling checker",
      desc: "Strengthening digital literacy tools across learning platforms.",
      ctaLabel: "Read the story",
      ctaHref: "https://www.facebook.com/vilalabitc",
    },
    stats: [
      { label: "Core labs", value: "3" },
      { label: "AI Focused", value: "NLP" },
      { label: "Privacy", value: "Sec" },
      { label: "Impact", value: "Data" },
    ],
  },
  finalCta: {
    kicker: "Start your journey",
    buttonHref: "/program",
  },
  locales: {
    en: {
      chip: "France–Cambodia Academic Partnership",
      heroTitle1: "Information & Communication",
      heroTitle2: "Engineering of ITC",
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
      pillarsDesc: "Clear pathways from undergraduate engineering to graduate research and professional upskilling.",
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
        "មជ្ឈមណ្ឌលដែលផ្អែកលើស្តង់ដារអន្តរជាតិ សម្រាប់បណ្តុះបណ្តាលវិស្វករ និងអ្នកច្នៃប្រឌិត តាមរយៈការសិក្សាដ៏រឹងមាំ ស្រាវជ្រាវអនុវត្ត និងសហការណ៍ឧស្សាហកម្ម។",
      cta1: "ស្វែងយល់អំពីកម្មវិធី",
      cta2: "ស្រាវជ្រាវ និងមន្ទីរពិសោធន៍",
      trust: "ផ្លូវសិក្សាស្តង់ដារ • ការផ្លាស់ប្តូរអន្តរជាតិ • មេរៀនត្រៀមការងារ",
      statsKicker: "ទិដ្ឋភាពទូទៅ",
      statsTitle: "លទ្ធផលដែលបញ្ជាក់",
      statsDesc: "ផ្អែកលើការបង្រៀនរឹងមាំ មន្ទីរពិសោធន៍សកម្ម និងដៃគូអប់រំ/ឧស្សាហកម្ម។",
      pillarsKicker: "វិស័យសិក្សា",
      pillarsTitle: "កម្មវិធីសិក្សាដែលមានអត្ថប្រយោជន៍",
      pillarsDesc: "ផ្លូវច្បាស់លាស់ពីបរិញ្ញាបត្រវិស្វកម្ម ទៅអនុបណ្ឌិត/បណ្ឌិត និងវគ្គវិជ្ជាជីវៈ។",
      researchKicker: "ស្រាវជ្រាវ & ច្នៃប្រឌិត",
      researchTitle: "មន្ទីរពិសោធន៍ដឹកនាំអនាគតឌីជីថលកម្ពុជា",
      researchDesc: "បច្ចេកវិទ្យាភាសា AI ប្រព័ន្ធ និងសន្តិសុខ—ផ្តោតលើការអនុវត្តពិត។",
      partnersKicker: "សាកលវិទ្យាល័យដៃគូ",
      partnersTitle: "បណ្តាញសាកលវិទ្យាល័យអន្តរជាតិ",
      partnersDesc: "សហការណ៍សម្រាប់ប្តូរនិស្សិត បរិញ្ញាបត្ររួម ការណែនាំស្រាវជ្រាវ និងអនុវត្តការងារមន្ទីរពិសោធន៍។",
      facultyKicker: "គ្រូបង្រៀន",
      facultyTitle: "អ្នកណែនាំមានបទពិសោធន៍",
      mobilityKicker: "អន្តរជាតិ",
      mobilityTitle: "មជ្ឈមណ្ឌលចល័តភាពអន្តរជាតិ",
      careersKicker: "ឧស្សាហកម្ម",
      careersTitle: "មជ្ឈមណ្ឌលអាជីព & ដៃគូ",
      eventsKicker: "ការចូលរៀន",
      eventsTitle: "ព្រឹត្តិការណ៍ & កាលកំណត់ខាងមុខ",
      finalTitle: "ត្រៀមបង្កើតអនាគត?",
      finalDesc: "ចូលរួមសហគមន៍ដែលផ្អែកលើគុណភាព—ការសិក្សាប្រកបដោយស្រាវជ្រាវ និងឱកាសអន្តរជាតិ។",
      apply: "ដាក់ពាក្យ",
      footerNote: "Russian Blvd, ភ្នំពេញ, កម្ពុជា។ ការអប់រំវិស្វកម្មស្តង់ដារអន្តរជាតិ។",
    },
  },
};

const getHomeCopy = async (): Promise<HomeCopy> => homeCopy;

export function useHomePageCopy() {
  return useQuery({
    queryKey: ["homeCopy"],
    queryFn: getHomeCopy,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

const setNestedValue = (
  source: HomeCopy,
  path: string,
  value: string | boolean,
): HomeCopy => {
  const keys = path.split(".");
  const root = Array.isArray(source) ? [...source] : { ...source };
  let cursor: any = root;

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    const pathKey = Number.isNaN(Number(key)) ? key : Number(key);

    if (isLast) {
      cursor[pathKey] = value;
      return;
    }

    const nextKey = keys[index + 1];
    const nextIsIndex = !Number.isNaN(Number(nextKey));
    const existing = cursor[pathKey];
    const nextValue =
      existing !== undefined
        ? Array.isArray(existing)
          ? [...existing]
          : { ...existing }
        : nextIsIndex
          ? []
          : {};

    cursor[pathKey] = nextValue;
    cursor = nextValue;
  });

  return root as HomeCopy;
};

const applyHomeCopyUpdate = (
  current: HomeCopy,
  updates: Record<string, string | boolean>,
): HomeCopy => {
  return Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );
};

const updateHomePageCopy = async (payload: HomePageUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return payload;
};

export function useUpdateHomePageCopy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHomePageCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<HomeCopy>(["homeCopy"], (current) => {
        if (!current) return current;
        return applyHomeCopyUpdate(current, payload.data);
      });
    },
  });
}
