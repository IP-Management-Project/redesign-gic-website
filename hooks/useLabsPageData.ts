import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/api/axiosClient";

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
  data: Record<string, unknown>;
};

const labsPageData: LabsPageData = {
  hero: {
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
  },
  labsHeader: {
    kicker: "",
    title: "",
  },
  featuredLab: {
    name: "",
    leadLabel: "",
    leadName: "",
    leadEmail: "",
    badgeLabel: "",
    visionLabel: "",
    visionQuote: "",
    interestsLabel: "",
    applicationsLabel: "",
    repositoryLabel: "",
    repositoryHref: "",
  },
  researchPortfolio: {
    title: "",
    description: "",
  },
  deployments: {
    title: "",
    items: [
      { name: "", status: "" },
      { name: "", status: "" },
    ],
    ctaLabel: "",
  },
  clubsCopy: {
    titleMain: "",
    titleHighlight: "",
    description: "",
    ctaLabel: "",
  },
  facilities: {
    nodeHub: {
      kicker: "",
      titleMain: "",
      titleHighlight: "",
      description: "",
      image: "",
      footnote: "",
    },
    studio: {
      title: "",
      description: "",
      equipmentLabel: "",
      equipmentValue: "",
      partnershipLabel: "",
      partnershipValue: "",
      note: "",
    },
  },
  projects: [
    {
      title: "",
      topic: "",
      funder: "",
      period: "",
    },
  ],
  labs: [
    {
      name: "",
      desc: "",
      icon: "globe",
      specialization: "",
    },
    {
      name: "",
      desc: "",
      icon: "search",
      specialization: "",
    },
    {
      name: "",
      desc: "",
      icon: "cpu",
      specialization: "",
    },
    {
      name: "",
      desc: "",
      icon: "shield",
      specialization: "",
    },
  ],
  clubs: [
    {
      name: "",
      desc: "",
      icon: "code",
      color: "bg-blue-600",
    },
    {
      name: "",
      desc: "",
      icon: "terminal",
      color: "bg-zinc-900",
    },
    {
      name: "",
      desc: "",
      icon: "lightbulb",
      color: "bg-amber-500",
    },
  ],
  researchInterests: [],
  expectedApplications: [],
};

const normalizeLabsPageData = (
  incoming?: Partial<LabsPageData>,
): LabsPageData => ({
  hero: {
    titleMain: incoming?.hero?.titleMain ?? labsPageData.hero.titleMain,
    titleHighlight:
      incoming?.hero?.titleHighlight ?? labsPageData.hero.titleHighlight,
    subtitle: incoming?.hero?.subtitle ?? labsPageData.hero.subtitle,
  },
  labsHeader: {
    kicker: incoming?.labsHeader?.kicker ?? labsPageData.labsHeader.kicker,
    title: incoming?.labsHeader?.title ?? labsPageData.labsHeader.title,
  },
  featuredLab: {
    name: incoming?.featuredLab?.name ?? labsPageData.featuredLab.name,
    leadLabel:
      incoming?.featuredLab?.leadLabel ?? labsPageData.featuredLab.leadLabel,
    leadName:
      incoming?.featuredLab?.leadName ?? labsPageData.featuredLab.leadName,
    leadEmail:
      incoming?.featuredLab?.leadEmail ?? labsPageData.featuredLab.leadEmail,
    badgeLabel:
      incoming?.featuredLab?.badgeLabel ?? labsPageData.featuredLab.badgeLabel,
    visionLabel:
      incoming?.featuredLab?.visionLabel ??
      labsPageData.featuredLab.visionLabel,
    visionQuote:
      incoming?.featuredLab?.visionQuote ??
      labsPageData.featuredLab.visionQuote,
    interestsLabel:
      incoming?.featuredLab?.interestsLabel ??
      labsPageData.featuredLab.interestsLabel,
    applicationsLabel:
      incoming?.featuredLab?.applicationsLabel ??
      labsPageData.featuredLab.applicationsLabel,
    repositoryLabel:
      incoming?.featuredLab?.repositoryLabel ??
      labsPageData.featuredLab.repositoryLabel,
    repositoryHref:
      incoming?.featuredLab?.repositoryHref ??
      labsPageData.featuredLab.repositoryHref,
  },
  researchPortfolio: {
    title:
      incoming?.researchPortfolio?.title ??
      labsPageData.researchPortfolio.title,
    description:
      incoming?.researchPortfolio?.description ??
      labsPageData.researchPortfolio.description,
  },
  deployments: {
    title: incoming?.deployments?.title ?? labsPageData.deployments.title,
    items: incoming?.deployments?.items ?? labsPageData.deployments.items,
    ctaLabel:
      incoming?.deployments?.ctaLabel ?? labsPageData.deployments.ctaLabel,
  },
  clubsCopy: {
    titleMain:
      incoming?.clubsCopy?.titleMain ?? labsPageData.clubsCopy.titleMain,
    titleHighlight:
      incoming?.clubsCopy?.titleHighlight ??
      labsPageData.clubsCopy.titleHighlight,
    description:
      incoming?.clubsCopy?.description ?? labsPageData.clubsCopy.description,
    ctaLabel: incoming?.clubsCopy?.ctaLabel ?? labsPageData.clubsCopy.ctaLabel,
  },
  facilities: {
    nodeHub: {
      kicker:
        incoming?.facilities?.nodeHub?.kicker ??
        labsPageData.facilities.nodeHub.kicker,
      titleMain:
        incoming?.facilities?.nodeHub?.titleMain ??
        labsPageData.facilities.nodeHub.titleMain,
      titleHighlight:
        incoming?.facilities?.nodeHub?.titleHighlight ??
        labsPageData.facilities.nodeHub.titleHighlight,
      description:
        incoming?.facilities?.nodeHub?.description ??
        labsPageData.facilities.nodeHub.description,
      image:
        incoming?.facilities?.nodeHub?.image ??
        labsPageData.facilities.nodeHub.image,
      footnote:
        incoming?.facilities?.nodeHub?.footnote ??
        labsPageData.facilities.nodeHub.footnote,
    },
    studio: {
      title:
        incoming?.facilities?.studio?.title ??
        labsPageData.facilities.studio.title,
      description:
        incoming?.facilities?.studio?.description ??
        labsPageData.facilities.studio.description,
      equipmentLabel:
        incoming?.facilities?.studio?.equipmentLabel ??
        labsPageData.facilities.studio.equipmentLabel,
      equipmentValue:
        incoming?.facilities?.studio?.equipmentValue ??
        labsPageData.facilities.studio.equipmentValue,
      partnershipLabel:
        incoming?.facilities?.studio?.partnershipLabel ??
        labsPageData.facilities.studio.partnershipLabel,
      partnershipValue:
        incoming?.facilities?.studio?.partnershipValue ??
        labsPageData.facilities.studio.partnershipValue,
      note:
        incoming?.facilities?.studio?.note ??
        labsPageData.facilities.studio.note,
    },
  },
  projects: incoming?.projects ?? labsPageData.projects,
  labs: incoming?.labs ?? labsPageData.labs,
  clubs: incoming?.clubs ?? labsPageData.clubs,
  researchInterests:
    incoming?.researchInterests ?? labsPageData.researchInterests,
  expectedApplications:
    incoming?.expectedApplications ?? labsPageData.expectedApplications,
});

const getLabsPageData = async (): Promise<LabsPageData> => {
  try {
    const response = await apiClient.get<Partial<LabsPageData> | undefined>(
      "/content/labs-page",
    );

    const unwrapped = (response as any)?.data ?? response;
    return normalizeLabsPageData(unwrapped ?? undefined);
  } catch (error) {
    const status = (error as any)?.response?.status ?? (error as any)?.status;

    if (status === 404) {
      try {
        await apiClient.put<LabsPageData>("/content/labs-page", {
          data: labsPageData,
        });
      } catch (seedError) {
        console.error("Failed to seed labs page", seedError);
      }
    } else {
      console.error("Failed to fetch labs page", error);
    }

    return labsPageData;
  }
};

export function useLabsPageData() {
  return useQuery({
    queryKey: ["labsPage"],
    queryFn: getLabsPageData,
    initialData: labsPageData,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}

type UpdatableLabsPageData = Record<string, unknown>;

const setNestedValue = (
  source: UpdatableLabsPageData,
  path: string,
  value: unknown,
) => {
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
  updates: Record<string, unknown>,
): LabsPageData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

export function useUpdateLabsPageData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LabsPageUpdatePayload) => {
      const current =
        queryClient.getQueryData<LabsPageData>(["labsPage"]) ?? labsPageData;
      const merged = applyLabsPageUpdate(current, payload.data);

      try {
        return await apiClient.patch<LabsPageData>("/content/labs-page", {
          data: merged,
          section: payload.section,
        });
      } catch (error) {
        const status =
          (error as any)?.response?.status ?? (error as any)?.status;

        if (status === 404) {
          return apiClient.put<LabsPageData>("/content/labs-page", {
            data: merged,
          });
        }

        throw error;
      }
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<LabsPageData>(["labsPage"], (current) => {
        const base = current ?? labsPageData;
        const unwrapped = (updated as any)?.data ?? updated;
        if (unwrapped) {
          return normalizeLabsPageData(unwrapped as Partial<LabsPageData>);
        }
        return base;
      });
    },
  });
}
