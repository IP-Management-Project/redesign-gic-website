import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { 
  studentGenerationApi, 
  type StudentGenerationApiResponse,
  type StudentGenerationCard,
  type CreateStudentPayload,
  type UpdateStudentPayload,
  type BulkStudentPayload
} from "@/api/services/student-generation";

export type StudentEntry = {
  id: string;
  name: string;
  quote: string;
  image: string;
  generation: string;
};

export type StudentFormState = {
  id?: string;
  name: string;
  quote: string;
  image: string;
  generation: string;
};

export type StudentFilters = {
  search: string;
  genFilter: string;
};

const emptyForm: StudentFormState = {
  name: "",
  quote: "",
  image: "",
  generation: "",
};

// function flatten data from API response to array
function flattenStudentData(data: StudentGenerationApiResponse | undefined): StudentEntry[] {
  if (!data?.generations) return [];
  
  const entries: StudentEntry[] = [];
  Object.entries(data.generations).forEach(([generation, students]) => {
    students.forEach((student: StudentGenerationCard) => {
      entries.push({
        id: student.id,
        name: student.name,
        quote: student.quote,
        image: student.image,
        generation,
      });
    });
  });
  return entries;
}

type UseStudentGenerationOptions = {
  perPage?: number;
};

export function useStudentGenerationData(options: UseStudentGenerationOptions = {}) {
  const { perPage = 20 } = options;
  const queryClient = useQueryClient();

  // 1. Local UI State
  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [form, setForm] = useState<StudentFormState>(emptyForm);
  
  const [filters, setFilters] = useState<StudentFilters>({
    search: "",
    genFilter: "ALL",
  });

  // 2. SERVER FETCHING
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["studentGenerations"],
    queryFn: studentGenerationApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 3. Data Transformation
  const allEntries = useMemo(() => flattenStudentData(response), [response]);

  const generations = useMemo(() => 
    ["ALL", ...Array.from(new Set(allEntries.map((e) => e.generation)))].sort(),
  [allEntries]);

  // 4. Client-Side Filtering
  const filtered = useMemo(() => {
    return allEntries.filter((entry) => {
      const matchesSearch = 
        entry.name.toLowerCase().includes(filters.search.toLowerCase()) || 
        entry.quote.toLowerCase().includes(filters.search.toLowerCase());
      const matchesGen = filters.genFilter === "ALL" || entry.generation === filters.genFilter;
      return matchesSearch && matchesGen;
    });
  }, [allEntries, filters.search, filters.genFilter]);

  // 5. Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  // --- MUTATIONS ---

  const createMutation = useMutation({
    mutationFn: (data: { generation: string; payload: CreateStudentPayload }) => 
      studentGenerationApi.create(data.generation, data.payload),
    onSuccess: () => {
      addToast({ title: "Success", description: "Student added to yearbook", color: "success" });
      queryClient.invalidateQueries({ queryKey: ["studentGenerations"] });
      setIsFormOpen(false);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      addToast({ title: "Error", description: err.message || "Failed to add student", color: "danger" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; payload: UpdateStudentPayload }) => 
      studentGenerationApi.update(data.id, data.payload),
    onSuccess: () => {
      addToast({ title: "Updated", description: "Student profile updated", color: "success" });
      queryClient.invalidateQueries({ queryKey: ["studentGenerations"] });
      setIsFormOpen(false);
      setForm(emptyForm);
    },
    onError: (err: any) => {
      addToast({ title: "Error", description: err.message || "Failed to update student", color: "danger" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: studentGenerationApi.delete,
    onSuccess: () => {
      addToast({ title: "Deleted", description: "Student removed from yearbook", color: "success" });
      queryClient.invalidateQueries({ queryKey: ["studentGenerations"] });
      setIsDeleting(null);
    },
    onError: (err: any) => {
      addToast({ title: "Error", description: err.message || "Failed to delete student", color: "danger" });
    }
  });

  // --- CSV Bulk Import ---
  const [csvPreview, setCsvPreview] = useState<BulkStudentPayload[]>([]);
  const [csvError, setCsvError] = useState<string | null>(null);

  const bulkMutation = useMutation({
    mutationFn: studentGenerationApi.bulkCreate,
    onSuccess: (_, variables) => {
      addToast({ title: "Imported", description: `${variables.length} students added to yearbook`, color: "success" });
      queryClient.invalidateQueries({ queryKey: ["studentGenerations"] });
      setIsBulkOpen(false);
      setCsvPreview([]);
      setCsvError(null);
    },
    onError: (err: any) => {
      addToast({ title: "Import Failed", description: err.message || "Bulk import failed", color: "danger" });
    }
  });

  function parseCsvFile(file: File) {
    setCsvError(null);
    setCsvPreview([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
        if (lines.length < 2) {
          setCsvError("CSV must have a header row and at least one data row.");
          return;
        }

        const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
        const nameIdx = header.indexOf("name");
        const quoteIdx = header.indexOf("quote");
        const imageIdx = header.indexOf("image");
        const genIdx = header.indexOf("generation");

        if (nameIdx === -1 || quoteIdx === -1 || imageIdx === -1 || genIdx === -1) {
          setCsvError("CSV header must contain: name, quote, image, generation");
          return;
        }

        const rows: BulkStudentPayload[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",").map((c) => c.trim());
          const name = cols[nameIdx] || "";
          const quote = cols[quoteIdx] || "";
          const image = cols[imageIdx] || "";
          const generation = cols[genIdx] || "";

          if (!name || !generation) continue; // skip invalid rows
          rows.push({ name, quote, image, generation });
        }

        if (rows.length === 0) {
          setCsvError("No valid rows found. Each row needs at least a name and generation.");
          return;
        }

        setCsvPreview(rows);
      } catch {
        setCsvError("Failed to parse CSV file. Please check the format.");
      }
    };
    reader.onerror = () => setCsvError("Failed to read the file.");
    reader.readAsText(file);
  }

  function bulkUpload() {
    if (csvPreview.length === 0) return;
    bulkMutation.mutate(csvPreview);
  }

  function closeBulk() {
    setIsBulkOpen(false);
    setCsvPreview([]);
    setCsvError(null);
  }

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.genFilter]);

  function openCreate() {
    setForm(emptyForm);
    setIsFormOpen(true);
  }

  function openEdit(entry: StudentEntry) {
    setForm({ ...entry });
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setForm(emptyForm);
  }

  function upsert() {
    if (!form.name.trim() || !form.generation.trim()) {
      addToast({ title: "Validation Error", description: "Name and Generation are required", color: "warning" });
      return;
    }

    if (form.id) {
      updateMutation.mutate({ 
        id: form.id, 
        payload: { 
          name: form.name, 
          quote: form.quote, 
          image: form.image 
        } 
      });
    } else {
      createMutation.mutate({ 
        generation: form.generation, 
        payload: { 
          name: form.name, 
          quote: form.quote, 
          image: form.image 
        } 
      });
    }
  }

  function confirmDelete() {
    if (isDeleting) {
      deleteMutation.mutate(isDeleting);
    }
  }

  function resetFilters() {
    setFilters({ search: "", genFilter: "ALL" });
  }

  return {
    // Data
    data: response,
    entries: allEntries,
    filtered,
    paginated,
    generations,
    isLoading,
    error,

    // State
    filters,
    form,
    isFormOpen,
    isBulkOpen,
    isDeleting,
    page,
    totalPages,

    // CSV Bulk
    csvPreview,
    csvError,

    // Setters
    setFilters,
    setForm,
    setIsFormOpen,
    setIsBulkOpen,
    setIsDeleting,
    setPage,

    // Actions
    openCreate,
    openEdit,
    closeForm,
    upsert,
    confirmDelete,
    resetFilters,
    parseCsvFile,
    bulkUpload,
    closeBulk,

    // Mutation states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeletePending: deleteMutation.isPending,
    isBulkUploading: bulkMutation.isPending,
  };
}

// Legacy export for backward compatibility with existing components
export { type StudentGenerationCard, type StudentGenerationApiResponse as StudentGenerationData } from "@/api/services/student-generation";
