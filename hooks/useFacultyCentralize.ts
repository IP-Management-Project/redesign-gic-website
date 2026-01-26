import { useEffect, useMemo, useState } from "react";
import { facultyStaffMockData, type FacultyStaffData } from "@/hooks/useFacultyStaffData";
import type { FacultyProfile } from "@/hooks/useFacultySlideshowData";

export type FacultyGroup = keyof FacultyStaffData;

export type FacultyMember = FacultyProfile & {
  group: FacultyGroup;
  id: string;
};

export type FacultySortKey = "NAME_AZ" | "NAME_ZA";

export type FacultyFilters = {
  query: string;
  groupFilter: FacultyGroup | "ALL";
  sortKey: FacultySortKey;
};

export type FacultyFormState = {
  id?: string;
  name: string;
  group: FacultyGroup;
  role: string;
  degree: string;
  focus: string;
  portrait: string;
  uniLogo: string;
};

type FacultyCentralizeOptions = {
  initialMembers?: FacultyMember[];
  perPage?: number;
};

const emptyForm: FacultyFormState = {
  name: "",
  group: "lecturers",
  role: "",
  degree: "",
  focus: "",
  portrait: "",
  uniLogo: "",
};

const defaultFilters: FacultyFilters = {
  query: "",
  groupFilter: "ALL",
  sortKey: "NAME_AZ",
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function buildMemberId(name: string, group: FacultyGroup) {
  return `${normalize(name).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${group}`;
}

function flattenFaculty(data: FacultyStaffData): FacultyMember[] {
  return (Object.keys(data) as FacultyGroup[]).flatMap((group) =>
    data[group].map((member, index) => ({
      ...member,
      group,
      id: `${member.facultySlug || buildMemberId(member.name, group)}-${index}`,
      role: member.role ?? "",
    }))
  );
}

export function useFacultyCentralize(options: FacultyCentralizeOptions = {}) {
  const { initialMembers = flattenFaculty(facultyStaffMockData), perPage = 6 } = options;
  const [members, setMembers] = useState<FacultyMember[]>(initialMembers);
  const [filters, setFilters] = useState<FacultyFilters>(defaultFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FacultyFormState>(emptyForm);
  const [page, setPage] = useState(1);

  const stats = useMemo(() => {
    return (Object.keys(facultyStaffMockData) as FacultyGroup[]).reduce(
      (acc, group) => {
        acc[group] = members.filter((member) => member.group === group).length;
        return acc;
      },
      {
        management: 0,
        lecturers: 0,
        researchers: 0,
        staff: 0,
      } as Record<FacultyGroup, number>
    );
  }, [members]);

  const filtered = useMemo(() => {
    const q = normalize(filters.query);
    let list = [...members];

    if (filters.groupFilter !== "ALL") {
      list = list.filter((member) => member.group === filters.groupFilter);
    }

    if (q.length) {
      list = list.filter((member) => {
        const hay = normalize(
          `${member.name} ${member.role ?? ""} ${member.degree} ${member.focus} ${member.group}`
        );
        return hay.includes(q);
      });
    }

    list.sort((a, b) => {
      if (filters.sortKey === "NAME_ZA") {
        return b.name.localeCompare(a.name);
      }
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [filters, members]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [filters.query, filters.groupFilter, filters.sortKey]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  function openCreate() {
    setForm(emptyForm);
    setIsOpen(true);
  }

  function openEdit(member: FacultyMember) {
    setForm({
      id: member.id,
      name: member.name,
      group: member.group,
      role: member.role ?? "",
      degree: member.degree,
      focus: member.focus,
      portrait: member.portrait,
      uniLogo: member.uniLogo,
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function upsert() {
    if (!form.name.trim()) return;

    setMembers((prev) => {
      if (form.id) {
        return prev.map((member) =>
          member.id === form.id
            ? {
                ...member,
                name: form.name.trim(),
                group: form.group,
                role: form.role.trim(),
                degree: form.degree.trim(),
                focus: form.focus.trim(),
                portrait: form.portrait.trim(),
                uniLogo: form.uniLogo.trim(),
              }
            : member
        );
      }

      const id = buildMemberId(form.name, form.group);
      const facultySlug = id.replace(/-\w+$/, "");
      const created: FacultyMember = {
        id,
        name: form.name.trim(),
        facultySlug,
        group: form.group,
        role: form.role.trim(),
        degree: form.degree.trim(),
        focus: form.focus.trim(),
        portrait: form.portrait.trim(),
        uniLogo: form.uniLogo.trim(),
      };

      return [created, ...prev];
    });

    closeModal();
  }

  function remove(member: FacultyMember) {
    setMembers((prev) => prev.filter((entry) => entry.id !== member.id));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return {
    members,
    filtered,
    paginated,
    stats,
    filters,
    form,
    isOpen,
    page,
    perPage,
    totalPages,
    setFilters,
    setForm,
    setIsOpen,
    setPage,
    openCreate,
    openEdit,
    closeModal,
    upsert,
    remove,
    resetFilters,
  };
}
