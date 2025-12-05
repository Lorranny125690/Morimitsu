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
  });

  /** ----------------------------------
   *  HANDLE CHANGE — universal handler
   * ---------------------------------- */
  const handleChange = (e: any) => {
    // Caso seja mudança manual (como você faz para imagem)
    if (!e.target) return;

    const { name, value, files } = e.target;

    // Caso seja file input
    if (files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);

      setFormData(prev => ({
        ...prev,
        [name]: url,     // preview
        file_image: file // arquivo real p/ API (se quiser)
      }));

      return;
    }

    // Input normal
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /** ----------------------------------
   *  Função para calcular idade
   * ---------------------------------- */
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

  const handleSubmit = async () => {
    console.log("ENVIANDO PARA API:", formData);

    const result = await onRegisterStudent(formData);

    if (result.error) {
      alert(result.msg || "Erro ao cadastrar aluno.");
      return;
    }

    alert("Aluno cadastrado com sucesso!");
    navigate(-1);
  };

  return { formData, handleChange, handleSubmit };
}
