"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { useParams, useRouter } from "next/navigation";

import { CurriculumManagement } from "@/components/admin/curriculum-management";
import {
  curriculumProgramKeys,
  curriculumProgramMeta,
  isCurriculumProgramKey,
  type CurriculumProgramKey,
} from "@/hooks/useCurriculumManagementData";

export default function CurriculumManagementAdminPage() {
  const params = useParams<{ programKey: string }>();
  const router = useRouter();

  const rawProgramKey = params?.programKey ?? "";
  const isValidProgramKey = isCurriculumProgramKey(rawProgramKey);

  React.useEffect(() => {
    if (!isValidProgramKey) {
      router.replace("/admin/curriculum/national");
    }
  }, [isValidProgramKey, router]);

  if (!isValidProgramKey) {
    return null;
  }

  const programKey = rawProgramKey as CurriculumProgramKey;

  return (
    <div className="space-y-6">
      <Tabs
        aria-label="Curriculum programs"
        classNames={{
          tabList:
            "w-full gap-6 overflow-x-auto rounded-none border-b border-divider p-0",
          cursor: "w-full bg-blue-600",
          tab: "h-12 max-w-fit px-0",
          tabContent:
            "font-bold text-default-500 group-data-[selected=true]:text-blue-600",
        }}
        color="primary"
        selectedKey={programKey}
        variant="underlined"
        onSelectionChange={(key) =>
          router.push(`/admin/curriculum/${String(key)}`)
        }
      >
        {curriculumProgramKeys.map((key) => (
          <Tab key={key} title={curriculumProgramMeta[key].label} />
        ))}
      </Tabs>

      <CurriculumManagement programKey={programKey} />
    </div>
  );
}
