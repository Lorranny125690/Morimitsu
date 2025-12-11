// src/hooks/useStudentForm.ts
import { useEffect, useState } from "react";
import { useStudent } from "@/context/studentContext";
import { computeAgeFromString, StudentStepDataSchema, formatZodErrors, StudentStepAddressSchema, StudentFullSchema } from "../../validations/validations";

export interface FormDataType {
  name: string;
  phone: string;
  image_student_url: string; // preview ONLY
  email: string;
  cpf: string;
  gender: string;
  birth_date: string;
  current_frequency: number;
  belt: string;
  grade: number;
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

// ------------------ HOOK ------------------
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
    current_frequency: 0,
    belt: "",
    grade: 0,
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

  const [zodFieldErrors, setZodFieldErrors] = useState<Record<string, string>>({}); // para UI por-campo

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
  
      setFormData((prev) => ({
        ...prev,
        image_student_url: preview,
        file_image: file,
      }));
  
      return;
    }
  
    // --- Campos que DEVEM ser number ---
    const numericFields = ["grade", "current_frequency"]; 
  
    let finalValue = value;
  
    if (numericFields.includes(name)) {
      finalValue = value === "" ? "" : Number(value);
    }
  
    // --- Campos normais ---
    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };  

  // ----------------------------------------------------------
  // VALIDATION HELPERS (usando zod)
  // ----------------------------------------------------------
  const validateStepData = (data: FormDataType): string | null => {
    // recompute idade from birth_date to ensure zod sees correct number
    const computedAge = computeAgeFromString(data.birth_date);
    const toValidate = { ...data, idade: computedAge };

    const parsed = StudentStepDataSchema.safeParse(toValidate);
    if (parsed.success) {
      setZodFieldErrors({});
      return null;
    }

    const formatted = formatZodErrors(parsed.error);
    setZodFieldErrors(formatted.byField);
    return formatted.message;
  };

  const validateStepAddress = (data: FormDataType): string | null => {
    const parsed = StudentStepAddressSchema.safeParse({
      city: data.city,
      street: data.street,
      district: data.district,
      number: data.number,
      guardian_phone: data.guardian_phone,
    });

    if (parsed.success) {
      setZodFieldErrors({});
      return null;
    }

    const formatted = formatZodErrors(parsed.error);
    setZodFieldErrors(formatted.byField);
    return formatted.message;
  };

  // ----------------------------------------------------------
  // SUBMIT (usa StudentFullSchema)
  // ----------------------------------------------------------
  const handleSubmit = async () => {
    // antes de enviar, atualiza idade automaticamente
    const idadeAtual = computeAgeFromString(formData.birth_date);
    const toValidate = { ...formData, idade: idadeAtual };

    // validação completa com zod
    const parsed = StudentFullSchema.safeParse(toValidate);

    if (!parsed.success) {
      const formatted = formatZodErrors(parsed.error);
      setModalMsg(formatted.message || "Existem erros no formulário");
      setModalType("error");
      setModalVisible(true);
      setZodFieldErrors(formatted.byField);
      return;
    }

    // tudo ok => monta FormData para envio ao backend
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
      idade: String(idadeAtual),
    }).forEach(([key, val]) => {
      data.append(key, String(val ?? ""));
    });

    if (formData.file_image) {
      data.append("image_student_url", formData.file_image);
    }

    // Chamada real
    const res = await onRegisterStudent(data);

    console.log("RESPOSTA DO BACK:", res);

    const backendMessage =
    res?.message ||
    res?.data?.message ||
    "O servidor retornou um erro desconhecido.";

    if (!res.error && (res.status === 201 || res.data?.status === 201)) {
      setModalMsg("🎉 Aluno cadastrado com sucesso!");
      setModalType("success");
      setModalVisible(true);
      return; // <---- ESSENCIAL
    }
    
    // daqui pra baixo só erros
    switch (res.status) {
      case 400:
      case 401:
      case 409:
      case 422:
        setModalMsg(backendMessage);
        setModalType("error");
        break;
    
      default:
        setModalMsg(backendMessage);
        setModalType("error");
        break;
    }
    
    setModalVisible(true);    

    setModalVisible(true);

    // Resetar apenas no 200
    if (res.status === 200) {
      setFormData({
        name: "",
        phone: "",
        image_student_url: "",
        email: "",
        cpf: "",
        gender: "",
        birth_date: "",
        current_frequency: 0,
        belt: "",
        grade: 0,
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
      setZodFieldErrors({});
    }
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
    setFormData((prev) => ({
      ...prev,
      idade: calculateAge(prev.birth_date),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setModalType,
    setModalMsg,
    setFormData,

    // ADD:
    validateStepData,
    validateStepAddress,

    // expose raw zod field errors so UI can show under inputs
    zodFieldErrors,
    // expose helper to format any ZodError if you prefer to handle errors elsewhere
    formatZodErrors,
  };
}
