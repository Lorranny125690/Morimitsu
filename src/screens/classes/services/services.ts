import { api } from "@/context/authContext";
import type { Class } from "../components/type";

export const getClasses = async (): Promise<Class[]> => {
  const token = localStorage.getItem("my-jwt");
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role")?.toUpperCase();

  try {
    let url = "";

    if (role === "ADMIN") {
      url = "/class";
    } else if (role === "TEACHER" && userId) {
      url = `/user/classes/${userId}`;
    } else {
      return [];
    }

    const res = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 🔥 Normaliza retorno
    return res.data?.classes ?? res.data ?? [];
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }

    throw error;
  }
};

export const deleteClass = async (id: string): Promise<void> => {
  const token = localStorage.getItem("my-jwt");

  await api.delete(`/class/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
