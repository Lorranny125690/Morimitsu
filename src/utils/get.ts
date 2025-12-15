import { api } from "@/context/authContext";

/* -------- Tipagens -------- */
export interface SummaryResponse {
  statistics: {
    quant_students: number;
    fits_to_graduate: number;
    media_frequency: number;
    quant_classes: number;
    quant_teachers: number;
    future_classrooms: number;
  };
}

export interface GraphicResponse {
  graphic: Record<string, number>;
}

export interface WeekGraphic {
  name: string;
  presences: number;
}

export interface MonthGraphic {
  name: string;
  value: number;
}

/* -------- Requests -------- */
export function getSummary() {
  return api.get<SummaryResponse>("/statistics/summary");
}

export function getWeekGraphic() {
  return api.get<GraphicResponse>("/statistics/week-graphic");
}

export function getMonthGraphic() {
  return api.get<GraphicResponse>("/statistics/month-graphic");
}

export async function getSummaryParsed() {
  const { data } = await getSummary();
  const s = data.statistics;

  return {
    totalStudents: s.quant_students,
    studentsEligible: s.fits_to_graduate,
    avgAttendancePercent: s.media_frequency,
    activeClasses: s.quant_classes,
    totalTeachers: s.quant_teachers,
    futureClasses: s.future_classrooms,
  };
}

