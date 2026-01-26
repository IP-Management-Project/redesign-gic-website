import { useQuery } from "@tanstack/react-query";

export type PressReleaseItem = {
  id: number | string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  link: string;
  status?: "PUBLISHED" | "UNPUBLISHED";
};

const fallbackPressReleaseData: PressReleaseItem[] = [
  {
    id: 1,
    title: "ITC Partnership with European Research Labs",
    excerpt: "A new milestone in international collaboration to enhance our engineering curriculum...",
    date: "Jan 12, 2026",
    category: "Press Release",
    image:
      "https://scontent.fpnh8-3.fna.fbcdn.net/v/t39.30808-6/481073993_122193623126252958_5055355138878951179_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFTHCWOQZbGFxqXYSxXVbMnWeqD8sdtglZZ6oPyx22CVvgZRS-wPoK9ITV9lOb1BrIRkcgsJPj75TI2DLxU3zvH&_nc_ohc=dHd_CLN8ZkgQ7kNvwGVYJSL&_nc_oc=Adk4s6XLU5uqcj15ug3-nLO52NNPz761tfd5mca0YRdE8XgoKjorHVt6ZX4salxdbFY&_nc_zt=23&_nc_ht=scontent.fpnh8-3.fna&_nc_gid=N_YZ0rtOTPlzEkFtrb-L3g&oh=00_AfoF9RWgackCQqCjDmPd537UNhykai2sdpoAjXIjHDyH3g&oe=696D3A1A",
    link: "/news/partnership",
  },
  {
    id: 2,
    title: "Breakthrough in Khmer Natural Language Processing",
    excerpt: "Our research team has successfully deployed a new contextual spelling checker...",
    date: "Jan 08, 2026",
    category: "Research",
    image: "https://gic.itc.edu.kh/storage/events/August2025/vWjWKzDZve7LKtSrWm9L.jpg",
    link: "/news/nlp-research",
  },
  {
    id: 3,
    title: "Campus Modernization: New Smart Labs Opened",
    excerpt: "The Department of Energy officially opens three new laboratories focused on IoT...",
    date: "Jan 05, 2026",
    category: "Announcement",
    image: "https://gic.itc.edu.kh/storage/events/August2025/vWjWKzDZve7LKtSrWm9L.jpg",
    link: "/news/smart-labs",
  },
];

export type PressReleaseFetcher = () => Promise<PressReleaseItem[]>;

const defaultFetcher: PressReleaseFetcher = async () => fallbackPressReleaseData;

export type PressReleaseQueryOptions = {
  fetcher?: PressReleaseFetcher;
  initialData?: PressReleaseItem[];
};

export function usePressReleaseData(options: PressReleaseQueryOptions = {}) {
  const { fetcher = defaultFetcher, initialData } = options;
  return useQuery({
    queryKey: ["pressReleases"],
    queryFn: fetcher,
    staleTime: Number.POSITIVE_INFINITY,
    initialData,
  });
}
