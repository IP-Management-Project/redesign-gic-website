import { useQuery } from "@tanstack/react-query";

export type StudentGenerationCard = {
  name: string;
  quote: string;
  image: string;
};

export type StudentGenerationData = {
  generations: Record<string, StudentGenerationCard[]>;
  positions: string[];
};

const studentGenerationData: StudentGenerationData = {
  generations: {
    "Gen 8": [
      {
        name: "Sok Rathana",
        quote: "Engineering is the bridge between imagination and reality.",
        image: "https://i.pravatar.cc/300?u=r1",
      },
      {
        name: "Chan Monika",
        quote: "Activating potential through technical leadership.",
        image: "https://i.pravatar.cc/300?u=m2",
      },
      {
        name: "Leng Visal",
        quote: "STEM-based solutions for a digital Cambodia.",
        image: "https://i.pravatar.cc/300?u=v3",
      },
      {
        name: "Vannak Devi",
        quote: "Innovation begins when we dare to solve real-world problems.",
        image: "https://i.pravatar.cc/300?u=d4",
      },
      {
        name: "Keo Sophea",
        quote: "Building robust foundations for the future of ICT.",
        image: "https://i.pravatar.cc/300?u=s5",
      },
      {
        name: "Nhem Borey",
        quote: "Creativity is intelligence having fun with code.",
        image: "https://i.pravatar.cc/300?u=b6",
      },
    ],
    "Gen 9": [
      {
        name: "Som Nara",
        quote: "Data is the new currency of engineering excellence.",
        image: "https://i.pravatar.cc/300?u=n1",
      },
      {
        name: "Peou Sila",
        quote: "Architecting systems that empower the next generation.",
        image: "https://i.pravatar.cc/300?u=p1",
      },
      {
        name: "Lork Vanda",
        quote: "The future is bare-metal and cloud-native.",
        image: "https://i.pravatar.cc/300?u=l1",
      },
      {
        name: "Hem Seyha",
        quote: "Revealing excellence through focused R&D.",
        image: "https://i.pravatar.cc/300?u=h1",
      },
      {
        name: "Ouk Samnang",
        quote: "Leadership in tech requires a creative soul.",
        image: "https://i.pravatar.cc/300?u=o1",
      },
      {
        name: "Chhay Raksa",
        quote: "GIC provides the roadmap; we build the journey.",
        image: "https://i.pravatar.cc/300?u=c1",
      },
    ],
  },
  positions: [
    "absolute top-10 left-[15%] rotate-[-4deg]",
    "absolute top-40 left-[22%] rotate-[6deg]",
    "absolute top-5 left-[38%] rotate-[-8deg]",
    "absolute top-32 left-[52%] rotate-[10deg]",
    "absolute top-20 right-[30%] rotate-[-3deg]",
    "absolute top-52 left-[40%] rotate-[5deg]",
  ],
};

const getStudentGenerationData = async (): Promise<StudentGenerationData> => studentGenerationData;

export function useStudentGenerationData() {
  return useQuery({
    queryKey: ["studentGenerations"],
    queryFn: getStudentGenerationData,
    initialData: studentGenerationData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
