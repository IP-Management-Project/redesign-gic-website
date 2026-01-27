"use client";

import { useState, useMemo, useEffect } from "react";
import { StudentGenerationData, StudentGenerationCard } from "./useStudentGenerationData";

export type StudentEntry = StudentGenerationCard & {
  id: string;
  generation: string;
};

export function useGicYearBookData(rawData?: StudentGenerationData) {
  const [localEntries, setLocalEntries] = useState<StudentEntry[]>([]);
  const [search, setSearch] = useState("");
  const [genFilter, setGenFilter] = useState("ALL");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Sync with raw data from React Query
  useEffect(() => {
    if (rawData?.generations) {
      const flattened: StudentEntry[] = [];
      Object.entries(rawData.generations).forEach(([gen, students]) => {
        students.forEach((s, index) => {
          flattened.push({ ...s, id: `${gen}-${index}`, generation: gen });
        });
      });
      setLocalEntries(flattened);
    }
  }, [rawData]);

  // Derived State: Generations list for the Filter Dropdown
  const generations = useMemo(() => 
    ["ALL", ...Array.from(new Set(localEntries.map((e) => e.generation)))], 
  [localEntries]);

  // Core Filtering & Search Logic
  const filtered = useMemo(() => {
    return localEntries.filter((e) => {
      const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
      const matchesGen = genFilter === "ALL" || e.generation === genFilter;
      return matchesSearch && matchesGen;
    });
  }, [localEntries, search, genFilter]);

  // Actions
  const addStudent = (newStudent: Omit<StudentEntry, "id">) => {
    setLocalEntries((prev) => [{ ...newStudent, id: crypto.randomUUID() }, ...prev]);
  };

  const updateStudent = (id: string, updated: Partial<StudentEntry>) => {
    setLocalEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteStudent = () => {
    if (isDeleting) {
      setLocalEntries((prev) => prev.filter((e) => e.id !== isDeleting));
      setIsDeleting(null);
    }
  };

  const bulkUpload = (entries: Omit<StudentEntry, "id">[]) => {
    const withIds = entries.map((e) => ({ ...e, id: crypto.randomUUID() }));
    setLocalEntries((prev) => [...withIds, ...prev]);
  };

  return {
    entries: filtered,
    generations,
    search,
    setSearch,
    genFilter,
    setGenFilter,
    isDeleting,
    setIsDeleting,
    actions: {
      addStudent,
      updateStudent,
      deleteStudent,
      bulkUpload,
    },
  };
}