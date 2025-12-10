// src/hooks/useStudentForm.ts
import { useEffect, useState } from "react";
import { useStudent } from "@/context/studentContext";

export interface FormDataType {
  name: string;
  phone: string;
  image_student_url: string; // preview ONLY
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
  enrollment?: string;
  idade: number;
  social_name: string;
  file_image: File | null; // FILE REAL
}

export function useStudentForm() {
  const { onRegisterStudent } = useStudent();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");

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
    social_name: "",
    file_image: null,
  });

  // ----------------------------------------------------------
  // HANDLE INPUT CHANGE + FILE HANDLER
  // ----------------------------------------------------------
  const handleChange = (e: any) => {
    if (!e?.target) return;

    const { name, value, files } = e.target;

    // --- Trata imagem ---
    if (files && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);

      setFormData(prev => ({
        ...prev,
        image_student_url: preview, // preview pra UI
        file_image: file, // o arquivo REAL
      }));

      return;
    }

    // --- Campos normais ---
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

    const validateStepData = (data: FormDataType): string | null => {
    if (!data.name) return "O nome é obrigatório";
    if (!data.phone) return "O telefone é obrigatório";
    if (data.phone.length < 11 || data.phone.length > 12) return "O número deve conter 9 + DDD dígitos"
    if (!data.birth_date) return "A data de nascimento é obrigatória";

    if (data.idade < 3 || data.idade > 120)
      return "Idade inválida";

    if (!data.current_frequency) return "A frequência atual é obrigatória";
    if (!data.belt) return "A faixa é obrigatória";
    if (!data.grade) return "A série escolar é obrigatória";

    return null;
  };

  const validateStepAddress = (data: FormDataType): string | null => {
    if (!data.city) return "Cidade é obrigatória";
    if (!data.street) return "Rua é obrigatória";
    if (!data.district) return "Bairro é obrigatório";
    if (!data.number) return "Número é obrigatório";
    if (data.guardian_phone.length < 11 || data.guardian_phone.length > 12) return "O número deve conter 9 + DDD dígitos"

    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm(formData);

    if (error) {
      setModalMsg("Preencha todos os campos obrigatórios");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    const data = new FormData();

    // Campos de texto
    Object.entries({
      name: formData.name,
      phone: formData.phone,
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
      idade: String(formData.idade),
    }).forEach(([key, val]) => {
      data.append(key, val || "");
    });

    // Campo do arquivo — nome EXATO do backend
    if (formData.file_image) {
      data.append("image_student_url", formData.file_image);
    }

    console.log("ENVIANDO FILE:", formData.file_image);

    const res = await onRegisterStudent(data);

    // Erro:
    if (res.error) {
      setModalMsg(res.msg || "Erro ao cadastrar aluno");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    // Sucesso:
    setModalMsg("Aluno cadastrado com sucesso!");
    setModalType("success");
    setModalVisible(true);

    // RESET
    setFormData({
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
      social_name: "",
      file_image: null,
    });
  };

  // ----------------------------------------------------------
  // AUTO-CALCULA IDADE
  // ----------------------------------------------------------
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

  const validateForm = (data: FormDataType): string | null => {
    if (!data.name) return "O nome é obrigatório";
    if (data.name.length < 3) return "O nome deve ter no mínimo 3 caracteres";

    if (!data.phone) return "O telefone é obrigatório";
    if (!/^\d{10,11}$/.test(data.phone)) return "Telefone inválido (somente números, 10-11 dígitos)";

    if (!data.birth_date) return "A data de nascimento é obrigatória";

    // idade automática
    if (data.idade < 3 || data.idade > 120) return "Idade inválida";

    if (!data.belt) return "A graduação (faixa) é obrigatória";
    if (!data.grade) return "O grau é obrigatório";

    // valida email somente se informado
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
      return "Email inválido";
    }

    if (data.cpf && !/^\d{11}$/.test(data.cpf)) {
      return "CPF inválido (somente números, 11 dígitos)";
    }

    return null; // tudo OK!
  };

  // ----------------------------------------------------------
  return {
    formData,
    handleChange,
    handleSubmit,
    modalVisible,
    modalMsg,
    modalType,
    setModalVisible,
    setModalType, 
    setModalMsg,

   // ADD:
    validateStepData,
    validateStepAddress
  };
}
