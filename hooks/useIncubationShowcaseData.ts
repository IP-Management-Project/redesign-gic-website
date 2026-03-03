import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/axiosClient";

export type SeasonalHighlight = {
  season: string;
  year: string;
  winner: string;
  teams: string[];
  desc: string;
};

export type GalleryItem = {
  id: number;
  label: string;
  image: string;
  span: string;
};

export type LaunchpadImage = {
  src: string;
  alt: string;
};

export type IncubationLaunchpadCopy = {
  titleMain: string;
  titleHighlight: string;
  description: string;
  features: string[];
  images: LaunchpadImage[];
};

export type IncubationHeritageCopy = {
  title: string;
  subtitle: string;
  teamsLabel: string;
  winnerSuffix: string;
};

export type IncubationGalleryCopy = {
  titleMain: string;
  titleHighlight: string;
  subtitle: string;
  footnote: string;
  overlayKicker: string;
  overlaySubtitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
};

export type IncubationShowcaseData = {
  launchpad: IncubationLaunchpadCopy;
  heritage: IncubationHeritageCopy;
  gallery: IncubationGalleryCopy;
  seasons: SeasonalHighlight[];
  galleryItems: GalleryItem[];
};

export type IncubationShowcaseUpdatePayload = {
  section: string;
  data: Record<string, unknown>;
};

export const incubationShowcaseMockData: IncubationShowcaseData = {
  launchpad: {
    titleMain: "",
    titleHighlight: "",
    description: "",
    features: [""],
    images: [
      {
        src: "",
        alt: "",
      },
      {
        src: "",
        alt: "",
      },
    ],
  },
  heritage: {
    title: "",
    subtitle: "",
    teamsLabel: "",
    winnerSuffix: "",
  },
  gallery: {
    titleMain: "",
    titleHighlight: "",
    subtitle: "",
    footnote: "",
    overlayKicker: "",
    overlaySubtitle: "",
    ctaText: "",
    ctaLabel: "",
    ctaHref: "",
  },
  seasons: [
    {
      season: "",
      year: "",
      winner: "",
      teams: [],
      desc: "",
    },
    {
      season: "",
      year: "",
      winner: "",
      teams: [],
      desc: "",
    },
    {
      season: "",
      year: "",
      winner: "",
      teams: [],
      desc: "",
    },
    {
      season: "",
      year: "",
      winner: "",
      teams: [],
      desc: "",
    },
    {
      season: "",
      year: "",
      winner: "",
      teams: [],
      desc: "",
    },
    {
      season: "",
      year: "",
      winner: "",
      teams: [],
      desc: "",
    },
    {
      season: "",
      year: "",
      winner: "",
      teams: [],
      desc: "",
    },
    {
      season: "",
      year: "",
      winner: "",
      teams: [],
      desc: "",
    },
  ],
  galleryItems: [
    {
      id: 1,
      label: "",
      image: "",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 2,
      label: "",
      image: "",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 3,
      label: "",
      image: "",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 4,
      label: "",
      image: "",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 5,
      label: "",
      image: "",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 6,
      label: "",
      image: "",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: 7,
      label: "",
      image: "",
      span: "md:col-span-2 md:row-span-1",
    },
  ],
};

export type IncubationShowcaseFetcher = () => Promise<IncubationShowcaseData>;

const extractStatusCode = (error: unknown) => {
  const anyError = error as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
    request?: { status?: number };
  };
  return (
    anyError?.statusCode ??
    anyError?.status ??
    anyError?.response?.status ??
    (anyError as any)?.request?.status ??
    null
  );
};

const mergeSection = <T extends object>(
  defaults: T,
  incoming?: Partial<T>,
) => ({
  ...defaults,
  ...(incoming ?? {}),
});

const normalizeIncubationShowcaseData = (
  incoming?: Partial<IncubationShowcaseData>,
): IncubationShowcaseData => ({
  launchpad: mergeSection(
    incubationShowcaseMockData.launchpad,
    incoming?.launchpad,
  ),
  heritage: mergeSection(
    incubationShowcaseMockData.heritage,
    incoming?.heritage,
  ),
  gallery: mergeSection(incubationShowcaseMockData.gallery, incoming?.gallery),
  seasons: incoming?.seasons ?? incubationShowcaseMockData.seasons,
  galleryItems:
    incoming?.galleryItems ?? incubationShowcaseMockData.galleryItems,
});

const fetchFromApi: IncubationShowcaseFetcher = async () => {
  try {
    const response = await apiClient.get<
      Partial<IncubationShowcaseData> | undefined
    >("/content/incubation-showcase");
    return normalizeIncubationShowcaseData(response ?? undefined);
  } catch (error) {
    console.error("Failed to fetch incubation showcase", error);
    return incubationShowcaseMockData;
  }
};

const defaultFetcher: IncubationShowcaseFetcher = fetchFromApi;

export type IncubationShowcaseQueryOptions = {
  fetcher?: IncubationShowcaseFetcher;
  initialData?: IncubationShowcaseData;
};

export function useIncubationShowcaseData(
  options: IncubationShowcaseQueryOptions = {},
) {
  const { fetcher = defaultFetcher, initialData } = options;
  return useQuery({
    queryKey: ["incubationShowcase"],
    queryFn: fetcher,
    initialData: initialData ?? incubationShowcaseMockData,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}

type UpdatableIncubationShowcase = Record<string, unknown>;

const setNestedValue = (
  source: UpdatableIncubationShowcase,
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

  return root as IncubationShowcaseData;
};

const applyIncubationShowcaseUpdate = (
  current: IncubationShowcaseData,
  updates: Record<string, unknown>,
): IncubationShowcaseData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateIncubationShowcase = async (
  payload: IncubationShowcaseUpdatePayload,
) => {
  try {
    return await apiClient.patch<IncubationShowcaseData>(
      "/content/incubation-showcase",
      payload,
    );
  } catch (error) {
    const status = extractStatusCode(error);

    if (status === 404) {
      const seeded = applyIncubationShowcaseUpdate(
        incubationShowcaseMockData,
        payload.data,
      );
      return apiClient.put<IncubationShowcaseData>(
        "/content/incubation-showcase",
        {
          data: seeded,
        },
      );
    }

    throw error;
  }
};

export function useUpdateIncubationShowcaseData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIncubationShowcase,
    onSuccess: (updated, payload) => {
      queryClient.setQueryData<IncubationShowcaseData>(
        ["incubationShowcase"],
        (current) => {
          const base = current ?? incubationShowcaseMockData;
          if (updated) {
            return normalizeIncubationShowcaseData(updated);
          }
          return applyIncubationShowcaseUpdate(base, payload.data);
        },
      );
    },
  });
}
