import { api } from "@/context/authContext";
import type { Class } from "../components/type";

export const getClasses = async (): Promise<Class[]> => {
  const token = localStorage.getItem("my-jwt");

  const res = await api.get("/class", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.classes;
};

export const deleteClass = async (id: string): Promise<void> => {
  const token = localStorage.getItem("my-jwt");

  await api.delete(`/class/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

