import { api } from "@/context/authContext";
import { useState, useEffect } from "react";

export const useFetchProfessores = (classes: { teacher_id: string }[]) => {
  const [professores, setProfessores] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const fetchProfessores = async () => {
      const token = localStorage.getItem("my-jwt");
      if (!token || !classes?.length) return;

      try {
        const results = await Promise.all(
          classes.map(async (classe) => {
            if (!classe.teacher_id) return null;

            const res = await api.get("/user/filter", {
              params: { id: classe.teacher_id },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            return {
              teacher_id: classe.teacher_id,
              name: res.data.users[0].username,
            };
          })
        );

        const map: Record<string, string> = {};
        results.forEach((item) => {
          if (item?.teacher_id && item?.name) {
            map[item.teacher_id] = item.name;
          }
        });

        setProfessores(map);
      } catch (err) {
        console.error("Erro ao buscar professores:", err);
      }
    };

    fetchProfessores();
  }, [classes]);

  return professores;
};
