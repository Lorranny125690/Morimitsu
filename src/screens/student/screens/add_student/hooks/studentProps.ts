// src/hooks/useStudentForm.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "@/context/studentContext";

export interface FormDataType {
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

  // 👇 ADICIONAR ISTO
  file_image?: File | null;
}

export function useStudentForm() {
  const navigate = useNavigate();
  const { onRegisterStudent } = useStudent();

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    phone: "",
    image_student_url: "",
    email: "",
    cpf: "",
    gender: "",
    birth_date: "",
    current_frequency: "",
    belt: "",
    grade: "",
    city: "",
    street: "",
    district: "",
    number: "",
    complement: "",
    guardian_phone: "",
    enrollment: "",
    idade: 0,
    file_image: null, // 👈 inicializado
  });

  /** HANDLE CHANGE */
  const handleChange = (e: any) => {
    if (!e.target) return;

    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);

      setFormData(prev => ({
        ...prev,
        image_student_url: preview, // usado só no front
        file_image: file            // arquivo real
      }));

      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /** HANDLE SUBMIT */
  const handleSubmit = async () => {
    const data = new FormData();

    // Envia tudo EXCETO o preview
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image_student_url" && key !== "file_image") {
        data.append(key, value as any);
      }
    });

    // Enviar o arquivo real
    if (formData.file_image) {
      data.append("image", formData.file_image);
    }

    const result = await onRegisterStudent(data);

    if (!result.error) {
      navigate(-1);
    }
  };

  /** CÁLCULO DE IDADE */
  const calculateAge = (dateStr: string) => {
    if (!dateStr) return 0;
    const today = new Date();
    const birth = new Date(dateStr);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      idade: calculateAge(prev.birth_date),
    }));
  }, [formData.birth_date]);

  return { formData, handleChange, handleSubmit };
}
