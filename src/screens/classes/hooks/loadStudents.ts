import { useEffect, useState } from "react";
import { api } from "@/context/authContext";
import type { User } from "../types/type";

// Hook para carregar os professores
export const useTeachers = () => {
  const [teachers, setTeachers] = useState<User[]>([]);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const res = await api.get<{ users: User[] }>("/user");
        const onlyTeachers = res.data.users.filter((u) => u.role === "TEACHER" || u.role === "ADMIN");
        setTeachers(onlyTeachers);
      } catch (err) {
        console.error("Erro ao carregar professores", err);
      }
    };

    loadTeachers();
  }, []);

  return teachers;
};
