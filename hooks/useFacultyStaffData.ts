import { useQuery } from "@tanstack/react-query";
import { FacultyProfile } from "./useFacultySlideshowData";

export type FacultyStaffData = {
  management: FacultyProfile[];
  lecturers: FacultyProfile[];
  researchers: FacultyProfile[];
  staff: FacultyProfile[];
};

export const facultyStaffMockData: FacultyStaffData = {
  management: [
    {
      name: "Head Dep",
      facultySlug: "head-dep",
      role: "Head of the Department",
      degree: "Information Technology, Ph.D.",
      portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      uniLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/ITC_Logo.svg/1200px-ITC_Logo.svg.png",
      focus: "Institutional leadership and strategic development of GIC.",
    },
    {
      name: "Vice Head",
      facultySlug: "vice-head",
      role: "Vice-Head of Department",
      degree: "Software Engineering, Master",
      portrait: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      uniLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/ITC_Logo.svg/1200px-ITC_Logo.svg.png",
      focus: "Overseeing academic programs and department infrastructure.",
    },
  ],
  lecturers: [
    {
      name: "Lecturer",
      facultySlug: "lecturer",
      role: "Coordinator",
      degree: "International Program, Coordinator",
      portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Managing international cooperation and joint-degree programs.",
    },
    {
      name: "Lecturer",
      facultySlug: "lecturer",
      role: "Lecturer",
      degree: "Cloud Computing, Lecturer",
      portrait: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Specializing in distributed systems and network architecture.",
    },
    {
      name: "Lecturer",
      facultySlug: "lecturer",
      role: "Lecturer",
      degree: "Artificial Intelligence, Lecturer",
      portrait: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Researching machine learning models for Khmer language.",
    },
    {
      name: "Lecturer",
      facultySlug: "lecturer",
      role: "Lecturer",
      degree: "Cybersecurity, Lecturer",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Focusing on secure software lifecycles and encryption.",
    },
    {
      name: "Lecturer",
      facultySlug: "lecturer",
      role: "Lecturer",
      degree: "Web Technologies, Lecturer",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Modern web frameworks and scalable frontend design.",
    },
    {
      name: "TOUCH Sereysethy",
      facultySlug: "lecturer",

      role: "Lecturer",
      degree: "Mobile Development, Lecturer",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "iOS and Android native application development.",
    },
    {
      name: "NOU Sotheany",
      facultySlug: "lecturer",
      role: "Lecturer",
      degree: "Software Quality, Lecturer",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Testing methodologies and software maintenance.",
    },
  ],
  researchers: [
    {
      name: "VALY Dona",
      facultySlug: "lecturer",
      role: "Researcher",
      degree: "NLP Specialist, Researcher",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Advancing Khmer Natural Language Processing.",
    },
    {
      name: "KONG Phutphalla",
      facultySlug: "lecturer",

      role: "Researcher",
      degree: "Computer Vision, Researcher",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Optical Character Recognition (OCR) for Khmer script.",
    },
    {
      name: "SOK Kimheng",
      facultySlug: "lecturer",
      role: "Researcher",
      degree: "Data Science, Researcher",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Data analysis and predictive modeling.",
    },
  ],
  staff: [
    {
      name: "SRIN Sreyneth",
      facultySlug: "lecturer",
      role: "Administrator",
      degree: "Administration, Staff",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Department operations and student coordination.",
    },
    {
      name: "SREY Sokhom",
      facultySlug: "lecturer",
      role: "Developer",
      degree: "Contents, Developer",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "E-learning platform content development.",
    },
    {
      name: "CHOM Sreylam",
      facultySlug: "lecturer",
      role: "Developer",
      degree: "Contents, Developer",
      portrait: "",
      uniLogo: "https://itc.edu.kh/wp-content/uploads/2021/08/logo-itc.png",
      focus: "Multimedia assets and educational tools.",
    },
  ],
};

export type FacultyStaffFetcher = () => Promise<FacultyStaffData>;

const defaultFetcher: FacultyStaffFetcher = async () => facultyStaffMockData;

export type FacultyStaffQueryOptions = {
  fetcher?: FacultyStaffFetcher;
  initialData?: FacultyStaffData;
};

export function useFacultyStaffData(options: FacultyStaffQueryOptions = {}) {
  const { fetcher = defaultFetcher, initialData } = options;
  return useQuery({
    queryKey: ["facultyStaff"],
    queryFn: fetcher,
    staleTime: Number.POSITIVE_INFINITY,
    initialData,
  });
}
