import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export type ServicesInfrastructureCopy = {
  badge: string;
  titleMain: string;
  titleHighlight: string;
  description: string;
  controlTitle: string;
  controlDesc: string;
  performanceTitle: string;
  performanceDesc: string;
  statusLabel: string;
  uptimeLabel: string;
  uptimeValue: string;
};

export type ServicesMethodologyCopy = {
  title: string;
  description: string;
  buttonLabel: string;
};

export type ServicesPageData = {
  header: {
    title: string;
    subtitle: string;
  };
  offerings: {
    title: string;
    subtitle: string;
  };
  infrastructure: ServicesInfrastructureCopy;
  methodology: ServicesMethodologyCopy;
  capabilities: ServiceCapability[];
  mainServices: MainService[];
  serverSpecs: ServiceSpec[];
};

export type ServicesPageUpdatePayload = {
  section: string;
  data: Record<string, string | boolean>;
};

const servicesPageData: ServicesPageData = {
  header: {
    title: "Our Services",
    subtitle:
      "An expert team of skillful programmers, experienced researchers, and top-tier students committing to quality products for our clients.",
  },
  offerings: {
    title: "What we offer",
    subtitle: "Ready-to-deploy solutions and custom engineering services.",
  },
  infrastructure: {
    badge: "On-Premise Infrastructure",
    titleMain: "Self-Managed",
    titleHighlight: "Cloud Sovereignty",
    description:
      "Unlike standard providers, we operate our own physical server center right here at the department. This allows for full control over data residency, ultra-low latency, and bespoke configurations managed entirely by our expert team.",
    controlTitle: "Full Data Control",
    controlDesc:
      "End-to-end management of hardware and software security layers.",
    performanceTitle: "High Performance",
    performanceDesc:
      "Dedicated bare-metal resources optimized for heavy computation.",
    statusLabel: "GIC Node-01 Active",
    uptimeLabel: "Uptime Efficiency",
    uptimeValue: "99.9%",
  },
  methodology: {
    title: "Our Development Philosophy",
    description:
      "We manage projects with specialized tools and effective methodologies. We embrace clean code to ensure long-term maintainability and performance.",
    buttonLabel: "LET'S WORK TOGETHER",
  },
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
    initialData: servicesPageData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

const setNestedValue = (
  source: ServicesPageData,
  path: string,
  value: string | boolean,
): ServicesPageData => {
  const keys = path.split(".");
  const root = Array.isArray(source) ? [...source] : { ...source };
  let cursor: any = root;

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1;
    const pathKey = Number.isNaN(Number(key)) ? key : Number(key);

    if (isLast) {
      cursor[pathKey] = value;
      return;
    }

    const nextKey = keys[index + 1];
    const nextIsIndex = !Number.isNaN(Number(nextKey));
    const existing = cursor[pathKey];
    const nextValue =
      existing !== undefined
        ? Array.isArray(existing)
          ? [...existing]
          : { ...existing }
        : nextIsIndex
          ? []
          : {};

    cursor[pathKey] = nextValue;
    cursor = nextValue;
  });

  return root as ServicesPageData;
};

const applyServicesUpdate = (
  current: ServicesPageData,
  updates: Record<string, string | boolean>,
): ServicesPageData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateServicesPageCopy = async (payload: ServicesPageUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return payload;
};

export function useUpdateServicesData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateServicesPageCopy,
    onSuccess: (payload) => {
      queryClient.setQueryData<ServicesPageData>(["servicesPage"], (current) => {
        if (!current) return current;
        return applyServicesUpdate(current, payload.data);
      });
    },
  });
}
