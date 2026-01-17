import { useQuery } from "@tanstack/react-query";

export type HomeDict = {
  t: {
    facultyKicker: string;
    facultyTitle: string;
  };
  event: {
    newsKicker: string;
    newsTitle: string;
  };
  carrer: {
    careersKicker: string;
    careersTitle: string;
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
  };
  partnersKicker: string;
  partnersTitle: string;
  partnersDesc: string;
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
};

const homeCopy: HomeCopy = {
  dict: {
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
    },
    partnersKicker: "Global Footprint",
    partnersTitle: "International Cooperation",
    partnersDesc:
      "GIC maintains deep-rooted ties with leading technical institutes worldwide to foster academic mobility and cutting-edge research.",
  },
  locales: {
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
