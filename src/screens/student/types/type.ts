interface Teacher {
  id: string;
  username: string;
  email: string;
  image_user_url: string | null;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  createdAt: string;
  updatedAt: string;
}

interface Class {
  id: string;
  teacher_id: string;
  image_class_url: string | null;
  name: string;
  local: string;
  createdAt: string;
  updatedAt: string;
  teacher: Teacher;
}

interface StudentClass {
  id: string;
  student_id: string;
  class_id: string;
  createdAt: string;
  updatedAt: string;
  class: Class;
}

export type Student = {
  id: any;
  username: string;
  name: string;
  number: string;
  belt: string;
  degree: string;
  status: string;
  current_frequency: number;
  total_frequency: number;
  photo?: string;
  phone: string;
  birth_date: string;
  enrollment: string;
  email: string;
  gender: string;
  image_student_url: string;
  social_name: string;
  role: string;
  classType: string;
  cpf: string;
  grade: string;
  city: string;
  street: string;
  district: string;
  classes: StudentClass[];
};