import type {
  FacultyFormState,
  FacultyGroup,
  FacultySortKey,
} from "@/hooks/useFacultyCentralize";
import { apiClient } from "../axiosClient";
import { SortDir } from "../service.type";

export interface FacultyApiResponse {
  management: FacultyApiItem[];
  lecturers: FacultyApiItem[];
  researchers: FacultyApiItem[];
  staff: FacultyApiItem[];
}

export interface FacultyApiItem {
  id: string;
  name: string;
  category: string;
  role: string | null;
  degree: string | null;
  focus: string | null;
  portrait: string | null;
  uniLogo: string | null;
}

export const facultyApi = {
  // GET /staff/groups?q=...&sortBy=...&sortDir=...
  getAll: async (params: {
    q?: string;
    sortBy?: string;
    sortDir?: SortDir;
  }) => {
    return apiClient.get<FacultyApiResponse>("/staff/groups", { params });
  },

  // POST /staff
  create: async (data: Partial<FacultyFormState>) => {
    // Map frontend 'group' to backend 'category' if needed, or send as is
    const payload = { ...data, category: data.group };
    return apiClient.post("/staff", payload);
  },

  // PUT /staff/:id
  update: async (id: string, data: Partial<FacultyFormState>) => {
    const payload = { ...data, category: data.group };
    return apiClient.put(`/staff/${id}`, payload);
  },

  // DELETE /staff/:id
  delete: async (id: string) => {
    return apiClient.delete(`/staff/${id}`);
  },
};
