import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  StudentGenerationCard,
  StudentGenerationData,
} from "@/hooks/useStudentGenerationData";

export type StudentGenerationUpdatePayload = {
  generation: string;
  student: StudentGenerationCard;
};

const updateStudentGenerationData = async (
  payload: StudentGenerationUpdatePayload,
) => {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return payload;
};

export function useUpdateStudentGenerationData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentGenerationData,
    onSuccess: (payload) => {
      queryClient.setQueryData<StudentGenerationData>(
        ["studentGenerations"],
        (current) => {
          if (!current) return current;

          const existing = current.generations[payload.generation] ?? [];
          return {
            ...current,
            generations: {
              ...current.generations,
              [payload.generation]: [...existing, payload.student],
            },
          };
        },
      );

      addToast({
        title: "Student added",
        description: `${payload.student.name} is now listed under ${payload.generation}.`,
        severity: "success",
      });
    },
  });
}
