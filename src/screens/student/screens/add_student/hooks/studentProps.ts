// src/hooks/useStudentForm.ts
import { useEffect, useState } from "react";
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
  file_image?: File | null;
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

  /** HANDLE CHANGE */
  const handleChange = (e: any) => {
    if (!e?.target) return;

    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);

      setFormData(prev => ({
        ...prev,
        image_student_url: preview, // preview only for UI
        file_image: file,
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /** VALIDATION helper */
  const hasEmptyRequired = (data: FormDataType) => {
    // liste aqui só os campos obrigatórios que o backend exige
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

  /** HANDLE SUBMIT */
  const handleSubmit = async () => {
    // validação antes de criar FormData
    if (hasEmptyRequired(formData)) {
      setModalMsg("Preencha todos os campos obrigatórios");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    const data = new FormData();

    // append fields explicitamente (evita enviar preview e undefined)
    data.append("name", formData.name || "");
    data.append("phone", formData.phone || "");
    data.append("email", formData.email || "");
    data.append("cpf", formData.cpf || "");
    data.append("gender", formData.gender || "");
    data.append("birth_date", formData.birth_date || "");
    data.append("current_frequency", formData.current_frequency || "");
    data.append("belt", formData.belt || "");
    data.append("grade", formData.grade || "");
    data.append("city", formData.city || "");
    data.append("street", formData.street || "");
    data.append("district", formData.district || "");
    data.append("number", formData.number || "");
    data.append("complement", formData.complement || "");
    data.append("guardian_phone", formData.guardian_phone || "");
    data.append("enrollment", formData.enrollment || "");
    data.append("idade", String(formData.idade || 0));

    // --- IMPORTANT: nome do campo do arquivo deve ser o que o backend espera ---
    // eu coloquei "image" — se o backend espera "image_student_url" ou "file" troque aqui.
    if (formData.file_image) {
      data.append("image", formData.file_image);
    }

    // debug (remova em prod)
    console.log("Submitting form: file_image ->", formData.file_image);
    // também dá pra inspecionar o FormData se quiser:
    // for (const pair of data.entries()) console.log(pair[0], pair[1]);

    const res = await onRegisterStudent(data);

    // lidar com a resposta
    if (res.error) {
      setModalMsg(res.msg || "Erro ao cadastrar aluno");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    // sucesso provável
    setModalMsg("Aluno cadastrado com sucesso!");
    setModalType("success");
    setModalVisible(true);
    // opcional: limpar form
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
