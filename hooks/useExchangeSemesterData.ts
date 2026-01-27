import { useQuery } from "@tanstack/react-query";

export type ExchangeStoryCard = {
  id: number;
  type: string;
  name: string;
  destination: string;
  backgroundImg: string;
  portrait: string;
  story: string;
  focus: string;
  activityImages?: string[];
  span: string;
};

export const exchangeSemesterData: ExchangeStoryCard[] = [
  {
    id: 1,
    type: "Khmer to France",
    name: "Sok Pongra",
    destination: "INSA Rennes, France",
    backgroundImg:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1200",
    portrait: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    story:
      "Studying in France allowed me to master advanced cybersecurity frameworks that I now use to protect GIC's local server infrastructure.",
    focus: "Cybersecurity & R&D",
    activityImages: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=300",
    ],
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    type: "French to Cambodia",
    name: "Lucas Bernard",
    destination: "GIC Dept., Cambodia",
    backgroundImg:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    portrait: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    story:
      "The GIC Incubation Hub is unique. Collaborating with Khmer students on AI projects for local agriculture was a highlight.",
    focus: "AI & Innovation Hub",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    type: "Khmer to France",
    name: "Vannak Devi",
    destination: "Polytech Nantes, France",
    backgroundImg:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    portrait: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    story:
      "Exploring European telecommunication standards moved my leadership skills to the next level for TIC Season 8.",
    focus: "Telecommunications",
    activityImages: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=300",
    ],
    span: "md:col-span-1 md:row-span-1",
  },
];

const getExchangeSemesterData = async (): Promise<ExchangeStoryCard[]> => exchangeSemesterData;

export function useExchangeSemesterData() {
  return useQuery({
    queryKey: ["exchangeSemester"],
    queryFn: getExchangeSemesterData,
    initialData: exchangeSemesterData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
