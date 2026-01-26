import { useQuery } from "@tanstack/react-query";

export type DepartmentNumber = {
  id: string;
  label: string;
  value: string;
  helper: string;
  icon: "desktop" | "network" | "satellite" | "mobile";
  accentColor: string;
  isFeatured?: boolean;
};

const departmentNumbers: DepartmentNumber[] = [
  {
    id: "established",
    label: "Established",
    value: "2005",
    helper: "Two decades of academic excellence",
    icon: "desktop",
    accentColor: "text-blue-500 dark:text-blue-400",
    isFeatured: true,
  },
  {
    id: "community",
    label: "Community",
    value: "1,200+",
    helper: "Vibrant network of students and alumni",
    icon: "network",
    accentColor: "text-indigo-500 dark:text-indigo-400",
  },
  {
    id: "employment",
    label: "Employment",
    value: "92%",
    helper: "Hired within 6 months of graduation",
    icon: "satellite",
    accentColor: "text-cyan-500 dark:text-cyan-400",
  },
  {
    id: "research",
    label: "Research",
    value: "12 Labs",
    helper: "Innovative groups driving local tech",
    icon: "mobile",
    accentColor: "text-primary",
  },
];

const getDepartmentNumbers = async (): Promise<DepartmentNumber[]> => departmentNumbers;

export function useDepartmentNumber() {
  return useQuery({
    queryKey: ["departmentNumbers"],
    queryFn: getDepartmentNumbers,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
