import { api } from "@/context/authContext";
import type { Class } from "../components/type";

export const getClasses = async (): Promise<Class[]> => {
  const token = localStorage.getItem("my-jwt");

  try {
    const res = await api.get("/class", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.classes ?? [];
  } catch (error: any) {
    // 👇 Se não tem turmas, NÃO é erro de UI
    if (error.response?.status === 404) {
      return [];
    }

    throw error; // outros erros continuam sendo erro
  }
};

export const deleteClass = async (id: string): Promise<void> => {
  const token = localStorage.getItem("my-jwt");

  await api.delete(`/class/${id}`, {
    headers: {
      Authorization: `Bearer ${token}` },
  });
};
