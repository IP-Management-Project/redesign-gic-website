"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Chip, Divider } from "@heroui/react";
import {
  BookOpen,
  GraduationCap,
  Globe,
  BookMarked,
  FlaskConical,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

import { CurriculumManagement } from "@/components/admin/curriculum-management";
import {
  curriculumProgramMeta,
  curriculumProgramKeys,
  isCurriculumProgramKey,
  type CurriculumProgramKey,
} from "@/hooks/useCurriculumManagementData";

// --- Program metadata enriched with icons and colors ---
const programConfig: Record<
  CurriculumProgramKey,
  { icon: React.ReactNode; color: "primary" | "success" | "warning" | "secondary" }
> = {
  national: {
    icon: <GraduationCap size={28} />,
    color: "primary",
  },
  international: {
    icon: <Globe size={28} />,
    color: "success",
  },
  associate: {
    icon: <BookMarked size={28} />,
    color: "warning",
  },
  master: {
    icon: <FlaskConical size={28} />,
    color: "secondary",
  },
};

// --- Program Switcher Card ---
function ProgramCard({
  programKey,
  isActive,
  onClick,
}: {
  programKey: CurriculumProgramKey;
  isActive: boolean;
  onClick: () => void;
}) {
  const meta = curriculumProgramMeta[programKey];
  const config = programConfig[programKey];

  return (
    <button
      onClick={onClick}
      className={`group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
        isActive
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
          : "border-divider bg-content1 hover:border-primary/40 hover:bg-default-50"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
          isActive
            ? "bg-primary text-white"
            : "bg-default-100 text-default-500 group-hover:bg-primary/10 group-hover:text-primary"
        }`}
      >
        {config.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
          {meta.label}
        </p>
      </div>
      {isActive && (
        <ChevronRight size={16} className="shrink-0 text-primary" />
      )}
    </button>
  );
}

// --- Main Page ---
export default function CurriculumAdminPage() {
  const params = useParams();
  const router = useRouter();

  const rawKey = Array.isArray(params?.programKey)
    ? params.programKey[0]
    : params?.programKey ?? "";

  const programKey = isCurriculumProgramKey(rawKey) ? rawKey : null;

  // --- Invalid program key guard ---
  if (!programKey) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8">
        <div className="flex items-center gap-3 text-danger">
          <AlertTriangle size={36} />
          <h2 className="text-2xl font-black uppercase tracking-tight">
            Unknown Program
          </h2>
        </div>
        <p className="max-w-md text-center text-default-500">
          <span className="font-mono font-bold text-foreground">&quot;{rawKey}&quot;</span> is
          not a valid curriculum program. Choose one below.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {curriculumProgramKeys.map((key) => (
            <Button
              key={key}
              color="primary"
              variant="flat"
              onPress={() => router.push(`/admin/curriculum/${key}`)}
            >
              {curriculumProgramMeta[key].label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  const meta = curriculumProgramMeta[programKey];
  const config = programConfig[programKey];

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 pb-24">

      {/* ── Page Header ── */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-5">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] bg-primary/10 text-primary shadow-inner`}>
            <BookOpen size={32} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-default-400">
              Curriculum Management
            </p>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              {meta.label}
            </h1>
            <p className="mt-1 max-w-xl text-sm text-default-500">
              {meta.description}
            </p>
          </div>
        </div>
        <Chip
          variant="flat"
          color={config.color}
          size="lg"
          className="shrink-0 self-start font-bold"
          startContent={<span className="ml-1">{config.icon}</span>}
        >
          {meta.label}
        </Chip>
      </div>

      <Divider className="opacity-40" />

      {/* ── Program Switcher ── */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-default-400">
          Switch Program
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {curriculumProgramKeys.map((key) => (
            <ProgramCard
              key={key}
              programKey={key}
              isActive={key === programKey}
              onClick={() => router.push(`/admin/curriculum/${key}`)}
            />
          ))}
        </div>
      </div>

      <Divider className="opacity-40" />

      {/* ── Curriculum Management Table (fully program-aware) ── */}
      <CurriculumManagement programKey={programKey} />

    </div>
  );
}