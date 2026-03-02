import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/axiosClient";
export type ServiceCapability = {
  title: string;
  desc: string;
  icon: "globe" | "search" | "code" | "cpu";
  isSoon?: boolean;
};

export type MainService = {
  title: string;
  icon:
    | "search"
    | "chart"
    | "scan"
    | "users"
    | "cpu"
    | "database"
    | "layout"
    | "video";
  href: string;
};

export type ServiceSpec = {
  label: string;
  val: string;
  icon: "storage" | "compute" | "security";
};

export const SERVICES_CONTENT_SLUG = "services-page";

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
    title: "",
    subtitle: "",
  },
  offerings: {
    title: "",
    subtitle: "",
  },
  infrastructure: {
    badge: "",
    titleMain: "",
    titleHighlight: "",
    description: "",
    controlTitle: "",
    controlDesc: "",
    performanceTitle: "",
    performanceDesc: "",
    statusLabel: "",
    uptimeLabel: "",
    uptimeValue: "",
  },
  methodology: {
    title: "",
    description: "",
    buttonLabel: "",
  },
  capabilities: [
    {
      title: "",
      desc: "",
      icon: "globe",
    },
    {
      title: "",
      desc: "",
      icon: "search",
    },
    {
      title: "",
      desc: "",
      icon: "code",
    },
    {
      title: "",
      desc: "",
      icon: "cpu",
    },
  ],
  mainServices: [
    { title: "", icon: "search", href: "/research" },
    {
      title: "",
      icon: "chart",
      href: "/services/supply-chain",
    },
    {
      title: "",
      icon: "scan",
      href: "/services/biometric",
    },
    { title: "", icon: "users", href: "/services/consultant" },
    { title: "", icon: "cpu", href: "/services/hpc" },
    {
      title: "",
      icon: "database",
      href: "/services/database",
    },
    {
      title: "",
      icon: "layout",
      href: "/services/dev",
    },
    { title: "", icon: "video", href: "/services/elearning" },
  ],
  serverSpecs: [
    { label: "", val: "", icon: "storage" },
    { label: "", val: "", icon: "compute" },
    {
      label: "",
      val: "",
      icon: "security",
    },
  ],
};

const extractStatusCode = (error: unknown) => {
  const anyError = error as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
    request?: { status?: number };
  };
  return (
    anyError?.statusCode ??
    anyError?.status ??
    anyError?.response?.status ??
    (anyError as any)?.request?.status ??
    null
  );
};

const mergeSection = <T extends object>(
  defaults: T,
  incoming?: Partial<T>,
): T => ({ ...defaults, ...(incoming ?? {}) });

const normalizeServicesData = (
  incoming?: Partial<ServicesPageData>,
): ServicesPageData => ({
  header: mergeSection(servicesPageData.header, incoming?.header),
  offerings: mergeSection(servicesPageData.offerings, incoming?.offerings),
  infrastructure: mergeSection(
    servicesPageData.infrastructure,
    incoming?.infrastructure,
  ),
  methodology: mergeSection(
    servicesPageData.methodology,
    incoming?.methodology,
  ),
  capabilities: incoming?.capabilities ?? servicesPageData.capabilities,
  mainServices: incoming?.mainServices ?? servicesPageData.mainServices,
  serverSpecs: incoming?.serverSpecs ?? servicesPageData.serverSpecs,
});

const getServicesData = async (): Promise<ServicesPageData> => {
  try {
    const response = await apiClient.get<Partial<ServicesPageData> | undefined>(
      `/content/${SERVICES_CONTENT_SLUG}`,
    );

    // Normalize so missing sections do not break rendering
    return normalizeServicesData(response ?? undefined);
  } catch (error) {
    console.error("Failed to fetch services page data:", error);
    return servicesPageData;
  }
};

export function useServicesData() {
  return useQuery({
    queryKey: ["servicesPage"],
    queryFn: getServicesData,
    initialData: servicesPageData,
    // Always refetch on mount so we replace the fallback with live API data
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
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
  try {
    return await apiClient.patch<ServicesPageData>(
      `/content/${SERVICES_CONTENT_SLUG}`,
      payload,
    );
  } catch (error) {
    const status = extractStatusCode(error);

    if (status === 404) {
      // Seed empty structure and apply incoming update so persistence succeeds
      const seeded = applyServicesUpdate(servicesPageData, payload.data);
      return apiClient.put<ServicesPageData>(
        `/content/${SERVICES_CONTENT_SLUG}`,
        {
          data: seeded,
        },
      );
    }

    throw error;
  }
};

export function useUpdateServicesData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateServicesPageCopy,
    onSuccess: (updated, payload) => {
      queryClient.setQueryData<ServicesPageData>(
        ["servicesPage"],
        (current) => {
          const base = current ?? servicesPageData;
          if (updated) {
            // Prefer normalized server response when present
            return normalizeServicesData(updated);
          }
          return applyServicesUpdate(base, payload.data);
        },
      );
    },
  });
}
