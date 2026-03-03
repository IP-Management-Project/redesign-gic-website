import { apiClient } from "../axiosClient";

export interface CalendarEvent {
  id: string;
  month: string;
  title: string;
  type: "Exam" | "Admin" | "Academic" | "Holiday";
  startDate: string;
  endDate?: string;
  cite: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AcademicCalendarResponse {
  months: string[];
  events: CalendarEvent[];
  glossary: GlossaryItem[];
}

export interface CreateCalendarEventDto {
  month: string;
  title: string;
  type: "Exam" | "Admin" | "Academic" | "Holiday";
  startDate: string;
  endDate?: string;
  cite: number;
}

export interface UpdateCalendarEventDto {
  month?: string;
  title?: string;
  type?: "Exam" | "Admin" | "Academic" | "Holiday";
  startDate?: string;
  endDate?: string;
  cite?: number;
}

export interface CreateGlossaryItemDto {
  term: string;
  description: string;
}

export interface UpdateGlossaryItemDto {
  term?: string;
  description?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const calendarApi = {
  // Public endpoint - Get academic calendar with all events and glossary
  getAcademicCalendar: () => 
    apiClient.get<AcademicCalendarResponse>('/calendar'),

  // Calendar Event Management
  createEvent: (data: CreateCalendarEventDto) =>
    apiClient.post<CalendarEvent>('/calendar/events', data),

  findAllEvents: (params?: PaginationParams) =>
    apiClient.get<PaginatedResponse<CalendarEvent>>('/calendar/events', { params }),

  findOneEvent: (id: string) =>
    apiClient.get<CalendarEvent>(`/calendar/events/${id}`),

  updateEvent: (id: string, data: UpdateCalendarEventDto) =>
    apiClient.patch<CalendarEvent>(`/calendar/events/${id}`, data),

  removeEvent: (id: string) =>
    apiClient.delete<void>(`/calendar/events/${id}`),

  // Glossary Management
  createGlossaryItem: (data: CreateGlossaryItemDto) =>
    apiClient.post<GlossaryItem>('/calendar/glossary', data),

  findAllGlossaryItems: (params?: PaginationParams) =>
    apiClient.get<PaginatedResponse<GlossaryItem>>('/calendar/glossary', { params }),

  findOneGlossaryItem: (id: string) =>
    apiClient.get<GlossaryItem>(`/calendar/glossary/${id}`),

  updateGlossaryItem: (id: string, data: UpdateGlossaryItemDto) =>
    apiClient.patch<GlossaryItem>(`/calendar/glossary/${id}`, data),

  removeGlossaryItem: (id: string) =>
    apiClient.delete<void>(`/calendar/glossary/${id}`),
};
