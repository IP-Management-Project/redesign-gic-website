import { useQuery } from "@tanstack/react-query";

export type ServiceCapability = {
  title: string;
  desc: string;
  icon: "globe" | "search" | "code" | "cpu";
  isSoon?: boolean;
};

export type MainService = {
  title: string;
  icon: "search" | "chart" | "scan" | "users" | "cpu" | "database" | "layout" | "video";
  href: string;
};

export type ServiceSpec = {
  label: string;
  val: string;
  icon: "storage" | "compute" | "security";
};

export type ServicesPageData = {
  capabilities: ServiceCapability[];
  mainServices: MainService[];
  serverSpecs: ServiceSpec[];
};

const servicesPageData: ServicesPageData = {
  capabilities: [
    {
      title: "Social Contribution",
      desc: "We are willing to work in projects that contribute to the development of the country.",
      icon: "globe",
    },
    {
      title: "Research Capability",
      desc: "As an education institution, we have a very strong research capability working on local and international scales.",
      icon: "search",
    },
    {
      title: "Development Skill",
      desc: "Specialized tools, clean code, and effective methodology. We are open to learning and mastering new technology.",
      icon: "code",
    },
    {
      title: "Powerful Computing Unit",
      desc: "Coming soon... Advanced infrastructure to support high-performance data processing.",
      icon: "cpu",
      isSoon: true,
    },
  ],
  mainServices: [
    { title: "Research Project", icon: "search", href: "/research" },
    { title: "Supply Chain Management", icon: "chart", href: "/services/supply-chain" },
    { title: "Biometric Facial Attendance", icon: "scan", href: "/services/biometric" },
    { title: "IT Consultant", icon: "users", href: "/services/consultant" },
    { title: "High-Performance Computing", icon: "cpu", href: "/services/hpc" },
    { title: "Database Analysis & Design", icon: "database", href: "/services/database" },
    { title: "System Design & Development", icon: "layout", href: "/services/dev" },
    { title: "E-learning Service", icon: "video", href: "/services/elearning" },
  ],
  serverSpecs: [
    { label: "Storage Capacity", val: "500TB NVMe", icon: "storage" },
    { label: "Compute Power", val: "High-Performance HPC", icon: "compute" },
    { label: "Security Protocol", val: "Hardware Encryption", icon: "security" },
  ],
};

const getServicesData = async (): Promise<ServicesPageData> => servicesPageData;

export function useServicesData() {
  return useQuery({
    queryKey: ["servicesPage"],
    queryFn: getServicesData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
