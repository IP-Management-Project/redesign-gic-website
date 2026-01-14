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
type MainNavItem = {
  label: string;
  href: string;
  children?: NavigationChildren[];
}
type NavigationChildren = {
  label: string;
  href: string;
  desc?: string;
}
type Navigation = {
  primary: MainNavItem[];
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

type DegreeDetailContent = {
  titleSuffix: string;
  description: string;
  links: {
    curriculum: string;
    admissions: string;
    relatedLabs: string;
  };
};

type DegreePrefixContent = {
  titlePrefix: string;
  description: string;
};

type StudentProjectDetailContent = {
  description: string;
  links: {
    program: string;
    faculty: string;
    lab: string;
  };
};

type TestimonialDetailContent = {
  titlePrefix: string;
  description: string;
  links: {
    program: string;
    lab: string;
    studentProjects: string;
  };
};

type PersonDetailContent = {
  description: string;
  links: {
    projects: string;
    publications: string;
    studentProjects: string;
  };
};

type LabDetailContent = {
  titleSuffix: string;
  description: string;
  links: {
    team: string;
    projects: string;
    publications: string;
  };
};

type ResearchProjectDetailContent = {
  titleSuffix: string;
  description: string;
  links: {
    lab: string;
    team: string;
    studentProjects: string;
  };
};

type NewsPostDetailContent = {
  description: string;
  links: {
    research: string;
    events: string;
  };
};

type EventDetailContent = {
  description: string;
  links: {
    calendar: string;
    studentLife: string;
  };
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
  subpages: {
    about: {
      history: PageContent;
      mission: PageContent;
      vision: PageContent;
      services: PageContent;
    };
    program: {
      engineeringDegree: PageContent;
      internationalProgram: PageContent;
      associateDegree: PageContent;
      masterDegree: PageContent;
      degrees: PageContent;
      careers: PageContent;
      faq: PageContent;
      scholarships: PageContent;
      degreeDetail: DegreeDetailContent;
      degreeAdmissions: DegreePrefixContent;
      degreeCurriculum: DegreePrefixContent;
    };
    studentLife: {
      exchange: {
        title: string;
        description: string;
      };
      exchangeLinks: LinkItem[];
      incoming: PageContent;
      outgoing: PageContent;
      gallery: PageContent;
      studentProjects: PageContent;
      studentProjectDetail: StudentProjectDetailContent;
      testimonials: PageContent;
      testimonialDetail: TestimonialDetailContent;
      clubs: PageContent;
    };
    facultyStaff: {
      staff: PageContent;
      mobility: PageContent;
      invitedProfessors: PageContent;
      personDetail: PersonDetailContent;
    };
    research: {
      laboratory: PageContent;
      labs: PageContent;
      projects: PageContent;
      publications: PageContent;
      softwareTools: PageContent;
      tools: PageContent;
      labDetail: LabDetailContent;
      projectDetail: ResearchProjectDetailContent;
    };
    project: {
      incubation: PageContent;
      erasmusAlien: PageContent;
      hithiheProject: PageContent;
    };
    newsEvents: {
      news: PageContent;
      events: PageContent;
      calendar: PageContent;
      seminar: PageContent;
      timetable: PageContent;
      newsPost: NewsPostDetailContent;
      eventDetail: EventDetailContent;
    };
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
        {
          label: "About GIC",
          href: "/about",
          children: [
            { label: "History of GIC", href: "/about/history", desc: "Explore the milestones that shaped GIC since its founding." },
            { label: "Mission & Vision", href: "/about", desc: "Learn about our purpose, values, and long-term direction." },
            { label: "Our Services", href: "/services", desc: "Discover the student services and support resources we offer." },
            { label: "Faculty & Staff", href: "/faculty-staff", desc: "Meet the faculty leaders and staff supporting the community."},
          ]
        },
        {
          label: "Programs",
          href: "/program",
          children: [
            { label: "Engineering degree", href: "/program/engineering-degree", desc: "Explore the undergraduate engineering curriculum and tracks." },
            { label: "International Program", href: "/program/international-program", desc: "See global exchange, dual-degree, and mobility opportunities." },
            { label: "Associate degree", href: "/program/associate-degree", desc: "Review the two-year associate pathway and transfer options." },
            { label: "Master degree", href: "/program/master-degree", desc: "Learn about graduate-level study and research pathways." }
          ]
        },
        {
          label: "Research",
          href: "/research",
          children: [
            { label: "Laboratory", href: "/research/laboratory", desc: "Visit the labs and facilities advancing applied research." },
            { label: "Publications", href: "/research/publications", desc: "Browse peer-reviewed papers, reports, and conference work." },
            { label: "Software & Tools", href: "/research/software-tools", desc: "Explore open-source tools, datasets, and research platforms." },
          ]
        },
        {
          label: "Project",
          href: "/student",
          children: [
            { label: "Incubation", href: "/project/incubation", desc: "Support for startups and student-led innovation initiatives." },
            { label: "Erasmus + KA2 ALIEN", href: "/project/erasmus-alien", desc: "International collaboration project highlights and outcomes." },
            { label: "HITIHE Project", href: "/project/hithihe-project", desc: "High-impact teaching initiatives and higher education projects." },
          ]
        },
        {
          label: "News & Events",
          href: "/news-events",
          children: [
            { label: "Academic Calendar", href: "/calendar", desc: "Important academic dates, deadlines, and key milestones." },
            { label: "Seminar & Events", href: "/seminar", desc: "Upcoming seminars, talks, and community events." },
            { label: "Timetable", href: "/timetable", desc: "Class schedules and weekly timetables for students." },
          ]
        },
      ],
      menu: [
        { label: "About", href: "/about" },
        { label: "Program", href: "/program" },
        { label: "Research", href: "/research" },
        { label: "Faculty & Staff", href: "/faculty-staff" },
        { label: "Student", href: "/student" },
        { label: "News & Events", href: "/news-events" },
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
    subpages: {
      about: {
        history: {
          title: "History of GIC",
          description:
            "Milestones and achievements from the founding of GIC to today.",
        },
        mission: {
          title: "Our Mission",
          description:
            "Deliver world-class engineering education that powers Cambodia's digital future.",
        },
        vision: {
          title: "Our Vision",
          description:
            "Be the leading hub for innovation, research, and global partnerships in Southeast Asia.",
        },
        services: {
          title: "Student Services",
          description:
            "Academic advising, career support, and wellness services that help students thrive.",
        },
      },
      program: {
        engineeringDegree: {
          title: "Engineering Degree",
          description:
            "Undergraduate engineering curriculum with specialization tracks and applied learning.",
        },
        internationalProgram: {
          title: "International Program",
          description:
            "Global exchanges, dual-degree options, and international mobility pathways.",
        },
        associateDegree: {
          title: "Associate Degree",
          description:
            "A two-year pathway designed for foundational engineering skills and transfer readiness.",
        },
        masterDegree: {
          title: "Master Degree",
          description:
            "Graduate-level programs focused on research, innovation, and advanced practice.",
        },
        degrees: {
          title: "Degree Programs",
          description:
            "Explore undergraduate and graduate pathways designed for industry-ready engineers.",
          cards: [
            { label: "Software Engineering", href: "/program/degrees/software-engineering" },
            { label: "Data Science", href: "/program/degrees/data-science" },
            { label: "Network & Systems", href: "/program/degrees/network-systems" },
            { label: "Cybersecurity", href: "/program/degrees/cybersecurity" },
          ],
        },
        careers: {
          title: "Careers & Outcomes",
          description:
            "See where GIC graduates work and how our industry partners support hiring.",
        },
        faq: {
          title: "Program FAQ",
          description:
            "Find answers about admissions, tuition, and program requirements.",
        },
        scholarships: {
          title: "Scholarships",
          description:
            "Financial support options for high-achieving and underrepresented students.",
        },
        degreeDetail: {
          titleSuffix: "Degree Overview",
          description:
            "Curriculum highlights, faculty support, and lab opportunities for this degree.",
          links: {
            curriculum: "View curriculum",
            admissions: "Admissions requirements",
            relatedLabs: "Related labs",
          },
        },
        degreeAdmissions: {
          titlePrefix: "Admissions",
          description:
            "Eligibility, timeline, and required documents for this degree.",
        },
        degreeCurriculum: {
          titlePrefix: "Curriculum",
          description:
            "Core courses, specialization tracks, and capstone expectations.",
        },
      },
      studentLife: {
        exchange: {
          title: "Student Exchange",
          description:
            "International mobility opportunities with partner universities.",
        },
        exchangeLinks: [
          { label: "Incoming exchange", href: "/student/exchange/incoming" },
          { label: "Outgoing exchange", href: "/student/exchange/outgoing" },
        ],
        incoming: {
          title: "Incoming Exchange",
          description:
            "Information for visiting students joining GIC for a semester or year.",
        },
        outgoing: {
          title: "Outgoing Exchange",
          description:
            "Prepare for study abroad with partner institutions in Europe and Asia.",
        },
        gallery: {
          title: "Student Life Gallery",
          description: "Snapshots from campus events, labs, and student projects.",
        },
        studentProjects: {
          title: "Student Projects",
          description:
            "Capstone work and innovation challenges led by GIC students.",
        },
        studentProjectDetail: {
          description:
            "Project highlights, mentors, and outcomes from this student initiative.",
          links: {
            program: "Program overview",
            faculty: "Faculty mentors",
            lab: "Related labs",
          },
        },
        testimonials: {
          title: "Student Testimonials",
          description:
            "Hear from students and alumni about their GIC experience.",
        },
        testimonialDetail: {
          titlePrefix: "Testimonial",
          description:
            "A closer look at student journeys, achievements, and career outcomes.",
          links: {
            program: "Explore programs",
            lab: "Research labs",
            studentProjects: "Student projects",
          },
        },
        clubs: {
          title: "Clubs & Communities",
          description:
            "Join technical clubs, entrepreneurship groups, and community initiatives.",
        },
      },
      facultyStaff: {
        staff: {
          title: "Faculty Directory",
          description:
            "Meet the professors and instructors leading our academic programs.",
        },
        mobility: {
          title: "Faculty Mobility",
          description:
            "International teaching exchanges and visiting scholar opportunities.",
        },
        invitedProfessors: {
          title: "Invited Professors",
          description:
            "Guest faculty bringing global expertise to GIC classrooms and labs.",
        },
        personDetail: {
          description:
            "Profile, research focus, and mentorship offerings for this faculty member.",
          links: {
            projects: "Research projects",
            publications: "Publications",
            studentProjects: "Student projects",
          },
        },
      },
      research: {
        laboratory: {
          title: "Laboratory",
          description:
            "Explore the labs and facilities that power research and innovation.",
        },
        labs: {
          title: "Research Labs",
          description:
            "Discover the labs advancing AI, data science, and digital infrastructure.",
        },
        projects: {
          title: "Research Projects",
          description:
            "Applied research initiatives led by faculty, students, and partners.",
        },
        publications: {
          title: "Publications",
          description:
            "Peer-reviewed papers, reports, and conference contributions.",
        },
        softwareTools: {
          title: "Software & Tools",
          description:
            "Open-source tools, datasets, and platforms built by GIC researchers.",
        },
        tools: {
          title: "Research Tools",
          description:
            "Open-source tools and datasets developed by the GIC research community.",
        },
        labDetail: {
          titleSuffix: "Lab",
          description:
            "Research focus areas, active projects, and collaborations for this lab.",
          links: {
            team: "Lab team",
            projects: "Lab projects",
            publications: "Lab publications",
          },
        },
        projectDetail: {
          titleSuffix: "Project",
          description:
            "Goals, impact, and partners supporting this research project.",
          links: {
            lab: "Related lab",
            team: "Research team",
            studentProjects: "Student projects",
          },
        },
      },
      project: {
        incubation: {
          title: "Incubation",
          description:
            "Startup incubation support, mentorship, and resources for innovators.",
        },
        erasmusAlien: {
          title: "Erasmus + KA2 ALIEN",
          description:
            "International collaboration projects strengthening innovation and learning.",
        },
        hithiheProject: {
          title: "HITIHE Project",
          description:
            "High-impact teaching initiatives for higher education transformation.",
        },
      },
      newsEvents: {
        news: {
          title: "News",
          description:
            "Announcements and highlights from the GIC community.",
        },
        events: {
          title: "Events",
          description:
            "Workshops, seminars, and key dates on the GIC calendar.",
        },
        calendar: {
          title: "Academic Calendar",
          description:
            "Important dates for admissions, semesters, and campus activities.",
        },
        seminar: {
          title: "Seminar & Events",
          description:
            "Upcoming seminars, talks, and events across the GIC community.",
        },
        timetable: {
          title: "Timetable",
          description:
            "Class schedules, weekly timetables, and key session times.",
        },
        newsPost: {
          description:
            "Full story with details, highlights, and related resources.",
          links: {
            research: "Research updates",
            events: "Upcoming events",
          },
        },
        eventDetail: {
          description:
            "Event details, speakers, and how to participate.",
          links: {
            calendar: "View calendar",
            studentLife: "Student life",
          },
        },
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
    subpages: {
      about: {
        history: {
          title: "ប្រវត្តិ GIC",
          description:
            "ដំណាក់កាលសំខាន់ៗ និងសមិទ្ធផលរបស់ GIC តាំងពីការបង្កើតរហូតមកដល់ពេលនេះ។",
        },
        mission: {
          title: "បេសកកម្ម",
          description:
            "ផ្តល់ការអប់រំវិស្វកម្មគុណភាពខ្ពស់ ដើម្បីជំរុញអនាគតឌីជីថលកម្ពុជា។",
        },
        vision: {
          title: "ចក្ខុវិស័យ",
          description:
            "ក្លាយជាគោលការណ៍នវានុវត្តន៍ ការស្រាវជ្រាវ និងដៃគូអន្តរជាតិឈានមុខ។",
        },
        services: {
          title: "សេវាកម្មសម្រាប់និស្សិត",
          description:
            "ការណែនាំអប់រំ ការគាំទ្រអាជីព និងសុខុមាលភាពសិស្ស។",
        },
      },
      program: {
        engineeringDegree: {
          title: "បរិញ្ញាវិស្វកម្ម",
          description:
            "កម្មវិធីបរិញ្ញាវិស្វកម្មជាមួយផ្លូវជំនាញ និងការអនុវត្តជាក់ស្តែង។",
        },
        internationalProgram: {
          title: "កម្មវិធីអន្តរជាតិ",
          description:
            "ការផ្លាស់ប្តូរអន្តរជាតិ និងជម្រើសបរិញ្ញាទ្វេជាមួយដៃគូ។",
        },
        associateDegree: {
          title: "បរិញ្ញារង",
          description:
            "ផ្លូវរយៈពេលពីរឆ្នាំ សម្រាប់ជំនាញមូលដ្ឋាន និងការបន្តសិក្សា។",
        },
        masterDegree: {
          title: "បរិញ្ញាអនុបណ្ឌិត",
          description:
            "កម្មវិធីអនុបណ្ឌិតផ្តោតលើស្រាវជ្រាវ និងការអនុវត្តកម្រិតខ្ពស់។",
        },
        degrees: {
          title: "មុខវិជ្ជា",
          description:
            "ស្វែងយល់អំពីកម្មវិធីបរិញ្ញា និងបណ្ឌិតសម្រាប់វិស្វករជំនាន់ថ្មី។",
          cards: [
            { label: "វិស្វកម្ម Software", href: "/program/degrees/software-engineering" },
            { label: "វិទ្យាសាស្ត្រទិន្នន័យ", href: "/program/degrees/data-science" },
            { label: "បណ្ដាញ និងប្រព័ន្ធ", href: "/program/degrees/network-systems" },
            { label: "សុវត្ថិភាពបណ្ដាញ", href: "/program/degrees/cybersecurity" },
          ],
        },
        careers: {
          title: "អាជីព និងលទ្ធផល",
          description:
            "ស្វែងយល់អំពីការងាររបស់សិស្សបញ្ចប់ និងដៃគូឧស្សាហកម្ម។",
        },
        faq: {
          title: "សំណួរញឹកញាប់",
          description:
            "ចម្លើយអំពីការចូលរៀន ថ្លៃសិក្សា និងលក្ខខណ្ឌកម្មវិធី។",
        },
        scholarships: {
          title: "អាហារូបករណ៍",
          description:
            "ជម្រើសគាំទ្រហិរញ្ញវត្ថុសម្រាប់សិស្សមានសមត្ថភាពខ្ពស់។",
        },
        degreeDetail: {
          titleSuffix: "ព័ត៌មានកម្មវិធី",
          description:
            "ចំណុចសំខាន់ៗនៃមុខវិជ្ជា និងឱកាសក្នុងមន្ទីរពិសោធន៍។",
          links: {
            curriculum: "មើលមុខវិជ្ជា",
            admissions: "លក្ខខណ្ឌចូលរៀន",
            relatedLabs: "មន្ទីរពិសោធន៍ពាក់ព័ន្ធ",
          },
        },
        degreeAdmissions: {
          titlePrefix: "ការចូលរៀន",
          description:
            "លក្ខខណ្ឌ និងឯកសារដែលត្រូវការសម្រាប់មុខវិជ្ជានេះ។",
        },
        degreeCurriculum: {
          titlePrefix: "មុខវិជ្ជា",
          description:
            "មេរៀនស្នូល និងផ្លូវជំនាញសម្រាប់មុខវិជ្ជានេះ។",
        },
      },
      studentLife: {
        exchange: {
          title: "កម្មវិធីផ្លាស់ប្តូរ",
          description:
            "ឱកាសផ្លាស់ប្តូរអន្តរជាតិជាមួយស្ថាប័នដៃគូ។",
        },
        exchangeLinks: [
          { label: "ការផ្លាស់ប្តូរចូល", href: "/student/exchange/incoming" },
          { label: "ការផ្លាស់ប្តូរចេញ", href: "/student/exchange/outgoing" },
        ],
        incoming: {
          title: "ការផ្លាស់ប្តូរចូល",
          description:
            "ព័ត៌មានសម្រាប់និស្សិតអន្តរជាតិដែលមកសិក្សានៅ GIC។",
        },
        outgoing: {
          title: "ការផ្លាស់ប្តូរចេញ",
          description:
            "ត្រៀមខ្លួនសម្រាប់ការសិក្សាក្រៅប្រទេសជាមួយដៃគូ។",
        },
        gallery: {
          title: "វិចិត្រសាលជីវិតនិស្សិត",
          description: "រូបភាពពីព្រឹត្តិការណ៍ ការសិក្សា និងគម្រោងនិស្សិត។",
        },
        studentProjects: {
          title: "គម្រោងនិស្សិត",
          description:
            "គម្រោងស្រាវជ្រាវ និងនវានុវត្តន៍ដែលដឹកនាំដោយនិស្សិត។",
        },
        studentProjectDetail: {
          description:
            "ការសង្ខេបគម្រោង មគ្គុទេសក៍ និងលទ្ធផលសម្រេចបាន។",
          links: {
            program: "មើលកម្មវិធី",
            faculty: "គ្រូបង្រៀន",
            lab: "មន្ទីរពិសោធន៍",
          },
        },
        testimonials: {
          title: "សក្ខីកម្ម",
          description:
            "សម្លេងពីនិស្សិត និងអតីតនិស្សិតអំពីបទពិសោធន៍នៅ GIC។",
        },
        testimonialDetail: {
          titlePrefix: "សក្ខីកម្ម",
          description:
            "បទពិសោធន៍ផ្ទាល់ពីនិស្សិត និងជោគជ័យក្នុងអាជីព។",
          links: {
            program: "កម្មវិធីសិក្សា",
            lab: "មន្ទីរពិសោធន៍",
            studentProjects: "គម្រោងនិស្សិត",
          },
        },
        clubs: {
          title: "ក្លឹប និងសហគមន៍",
          description:
            "ចូលរួមក្លឹបបច្ចេកវិទ្យា ក្រុមសង្គម និងសហគមន៍ច្នៃប្រឌិត។",
        },
      },
      facultyStaff: {
        staff: {
          title: "បញ្ជីគ្រូបង្រៀន",
          description:
            "ស្គាល់គ្រូបង្រៀន និងអ្នកបង្ហាត់ដែលដឹកនាំកម្មវិធីសិក្សា។",
        },
        mobility: {
          title: "ការផ្លាស់ប្តូរគ្រូបង្រៀន",
          description:
            "កម្មវិធីអន្តរជាតិសម្រាប់គ្រូបង្រៀន និងការបណ្តុះបណ្តាល។",
        },
        invitedProfessors: {
          title: "សាស្ត្រាចារ្យអញ្ជើញ",
          description:
            "អ្នកជំនាញអន្តរជាតិចូលរួមបង្រៀន និងណែនាំការស្រាវជ្រាវ។",
        },
        personDetail: {
          description:
            "ព័ត៌មានគ្រូបង្រៀន ការស្រាវជ្រាវ និងការណែនាំសិស្ស។",
          links: {
            projects: "គម្រោងស្រាវជ្រាវ",
            publications: "ការបោះពុម្ពផ្សាយ",
            studentProjects: "គម្រោងនិស្សិត",
          },
        },
      },
      research: {
        laboratory: {
          title: "មន្ទីរពិសោធន៍",
          description:
            "មន្ទីរពិសោធន៍ និងបរិក្ខារសម្រាប់ស្រាវជ្រាវ និងនវានុវត្តន៍។",
        },
        labs: {
          title: "មន្ទីរពិសោធន៍",
          description:
            "មន្ទីរពិសោធន៍ដែលដឹកនាំការស្រាវជ្រាវ AI និងទិន្នន័យ។",
        },
        projects: {
          title: "គម្រោងស្រាវជ្រាវ",
          description:
            "គម្រោងអនុវត្តដែលដឹកនាំដោយគ្រូបង្រៀន និងនិស្សិត។",
        },
        publications: {
          title: "ការបោះពុម្ពផ្សាយ",
          description:
            "អត្ថបទវិទ្យាសាស្ត្រ និងសេចក្ដីរាយការណ៍ជាប្រចាំ។",
        },
        softwareTools: {
          title: "កម្មវិធី និងឧបករណ៍",
          description:
            "ឧបករណ៍បើកចំហ ទិន្នន័យ និងវេទិកាដែលបង្កើតដោយអ្នកស្រាវជ្រាវ GIC។",
        },
        tools: {
          title: "ឧបករណ៍ស្រាវជ្រាវ",
          description:
            "ឧបករណ៍ និងទិន្នន័យបើកចំហពីសហគមន៍ស្រាវជ្រាវ GIC។",
        },
        labDetail: {
          titleSuffix: "មន្ទីរពិសោធន៍",
          description:
            "ចំណុចផ្តោត ការសហការណ៍ និងគម្រោងសកម្មរបស់មន្ទីរពិសោធន៍។",
          links: {
            team: "ក្រុមមន្ទីរពិសោធន៍",
            projects: "គម្រោង",
            publications: "ការបោះពុម្ពផ្សាយ",
          },
        },
        projectDetail: {
          titleSuffix: "គម្រោង",
          description:
            "គោលបំណង និងឥទ្ធិពលនៃគម្រោងស្រាវជ្រាវនេះ។",
          links: {
            lab: "មន្ទីរពិសោធន៍ពាក់ព័ន្ធ",
            team: "ក្រុមស្រាវជ្រាវ",
            studentProjects: "គម្រោងនិស្សិត",
          },
        },
      },
      project: {
        incubation: {
          title: "ការបណ្តុះបណ្តាលគម្រោង",
          description:
            "ការគាំទ្រការបង្កើតសហគ្រាស និងដំណោះស្រាយច្នៃប្រឌិត។",
        },
        erasmusAlien: {
          title: "Erasmus + KA2 ALIEN",
          description:
            "គម្រោងសហការអន្តរជាតិសម្រាប់ការច្នៃប្រឌិត និងការសិក្សា។",
        },
        hithiheProject: {
          title: "គម្រោង HITIHE",
          description:
            "គម្រោងបង្កើនគុណភាពបង្រៀន និងការអប់រំកម្រិតខ្ពស់។",
        },
      },
      newsEvents: {
        news: {
          title: "ព័ត៌មាន",
          description: "ព័ត៌មានថ្មីៗពីសហគមន៍ GIC។",
        },
        events: {
          title: "ព្រឹត្តិការណ៍",
          description: "សិក្ខាសាលា កម្មវិធី និងកាលបរិច្ឆេទសំខាន់ៗ។",
        },
        calendar: {
          title: "ប្រតិទិនសិក្សា",
          description: "កាលបរិច្ឆេទសំខាន់ៗសម្រាប់ឆ្នាំសិក្សា។",
        },
        seminar: {
          title: "សិក្ខាសាលា និងព្រឹត្តិការណ៍",
          description: "សិក្ខាសាលា ការពិភាក្សា និងព្រឹត្តិការណ៍ជាប្រចាំ។",
        },
        timetable: {
          title: "កាលវិភាគ",
          description: "កាលវិភាគមេរៀន និងពេលវេលាសិក្សាសំខាន់ៗ។",
        },
        newsPost: {
          description:
            "ព័ត៌មានលម្អិត និងធនធានពាក់ព័ន្ធនឹងប្រកាសនេះ។",
          links: {
            research: "ព័ត៌មានស្រាវជ្រាវ",
            events: "ព្រឹត្តិការណ៍បន្ទាប់",
          },
        },
        eventDetail: {
          description:
            "ព័ត៌មានព្រឹត្តិការណ៍ អ្នកនិយាយ និងវិធីចូលរួម។",
          links: {
            calendar: "មើលប្រតិទិន",
            studentLife: "ជីវិតនិស្សិត",
          },
        },
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
