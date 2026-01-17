import { useQuery } from "@tanstack/react-query";

export type UniversityPartner = {
  name: string;
  src: string;
  url: string;
};

const universityPartners: UniversityPartner[] = [
  {
    name: "INP Toulouse",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/ytMunojNDCf9kr9eTj81.png",
    url: "https://www.inp-toulouse.fr/en/index.html",
  },
  {
    name: "INSA Lyon",
    src: "https://gic.itc.edu.kh/storage/partner2/September2019/jds0Jf9YMh9LBFRQGh2H.jpg",
    url: "https://www.insa-lyon.fr/en/",
  },
  {
    name: "UTC Compiègne",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/I5w9XZwVkjVoOWDe5Hwo.PNG",
    url: "https://www.utc.fr/en/",
  },
  {
    name: "Polytech",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/wSGFlxRo9PeNI8KlxBSv.png",
    url: "https://www.polytech-reseau.org/en/",
  },
  {
    name: "INSA Lyon",
    src: "https://gic.itc.edu.kh/storage/partner2/September2019/jds0Jf9YMh9LBFRQGh2H.jpg",
    url: "https://www.insa-lyon.fr/en/",
  },
  {
    name: "UTC Compiègne",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/I5w9XZwVkjVoOWDe5Hwo.PNG",
    url: "https://www.utc.fr/en/",
  },
  {
    name: "Polytech",
    src: "https://gic.itc.edu.kh/storage/partner2/June2019/wSGFlxRo9PeNI8KlxBSv.png",
    url: "https://www.polytech-reseau.org/en/",
  },
];

const getUniversityPartners = async (): Promise<UniversityPartner[]> => universityPartners;

export function useHomeUniversityPartners() {
  return useQuery({
    queryKey: ["homeUniversityPartners"],
    queryFn: getUniversityPartners,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
