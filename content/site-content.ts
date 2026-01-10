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

type FeaturedLink = {
  label: string;
  href: string;
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

type DegreeSubpageContent = {
  titlePrefix: string;
  description: string;
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

type ProjectDetailContent = {
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
      mission: PageContent;
      vision: PageContent;
      services: PageContent;
    };
    program: {
      faq: PageContent;
      degrees: PageContent;
      degreeDetail: DegreeDetailContent;
      degreeAdmissions: DegreeSubpageContent;
      degreeCurriculum: DegreeSubpageContent;
      careers: PageContent;
      scholarships: PageContent;
    };
    facultyStaff: {
      mobility: PageContent;
      staff: PageContent;
      invitedProfessors: PageContent;
      personDetail: PersonDetailContent;
    };
    research: {
      labs: PageContent & { featured: FeaturedLink };
      labDetail: LabDetailContent;
      publications: PageContent;
      tools: PageContent;
      projects: PageContent & { featured: FeaturedLink };
      projectDetail: ProjectDetailContent;
    };
    newsEvents: {
      news: PageContent & { featured: FeaturedLink };
      newsPost: NewsPostDetailContent;
      events: PageContent & { featured: FeaturedLink };
      eventDetail: EventDetailContent;
      calendar: PageContent;
    };
    studentLife: {
      exchange: PageContent;
      exchangeLinks: LinkItem[];
      incoming: PageContent;
      outgoing: PageContent;
      studentProjects: PageContent & { featured: FeaturedLink };
      studentProjectDetail: StudentProjectDetailContent;
      testimonials: PageContent & { featured: FeaturedLink };
      testimonialDetail: TestimonialDetailContent;
      clubs: PageContent;
      gallery: PageContent;
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
        { label: "Program", href: "/program" },
        { label: "Research", href: "/research" },
        { label: "Faculty & Staff", href: "/faculty-staff" },
        { label: "Student Life", href: "/student-life" },
        { label: "News & Events", href: "/news-events" },
        { label: "About", href: "/about" },
      ],
      menu: [
        { label: "Program", href: "/program" },
        { label: "Research", href: "/research" },
        { label: "Faculty & Staff", href: "/faculty-staff" },
        { label: "Student Life", href: "/student-life" },
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
      heroTitle: "GIC Engineering",
      heroSubtitle:
        "Global Innovation Center for engineering education, research, and student life.",
      ctas: {
        primary: { label: "Explore Programs", href: "/program" },
        secondary: { label: "Student Life", href: "/student-life" },
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
        title: "Student Life",
        description:
          "Exchange opportunities, student projects, testimonials, and campus experiences.",
        cards: [
          { label: "Exchange", href: "/student-life/exchange" },
          { label: "Testimonials", href: "/student-life/testimonials" },
          { label: "Student Projects", href: "/student-life/student-projects" },
          { label: "Clubs & Communities", href: "/student-life/clubs-communities" },
          { label: "Gallery", href: "/student-life/gallery" },
        ],
      },
    },
    subpages: {
      about: {
        mission: {
          title: "Mission",
          description:
            "Advance engineering education and research that serve Cambodia and the region through innovation, collaboration, and student success.",
        },
        vision: {
          title: "Vision",
          description:
            "Build a globally connected engineering department that empowers students with real-world experience, research excellence, and industry-ready skills.",
        },
        services: {
          title: "Services",
          description:
            "GIC supports advising, partnerships, and innovation services that help students, faculty, and industry collaborators thrive.",
        },
      },
      program: {
        faq: {
          title: "Program FAQ",
          description: "Common questions about admissions, academics, and student support.",
        },
        degrees: {
          title: "Degrees",
          description: "Browse undergraduate and graduate degrees offered at GIC.",
          cards: [
            {
              label: "Computer Engineering",
              href: "/program/degrees/computer-engineering",
            },
            {
              label: "Electrical Engineering",
              href: "/program/degrees/electrical-engineering",
            },
          ],
        },
        degreeDetail: {
          titleSuffix: "Degree",
          description: "Overview, learning outcomes, and key highlights for this degree.",
          links: {
            curriculum: "View curriculum",
            admissions: "Admissions details",
            relatedLabs: "Related labs",
          },
        },
        degreeAdmissions: {
          titlePrefix: "Admissions",
          description: "Requirements, deadlines, and application guidance for this degree.",
        },
        degreeCurriculum: {
          titlePrefix: "Curriculum",
          description: "Structured semesters, modules, and hands-on learning experiences.",
        },
        careers: {
          title: "Careers & Internships",
          description:
            "Connect with industry partners, internship opportunities, and career outcomes.",
        },
        scholarships: {
          title: "Scholarships",
          description: "Funding opportunities for high-achieving and high-potential students.",
        },
      },
      facultyStaff: {
        mobility: {
          title: "Mobility",
          description:
            "International exchanges, visiting scholar programs, and collaboration pathways.",
        },
        staff: {
          title: "Faculty Directory",
          description: "Browse faculty profiles, research interests, and mentorship areas.",
        },
        invitedProfessors: {
          title: "Invited Professors",
          description: "Visiting experts and guest lecturers supporting GIC programs.",
        },
        personDetail: {
          description: "Faculty profile, research interests, and mentorship highlights.",
          links: {
            projects: "Research projects",
            publications: "Publications",
            studentProjects: "Mentored student projects",
          },
        },
      },
      research: {
        labs: {
          title: "Labs",
          description: "Explore focus areas, team members, and ongoing research in our labs.",
          featured: {
            label: "View a sample lab profile",
            href: "/research/labs/innovation-lab",
          },
        },
        labDetail: {
          titleSuffix: "Lab",
          description: "Overview, people, projects, publications, and tools for this lab.",
          links: {
            team: "Meet the team",
            projects: "Related projects",
            publications: "Publications",
          },
        },
        publications: {
          title: "Publications",
          description: "Peer-reviewed articles, conference papers, and scholarly output.",
        },
        tools: {
          title: "Tools",
          description: "Software, datasets, and lab tools available for research and learning.",
        },
        projects: {
          title: "Projects",
          description: "Collaborative research projects across labs and industry partners.",
          featured: {
            label: "View a sample project",
            href: "/research/projects/smart-campus",
          },
        },
        projectDetail: {
          titleSuffix: "Project",
          description: "Timeline, partners, and outcomes for this research initiative.",
          links: {
            lab: "Related lab",
            team: "Team members",
            studentProjects: "Student projects",
          },
        },
      },
      newsEvents: {
        news: {
          title: "News",
          description: "Department updates, achievements, and announcements.",
          featured: {
            label: "Read a featured news post",
            href: "/news-events/news/innovation-award",
          },
        },
        newsPost: {
          description: "News post details with related research, programs, or events.",
          links: {
            research: "Related research",
            events: "Upcoming events",
          },
        },
        events: {
          title: "Events",
          description: "Seminars, workshops, and campus events for the GIC community.",
          featured: {
            label: "View a featured event",
            href: "/news-events/events/innovation-day",
          },
        },
        eventDetail: {
          description: "Event details, agenda, and related resources.",
          links: {
            calendar: "View calendar",
            studentLife: "Student life",
          },
        },
        calendar: {
          title: "Academic Calendar",
          description:
            "Key dates for admissions, orientation, seminars, and department events.",
        },
      },
      studentLife: {
        exchange: {
          title: "Exchange Students",
          description:
            "Overview of international study options, partner universities, and application guidance.",
        },
        exchangeLinks: [
          { label: "Incoming students", href: "/student-life/exchange/incoming" },
          { label: "Outgoing students", href: "/student-life/exchange/outgoing" },
          { label: "Program details", href: "/program" },
          { label: "Exchange testimonials", href: "/student-life/testimonials" },
          { label: "Events calendar", href: "/news-events/calendar" },
        ],
        incoming: {
          title: "Incoming Exchange",
          description:
            "Information for international students joining GIC for a semester or year.",
        },
        outgoing: {
          title: "Outgoing Exchange",
          description:
            "Guidance for GIC students planning to study abroad through exchange partners.",
        },
        studentProjects: {
          title: "Student Projects",
          description:
            "Capstone work, research prototypes, and real-world solutions built by students.",
          featured: {
            label: "View a featured project",
            href: "/student-life/student-projects/smart-irrigation",
          },
        },
        studentProjectDetail: {
          description: "Project summary, mentors, related labs, and demo resources.",
          links: {
            program: "Related program",
            faculty: "Mentors",
            lab: "Related lab",
          },
        },
        testimonials: {
          title: "Testimonials",
          description: "Stories from students, alumni, and exchange participants.",
          featured: {
            label: "Read a featured testimonial",
            href: "/student-life/testimonials/featured-student",
          },
        },
        testimonialDetail: {
          titlePrefix: "Testimonial",
          description: "Student experiences connected to programs, labs, and projects.",
          links: {
            program: "Related program",
            lab: "Related lab",
            studentProjects: "Student projects",
          },
        },
        clubs: {
          title: "Clubs & Communities",
          description: "Student organizations, interest groups, and peer communities.",
        },
        gallery: {
          title: "Gallery",
          description: "Photos and videos from labs, events, and student projects.",
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
        { label: "ជីវិតនិស្សិត", href: "/student-life" },
        { label: "ព័ត៌មាន និងព្រឹត្តិការណ៍", href: "/news-events" },
        { label: "អំពីយើង", href: "/about" },
      ],
      menu: [
        { label: "កម្មវិធី", href: "/program" },
        { label: "ស្រាវជ្រាវ", href: "/research" },
        { label: "គ្រូបង្រៀន និងបុគ្គលិក", href: "/faculty-staff" },
        { label: "ជីវិតនិស្សិត", href: "/student-life" },
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
      heroTitle: "GIC Engineering",
      heroSubtitle:
        "មជ្ឈមណ្ឌលនវានុវត្តន៍សកល សម្រាប់ការអប់រំវិស្វកម្ម ការស្រាវជ្រាវ និងជីវិតនិស្សិត។",
      ctas: {
        primary: { label: "ស្វែងរកកម្មវិធី", href: "/program" },
        secondary: { label: "ជីវិតនិស្សិត", href: "/student-life" },
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
        title: "ជីវិតនិស្សិត",
        description:
          "ឱកាសផ្លាស់ប្តូរ គម្រោងនិស្សិត សក្ខីកម្ម និងបទពិសោធន៍ក្នុងមហាវិទ្យាល័យ។",
        cards: [
          { label: "ការផ្លាស់ប្តូរ", href: "/student-life/exchange" },
          { label: "សក្ខីកម្ម", href: "/student-life/testimonials" },
          { label: "គម្រោងនិស្សិត", href: "/student-life/student-projects" },
          { label: "ក្លឹប និងសហគមន៍", href: "/student-life/clubs-communities" },
          { label: "វិចិត្រសាល", href: "/student-life/gallery" },
        ],
      },
    },
    subpages: {
      about: {
        mission: {
          title: "បេសកកម្ម",
          description:
            "ពង្រឹងការអប់រំវិស្វកម្ម និងការស្រាវជ្រាវដែលបម្រើកម្ពុជា និងតំបន់ តាមរយៈនវានុវត្តន៍ ការសហការ និងជោគជ័យនិស្សិត។",
        },
        vision: {
          title: "ចក្ខុវិស័យ",
          description:
            "កសាងមហាវិទ្យាល័យវិស្វកម្មដែលភ្ជាប់ជាសកល ដើម្បីផ្តល់បទពិសោធន៍ជាក់ស្តែង ស្រាវជ្រាវឆ្នើម និងជំនាញត្រៀមការងារ។",
        },
        services: {
          title: "សេវាកម្ម",
          description:
            "GIC គាំទ្រការណែនាំ ភាពជាដៃគូ និងសេវាកម្មនវានុវត្តន៍ ដើម្បីជួយនិស្សិត គ្រូបង្រៀន និងដៃគូឧស្សាហកម្មរីកចម្រើន។",
        },
      },
      program: {
        faq: {
          title: "សំណួរញឹកញាប់អំពីកម្មវិធី",
          description: "សំណួរញឹកញាប់អំពីការចូលរៀន ការសិក្សា និងការគាំទ្រនិស្សិត។",
        },
        degrees: {
          title: "មុខវិជ្ជា",
          description: "ស្វែងរកកម្មវិធីបរិញ្ញាបត្រ និងបណ្ឌិតនៅ GIC។",
          cards: [
            {
              label: "វិស្វកម្មកុំព្យូទ័រ",
              href: "/program/degrees/computer-engineering",
            },
            {
              label: "វិស្វកម្មអគ្គិសនី",
              href: "/program/degrees/electrical-engineering",
            },
          ],
        },
        degreeDetail: {
          titleSuffix: "បរិញ្ញា",
          description: "ទិដ្ឋភាពទូទៅ លទ្ធផលសិក្សា និងចំណុចសំខាន់ៗនៃមុខវិជ្ជានេះ។",
          links: {
            curriculum: "មើលកម្មវិធីសិក្សា",
            admissions: "ព័ត៌មានចូលរៀន",
            relatedLabs: "មន្ទីរពិសោធន៍ដែលពាក់ព័ន្ធ",
          },
        },
        degreeAdmissions: {
          titlePrefix: "ការចូលរៀន",
          description: "លក្ខខណ្ឌ ថ្ងៃកំណត់ និងការណែនាំដាក់ពាក្យសម្រាប់មុខវិជ្ជានេះ។",
        },
        degreeCurriculum: {
          titlePrefix: "កម្មវិធីសិក្សា",
          description: "រចនាសម្ព័ន្ធសិក្សា មេរៀន និងបទពិសោធន៍អនុវត្ត។",
        },
        careers: {
          title: "អាជីព និងកម្មសិក្សា",
          description: "ភ្ជាប់ជាមួយដៃគូឧស្សាហកម្ម ឱកាសកម្មសិក្សា និងលទ្ធផលអាជីព។",
        },
        scholarships: {
          title: "អាហារូបករណ៍",
          description: "ឱកាសហិរញ្ញប្បទានសម្រាប់និស្សិតដែលមានសមត្ថភាពខ្ពស់។",
        },
      },
      facultyStaff: {
        mobility: {
          title: "ការផ្លាស់ប្តូរ",
          description:
            "កម្មវិធីផ្លាស់ប្តូរអន្តរជាតិ សាស្ត្រាចារ្យអញ្ជើញ និងផ្លូវសហការ។",
        },
        staff: {
          title: "បញ្ជីគ្រូបង្រៀន",
          description: "ស្វែងរកប្រវត្តិគ្រូបង្រៀន ចំណាប់អារម្មណ៍ស្រាវជ្រាវ និងការណែនាំ។",
        },
        invitedProfessors: {
          title: "សាស្ត្រាចារ្យអញ្ជើញ",
          description: "អ្នកជំនាញអញ្ជើញ និងសាស្ត្រាចារ្យភ្ញៀវគាំទ្រកម្មវិធី GIC។",
        },
        personDetail: {
          description: "ប្រវត្តិគ្រូបង្រៀន ចំណាប់អារម្មណ៍ស្រាវជ្រាវ និងការណែនាំ។",
          links: {
            projects: "គម្រោងស្រាវជ្រាវ",
            publications: "ការបោះពុម្ពផ្សាយ",
            studentProjects: "គម្រោងនិស្សិតដែលបានណែនាំ",
          },
        },
      },
      research: {
        labs: {
          title: "មន្ទីរពិសោធន៍",
          description: "ស្វែងយល់ពីផ្នែកផ្តោត អ្នកស្រាវជ្រាវ និងគម្រោងកំពុងដំណើរការ។",
          featured: {
            label: "មើលប្រវត្តិមន្ទីរពិសោធន៍គំរូ",
            href: "/research/labs/innovation-lab",
          },
        },
        labDetail: {
          titleSuffix: "មន្ទីរពិសោធន៍",
          description: "ទិដ្ឋភាពទូទៅ មនុស្ស គម្រោង ការបោះពុម្ពផ្សាយ និងឧបករណ៍។",
          links: {
            team: "ជួបក្រុមការងារ",
            projects: "គម្រោងពាក់ព័ន្ធ",
            publications: "ការបោះពុម្ពផ្សាយ",
          },
        },
        publications: {
          title: "ការបោះពុម្ពផ្សាយ",
          description: "អត្ថបទវិជ្ជាសាស្ត្រ ក្រដាសសន្និសីទ និងលទ្ធផលស្រាវជ្រាវ។",
        },
        tools: {
          title: "ឧបករណ៍",
          description: "កម្មវិធី ទិន្នន័យ និងឧបករណ៍មន្ទីរពិសោធន៍សម្រាប់សិក្សា និងស្រាវជ្រាវ។",
        },
        projects: {
          title: "គម្រោង",
          description: "គម្រោងស្រាវជ្រាវសហការជាមួយមន្ទីរពិសោធន៍ និងដៃគូឧស្សាហកម្ម។",
          featured: {
            label: "មើលគម្រោងគំរូ",
            href: "/research/projects/smart-campus",
          },
        },
        projectDetail: {
          titleSuffix: "គម្រោង",
          description: "កាលវិភាគ ដៃគូ និងលទ្ធផលសម្រាប់គម្រោងស្រាវជ្រាវនេះ។",
          links: {
            lab: "មន្ទីរពិសោធន៍ពាក់ព័ន្ធ",
            team: "សមាជិកក្រុម",
            studentProjects: "គម្រោងនិស្សិត",
          },
        },
      },
      newsEvents: {
        news: {
          title: "ព័ត៌មាន",
          description: "ព័ត៌មានថ្មីៗ សមិទ្ធផល និងសេចក្តីប្រកាស។",
          featured: {
            label: "អានព័ត៌មានពិសេស",
            href: "/news-events/news/innovation-award",
          },
        },
        newsPost: {
          description: "ព័ត៌មានលម្អិតជាមួយស្រាវជ្រាវ កម្មវិធី ឬព្រឹត្តិការណ៍ពាក់ព័ន្ធ។",
          links: {
            research: "ស្រាវជ្រាវពាក់ព័ន្ធ",
            events: "ព្រឹត្តិការណ៍ខាងមុខ",
          },
        },
        events: {
          title: "ព្រឹត្តិការណ៍",
          description: "សិក្ខាសាលា វគ្គបណ្តុះបណ្តាល និងព្រឹត្តិការណ៍ក្នុងមហាវិទ្យាល័យ។",
          featured: {
            label: "មើលព្រឹត្តិការណ៍ពិសេស",
            href: "/news-events/events/innovation-day",
          },
        },
        eventDetail: {
          description: "ព័ត៌មានព្រឹត្តិការណ៍ កម្មវិធី និងធនធានពាក់ព័ន្ធ។",
          links: {
            calendar: "មើលប្រតិទិន",
            studentLife: "ជីវិតនិស្សិត",
          },
        },
        calendar: {
          title: "ប្រតិទិនសិក្សា",
          description:
            "កាលបរិច្ឆេទសំខាន់ៗសម្រាប់ការចូលរៀន ការណែនាំ សិក្ខាសាលា និងព្រឹត្តិការណ៍។",
        },
      },
      studentLife: {
        exchange: {
          title: "ការផ្លាស់ប្តូរនិស្សិត",
          description:
            "ទិដ្ឋភាពទូទៅអំពីជម្រើសសិក្សាអន្តរជាតិ សាកលវិទ្យាល័យដៃគូ និងការណែនាំដាក់ពាក្យ។",
        },
        exchangeLinks: [
          { label: "និស្សិតចូលមក", href: "/student-life/exchange/incoming" },
          { label: "និស្សិតចេញទៅ", href: "/student-life/exchange/outgoing" },
          { label: "ព័ត៌មានកម្មវិធី", href: "/program" },
          { label: "សក្ខីកម្មផ្លាស់ប្តូរ", href: "/student-life/testimonials" },
          { label: "ប្រតិទិនព្រឹត្តិការណ៍", href: "/news-events/calendar" },
        ],
        incoming: {
          title: "ការផ្លាស់ប្តូរចូលមក",
          description: "ព័ត៌មានសម្រាប់និស្សិតអន្តរជាតិដែលមកសិក្សានៅ GIC។",
        },
        outgoing: {
          title: "ការផ្លាស់ប្តូរចេញទៅ",
          description: "ការណែនាំសម្រាប់និស្សិត GIC ដែលចង់សិក្សាបរទេសតាមដៃគូ។",
        },
        studentProjects: {
          title: "គម្រោងនិស្សិត",
          description:
            "ការងារបញ្ចប់ការសិក្សា គំរូស្រាវជ្រាវ និងដំណោះស្រាយជាក់ស្តែងពីនិស្សិត។",
          featured: {
            label: "មើលគម្រោងពិសេស",
            href: "/student-life/student-projects/smart-irrigation",
          },
        },
        studentProjectDetail: {
          description: "សង្ខេបគម្រោង អ្នកណែនាំ មន្ទីរពិសោធន៍ពាក់ព័ន្ធ និងធនធានបង្ហាញ។",
          links: {
            program: "កម្មវិធីពាក់ព័ន្ធ",
            faculty: "អ្នកណែនាំ",
            lab: "មន្ទីរពិសោធន៍ពាក់ព័ន្ធ",
          },
        },
        testimonials: {
          title: "សក្ខីកម្ម",
          description: "រឿងរ៉ាវពីនិស្សិត អតីតនិស្សិត និងអ្នកផ្លាស់ប្តូរ។",
          featured: {
            label: "អានសក្ខីកម្មពិសេស",
            href: "/student-life/testimonials/featured-student",
          },
        },
        testimonialDetail: {
          titlePrefix: "សក្ខីកម្ម",
          description: "បទពិសោធន៍និស្សិតដែលភ្ជាប់នឹងកម្មវិធី មន្ទីរពិសោធន៍ និងគម្រោង។",
          links: {
            program: "កម្មវិធីពាក់ព័ន្ធ",
            lab: "មន្ទីរពិសោធន៍ពាក់ព័ន្ធ",
            studentProjects: "គម្រោងនិស្សិត",
          },
        },
        clubs: {
          title: "ក្លឹប និងសហគមន៍",
          description: "អង្គការនិស្សិត ក្រុមចំណាប់អារម្មណ៍ និងសហគមន៍មិត្តភក្តិ។",
        },
        gallery: {
          title: "វិចិត្រសាល",
          description: "រូបភាព និងវីដេអូពីមន្ទីរពិសោធន៍ ព្រឹត្តិការណ៍ និងគម្រោងនិស្សិត។",
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
