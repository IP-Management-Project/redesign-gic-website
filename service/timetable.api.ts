import { request } from "@/lib/http";
import { TimetableSession, CreateTimetableDto } from "@/types/timetable";

export const TimetableApi = {
  list(year?: string, semester?: string) {
    const params = new URLSearchParams();

    if (year) params.append("year", year);
    if (semester) params.append("semester", semester);

    const query = params.toString();
    const url = query ? `/timetable?${query}` : "/timetable";

    return request<TimetableSession[]>("get", url);
  },

  create(data: CreateTimetableDto) {
    return request<TimetableSession>("post", "/timetable", data);
  },

  update(id: string, data: Partial<CreateTimetableDto>) {
    return request<TimetableSession>("patch", `/timetable/${id}`, data);
  },

  delete(id: string) {
    return request<void>("delete", `/timetable/${id}`);
  },

  replaceAll(data: CreateTimetableDto[]) {
    return request<TimetableSession[]>("post", "/timetable/replace", data);
  },
};
