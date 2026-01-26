import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  data: Record<string, string>;
};

const headMessageData: HeadMessageData = {
  headName: "Dr. Lay HENG",
  title: "Head of GIC Department",
  specialization: "Pattern Recognition & AI specialized researcher",
  email: "head@gic.itc.edu.kh",
  linkedin: "https://www.linkedin.com",
  portrait: "https://i.pravatar.cc/400?u=gic-head",
  leadershipKicker: "Leadership Insight",
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
      title: "Excellence",
      desc: "Revealing potential to global stakeholders.",
    },
    {
      icon: "lightbulb",
      title: "Innovation",
      desc: "Solving real-world problems via STEM.",
    },
    {
      icon: "shield",
      title: "Integrity",
      desc: "Building robust digital foundations.",
    },
  ],
  signatureName: "Lay Heng, Ph.D.",
  signatureTitle: "Head of GIC Department",
  footerText:
    "Engineering the foundations of the digital world / GIC Leadership",
};

const getHeadMessageData = async (): Promise<HeadMessageData> =>
  headMessageData;

export function useHeadMessageData() {
  return useQuery({
    queryKey: ["headMessage"],
    queryFn: getHeadMessageData,
    initialData: headMessageData,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

type UpdatableHeadMessageData = Record<string, unknown>;

const setNestedValue = (
  source: UpdatableHeadMessageData,
  path: string,
  value: string,
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
  updates: Record<string, string>,
): HeadMessageData =>
  Object.entries(updates).reduce(
    (acc, [path, value]) => setNestedValue(acc, path, value),
    current,
  );

const updateHeadMessageData = async (payload: HeadMessageUpdatePayload) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return payload;
};

export function useUpdateHeadMessageData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHeadMessageData,
    onSuccess: (payload) => {
      queryClient.setQueryData<HeadMessageData>(["headMessage"], (current) => {
        if (!current) return current;

        return applyHeadMessageUpdate(current, payload.data);
      });
    },
  });
}
