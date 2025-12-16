import { api } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import type { FormDataType } from "../types/type";

export const useCreateClass = (formData: FormDataType) => {
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await api.post("/class/create", {
        name: formData.name,
        teacher_id: formData.teacher_id,
        local: formData.local,
        image_class_url: formData.image_class_url,
      });

      // Navega para a página anterior após a criação
      navigate(-1);
    } catch (error) {
      console.error("Erro ao criar classe:", error);
    }
  };

  return {
    handleCreate
  };
};
