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
  enrollment: string;
  idade: number;
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

  // ----------------------------------------------------------
  // REQUIRED FIELDS
  // ----------------------------------------------------------
  const hasEmptyRequired = (data: FormDataType) => {
    const required = [
      "name",
      "phone",
      "birth_date",
      "current_frequency",
      "belt",
      "grade",
      "enrollment",
    ];

    return required.some(key => {
      const v = (data as any)[key];
      return v === "" || v === null || v === undefined;
    });
  };

  // ----------------------------------------------------------
  // SUBMIT (MULTIPART FORMA CORRETA)
  // ----------------------------------------------------------
  const handleSubmit = async () => {
    if (hasEmptyRequired(formData)) {
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

  // ----------------------------------------------------------
  return {
    formData,
    handleChange,
    handleSubmit,
    modalVisible,
    modalMsg,
    modalType,
    setModalVisible,
  };
}
