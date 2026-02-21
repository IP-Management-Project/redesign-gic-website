import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast"; // Assuming you have this
import { facultyApi, type FacultyApiResponse, type FacultyApiItem } from "@/api/services/faculty";

// --- Types ---
export type FacultyGroup = "management" | "lecturers" | "researchers" | "staff";

export type FacultyMember = {
  id: string;
  name: string;
  group: FacultyGroup;
  role: string;
  degree: string;
  focus: string;
  portrait: string;
  uniLogo: string;
};

export type FacultySortKey = "NAME_AZ" | "NAME_ZA";

export type FacultyFilters = {
  query: string;
  groupFilter: FacultyGroup | "ALL";
  sortKey: FacultySortKey;
};

export type FacultyFormState = Omit<FacultyMember, "id"> & { id?: string };

const emptyForm: FacultyFormState = {
  name: "",
  group: "lecturers",
  role: "",
  degree: "",
  focus: "",
  portrait: "",
  uniLogo: "",
};

// --- Helper: Convert API Sort to Backend Params ---
function getBackendSortParams(key: FacultySortKey) {
  switch (key) {
    case "NAME_AZ": return { sortBy: "name", sortDir: "ASC" as const };
    case "NAME_ZA": return { sortBy: "name", sortDir: "DESC" as const };
    default: return { sortBy: "name", sortDir: "ASC" as const };
  }
}

// --- Helper: Flatten API Response to UI Array ---
function flattenAndMapFaculty(data: FacultyApiResponse | undefined): FacultyMember[] {
  if (!data) return [];
  
  const groups: FacultyGroup[] = ["management", "lecturers", "researchers", "staff"];
  
  return groups.flatMap(group => {
    const items = data[group] || [];
    return items.map((item: FacultyApiItem) => ({
      id: item.id,
      name: item.name,
      group: group, // Force the group key from the object key
      role: item.role || "",
      degree: item.degree || "",
      focus: item.focus || "",
      portrait: item.portrait || "",
      uniLogo: item.uniLogo || "",
    }));
  });
}

// --- MAIN HOOK ---

type FacultyCentralizeOptions = {
  perPage?: number;
};

export function useFacultyCentralize(options: FacultyCentralizeOptions = {}) {
  const { perPage = 6 } = options;
  const queryClient = useQueryClient();

  // 1. Local UI State
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FacultyFormState>(emptyForm);
  
  const [filters, setFilters] = useState<FacultyFilters>({
    query: "",
    groupFilter: "ALL",
    sortKey: "NAME_AZ",
  });

  // 2. SERVER FETCHING
  // We pass search and sort to the server
  const backendParams = {
    q: filters.query || undefined,
    ...getBackendSortParams(filters.sortKey),
  };

  const { data: response, isLoading } = useQuery({
    queryKey: ["faculty-groups", backendParams],
    queryFn: () => facultyApi.getAll(backendParams),
    placeholderData: (prev) => prev, // Keep previous data while fetching new sort
  });

  const rawData = response;

  // 3. Data Transformation & Stats
  // We flatten the data immediately for the grid
  const allMembers = useMemo(() => flattenAndMapFaculty(rawData), [rawData]);

  const stats = useMemo(() => {
    // If we are searching, the stats should probably reflect the *total* counts, 
    // but here we calculate based on returned data. 
    // If the API filters groups based on 'q', this is correct.
    return {
      management: rawData?.management?.length || 0,
      lecturers: rawData?.lecturers?.length || 0,
      researchers: rawData?.researchers?.length || 0,
      staff: rawData?.staff?.length || 0,
    };
  }, [rawData]);

  // 4. Client-Side Group Filtering & Pagination
  // (Since the API returns all groups, we filter the "Active Tab" on the client)
  const filtered = useMemo(() => {
    if (filters.groupFilter === "ALL") return allMembers;
    return allMembers.filter(m => m.group === filters.groupFilter);
  }, [allMembers, filters.groupFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  // --- MUTATIONS ---

  const createMutation = useMutation({
    mutationFn: facultyApi.create,
    onSuccess: () => {
      addToast({ title: "Success", description: "Profile created", color: "success" });
      queryClient.invalidateQueries({ queryKey: ["faculty-groups"] });
      setIsOpen(false);
    },
    onError: (err: any) => {
      addToast({ title: "Error", description: err.message || "Failed to create", color: "danger" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: string; data: Partial<FacultyFormState> }) => 
      facultyApi.update(vars.id, vars.data),
    onSuccess: () => {
      addToast({ title: "Updated", description: "Profile updated successfully", color: "success" });
      queryClient.invalidateQueries({ queryKey: ["faculty-groups"] });
      setIsOpen(false);
    },
    onError: (err: any) => {
      addToast({ title: "Error", description: err.message || "Failed to update", color: "danger" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: facultyApi.delete,
    onSuccess: () => {
      addToast({ title: "Deleted", description: "Profile removed", color: "success" });
      queryClient.invalidateQueries({ queryKey: ["faculty-groups"] });
    },
    onError: (err: any) => {
      addToast({ title: "Error", description: err.message || "Failed to delete", color: "danger" });
    }
  });

  // --- ACTIONS ---

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters.query, filters.groupFilter, filters.sortKey]);

  function openCreate() {
    setForm(emptyForm);
    setIsOpen(true);
  }

  function openEdit(member: FacultyMember) {
    setForm({ ...member });
    setIsOpen(true);
  }

  function upsert() {
    if (!form.name.trim()) return;

    if (form.id) {
      updateMutation.mutate({ id: form.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  }

  function remove(member: FacultyMember) {
    deleteMutation.mutate(member.id);
  }

  function resetFilters() {
    setFilters({ query: "", groupFilter: "ALL", sortKey: "NAME_AZ" });
  }

  return {
    // Data
    members: allMembers, // The full list
    filtered,            // The list after Group Filter is applied
    paginated,           // The list for the current page
    stats,
    isLoading,

    // State
    filters,
    form,
    isOpen,
    page,
    totalPages,

    // Setters
    setFilters,
    setForm,
    setIsOpen,
    setPage,

    // Actions
    openCreate,
    openEdit,
    closeModal: () => setIsOpen(false),
    upsert,
    remove,
    resetFilters,
  };
}