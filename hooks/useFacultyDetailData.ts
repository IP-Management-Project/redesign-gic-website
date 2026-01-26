import { useQuery } from "@tanstack/react-query";

export type FacultyEducationEntry = {
  degree: string;
  school: string;
};

export type FacultyDetailData = {
  name: string;
  title: string;
  position: string;
  office: string;
  email: string;
  biography: string;
  education: FacultyEducationEntry[];
  researchInterests: string[];
  projects: string[];
};

const facultyDetailData: Record<string, FacultyDetailData> = {
  lecturer: {
    name: "Dr. VALY Dona",
    title: "Lecturer & specialized researcher",
    position: "Pattern Recognition & AI Specialist",
    office: "GIC Department, Building A, Room 204",
    email: "valy.dona@itc.edu.kh",
    biography:
      "Dr. Valy is a core specialized researcher at the GIC department, leading research in AI and Pattern Recognition. He is instrumental in mentoring student teams for the Techno Innovation Challenge (TIC), helping them move their leadership and creativity to the next level.",
    education: [
      { degree: "Ph.D. in Computer Science", school: "University of La Rochelle, France" },
      { degree: "Engineering Degree in ICT", school: "Institute of Technology of Cambodia" },
    ],
    researchInterests: [
      "Khmer Natural Language Processing (NLP)",
      "Artificial Intelligence",
      "Pattern Recognition",
      "STEM-based Problem Solving",
    ],
    projects: ["Khmer OCR Ecosystem", "ASEAN Cyber University E-Learning Platform"],
  },
  default: {
    name: "Dr. VALY Dona",
    title: "Lecturer & specialized researcher",
    position: "Pattern Recognition & AI Specialist",
    office: "GIC Department, Building A, Room 204",
    email: "valy.dona@itc.edu.kh",
    biography:
      "Dr. Valy is a core specialized researcher at the GIC department, leading research in AI and Pattern Recognition. He is instrumental in mentoring student teams for the Techno Innovation Challenge (TIC), helping them move their leadership and creativity to the next level.",
    education: [
      { degree: "Ph.D. in Computer Science", school: "University of La Rochelle, France" },
      { degree: "Engineering Degree in ICT", school: "Institute of Technology of Cambodia" },
    ],
    researchInterests: [
      "Khmer Natural Language Processing (NLP)",
      "Artificial Intelligence",
      "Pattern Recognition",
      "STEM-based Problem Solving",
    ],
    projects: ["Khmer OCR Ecosystem", "ASEAN Cyber University E-Learning Platform"],
  },
};

const getFacultyDetailData = async (personSlug: string): Promise<FacultyDetailData | null> =>
  facultyDetailData[personSlug] ?? facultyDetailData.default ?? null;

export function useFacultyDetailData(personSlug?: string) {
  return useQuery({
    queryKey: ["facultyDetail", personSlug],
    queryFn: () => getFacultyDetailData(personSlug ?? ""),
    enabled: Boolean(personSlug),
    initialData: personSlug ? facultyDetailData[personSlug] ?? facultyDetailData.default : facultyDetailData.default,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
