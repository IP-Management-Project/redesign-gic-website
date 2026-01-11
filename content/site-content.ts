import type { Locale } from "@/lib/i18n";

type LinkItem = {
  label: string;
  href: string;
};

type HighlightCard = {
  title: string;
  description: string;
  href: string;
};

type StatItem = {
  label: string;
  value: string;
  description: string;
};

type Pillar = {
  title: string;
  description: string;
};

type LabFeature = {
  title: string;
  description: string;
};

type SpotlightItem = {
  title: string;
  description: string;
  linkLabel: string;
  href: string;
};

type JourneyContent = {
  title: string;
  description: string;
  mobilityTitle: string;
  internshipsTitle: string;
  studentLifeTitle: string;
  mobility: string[];
  internships: string[];
  studentLife: LinkItem[];
};

type ResearchContent = {
  title: string;
  description: string;
  labs: LabFeature[];
  spotlight: SpotlightItem;
  cta: LinkItem;
};

type PartnershipContent = {
  title: string;
  description: string;
  careersTitle: string;
  logos: string[];
  careers: string[];
};

type EventItem = {
  title: string;
  date: string;
  description: string;
  href: string;
};

type EventsContent = {
  title: string;
  description: string;
  items: EventItem[];
};

type PrestigeHero = {
  title: string;
  subtitle: string;
  badge: string;
  imageAlt: string;
};

type FacultySpotlight = {
  name: string;
  degree: string;
  focus: string;
};

type FacultyContent = {
  title: string;
  description: string;
  stat: string;
  spotlight: FacultySpotlight[];
};

type MobilityHubContent = {
  title: string;
  description: string;
  inboundTitle: string;
  outboundTitle: string;
  inbound: string;
  outbound: string[];
  dualDegree: string;
};

type PartnerWallContent = {
  title: string;
  caption: string;
  academicTitle: string;
  industryTitle: string;
  academic: string[];
  industry: string[];
};

type HomeFooterContent = {
  title: string;
  address: string;
  emails: string[];
  phone: string;
  socials: LinkItem[];
  quickLinks: {
    title: string;
    links: LinkItem[];
  }[];
};

type Navigation = {
  primary: LinkItem[];
  menu: LinkItem[];
  utility: LinkItem[];
};

type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  ctas: {
    primary: LinkItem;
    secondary: LinkItem;
  };
  numbersTitle: string;
  numbers: StatItem[];
  pillarsTitle: string;
  pillars: Pillar[];
  research: ResearchContent;
  journey: JourneyContent;
  partnerships: PartnershipContent;
  events: EventsContent;
  prestigeHero: PrestigeHero;
  faculty: FacultyContent;
  mobilityHub: MobilityHubContent;
  partnerWall: PartnerWallContent;
  homeFooter: HomeFooterContent;
  highlights: HighlightCard[];
};

type PageContent = {
  title: string;
  description?: string;
  links?: LinkItem[];
  cards?: LinkItem[];
};

type ContactContent = {
  title: string;
  description: string;
  emailLabel: string;
  email: string;
};

type SiteContent = {
  brand: {
    name: string;
    tagline: string;
  };
  description: string;
  topBar: {
    languageLabel: string;
    searchPlaceholder: string;
    quickLinksLabel: string;
  };
  navigation: Navigation;
  home: HomeContent;
  pages: {
    about: PageContent;
    apply: PageContent;
    blog: PageContent;
    docs: PageContent;
    facultyStaff: PageContent;
    newsEvents: PageContent;
    pricing: PageContent;
    program: PageContent;
    research: PageContent;
    studentLife: PageContent;
  };
  contact: ContactContent;
  footer: {
    links: LinkItem[];
    copyright: string;
  };
};

const contentByLocale: Record<Locale, SiteContent> = {
  en: {
    brand: {
      name: "GIC Engineering",
      tagline: "Global Innovation Center",
    },
    description:
      "Global Innovation Center for engineering education, research, and student life.",
    topBar: {
      languageLabel: "Language",
      searchPlaceholder: "Search...",
      quickLinksLabel: "Quick links",
    },
    navigation: {
      primary: [
        { label: "Program", href: "/program" },
        { label: "Research", href: "/research" },
        { label: "Faculty & Staff", href: "/faculty-staff" },
        { label: "Student", href: "/student" },
        { label: "News & Events", href: "/news-events" },
        { label: "About", href: "/about" },
      ],
      menu: [
        { label: "Program", href: "/program" },
        { label: "Research", href: "/research" },
        { label: "Faculty & Staff", href: "/faculty-staff" },
        { label: "Student", href: "/student" },
        { label: "News & Events", href: "/news-events" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Apply", href: "/apply" },
        { label: "Calendar", href: "/news-events/calendar" },
        { label: "Publications", href: "/research/publications" },
      ],
      utility: [
        { label: "Apply", href: "/apply" },
        { label: "Calendar", href: "/news-events/calendar" },
        { label: "Publications", href: "/research/publications" },
      ],
    },
    home: {
      heroTitle: "The Hub of Cambodia's Digital Transformation",
      heroSubtitle:
        "Academic excellence meets cutting-edge research to prepare engineers, innovators, and leaders.",
      ctas: {
        primary: { label: "Explore Programs", href: "/program" },
        secondary: { label: "Our Research", href: "/research" },
      },
      numbersTitle: "GIC by Numbers",
      numbers: [
        {
          label: "Years of Excellence",
          value: "Since 2005",
          description: "Nearly two decades of engineering leadership.",
        },
        {
          label: "Student Community",
          value: "1,200+",
          description: "Active students and alumni network.",
        },
        {
          label: "Employment Rate",
          value: "92%",
          description: "Graduates hired within 6 months.",
        },
        {
          label: "Research Output",
          value: "12 Labs",
          description: "Applied research and publications every year.",
        },
      ],
      pillarsTitle: "Core Academic Pillars",
      pillars: [
        {
          title: "Undergraduate (Engineers)",
          description:
            "Five-year curriculum with specialization tracks in software, data, and systems engineering.",
        },
        {
          title: "Graduate (Master/PhD)",
          description:
            "Research-driven programs led by faculty with international lab partnerships.",
        },
        {
          title: "Professional Certifications",
          description:
            "Short-term, industry-aligned training in cloud, cybersecurity, and AI.",
        },
      ],
      research: {
        title: "Research & Innovation Spotlight",
        description:
          "Labs and applied breakthroughs shaping Cambodia's digital future.",
        labs: [
          {
            title: "Khmer NLP Lab",
            description:
              "Language technologies for Khmer speech, text, and education platforms.",
          },
          {
            title: "Data Analysis & Data Science (DADS) Lab",
            description:
              "AI-driven analytics for finance, smart cities, and public services.",
          },
        ],
        spotlight: {
          title: "Featured Breakthrough",
          description:
            "A Khmer spelling checker and contextual AI model improving digital literacy.",
          linkLabel: "Read the story",
          href: "/research/projects",
        },
        cta: { label: "View Research Portfolio", href: "/research" },
      },
      journey: {
        title: "The Student Journey & Mobility",
        description:
          "Global exposure through exchanges, internships, and student-led innovation.",
        mobilityTitle: "International Mobility",
        internshipsTitle: "Internships",
        studentLifeTitle: "Student Life",
        mobility: ["France", "Japan", "Korea", "Thailand"],
        internships: ["Smart", "ABA Bank", "Huawei", "Wing"],
        studentLife: [
          { label: "Student Projects", href: "/student/student-projects" },
          { label: "Tech Clubs", href: "/student/clubs-communities" },
          { label: "Gallery", href: "/student/gallery" },
        ],
      },
      partnerships: {
        title: "Industry Partnerships & Careers",
        description:
          "A professional network that accelerates internships, mentoring, and hiring.",
        careersTitle: "Career Pathways",
        logos: ["Smart", "ABA Bank", "Huawei", "BRED Bank", "TotalEnergies"],
        careers: [
          "DevOps Engineer",
          "Full-Stack Developer",
          "Data Scientist",
          "Cybersecurity Analyst",
        ],
      },
      events: {
        title: "Upcoming Events & Deadlines",
        description: "Stay informed on key milestones and academic opportunities.",
        items: [
          {
            title: "Entrance Exam Registration",
            date: "May 15 - June 15",
            description: "Apply early to secure a seat in the 2025 intake.",
            href: "/apply",
          },
          {
            title: "Tech Seminar Series",
            date: "July 8",
            description: "Guest lecture on AI ethics with visiting professors.",
            href: "/news-events/events",
          },
          {
            title: "Academic Calendar",
            date: "Semester 1",
            description: "View deadlines, holidays, and exam schedules.",
            href: "/news-events/calendar",
          },
        ],
      },
      prestigeHero: {
        title: "Global Standards. Local Impact.",
        subtitle:
          "Empowering the next generation of engineers through world-class education, mentored by PhD faculty from top French and international universities.",
        badge: "France-Cambodia Partnership",
        imageAlt: "ITC campus with GIC partnership branding.",
      },
      faculty: {
        title: "Elite Faculty",
        description:
          "Expert-led labs and mentorship from PhD-level academics with global research networks.",
        stat:
          "80%+ of technical faculty hold graduate degrees from France and leading global universities.",
        spotlight: [
          {
            name: "Dr. Sokha Dara",
            degree: "PhD, INP Toulouse",
            focus: "AI for Khmer Language",
          },
          {
            name: "Dr. Lina Chea",
            degree: "PhD, INSA Lyon",
            focus: "Cybersecurity & Privacy",
          },
          {
            name: "Dr. Vannak Chen",
            degree: "PhD, UTC Compiègne",
            focus: "Smart Systems & IoT",
          },
        ],
      },
      mobilityHub: {
        title: "International Mobility Hub",
        description: "Study in Phnom Penh, finish in France.",
        inboundTitle: "Inbound Exchange",
        outboundTitle: "Outbound Programs",
        inbound: "French exchange cohorts join ITC/GIC every year.",
        outbound: ["INSA", "INP", "UTC", "Polytech"],
        dualDegree:
          "Pathways to dual degrees, research internships, and European lab placements.",
      },
      partnerWall: {
        title: "Strong University & Industry Partners",
        caption:
          "Our curriculum is co-designed with industry leaders to ensure 100% job readiness.",
        academicTitle: "Academic Partners",
        industryTitle: "Industrial Partners",
        academic: [
          "INSA",
          "INP Toulouse",
          "UTC",
          "Polytech",
          "Campus France",
        ],
        industry: ["Smart", "Huawei", "ABA Bank", "BRED Bank", "TotalEnergies"],
      },
      homeFooter: {
        title: "Connect with GIC",
        address: "ITC Building A, Russian Confederation Blvd, Phnom Penh, Cambodia",
        emails: ["info@gic.itc.edu.kh", "partnerships@gic.itc.edu.kh"],
        phone: "+855 (0)23 880 370",
        socials: [
          { label: "LinkedIn", href: "https://www.linkedin.com" },
          { label: "Facebook", href: "https://www.facebook.com" },
          { label: "GitHub", href: "https://github.com" },
        ],
        quickLinks: [
          {
            title: "For Students",
            links: [
              { label: "Admissions", href: "/apply" },
              { label: "Programs", href: "/program" },
              { label: "Scholarships", href: "/program/scholarships" },
            ],
          },
          {
            title: "For Researchers",
            links: [
              { label: "Labs", href: "/research/labs" },
              { label: "Publications", href: "/research/publications" },
              { label: "Tools", href: "/research/tools" },
            ],
          },
          {
            title: "For Partners",
            links: [
              { label: "Industry Collaboration", href: "/research/projects" },
              { label: "Career Services", href: "/program/careers" },
              { label: "Contact", href: "/contact" },
            ],
          },
        ],
      },
      highlights: [
        {
          title: "Research with impact",
          description:
            "Explore interdisciplinary labs, publications, and tools driving innovation.",
          href: "/research",
        },
        {
          title: "Faculty & Staff",
          description:
            "Meet mentors and professional staff supporting your academic journey.",
          href: "/faculty-staff",
        },
        {
          title: "News & Events",
          description:
            "Stay up to date with seminars, announcements, and campus life.",
          href: "/news-events",
        },
      ],
    },
    pages: {
      about: {
        title: "About GIC",
        description:
          "Learn more about our mission, vision, and the services that support our community.",
        links: [
          { label: "Mission", href: "/about/mission" },
          { label: "Vision", href: "/about/vision" },
          { label: "Services", href: "/about/services" },
        ],
      },
      apply: {
        title: "Apply to GIC",
        description:
          "Start your application journey with program requirements and admissions guidance.",
        links: [
          { label: "Program overview", href: "/program" },
          { label: "Admissions FAQ", href: "/program/faq" },
        ],
      },
      blog: {
        title: "Blog",
      },
      docs: {
        title: "Docs",
      },
      facultyStaff: {
        title: "Faculty & Staff",
        description:
          "Meet our faculty, professional staff, and visiting professors.",
        cards: [
          { label: "Faculty Directory", href: "/faculty-staff/staff" },
          { label: "Mobility", href: "/faculty-staff/mobility" },
          { label: "Invited Professors", href: "/faculty-staff/invited-professors" },
        ],
      },
      newsEvents: {
        title: "News & Events",
        description: "Latest announcements, event highlights, and academic calendar.",
        cards: [
          { label: "News", href: "/news-events/news" },
          { label: "Events", href: "/news-events/events" },
          { label: "Calendar", href: "/news-events/calendar" },
        ],
      },
      pricing: {
        title: "Pricing",
      },
      program: {
        title: "Program",
        description:
          "Explore undergraduate and graduate offerings, admissions information, and student outcomes.",
        cards: [
          { label: "Degrees", href: "/program/degrees" },
          { label: "FAQ", href: "/program/faq" },
          { label: "Scholarships", href: "/program/scholarships" },
          { label: "Careers", href: "/program/careers" },
        ],
      },
      research: {
        title: "Research",
        description:
          "Discover labs, projects, publications, and tools that showcase our research impact.",
        cards: [
          { label: "Labs", href: "/research/labs" },
          { label: "Projects", href: "/research/projects" },
          { label: "Publications", href: "/research/publications" },
          { label: "Tools", href: "/research/tools" },
        ],
      },
      studentLife: {
        title: "Student",
        description:
          "Exchange opportunities, student projects, testimonials, and campus experiences.",
        cards: [
          { label: "Exchange", href: "/student/exchange" },
          { label: "Testimonials", href: "/student/testimonials" },
          { label: "Student Projects", href: "/student/student-projects" },
          { label: "Clubs & Communities", href: "/student/clubs-communities" },
          { label: "Gallery", href: "/student/gallery" },
        ],
      },
    },
    contact: {
      title: "Contact",
      description:
        "Reach out to our team for admissions, partnerships, or media requests.",
      emailLabel: "Email",
      email: "info@gic.example",
    },
    footer: {
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Apply", href: "/apply" },
        { label: "Calendar", href: "/news-events/calendar" },
      ],
      copyright: "© {year} GIC Engineering.",
    },
  },
  km: {
    brand: {
      name: "GIC Engineering",
      tagline: "មជ្ឈមណ្ឌលនវានុវត្តន៍សកល",
    },
    description:
      "មជ្ឈមណ្ឌលនវានុវត្តន៍សកល សម្រាប់ការអប់រំវិស្វកម្ម ការស្រាវជ្រាវ និងជីវិតនិស្សិត។",
    topBar: {
      languageLabel: "ភាសា",
      searchPlaceholder: "ស្វែងរក...",
      quickLinksLabel: "តំណរហ័ស",
    },
    navigation: {
      primary: [
        { label: "កម្មវិធី", href: "/program" },
        { label: "ស្រាវជ្រាវ", href: "/research" },
        { label: "គ្រូបង្រៀន និងបុគ្គលិក", href: "/faculty-staff" },
        { label: "និស្សិត", href: "/student" },
        { label: "ព័ត៌មាន និងព្រឹត្តិការណ៍", href: "/news-events" },
        { label: "អំពីយើង", href: "/about" },
      ],
      menu: [
        { label: "កម្មវិធី", href: "/program" },
        { label: "ស្រាវជ្រាវ", href: "/research" },
        { label: "គ្រូបង្រៀន និងបុគ្គលិក", href: "/faculty-staff" },
        { label: "និស្សិត", href: "/student" },
        { label: "ព័ត៌មាន និងព្រឹត្តិការណ៍", href: "/news-events" },
        { label: "អំពីយើង", href: "/about" },
        { label: "ទំនាក់ទំនង", href: "/contact" },
        { label: "ដាក់ពាក្យ", href: "/apply" },
        { label: "ប្រតិទិន", href: "/news-events/calendar" },
        { label: "ការបោះពុម្ពផ្សាយ", href: "/research/publications" },
      ],
      utility: [
        { label: "ដាក់ពាក្យ", href: "/apply" },
        { label: "ប្រតិទិន", href: "/news-events/calendar" },
        { label: "ការបោះពុម្ពផ្សាយ", href: "/research/publications" },
      ],
    },
    home: {
      heroTitle: "មជ្ឈមណ្ឌលដឹកនាំការផ្លាស់ប្តូរឌីជីថលកម្ពុជា",
      heroSubtitle:
        "ការអប់រំប្រកបដោយគុណភាព និងការស្រាវជ្រាវកម្រិតខ្ពស់ សម្រាប់បណ្តុះបណ្តាលវិស្វករ និងអ្នកច្នៃប្រឌិត។",
      ctas: {
        primary: { label: "ស្វែងរកកម្មវិធី", href: "/program" },
        secondary: { label: "ស្រាវជ្រាវរបស់យើង", href: "/research" },
      },
      numbersTitle: "GIC តាមរយៈលេខ",
      numbers: [
        {
          label: "ឆ្នាំនៃភាពល្អឥតខ្ចោះ",
          value: "ចាប់តាំងពី 2005",
          description: "ជិត 20 ឆ្នាំនៃភាពដឹកនាំវិស្វកម្ម។",
        },
        {
          label: "សហគមន៍និស្សិត",
          value: "1,200+",
          description: "និស្សិតកំពុងសិក្សា និងអតីតនិស្សិត។",
        },
        {
          label: "អត្រាការងារ",
          value: "92%",
          description: "បញ្ចប់ការសិក្សា រកការងារក្នុង 6 ខែ។",
        },
        {
          label: "លទ្ធផលស្រាវជ្រាវ",
          value: "12 មន្ទីរពិសោធន៍",
          description: "លទ្ធផល និងការបោះពុម្ពផ្សាយជាប្រចាំ។",
        },
      ],
      pillarsTitle: "សសរស្តម្ភសិក្សាសំខាន់",
      pillars: [
        {
          title: "បរិញ្ញាបត្រ (វិស្វករ)",
          description:
            "កម្មវិធី 5 ឆ្នាំ ជាមួយជំនាញផ្លូវការនៅផ្នែក Software, Data និង Systems.",
        },
        {
          title: "បរិញ្ញាបណ្ឌិត និងបណ្ឌិត",
          description:
            "កម្មវិធីស្រាវជ្រាវជ្រាលជ្រៅជាមួយដៃគូអន្តរជាតិ។",
        },
        {
          title: "វិញ្ញាបនបត្រវិជ្ជាជីវៈ",
          description:
            "វគ្គខ្លីសម្រាប់ឧស្សាហកម្ម Cloud, Cybersecurity និង AI.",
        },
      ],
      research: {
        title: "ពន្លឺស្រាវជ្រាវ និងនវានុវត្តន៍",
        description:
          "មន្ទីរពិសោធន៍ និងគម្រោងអនុវត្ត បង្ហាញអនាគតឌីជីថលកម្ពុជា។",
        labs: [
          {
            title: "មន្ទីរពិសោធន៍ Khmer NLP",
            description:
              "បច្ចេកវិទ្យាភាសាខ្មែរសម្រាប់អាន ស្តាប់ និងអប់រំ។",
          },
          {
            title: "មន្ទីរពិសោធន៍ DADS",
            description:
              "វិភាគទិន្នន័យ និង AI សម្រាប់ហិរញ្ញវត្ថុ និងទីក្រុងឆ្លាត។",
          },
        ],
        spotlight: {
          title: "គម្រោងថ្មីៗ",
          description:
            "ឧបករណ៍ពិនិត្យអក្ខរាវិរុទ្ធខ្មែរ និងម៉ូឌែល AI សម្រាប់អប់រំឌីជីថល។",
          linkLabel: "អានបន្ថែម",
          href: "/research/projects",
        },
        cta: { label: "មើលបញ្ជីស្រាវជ្រាវ", href: "/research" },
      },
      journey: {
        title: "ដំណើរនិស្សិត & ការផ្លាស់ប្តូរ",
        description:
          "បទពិសោធន៍អន្តរជាតិ តាមរយៈការផ្លាស់ប្តូរ និងការអនុវត្តការងារ។",
        mobilityTitle: "ការផ្លាស់ប្តូរអន្តរជាតិ",
        internshipsTitle: "អនុវត្តការងារ",
        studentLifeTitle: "ជីវិតនិស្សិត",
        mobility: ["បារាំង", "ជប៉ុន", "កូរ៉េ", "ថៃ"],
        internships: ["Smart", "ABA Bank", "Huawei", "Wing"],
        studentLife: [
          { label: "គម្រោងនិស្សិត", href: "/student/student-projects" },
          { label: "ក្លឹបបច្ចេកវិទ្យា", href: "/student/clubs-communities" },
          { label: "វិចិត្រសាល", href: "/student/gallery" },
        ],
      },
      partnerships: {
        title: "ដៃគូឧស្សាហកម្ម & អាជីព",
        description:
          "បណ្តាញឧស្សាហកម្មសម្រាប់ការអនុវត្តការងារ និងការជួលជាប្រចាំ។",
        careersTitle: "ផ្លូវអាជីព",
        logos: ["Smart", "ABA Bank", "Huawei", "BRED Bank", "TotalEnergies"],
        careers: [
          "វិស្វករ DevOps",
          "អ្នកអភិវឌ្ឍ Full-Stack",
          "អ្នកវិទ្យាសាស្ត្រទិន្នន័យ",
          "អ្នកវិភាគ Cybersecurity",
        ],
      },
      events: {
        title: "ព្រឹត្តិការណ៍ និងកាលកំណត់",
        description: "តាមដានកាលវិភាគសំខាន់ៗសម្រាប់និស្សិតថ្មី។",
        items: [
          {
            title: "ចុះឈ្មោះប្រឡងចូល",
            date: "15 មិថុនា - 15 កក្កដា",
            description: "ដាក់ពាក្យមុន ដើម្បីរកទីតាំងសិក្សា។",
            href: "/apply",
          },
          {
            title: "សិក្ខាសាលាបច្ចេកវិទ្យា",
            date: "8 កក្កដា",
            description: "សាស្ត្រាចារ្យអញ្ជើញចែករំលែកបទពិសោធន៍ AI.",
            href: "/news-events/events",
          },
          {
            title: "ប្រតិទិនសិក្សា",
            date: "ឆមាសទី 1",
            description: "មើលថ្ងៃឈប់សម្រាក និងថ្ងៃប្រឡង។",
            href: "/news-events/calendar",
          },
        ],
      },
      prestigeHero: {
        title: "ស្ដង់ដារពិភពលោក។ ផលប៉ះពាល់ក្នុងស្រុក។",
        subtitle:
          "បណ្តុះបណ្តាលវិស្វករជំនាន់ថ្មី ដោយគុណភាពអប់រំកម្រិតខ្ពស់ និងមគ្គុទេសក៍ពីគ្រូ PhD ពីសាកលវិទ្យាល័យបារាំង។",
        badge: "ដៃគូបារាំង-កម្ពុជា",
        imageAlt: "រូបភាពវិទ្យាស្ថាន ITC និងស្លាក GIC។",
      },
      faculty: {
        title: "គ្រូបង្រៀនជំនាញខ្ពស់",
        description:
          "មន្ទីរពិសោធន៍ដឹកនាំដោយអ្នកជំនាញ និងការណែនាំជិតស្និទ្ធ។",
        stat:
          "80%+ នៃគ្រូបច្ចេកទេសមានបរិញ្ញាបត្ររីករាយពីបារាំង និងបរទេស។",
        spotlight: [
          {
            name: "បណ្ឌិត សុខា ដារ៉ា",
            degree: "PhD, INP Toulouse",
            focus: "AI សម្រាប់ភាសាខ្មែរ",
          },
          {
            name: "បណ្ឌិត លីណា ជា",
            degree: "PhD, INSA Lyon",
            focus: "សុវត្ថិភាពបណ្តាញ",
          },
          {
            name: "បណ្ឌិត វណ្ណៈ ចេន",
            degree: "PhD, UTC Compiègne",
            focus: "Smart Systems & IoT",
          },
        ],
      },
      mobilityHub: {
        title: "មជ្ឈមណ្ឌលផ្លាស់ប្តូរអន្តរជាតិ",
        description: "សិក្សានៅភ្នំពេញ បន្តនៅបារាំង។",
        inboundTitle: "ការផ្លាស់ប្តូរចូល",
        outboundTitle: "កម្មវិធីចេញក្រៅ",
        inbound: "និស្សិតប្តូរពីបារាំងមក ITC/GIC ជារៀងរាល់ឆ្នាំ។",
        outbound: ["INSA", "INP", "UTC", "Polytech"],
        dualDegree:
          "ផ្លូវចេញទៅបរិញ្ញាបត្រទ្វេ និងកម្មសិក្សាស្រាវជ្រាវនៅអឺរ៉ុប។",
      },
      partnerWall: {
        title: "ដៃគូមហាវិទ្យាល័យ និងឧស្សាហកម្ម",
        caption:
          "កម្មវិធីសិក្សារបស់យើង ត្រូវបានរចនារួមជាមួយឧស្សាហកម្ម ដើម្បីសមត្ថភាពការងារពេញលេញ។",
        academicTitle: "ដៃគូវិទ្យាស្ថាន",
        industryTitle: "ដៃគូឧស្សាហកម្ម",
        academic: ["INSA", "INP Toulouse", "UTC", "Polytech", "Campus France"],
        industry: ["Smart", "Huawei", "ABA Bank", "BRED Bank", "TotalEnergies"],
      },
      homeFooter: {
        title: "ភ្ជាប់ជាមួយ GIC",
        address:
          "អាគារ A វិទ្យាស្ថាន ITC ផ្លូវសហព័ន្ធរុស្ស៊ី ភ្នំពេញ កម្ពុជា",
        emails: ["info@gic.itc.edu.kh", "partnerships@gic.itc.edu.kh"],
        phone: "+855 (0)23 880 370",
        socials: [
          { label: "LinkedIn", href: "https://www.linkedin.com" },
          { label: "Facebook", href: "https://www.facebook.com" },
          { label: "GitHub", href: "https://github.com" },
        ],
        quickLinks: [
          {
            title: "សម្រាប់និស្សិត",
            links: [
              { label: "ការចូលរៀន", href: "/apply" },
              { label: "កម្មវិធី", href: "/program" },
              { label: "អាហារូបករណ៍", href: "/program/scholarships" },
            ],
          },
          {
            title: "សម្រាប់អ្នកស្រាវជ្រាវ",
            links: [
              { label: "មន្ទីរពិសោធន៍", href: "/research/labs" },
              { label: "ការបោះពុម្ពផ្សាយ", href: "/research/publications" },
              { label: "ឧបករណ៍", href: "/research/tools" },
            ],
          },
          {
            title: "សម្រាប់ដៃគូ",
            links: [
              { label: "សហការណ៍ឧស្សាហកម្ម", href: "/research/projects" },
              { label: "សេវាកម្មអាជីព", href: "/program/careers" },
              { label: "ទំនាក់ទំនង", href: "/contact" },
            ],
          },
        ],
      },
      highlights: [
        {
          title: "ស្រាវជ្រាវមានឥទ្ធិពល",
          description:
            "ស្វែងយល់ពីមន្ទីរពិសោធន៍ពហុវិស័យ ការបោះពុម្ពផ្សាយ និងឧបករណ៍ជំរុញនវានុវត្តន៍។",
          href: "/research",
        },
        {
          title: "គ្រូបង្រៀន និងបុគ្គលិក",
          description:
            "ជួបជាមួយអ្នកណែនាំ និងបុគ្គលិកគាំទ្រការសិក្សារបស់អ្នក។",
          href: "/faculty-staff",
        },
        {
          title: "ព័ត៌មាន និងព្រឹត្តិការណ៍",
          description:
            "តាមដានសិក្ខាសាលា ការប្រកាស និងជីវិតមហាវិទ្យាល័យ។",
          href: "/news-events",
        },
      ],
    },
    pages: {
      about: {
        title: "អំពី GIC",
        description:
          "ស្វែងយល់បន្ថែមអំពីបេសកកម្ម ចក្ខុវិស័យ និងសេវាកម្មដែលគាំទ្រសហគមន៍របស់យើង។",
        links: [
          { label: "បេសកកម្ម", href: "/about/mission" },
          { label: "ចក្ខុវិស័យ", href: "/about/vision" },
          { label: "សេវាកម្ម", href: "/about/services" },
        ],
      },
      apply: {
        title: "ដាក់ពាក្យទៅ GIC",
        description:
          "ចាប់ផ្តើមដំណើរការដាក់ពាក្យជាមួយលក្ខខណ្ឌកម្មវិធី និងការណែនាំចូលរៀន។",
        links: [
          { label: "ទិដ្ឋភាពកម្មវិធី", href: "/program" },
          { label: "សំណួរញឹកញាប់ចូលរៀន", href: "/program/faq" },
        ],
      },
      blog: {
        title: "ប្លុក",
      },
      docs: {
        title: "ឯកសារ",
      },
      facultyStaff: {
        title: "គ្រូបង្រៀន និងបុគ្គលិក",
        description:
          "ស្គាល់គ្រូបង្រៀន បុគ្គលិកជំនាញ និងសាស្ត្រាចារ្យអញ្ជើញរបស់យើង។",
        cards: [
          { label: "បញ្ជីគ្រូបង្រៀន", href: "/faculty-staff/staff" },
          { label: "ការផ្លាស់ប្តូរ", href: "/faculty-staff/mobility" },
          { label: "សាស្ត្រាចារ្យអញ្ជើញ", href: "/faculty-staff/invited-professors" },
        ],
      },
      newsEvents: {
        title: "ព័ត៌មាន និងព្រឹត្តិការណ៍",
        description: "ព័ត៌មានថ្មីៗ សកម្មភាព និងប្រតិទិនសិក្សា។",
        cards: [
          { label: "ព័ត៌មាន", href: "/news-events/news" },
          { label: "ព្រឹត្តិការណ៍", href: "/news-events/events" },
          { label: "ប្រតិទិន", href: "/news-events/calendar" },
        ],
      },
      pricing: {
        title: "តម្លៃ",
      },
      program: {
        title: "កម្មវិធី",
        description:
          "ស្វែងយល់អំពីកម្មវិធីបរិញ្ញា និងបណ្ឌិត ការចូលរៀន និងលទ្ធផលនិស្សិត។",
        cards: [
          { label: "មុខវិជ្ជា", href: "/program/degrees" },
          { label: "សំណួរញឹកញាប់", href: "/program/faq" },
          { label: "អាហារូបករណ៍", href: "/program/scholarships" },
          { label: "អាជីព", href: "/program/careers" },
        ],
      },
      research: {
        title: "ស្រាវជ្រាវ",
        description:
          "ស្វែងរកមន្ទីរពិសោធន៍ គម្រោង ការបោះពុម្ពផ្សាយ និងឧបករណ៍បង្ហាញផលប៉ះពាល់ស្រាវជ្រាវ។",
        cards: [
          { label: "មន្ទីរពិសោធន៍", href: "/research/labs" },
          { label: "គម្រោង", href: "/research/projects" },
          { label: "ការបោះពុម្ពផ្សាយ", href: "/research/publications" },
          { label: "ឧបករណ៍", href: "/research/tools" },
        ],
      },
      studentLife: {
        title: "និស្សិត",
        description:
          "ឱកាសផ្លាស់ប្តូរ គម្រោងនិស្សិត សក្ខីកម្ម និងបទពិសោធន៍ក្នុងមហាវិទ្យាល័យ។",
        cards: [
          { label: "ការផ្លាស់ប្តូរ", href: "/student/exchange" },
          { label: "សក្ខីកម្ម", href: "/student/testimonials" },
          { label: "គម្រោងនិស្សិត", href: "/student/student-projects" },
          { label: "ក្លឹប និងសហគមន៍", href: "/student/clubs-communities" },
          { label: "វិចិត្រសាល", href: "/student/gallery" },
        ],
      },
    },
    contact: {
      title: "ទំនាក់ទំនង",
      description:
        "ទាក់ទងក្រុមរបស់យើងសម្រាប់ការចូលរៀន ភាពជាដៃគូ ឬសំណើព័ត៌មានសារព័ត៌មាន។",
      emailLabel: "អ៊ីមែល",
      email: "info@gic.example",
    },
    footer: {
      links: [
        { label: "ទំនាក់ទំនង", href: "/contact" },
        { label: "ដាក់ពាក្យ", href: "/apply" },
        { label: "ប្រតិទិន", href: "/news-events/calendar" },
      ],
      copyright: "© {year} GIC Engineering.",
    },
  },
};

export const getSiteContent = (locale: Locale) => contentByLocale[locale];
