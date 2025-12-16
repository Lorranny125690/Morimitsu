import type { Student } from "@/screens/student/types/type";

type Class = {
  id: string;
  teacher_id: string;
  image_class_url: string | null;
  name: string;
  local: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  belt: string;
  image_user_url: string | null;
  password: string;
  role: "ADMIN" | "TEACHER";
  createdAt: string;
  updatedAt: string;
  classes: Class[];
  studentData?: Student;
};