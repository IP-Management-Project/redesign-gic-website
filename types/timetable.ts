export type SessionType = "C" | "TD" | "TP";

export interface TimetableSession {
  id: string;
  academicYear: string;
  semester: string;
  day: string;
  timeSlot: string;
  subject: string;
  lecturer: string;
  type: SessionType;
  group?: string;
  code?: string;
}

export interface CreateTimetableDto {
  academicYear: string;
  semester: string;
  day: string;
  timeSlot: string;
  subject: string;
  lecturer: string;
  type: SessionType;
  group?: string;
  code?: string;
}
