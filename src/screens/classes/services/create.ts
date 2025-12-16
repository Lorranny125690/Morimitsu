import { api } from "@/context/authContext";
import type { FormDataType } from "../types/type";
import { useState } from "react";

export const useCreateClass = (formData: FormDataType) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");
  const [onConfirm, setOnConfirm] = useState(false)

  const handleCreate = async () => {
    // Verificação de campos vazios
    if (!formData.name || !formData.teacher_id || !formData.local) {
      alert("Todos os campos precisam ser preenchidos!");  // Alerta ou mensagem de erro para o usuário
      return;
    }

    try {
      const response = await api.post("/class/create", {
        name: formData.name,
        teacher_id: formData.teacher_id,
        local: formData.local,
        image_class_url: formData.image_class_url,
      });

      // Verifique o status de sucesso
      if (response.status === 201) {
        setModalMsg("Turma criada com sucesso!");
        setModalType("success")
        setModalVisible(true)
        setOnConfirm(true)
      }
    } catch (error: any) {
      if (error.response) {
        // Se a resposta do erro for do tipo 401
        if (error.response.status === 401) {
          setModalMsg("Acesso negado. Você não tem permissão para criar a turma.");
          setModalType("error")
          setModalVisible(true)
        }
        // Se a resposta do erro for do tipo 404
        if (error.response.status === 404) {
          setModalMsg("Instrutor não encontrado. Verifique o ID do professor.");
          setModalType("error")
          setModalVisible(true)
        }
      } else {
        console.error("Erro ao criar classe:", error);
        setModalMsg("Ocorreu um erro ao tentar criar a turma.");
        setModalType("error")
        setModalVisible(true)
      }
    }
  };

  const handlePutClass = async (id: string) => {
    if (!formData.name || !formData.teacher_id || !formData.local || !formData.image_class_url) {
      alert("Todos os campos precisam ser preenchidos!");
      return;
    }

    try {
      const res = await api.put(`/class/update/${id}`, {
        name: formData.name,
        teacher_id: formData.teacher_id,
        local: formData.local,
        image_class_url: formData.image_class_url,
      });

      if (res.status === 201) {
        setModalMsg("Turma criada com sucesso!");
        setModalType("success")
        setModalVisible(true)
        setOnConfirm(true)
      }
    } catch (error: any) {
      if (error.response) {
        // Se a resposta do erro for do tipo 401
        if (error.response.status === 401) {
          setModalMsg("Acesso negado. Você não tem permissão para criar a turma.");
          setModalType("error")
          setModalVisible(true)
        }
        // Se a resposta do erro for do tipo 404
        if (error.response.status === 404) {
          setModalMsg("Instrutor não encontrado. Verifique o ID do professor.");
          setModalType("error")
          setModalVisible(true)
        }
      } else {
        console.error("Erro ao criar classe:", error);
        setModalMsg("Ocorreu um erro ao tentar criar a turma.");
        setModalType("error")
        setModalVisible(true)
      }
    }
  };

  return {
    handleCreate,
    modalVisible,
    modalMsg,
    modalType,
    setModalVisible,
    onConfirm,
    handlePutClass
  };
};
