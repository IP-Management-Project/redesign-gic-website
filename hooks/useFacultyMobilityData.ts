import { useQuery } from "@tanstack/react-query";

export type FacultyPerson = {
  name: string;
  role: string;
  spec: string;
  img?: string;
};

export type FacultyMobilityData = {
  management: FacultyPerson[];
  lecturers: FacultyPerson[];
  researchers: FacultyPerson[];
  staff: FacultyPerson[];
};

const facultyMobilityData: FacultyMobilityData = {
  management: [
    {
      name: "LAY Heng",
      role: "Head of the Department",
      spec: "Ph.D. in Computer Science",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "SEAK Leng",
      role: "Vice-Head of the Department",
      spec: "Master of Software Engineering",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
  ],
  lecturers: [
    { name: "PICH Reatrey", role: "Coordinator of International Program", spec: "Data Science Specialist" },
    { name: "Tongsreng Tal", role: "Lecturer", spec: "Cloud Infrastructure" },
    { name: "CHHUO Vanna", role: "Lecturer", spec: "Artificial Intelligence" },
    { name: "YOU Vanndy", role: "Lecturer", spec: "Network Security" },
    { name: "BOU Channa", role: "Lecturer", spec: "Web Development" },
    { name: "TOUCH Sereysethy", role: "Lecturer", spec: "Mobile Computing" },
    { name: "NOU Sotheany", role: "Lecturer", spec: "Software Architecture" },
  ],
  researchers: [
    { name: "VALY Dona", role: "Researcher", spec: "Natural Language Processing" },
    { name: "KONG Phutphalla", role: "Researcher", spec: "Image Processing & OCR" },
    { name: "SOK Kimheng", role: "Researcher", spec: "Machine Learning" },
  ],
  staff: [
    { name: "SRIN Sreyneth", role: "Administrator", spec: "Department Management" },
    { name: "SREY Sokhom", role: "Contents Developer", spec: "E-Learning Specialist" },
    { name: "CHOM Sreylam", role: "Contents Developer", spec: "Multimedia Design" },
  ],
};

const getFacultyMobilityData = async (): Promise<FacultyMobilityData> => facultyMobilityData;

export function useFacultyMobilityData() {
  return useQuery({
    queryKey: ["facultyMobility"],
    queryFn: getFacultyMobilityData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
