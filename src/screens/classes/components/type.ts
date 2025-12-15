import type { Student } from "@/screens/student/types/type";
// vínculo aluno ↔ turma
export type ClassStudent = {
  id: string;
  student_id: string;
  class_id: string;
  createdAt: string;
  updatedAt: string;
  student: Student;
};


export type Class = {
  id: string;
  teacher_id: string;
  name: string;
  image_class_url: string;
  local: string | null;
  createdAt: string;
  updatedAt: string;
  classMates: number;
  students: ClassStudent[];
  _count: {students: number};
};
