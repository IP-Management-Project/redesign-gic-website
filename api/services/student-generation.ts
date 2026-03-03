import { apiClient } from "../axiosClient";

export interface StudentGenerationCard {
  id: string;
  name: string;
  quote: string;
  image: string;
  generation: string;
  order?: number;
}

export interface StudentGenerationApiResponse {
  generations: Record<string, StudentGenerationCard[]>;
  positions: string[];
}

export interface CreateStudentPayload {
  name: string;
  quote: string;
  image: string;
}

export interface UpdateStudentPayload {
  name?: string;
  quote?: string;
  image?: string;
}

export interface BulkStudentPayload {
  name: string;
  quote: string;
  image: string;
  generation: string;
}

export const studentGenerationApi = {
  // GET /student-generations
  getAll: async (): Promise<StudentGenerationApiResponse> => {
    return apiClient.get<StudentGenerationApiResponse>('/student-generations');
  },

  // POST /student-generations/:generation - Add student to a generation
  create: async (generation: string, data: CreateStudentPayload): Promise<StudentGenerationApiResponse> => {
    return apiClient.post<StudentGenerationApiResponse>(`/student-generations/${encodeURIComponent(generation)}`, data);
  },

  // PATCH /student-generations/:id - Update a student
  update: async (id: string, data: UpdateStudentPayload): Promise<StudentGenerationApiResponse> => {
    return apiClient.patch<StudentGenerationApiResponse>(`/student-generations/${id}`, data);
  },

  // POST /student-generations/bulk - Bulk import students
  bulkCreate: async (students: BulkStudentPayload[]): Promise<StudentGenerationApiResponse> => {
    return apiClient.post<StudentGenerationApiResponse>('/student-generations/bulk', { students });
  },

  // DELETE /student-generations/:id - Delete a student
  delete: async (id: string): Promise<StudentGenerationApiResponse> => {
    return apiClient.delete<StudentGenerationApiResponse>(`/student-generations/${id}`);
  }
};
