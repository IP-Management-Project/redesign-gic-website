import { useQuery } from "@tanstack/react-query";

export type Publication = {
  id: number;
  title: string;
  authors: string;
  type: "Journal" | "Conference" | "Report";
  venue: string;
  year: number;
  tags: string[];
  doi: string;
  abstract: string;
};

export const publicationsMockData: Publication[] = [
  {
    id: 1,
    title: "Automatic Latin-to-Khmer (L2K) Text Conversion using Neural Machine Translation",
    authors: "Valy, D., et al.",
    type: "Journal",
    venue: "International Journal of Khmer Linguistics",
    year: 2022,
    tags: ["NLP", "Machine Translation", "L2K"],
    doi: "#",
    abstract:
      "This paper presents a robust framework for converting Latinized Khmer text back to its original script using advanced NMT models.",
  },
  {
    id: 2,
    title: "Deep Learning for Ancient Khmer Manuscript Digitization",
    authors: "Valy, D., Sreang, S., et al.",
    type: "Conference",
    venue: "IEEE International Conference on Pattern Recognition",
    year: 2019,
    tags: ["OCR", "Image Processing", "Digital Heritage"],
    doi: "#",
    abstract:
      "Investigating the application of CNNs for the segmentation and recognition of historical Khmer characters.",
  },
  {
    id: 3,
    title: "Khmer Speech Recognition: A Comprehensive Study on Acoustic Modeling",
    authors: "GIC Research Group",
    type: "Journal",
    venue: "Asian Language Processing Journal",
    year: 2021,
    tags: ["ASR", "Speech Synthesis", "AI"],
    doi: "#",
    abstract:
      "An exploration of state-of-the-art acoustic models specifically tuned for the tonal and phonetic complexities of Khmer speech.",
  },
  {
    id: 4,
    title: "Technical Report: Infrastructure for High-Performance Computing at ITC",
    authors: "GIC Systems Team",
    type: "Report",
    venue: "Internal Technical Report Series",
    year: 2023,
    tags: ["HPC", "Cloud Computing", "Infrastructure"],
    doi: "#",
    abstract:
      "Overview of the self-managed GIC physical node hub and its performance benchmarks for large-scale data processing.",
  },
];

export type PublicationsFetcher = () => Promise<Publication[]>;

const defaultFetcher: PublicationsFetcher = async () => publicationsMockData;

export type PublicationsQueryOptions = {
  fetcher?: PublicationsFetcher;
  initialData?: Publication[];
};

export function usePublicationsData(options: PublicationsQueryOptions = {}) {
  const { fetcher = defaultFetcher, initialData } = options;
  return useQuery({
    queryKey: ["publications"],
    queryFn: fetcher,
    staleTime: Number.POSITIVE_INFINITY,
    initialData,
  });
}
