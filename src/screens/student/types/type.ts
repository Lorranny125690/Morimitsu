
export type Student = {
  id: number;
  name: string;
  number: string;
  belt: string;
  degree: string;
  status: string;
  frequency: number;
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
  classes: [{id: string, student_id: string, class_id: string}];
};