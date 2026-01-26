import { useQuery } from "@tanstack/react-query";

export type SeminarEvent = {
  date: string;
  title: string;
  type: string;
  icon: "shield" | "trophy" | "clock" | "rocket";
  desc: string;
  status: string;
  image: string;
};

const seminarEventsData: SeminarEvent[] = [
  {
    date: "17 Jan",
    title: "Cybersecurity Sharing Session",
    type: "Talk",
    icon: "shield",
    desc: "Expert-led discussion on current threat landscapes and defense strategies.",
    status: "Starting Soon",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "03 Apr",
    title: "Huawei ICT Competition APAC 2025",
    type: "Competition",
    icon: "trophy",
    desc: "Regional competition focusing on network, cloud, and computing excellence.",
    status: "Registration Open",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "01 Sep",
    title: "GIC Vacation Crash Course 2025",
    type: "Workshop",
    icon: "clock",
    desc: "Intensive training program during summer break to sharpen core coding skills.",
    status: "Planning",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "07 Sep",
    title: "HITIHE & WikiTropica Launch",
    type: "Event",
    icon: "rocket",
    desc: "Official launching ceremony of the HITIHE and WikiTropica innovation platforms.",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "01 Sep",
    title: "GIC Vacation Crash Course 2025",
    type: "Workshop",
    icon: "clock",
    desc: "Intensive training program during summer break to sharpen core coding skills.",
    status: "Planning",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
  },
  {
    date: "07 Sep",
    title: "HITIHE & WikiTropica Launch",
    type: "Event",
    icon: "rocket",
    desc: "Official launching ceremony of the HITIHE and WikiTropica innovation platforms.",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
];

const getSeminarEventsData = async (): Promise<SeminarEvent[]> => seminarEventsData;

export function useSeminarEventsData() {
  return useQuery({
    queryKey: ["seminarEvents"],
    queryFn: getSeminarEventsData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
