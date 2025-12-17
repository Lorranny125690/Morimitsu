// src/hooks/useStudentForm.ts
import { useEffect, useState } from "react";
import { useStudent } from "@/context/studentContext";
import {
  computeAgeFromString,
  StudentStepDataSchema,
  StudentStepAddressSchema,
  StudentFullSchema,
  formatZodErrors,
} from "../../validations/validations";

export interface FormDataType {
  name: string;
  phone: string;
  image_student_url: string;
  email: string;
  cpf: string;
  gender: string;
  birth_date: string;
  current_frequency: number;
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
  file_image: File | null;
  status: string;
  total_frequency: number;
}

export function useStudentForm(goNext?: () => void) {
  const { onRegisterStudent } = useStudent();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");
  const [onConfirm, setOnConfirm] = useState(false)
  const [createdStudentId, setCreatedStudentId] = useState<string>("");

  const [zodFieldErrors, setZodFieldErrors] = useState<Record<string, string>>(
    {}
  );

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
    status: "",
    total_frequency: 0
  });

  // ----------------------------------------------------------
  // HANDLE CHANGE
  // ----------------------------------------------------------
  const handleChange = (e: any) => {
    if (!e?.target) return;

    const { name, value, files } = e.target;

    // arquivo
    if (files?.[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image_student_url: URL.createObjectURL(file),
        file_image: file,
      }));
      return;
    }

    const numericFields = ["current_frequency"];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? value === "" ? 0 : Number(value)
        : value,
    }));
  };

  // ----------------------------------------------------------
  // VALIDATIONS
  // ----------------------------------------------------------
  const validateStepData = (data: FormDataType): string | null => {
    const idade = computeAgeFromString(data.birth_date);
    const parsed = StudentStepDataSchema.safeParse({
      ...data,
      idade,
    });

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
      guardian_phone: data.guardian_phone || undefined,
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
  // SUBMIT
  // ----------------------------------------------------------
  const handleSubmit = async () => {
    const idade = computeAgeFromString(formData.birth_date);
    const toValidate = { ...formData, idade };

    const parsed = StudentFullSchema.safeParse(toValidate);

    if (!parsed.success) {
      const formatted = formatZodErrors(parsed.error);
      setModalMsg(formatted.message);
      setModalType("error");
      setModalVisible(true);
      setZodFieldErrors(formatted.byField);
      return;
    }

    const data = new FormData();

    Object.entries(toValidate).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        key === "file_image" ||
        key === "image_student_url"
      ) {
        return;
      }

      data.append(key, String(value));
    });

    if (formData.file_image) {
      data.append("image_student_url", formData.file_image);
    }

    const res = await onRegisterStudent(data);

    if (!res.error) {
      setModalMsg("🎉 Aluno cadastrado com sucesso!");
      setModalType("success");
      setModalVisible(true);
      setOnConfirm(true)
      console.log(res.data.student.id)
      setCreatedStudentId(res.data.student.id);
      goNext?.();
      return;
    }

    setModalMsg(res.message || "Erro ao cadastrar aluno");
    setModalType("error");
    setModalVisible(true);
  };

  // ----------------------------------------------------------
  // AUTO AGE
  // ----------------------------------------------------------
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      idade: computeAgeFromString(prev.birth_date),
    }));
  }, [formData.birth_date]);

  // ----------------------------------------------------------
  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    validateStepData,
    validateStepAddress,
    modalVisible,
    modalMsg,
    modalType,
    setModalVisible,
    setModalType,
    setModalMsg,
    zodFieldErrors,
    onConfirm,
    createdStudentId
  };
}
