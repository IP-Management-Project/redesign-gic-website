import { apiClient } from "../axiosClient";

export interface TimetableItem {
  id: string;
  year?: string;
  semester?: string;
  courseCode?: string;
  courseName?: string;
  instructor?: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  section?: string;
  credits?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTimetableDto {
  year?: string;
  semester?: string;
  courseCode?: string;
  courseName?: string;
  instructor?: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  section?: string;
  credits?: number;
}

export interface UpdateTimetableDto {
  year?: string;
  semester?: string;
  courseCode?: string;
  courseName?: string;
  instructor?: string;
  day?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  section?: string;
  credits?: number;
}

export interface TimetableQueryParams {
  year?: string;
  semester?: string;
}

export const timetableApi = {
  // Get all timetables with optional filters
  findAll: (params?: TimetableQueryParams) =>
    apiClient.get<TimetableItem[]>('/timetable', { params }),

  // Create a new timetable entry
  create: (data: CreateTimetableDto) =>
    apiClient.post<TimetableItem>('/timetable', data),

  // Update an existing timetable entry
  update: (id: string, data: UpdateTimetableDto) =>
    apiClient.patch<TimetableItem>(`/timetable/${id}`, data),

  // Delete a timetable entry
  remove: (id: string) =>
    apiClient.delete<void>(`/timetable/${id}`),

  // Replace all timetable entries (bulk operation)
  replaceAll: (data: CreateTimetableDto[]) =>
    apiClient.post<TimetableItem[]>('/timetable/replace', data),
};
