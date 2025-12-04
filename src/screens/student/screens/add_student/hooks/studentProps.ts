// src/hooks/useStudentForm.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "@/context/studentContext";

export interface FormDataType {
  photo: string;
  name: string;
  phone: string;
  image_student_url: string;
  email: string;
  cpf: string;
  gender: string;
  birth_date: string;
  current_frequency: string;
  belt: string;
  grade: string;
  city: string;
  street: string;
  district: string;
  number: string;
  complement: string;
  guardian_phone: string;
  enrollment: string;
  idade: number;
}

export function useStudentForm() {
  const navigate = useNavigate();
  const { onRegisterStudent } = useStudent();

  const [formData, setFormData] = useState<FormDataType>({
    photo: "",
    name: "José Marcelo Bezerra Filho",
    phone: "33998764356",
    image_student_url:
      "https://coisadefotografa.com/wp-content/uploads/2021/09/como-ter-fotos-mais-nitidas-scaled.jpg",
    email: "marcelo@gmail.com",
    cpf: "09865432145",
    gender: "MALE",
    birth_date: "2025-10-31",
    current_frequency: "13",
    belt: "WHITE",
    grade: "1",
    city: "Cedro",
    street: "Rua B",
    district: "Prado",
    number: "123",
    complement: "Casa",
    guardian_phone: "33998764356",
    enrollment: "12",
    idade: 0
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateAge = (dateStr: string) => {
    if (!dateStr) return 0;
    const today = new Date();
    const birth = new Date(dateStr);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  // Atualiza idade quando birth_date mudar
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      idade: calculateAge(prev.birth_date),
    }));
  }, [formData.birth_date]);

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      phone: formData.phone,
      image_student_url: formData.image_student_url,
      email: formData.email,
      cpf: formData.cpf,
      gender: formData.gender,
      birth_date: formData.birth_date,
      current_frequency: formData.current_frequency,
      belt: formData.belt,
      grade: formData.grade,
      city: formData.city,
      street: formData.street,
      district: formData.district,
      number: formData.number,
      complement: formData.complement,
      guardian_phone: formData.guardian_phone,
      enrollment: formData.enrollment,
    };

    const result = await onRegisterStudent(payload);

    if (result.error) {
      alert(result.msg || "Erro ao cadastrar aluno.");
      return;
    }

    alert("Aluno cadastrado com sucesso!");
    navigate(-1);
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
}
