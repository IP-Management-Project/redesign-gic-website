import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/api/axiosClient";

export type HeadMessageCoreValue = {
  icon: "target" | "lightbulb" | "shield";
  title: string;
  desc: string;
};

export type HeadMessageData = {
  headName: string;
  title: string;
  specialization: string;
  email: string;
  linkedin: string;
  portrait: string;
  leadershipKicker: string;
  messageHtml: string;
  coreValues: HeadMessageCoreValue[];
  signatureName: string;
  signatureTitle: string;
  footerText: string;
};

export type HeadMessageUpdatePayload = {
  section: string;
  data: Record<string, unknown>;
};

const headMessageData: HeadMessageData = {
  headName: "",
  title: "",
  specialization: "",
  email: "",
  linkedin: "",
  portrait: "",
  leadershipKicker: "",
  messageHtml: `
    <p class="text-2xl font-bold text-[#26304d] dark:text-white mb-8 leading-tight">
      At the Department of Information and Communication Engineering (GIC), we are not just teaching technology; we are architecting the future of Cambodia's digital landscape.
    </p>
    <p>
      Our mission is simple yet profound: to provide a vibrant platform where young Cambodian students can <strong>activate their latent potential</strong>. We believe that by bridging the gap between academic theory and bare-metal engineering, we move student leadership and creativity to the next level.
    </p>
    <p>
      Through the <strong>GIC Incubation Hub</strong> and the <strong>Techno Innovation Challenge Cambodia (TIC)</strong>, we reveal student excellence to international stakeholders and industrial bodies. We promote innovative STEM-based solutions for solving real-world problems, making the best use of our students' specialized technical skills.
    </p>
    <p>
      Whether you are a student, a researcher, or an industrial partner, I invite you to join us in this odyssey of technical innovation and leadership. Together, we engineer the foundations of the digital world.
    </p>
  `,
  coreValues: [
    {
      icon: "target",
      title: "",
      desc: "",
    },
    {
      icon: "lightbulb",
      title: "",
      desc: "",
    },
    {
      icon: "shield",
      title: "",
      desc: "",
    },
  ],
  signatureName: "",
  signatureTitle: "",
  footerText: "",
};

const normalizeHeadMessageData = (
  incoming?: Partial<HeadMessageData>,
): HeadMessageData => ({
  headName: incoming?.headName ?? headMessageData.headName,
  title: incoming?.title ?? headMessageData.title,
  specialization: incoming?.specialization ?? headMessageData.specialization,
  email: incoming?.email ?? headMessageData.email,
  linkedin: incoming?.linkedin ?? headMessageData.linkedin,
  portrait: incoming?.portrait ?? headMessageData.portrait,
  leadershipKicker:
    incoming?.leadershipKicker ?? headMessageData.leadershipKicker,
  messageHtml: incoming?.messageHtml ?? headMessageData.messageHtml,
  coreValues: incoming?.coreValues ?? headMessageData.coreValues,
  signatureName: incoming?.signatureName ?? headMessageData.signatureName,
  signatureTitle: incoming?.signatureTitle ?? headMessageData.signatureTitle,
  footerText: incoming?.footerText ?? headMessageData.footerText,
});

const getHeadMessageData = async (): Promise<HeadMessageData> => {
  try {
    const response = await apiClient.get<Partial<HeadMessageData> | undefined>(
      "/content/head-message",
    );

    // Some backends wrap payload in { data }
    const unwrapped = (response as any)?.data ?? response;
    return normalizeHeadMessageData(unwrapped ?? undefined);
  } catch (error) {
    const status = (error as any)?.response?.status ?? (error as any)?.status;
    if (status === 404) {
      // Seed the document on first access
      try {
        await apiClient.put<HeadMessageData>("/content/head-message", {
          data: headMessageData,
        });
      } catch (seedError) {
        console.error("Failed to seed head message", seedError);
      }
    } else {
      console.error("Failed to fetch head message", error);
    }
    return headMessageData;
  }
};

export function useHeadMessageData() {
  return useQuery({
    queryKey: ["headMessage"],
    queryFn: getHeadMessageData,
    initialData: headMessageData,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}

type UpdatableHeadMessageData = Record<string, unknown>;

const setNestedValue = (
  source: UpdatableHeadMessageData,
  path: string,
  value: unknown,
) => {
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

  return root as HeadMessageData;
};

const applyHeadMessageUpdate = (
  current: HeadMessageData,
  updates: Record<string, unknown>,
): HeadMessageData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateHeadMessageData = async (payload: HeadMessageUpdatePayload) => {
  try {
    return await apiClient.patch<HeadMessageData>("/content/head-message", {
      data: payload.data,
      section: payload.section,
    });
  } catch (error) {
    const status = (error as any)?.response?.status ?? (error as any)?.status;

    if (status === 404) {
      const seeded = applyHeadMessageUpdate(headMessageData, payload.data);
      return apiClient.put<HeadMessageData>("/content/head-message", {
        data: seeded,
      });
    }

    throw error;
  }
};

export function useUpdateHeadMessageData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const current =
        queryClient.getQueryData<HeadMessageData>(["headMessage"]) ??
        headMessageData;
      const merged = applyHeadMessageUpdate(current, payload.data);

      try {
        return await apiClient.patch<HeadMessageData>("/content/head-message", {
          data: merged,
          section: payload.section,
        });
      } catch (error) {
        const status =
          (error as any)?.response?.status ?? (error as any)?.status;

        if (status === 404) {
          return apiClient.put<HeadMessageData>("/content/head-message", {
            data: merged,
          });
        }

        throw error;
      }
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<HeadMessageData>(["headMessage"], (current) => {
        const base = current ?? headMessageData;

        if (updated) {
          // Handle APIs that wrap response in { data }
          const unwrapped = (updated as any)?.data ?? updated;
          return normalizeHeadMessageData(unwrapped as HeadMessageData);
        }

        return base;
      });
    },
  });
}
