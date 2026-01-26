import { useQuery } from "@tanstack/react-query";

export interface CurriculumCourse {
  subject: string;
  code: string;
  hC: number;
  hTD: number;
  hTP: number;
  credit: number;
}

export type CurriculumData = Record<string, CurriculumCourse[]>;

export type CurriculumLegendItem = {
  label: string;
};

export type CurriculumPageData = {
  curriculum: CurriculumData;
  legend: CurriculumLegendItem[];
};

export const defaultCurriculumPageData: CurriculumPageData = {
  curriculum: {
    "Semester V": [
      { subject: "Algorithm and Programming", code: "GICI3ALP", hC: 16, hTD: 16, hTP: 0, credit: 1.5 },
      { subject: "Combinational and Sequential Logics", code: "GICI3CSL", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "Discrete Mathematics", code: "GICI3DM", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Electronics", code: "GICI3ELE", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "Information Systems Analysis and Design", code: "GICI3SAD", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "Introduction to Computer Systems and Networks", code: "GICI3CSN", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
      { subject: "Soft Skills", code: "GICI3SS", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "Statistics", code: "GICI3STA", hC: 16, hTD: 32, hTP: 0, credit: 2.0 },
      { subject: "English I", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
      { subject: "French I", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 64, credit: 2.0 },
    ],
    "Semester VI": [
      { subject: "Automata Theory", code: "GICI3AT", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Database", code: "GICI3DB", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "Introduction to Programming Environment", code: "GICI3PE", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "MATLAB", code: "GICI3MAT", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
      { subject: "Object-Oriented Programming (OOP)", code: "GICI3OOP", hC: 16, hTD: 16, hTP: 32, credit: 2.5 },
      { subject: "Research Methodology", code: "GICI3RM", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Theoretical Computer Science", code: "GICI3TCS", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Web Design", code: "GICI3WD", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "English II", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 64, credit: 2.0 },
      { subject: "French II", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
    ],
    "Semester VII": [
      { subject: "Advanced Computer Architecture", code: "GICI4ACA", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Compilation", code: "GICI4COM", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
      { subject: "Human Computer Interaction", code: "GICI4HCI", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Internet Programming I", code: "GICI4IP1", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "Networks I", code: "GICI4NET1", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
      { subject: "Operating Systems", code: "GICI4OS", hC: 32, hTD: 0, hTP: 32, credit: 3.0 },
      { subject: "Software Engineering", code: "GICI4SE", hC: 32, hTD: 16, hTP: 16, credit: 3.0 },
      { subject: "Telecommunications", code: "GICI4TEL", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
      { subject: "English I", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
      { subject: "French I", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
    ],
    "Semester VIII": [
      { subject: "Advanced DBMS", code: "GICI4DBMS", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "Distributed Systems", code: "GICI4DS", hC: 16, hTD: 0, hTP: 32, credit: 2.0 },
      { subject: "Internet Programming II", code: "GICI4IP2", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "Introduction to Mobile App Dev.", code: "GICI4MDEV", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Network Design", code: "GICI4ND", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "Networks II", code: "GICI4NET2", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
      { subject: "DevOps", code: "GICI4SDO", hC: 16, hTD: 0, hTP: 32, credit: 2.0 },
      { subject: "Systems and Networks Administration", code: "GICI4SNA", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
      { subject: "English II", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
      { subject: "French II", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
      { subject: "Internship Report", code: "GICI4INT", hC: 0, hTD: 0, hTP: 0, credit: 2.0 },
    ],
    "Semester IX": [
      { subject: "Artificial Intelligence", code: "GICI5AI", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
      { subject: "Cloud Computing", code: "GICI5CC", hC: 32, hTD: 0, hTP: 16, credit: 2.5 },
      { subject: "Data Mining", code: "GICI5DM", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
      { subject: "Image Processing", code: "GICI5IP", hC: 32, hTD: 0, hTP: 16, credit: 2.5 },
      { subject: "Information Security (InfoSec)", code: "GICI5IS", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
      { subject: "IT Project Management", code: "GICI5PM", hC: 16, hTD: 16, hTP: 0, credit: 1.5 },
      { subject: "Natural Language Processing", code: "GICI5NLP", hC: 32, hTD: 0, hTP: 16, credit: 2.5 },
      { subject: "Network Security", code: "GICI5NS", hC: 16, hTD: 0, hTP: 32, credit: 2.0 },
      { subject: "English", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
      { subject: "French", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
    ],
    "Semester X": [
      { subject: "Final Year Internship", code: "GICI5INT", hC: 0, hTD: 0, hTP: 0, credit: 9.0 },
    ],
  },
  legend: [
    { label: "C: Lectures (Cours)" },
    { label: "TD: Supervised Practical (Tutorials)" },
    { label: "TP: Lab Work (Labs)" },
  ],
};

const getCurriculumData = async (): Promise<CurriculumPageData> => defaultCurriculumPageData;

export function useCurriculumData() {
  return useQuery({
    queryKey: ["curriculum"],
    queryFn: getCurriculumData,
    initialData: defaultCurriculumPageData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
