"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// --- Types ---

export interface CurriculumCourse {
  subject: string;
  code: string;
  hC: number;
  hTD: number;
  hTP: number;
  credit: number;
  order: number; // Required for DnD-Kit sorting logic
}

export type CurriculumData = Record<string, CurriculumCourse[]>;

export type CurriculumLegendItem = {
  label: string;
};

export type CurriculumPageData = {
  curriculum: CurriculumData;
  legend: CurriculumLegendItem[];
};

// --- Mock Data with Explicit Order ---

export const defaultCurriculumPageData: CurriculumPageData = {
  curriculum: {
    "Semester V": [
      { subject: "Algorithm and Programming", code: "GICI3ALP", hC: 16, hTD: 16, hTP: 0, credit: 1.5, order: 0 },
      { subject: "Combinational and Sequential Logics", code: "GICI3CSL", hC: 16, hTD: 16, hTP: 16, credit: 2.0, order: 1 },
      { subject: "Discrete Mathematics", code: "GICI3DM", hC: 32, hTD: 0, hTP: 0, credit: 2.0, order: 2 },
      { subject: "Electronics", code: "GICI3ELE", hC: 16, hTD: 0, hTP: 0, credit: 1.0, order: 3 },
      { subject: "Information Systems Analysis and Design", code: "GICI3SAD", hC: 16, hTD: 16, hTP: 16, credit: 2.0, order: 4 },
      { subject: "Introduction to Computer Systems and Networks", code: "GICI3CSN", hC: 16, hTD: 0, hTP: 16, credit: 1.5, order: 5 },
      { subject: "Soft Skills", code: "GICI3SS", hC: 16, hTD: 0, hTP: 0, credit: 1.0, order: 6 },
      { subject: "Statistics", code: "GICI3STA", hC: 16, hTD: 32, hTP: 0, credit: 2.0, order: 7 },
      { subject: "English I", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0, order: 8 },
      { subject: "French I", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 64, credit: 2.0, order: 9 },
    ],
    "Semester VI": [
      { subject: "Automata Theory", code: "GICI3AT", hC: 32, hTD: 0, hTP: 0, credit: 2.0, order: 0 },
      { subject: "Database", code: "GICI3DB", hC: 16, hTD: 16, hTP: 16, credit: 2.0, order: 1 },
      { subject: "Introduction to Programming Environment", code: "GICI3PE", hC: 16, hTD: 0, hTP: 0, credit: 1.0, order: 2 },
      { subject: "MATLAB", code: "GICI3MAT", hC: 16, hTD: 0, hTP: 16, credit: 1.5, order: 3 },
      { subject: "Object-Oriented Programming (OOP)", code: "GICI3OOP", hC: 16, hTD: 16, hTP: 32, credit: 2.5, order: 4 },
      { subject: "Research Methodology", code: "GICI3RM", hC: 32, hTD: 0, hTP: 0, credit: 2.0, order: 5 },
      { subject: "Theoretical Computer Science", code: "GICI3TCS", hC: 32, hTD: 0, hTP: 0, credit: 2.0, order: 6 },
      { subject: "Web Design", code: "GICI3WD", hC: 16, hTD: 16, hTP: 16, credit: 2.0, order: 7 },
      { subject: "English II", code: "XXXIXXLAN_2", hC: 0, hTD: 0, hTP: 64, credit: 2.0, order: 8 },
      { subject: "French II", code: "XXXIXXLFR_2", hC: 0, hTD: 0, hTP: 32, credit: 1.0, order: 9 },
    ],
    "Semester VII": [
      { subject: "Advanced Computer Architecture", code: "GICI4ACA", hC: 32, hTD: 0, hTP: 0, credit: 2.0, order: 0 },
      { subject: "Compilation", code: "GICI4COM", hC: 16, hTD: 0, hTP: 16, credit: 1.5, order: 1 },
      { subject: "Human Computer Interaction", code: "GICI4HCI", hC: 32, hTD: 0, hTP: 0, credit: 2.0, order: 2 },
      { subject: "Internet Programming I", code: "GICI4IP1", hC: 16, hTD: 16, hTP: 16, credit: 2.0, order: 3 },
      { subject: "Networks I", code: "GICI4NET1", hC: 16, hTD: 0, hTP: 16, credit: 1.5, order: 4 },
      { subject: "Operating Systems", code: "GICI4OS", hC: 32, hTD: 0, hTP: 32, credit: 3.0, order: 5 },
      { subject: "Software Engineering", code: "GICI4SE", hC: 32, hTD: 16, hTP: 16, credit: 3.0, order: 6 },
      { subject: "Telecommunications", code: "GICI4TEL", hC: 16, hTD: 0, hTP: 16, credit: 1.5, order: 7 },
    ],
    "Semester VIII": [
      { subject: "Advanced DBMS", code: "GICI4DBMS", hC: 16, hTD: 16, hTP: 16, credit: 2.0, order: 0 },
      { subject: "Distributed Systems", code: "GICI4DS", hC: 16, hTD: 0, hTP: 32, credit: 2.0, order: 1 },
      { subject: "Internet Programming II", code: "GICI4IP2", hC: 16, hTD: 16, hTP: 16, credit: 2.0, order: 2 },
      { subject: "Introduction to Mobile App Dev.", code: "GICI4MDEV", hC: 32, hTD: 0, hTP: 0, credit: 2.0, order: 3 },
    ],
    "Semester IX": [
      { subject: "Artificial Intelligence", code: "GICI5AI", hC: 32, hTD: 0, hTP: 0, credit: 2.0, order: 0 },
      { subject: "Cloud Computing", code: "GICI5CC", hC: 32, hTD: 0, hTP: 16, credit: 2.5, order: 1 },
      { subject: "Data Mining", code: "GICI5DM", hC: 16, hTD: 0, hTP: 0, credit: 1.0, order: 2 },
      { subject: "Image Processing", code: "GICI5IP", hC: 32, hTD: 0, hTP: 16, credit: 2.5, order: 3 },
    ],
    "Semester X": [
      { subject: "Final Year Internship", code: "GICI5INT", hC: 0, hTD: 0, hTP: 0, credit: 9.0, order: 0 },
    ],
  },
  legend: [
    { label: "C: Lectures (Cours)" },
    { label: "TD: Supervised Practical (Tutorials)" },
    { label: "TP: Lab Work (Labs)" },
  ],
};

// --- API Mock ---

const fetchCurriculum = async (): Promise<CurriculumPageData> => defaultCurriculumPageData;

// --- Primary Hook ---

export function useCurriculumData() {
  return useQuery({
    queryKey: ["curriculum"],
    queryFn: fetchCurriculum,
    initialData: defaultCurriculumPageData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

// --- Action Hook (The Management Engine) ---

export function useCurriculumActions() {
  const queryClient = useQueryClient();
  const { data } = useCurriculumData();

  const updateMutation = useMutation({
    mutationFn: async (newData: CurriculumPageData) => newData,
    onSuccess: (newData) => {
      // Optimistically update the cache
      queryClient.setQueryData(["curriculum"], newData);
    },
  });

  /**
   * Reorders items within a specific semester
   */
  const reorder = (semester: string, items: CurriculumCourse[]) => {
    if (!data) return;
    const updated = items.map((item, index) => ({ ...item, order: index }));
    updateMutation.mutate({
      ...data,
      curriculum: { ...data.curriculum, [semester]: updated },
    });
  };

  /**
   * Adds or Updates a course entry
   */
  const upsert = (semester: string, course: CurriculumCourse) => {
    if (!data) return;
    const currentList = data.curriculum[semester] || [];
    const exists = currentList.find((c) => c.code === course.code);

    let updatedList;
    if (exists) {
      updatedList = currentList.map((c) => (c.code === course.code ? course : c));
    } else {
      updatedList = [...currentList, { ...course, order: currentList.length }];
    }

    updateMutation.mutate({
      ...data,
      curriculum: { ...data.curriculum, [semester]: updatedList },
    });
  };

  /**
   * Deletes a course from a semester
   */
  const remove = (semester: string, code: string) => {
    if (!data) return;
    const updatedList = data.curriculum[semester].filter((c) => c.code !== code);
    updateMutation.mutate({
      ...data,
      curriculum: { ...data.curriculum, [semester]: updatedList },
    });
  };

  return {
    reorder,
    upsert,
    remove,
    isPending: updateMutation.isPending,
  };
}