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
