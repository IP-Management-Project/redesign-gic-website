import { useQuery } from "@tanstack/react-query";

export type ExecutiveBioAchievement = {
  year: string;
  title: string;
};

export type ExecutiveBioData = {
  name: string;
  designation: string;
  credentials: string;
  specialization: string;
  office: string;
  email: string;
  portrait: string;
  bioHtml: string;
  achievements: ExecutiveBioAchievement[];
};

const executiveBioData: Record<string, ExecutiveBioData> = {
  "head-dep": {
    name: "Dr. VALY Dona",
    designation: "Head of GIC Department",
    credentials: "Ph.D. in Computer Science (Univ. La Rochelle, France)",
    specialization: "AI & Pattern Recognition specialized researcher",
    office: "Institute of Technology of Cambodia, Building A, Room 204",
    email: "valy.dona@itc.edu.kh",
    portrait: "https://i.pravatar.cc/300?u=gic",
    bioHtml: `
    <p class="text-xl font-medium leading-relaxed text-slate-600 dark:text-zinc-400 mb-6">
      Dr. VALY Dona is a distinguished academic leader and researcher specializing in <strong>Artificial Intelligence</strong> and <strong>Pattern Recognition</strong>. As the Head of the Department of Information and Communication Engineering (GIC), he leads the strategic vision for Cambodia's premier tech-focused academic track.
    </p>
    <p class="mb-6">
      His leadership is centered on <strong>activating student potential</strong> by bridging the gap between academic theory and bare-metal engineering. Under his guidance, the GIC department has successfully launched the <strong>Incubation Hub</strong> and the <strong>Techno Innovation Challenge Cambodia (TIC)</strong>, platforms designed to reveal student excellence to global industrial bodies.
    </p>
    <p>
      Dr. Valy's research contributions in <strong>Khmer NLP</strong> and digital infrastructure management have moved the department's creativity to the next level, ensuring that GIC remains at the forefront of STEM-based innovation in the ASEAN region.
    </p>
  `,
    achievements: [
      { year: "2024", title: "Project Lead: ASEAN Cyber University ACU Project" },
      { year: "2023", title: "Keynote Speaker: International Conference on AI & ML" },
      { year: "2022", title: "Best Researcher Award: ITC Engineering Showcase" },
    ],
  },
  default: {
    name: "Dr. VALY Dona",
    designation: "Head of GIC Department",
    credentials: "Ph.D. in Computer Science (Univ. La Rochelle, France)",
    specialization: "AI & Pattern Recognition specialized researcher",
    office: "Institute of Technology of Cambodia, Building A, Room 204",
    email: "valy.dona@itc.edu.kh",
    portrait: "https://i.pravatar.cc/300?u=gic",
    bioHtml: `
    <p class="text-xl font-medium leading-relaxed text-slate-600 dark:text-zinc-400 mb-6">
      Dr. VALY Dona is a distinguished academic leader and researcher specializing in <strong>Artificial Intelligence</strong> and <strong>Pattern Recognition</strong>. As the Head of the Department of Information and Communication Engineering (GIC), he leads the strategic vision for Cambodia's premier tech-focused academic track.
    </p>
    <p class="mb-6">
      His leadership is centered on <strong>activating student potential</strong> by bridging the gap between academic theory and bare-metal engineering. Under his guidance, the GIC department has successfully launched the <strong>Incubation Hub</strong> and the <strong>Techno Innovation Challenge Cambodia (TIC)</strong>, platforms designed to reveal student excellence to global industrial bodies.
    </p>
    <p>
      Dr. Valy's research contributions in <strong>Khmer NLP</strong> and digital infrastructure management have moved the department's creativity to the next level, ensuring that GIC remains at the forefront of STEM-based innovation in the ASEAN region.
    </p>
  `,
    achievements: [
      { year: "2024", title: "Project Lead: ASEAN Cyber University ACU Project" },
      { year: "2023", title: "Keynote Speaker: International Conference on AI & ML" },
      { year: "2022", title: "Best Researcher Award: ITC Engineering Showcase" },
    ],
  },
};

const getExecutiveBioData = async (personSlug: string): Promise<ExecutiveBioData | null> =>
  executiveBioData[personSlug] ?? executiveBioData.default ?? null;

export function useExecutiveBioData(personSlug?: string) {
  return useQuery({
    queryKey: ["executiveBio", personSlug],
    queryFn: () => getExecutiveBioData(personSlug ?? ""),
    enabled: Boolean(personSlug),
    initialData: personSlug ? executiveBioData[personSlug] ?? executiveBioData.default : executiveBioData.default,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
