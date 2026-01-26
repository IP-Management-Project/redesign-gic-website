import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type ResearchProject = {
  title: string;
  topic: string;
  funder: string;
  period: string;
};

export type LabItem = {
  name: string;
  desc: string;
  icon: "globe" | "search" | "cpu" | "shield";
  specialization: string;
};

export type ClubItem = {
  name: string;
  desc: string;
  icon: "code" | "terminal" | "lightbulb";
  color: string;
};

export type DeploymentItem = {
  name: string;
  status: string;
};

export type LabsPageData = {
  hero: {
    titleMain: string;
    titleHighlight: string;
    subtitle: string;
  };
  labsHeader: {
    kicker: string;
    title: string;
  };
  featuredLab: {
    name: string;
    leadLabel: string;
    leadName: string;
    leadEmail: string;
    badgeLabel: string;
    visionLabel: string;
    visionQuote: string;
    interestsLabel: string;
    applicationsLabel: string;
    repositoryLabel: string;
    repositoryHref: string;
  };
  researchPortfolio: {
    title: string;
    description: string;
  };
  deployments: {
    title: string;
    items: DeploymentItem[];
    ctaLabel: string;
  };
  clubsCopy: {
    titleMain: string;
    titleHighlight: string;
    description: string;
    ctaLabel: string;
  };
  facilities: {
    nodeHub: {
      kicker: string;
      titleMain: string;
      titleHighlight: string;
      description: string;
      image: string;
      footnote: string;
    };
    studio: {
      title: string;
      description: string;
      equipmentLabel: string;
      equipmentValue: string;
      partnershipLabel: string;
      partnershipValue: string;
      note: string;
    };
  };
  projects: ResearchProject[];
  labs: LabItem[];
  clubs: ClubItem[];
  researchInterests: string[];
  expectedApplications: string[];
};

export type LabsPageUpdatePayload = {
  section: string;
  data: Record<string, string>;
};

const labsPageData: LabsPageData = {
  hero: {
    titleMain: "Labs &",
    titleHighlight: "Innovation",
    subtitle:
      "Where theory meets practice. Explore our specialized research units and dynamic student-led communities.",
  },
  labsHeader: {
    kicker: "Research Excellence",
    title: "Advanced Laboratory Grid",
  },
  featuredLab: {
    name: "Vila Lab",
    leadLabel: "Led by",
    leadName: "Mr. VALY Dona",
    leadEmail: "dona.valy@gmail.com",
    badgeLabel: "LEADING LAB",
    visionLabel: "Laboratory Vision",
    visionQuote: "Be the leading Khmer Natural Language Processing Lab in Cambodia.",
    interestsLabel: "Research Interests",
    applicationsLabel: "Expected Applications",
    repositoryLabel: "EXPLORE LAB REPOSITORY",
    repositoryHref: "https://github.com/ITC-GIC",
  },
  researchPortfolio: {
    title: "Research Portfolio",
    description:
      "Our projects are backed by international institutions and national ministries, aiming to digitize Khmer heritage and advance local AI.",
  },
  deployments: {
    title: "Active Deployments",
    items: [
      { name: "L2K Romanization", status: "ACTIVE" },
      { name: "Manuscript OCR", status: "V2 BETA" },
    ],
    ctaLabel: "PARTNER WITH US",
  },
  clubsCopy: {
    titleMain: "Student",
    titleHighlight: "Clubs",
    description:
      "GIC is more than just lectures. Join our clubs to sharpen your soft skills, collaborate on startups, and participate in national events.",
    ctaLabel: "JOIN NOW",
  },
  facilities: {
    nodeHub: {
      kicker: "On-Campus Infrastructure",
      titleMain: "Physical",
      titleHighlight: "Node Hub",
      description:
        "GIC manages its own On-Campus Server Center. Students don't just learn theory; they get physical access to manage high-performance computing nodes and experiment with private cloud configurations.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
      footnote: "Bare Metal Access",
    },
    studio: {
      title: "E-Learning Studio",
      description:
        "Equipped by the ASEAN Cyber University project, this professional studio provides hands-on experience in digital content production for blended learning used nationwide.",
      equipmentLabel: "Equipment",
      equipmentValue: "Professional Studio",
      partnershipLabel: "Partnership",
      partnershipValue: "ASEAN Cyber Uni",
      note: "Students can book studio time for media projects",
    },
  },
  projects: [
    {
      title: "L2K Conversion",
      topic: "Automatic Latin-to-Khmer based Text Conversation",
      funder: "MoEYS Cambodia",
      period: "2019 - 2022",
    },
    {
      title: "Manuscript Digitization",
      topic: "Ancient Manuscript Digitization and Indexation",
      funder: "ARES-CCD",
      period: "2016 - 2019",
    },
    {
      title: "Visual Attention",
      topic: "Top-down Approach and Memory Information",
      funder: "ARES-CCD",
      period: "2017 - 2019",
    },
  ],
  labs: [
    {
      name: "Natural Language Processing (NLP)",
      desc: "Focusing on Khmer script analysis, OCR, and Machine Translation.",
      icon: "globe",
      specialization: "AI & Linguistics",
    },
    {
      name: "Data Science & Big Data",
      desc: "Advanced processing for large-scale datasets and predictive modeling.",
      icon: "search",
      specialization: "Statistics & Mining",
    },
    {
      name: "Mobile Ecosystems & Security",
      desc: "Research on iOS/Android security and data mining in mobile environments.",
      icon: "cpu",
      specialization: "Cybersecurity",
    },
    {
      name: "High-Performance Computing (HPC)",
      desc: "Managing our physical server center for heavy computational research.",
      icon: "shield",
      specialization: "Cloud Sovereignty",
    },
  ],
  clubs: [
    {
      name: "Codera Development Club",
      desc: "A community for full-stack and mobile app enthusiasts to build real-world projects.",
      icon: "code",
      color: "bg-blue-600",
    },
    {
      name: "Cybersecurity Club",
      desc: "Practicing Capture The Flag (CTF) and ethical hacking to secure future infrastructures.",
      icon: "terminal",
      color: "bg-zinc-900",
    },
    {
      name: "Innovation Hub",
      desc: "Focusing on entrepreneurship, startups, and Techno Innovation Challenges.",
      icon: "lightbulb",
      color: "bg-amber-500",
    },
  ],
  researchInterests: [
    "Text & Pattern Recognition",
    "Spoken Language Processing",
    "Speech Synthesis",
    "Artificial Intelligence",
  ],
  expectedApplications: [
    "Khmer OCR Tool",
    "Text to Speech",
    "Speech Recognition",
    "Romanization Tool",
  ],
};

const getLabsPageData = async (): Promise<LabsPageData> => labsPageData;

export function useLabsPageData() {
  return useQuery({
    queryKey: ["labsPage"],
    queryFn: getLabsPageData,
    initialData: labsPageData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

type UpdatableLabsPageData = Record<string, unknown>;

const setNestedValue = (source: UpdatableLabsPageData, path: string, value: string) => {
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

  return root as LabsPageData;
};

const applyLabsPageUpdate = (
  current: LabsPageData,
  updates: Record<string, string>,
): LabsPageData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateLabsPageCopy = async (payload: LabsPageUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return payload;
};

export function useUpdateLabsPageData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLabsPageCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<LabsPageData>(["labsPage"], (current) => {
        if (!current) return current;
        return applyLabsPageUpdate(current, payload.data);
      });
    },
  });
}
