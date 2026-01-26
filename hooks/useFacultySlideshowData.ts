import { useQuery } from "@tanstack/react-query";

export type FacultyProfile = {
  name: string;
  facultySlug: string;
  degree: string;
  focus: string;
  portrait: string;
  uniLogo: string;
  role?: string;
};

const facultySlideshowData: FacultyProfile[] = [
  {
    name: "Mr. Heng Rathpisey",
    facultySlug: "mr-heng-rathpisey",
    degree: "Master of Engineering - MEng, Information Technology, Universitas Gadjah Mada (UGM)",
    focus: "Cloud Computing",
    portrait: "/lecturers/lec-pisey.png",
    uniLogo: "https://www.eduopinions.com/universities/universities-in-indonesia/gadjah-mada-university/",
  },
  {
    name: "Dr. Lina Chea",
    facultySlug: "dr-lina-chea",
    degree: "PhD, INSA Lyon",
    focus: "Cybersecurity & Privacy Engineering",
    portrait: "/lecturers/lec-pisey.png",
    uniLogo: "/images/logos/insa-lyon-white.png",
  },
  {
    name: "Dr. Vannak Chen",
    facultySlug: "dr-vannak-chen",
    degree: "PhD, UTC Compiègne",
    focus: "Smart Systems & IoT Infrastructure",
    portrait: "/lecturers/lec-pisey.png",
    uniLogo: "/images/logos/utc-white.png",
  },
  {
    name: "Dr. Sokha Dara",
    facultySlug: "dr-sokha-dara",
    degree: "PhD, INP Toulouse",
    focus: "AI for Khmer Language & NLP",
    portrait: "/lecturers/lec-pisey.png",
    uniLogo: "/images/logos/inp-toulouse-white.png",
  },
  {
    name: "Dr. Lina Chea",
    facultySlug: "dr-lina-chea",
    degree: "PhD, INSA Lyon",
    focus: "Cybersecurity & Privacy Engineering",
    portrait: "/images/faculty/lina-portrait.jpg",
    uniLogo: "/images/logos/insa-lyon-white.png",
  },
  {
    name: "Dr. Vannak Chen",
    facultySlug: "dr-vannak-chen",
    degree: "PhD, UTC Compiègne",
    focus: "Smart Systems & IoT Infrastructure",
    portrait: "/images/faculty/vannak-portrait.jpg",
    uniLogo: "/images/logos/utc-white.png",
  },
];

const getFacultySlideshowData = async (): Promise<FacultyProfile[]> => facultySlideshowData;

export function useFacultySlideshowData() {
  return useQuery({
    queryKey: ["facultySlideshow"],
    queryFn: getFacultySlideshowData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
