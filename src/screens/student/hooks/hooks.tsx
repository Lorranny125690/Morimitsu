import { useMemo } from "react";
import { useStudent } from "@/context/studentContext";
import type { Student } from "@/screens/student/types/type";

type Filters = Record<string, boolean>;

export function useDisplayStudents(
  filters: Filters,
  alphabetical: boolean
): Student[] {
  const { students } = useStudent();

  return useMemo(() => {
    let list = [...students];

    // 🔹 filtro por presenças
    if (filters.presencas) {
      list = list.filter((s) => s.current_frequency > 0);
    }

    // 🔹 pega SOMENTE filtros que são nomes de turma
    const activeClassFilters = Object.keys(filters).filter(
      (key) => key !== "presencas" && filters[key]
    );

    // 🔹 filtra alunos pelas turmas
    if (activeClassFilters.length > 0) {
      list = list.filter((student) =>
        student.classes?.some((c) =>
          activeClassFilters.includes(c.class.name)
        )
      );
    }

    // 🔹 ordenação alfabética
    if (alphabetical) {
      list.sort((a, b) => {
        const nameA = (a.social_name || a.name).toLowerCase();
        const nameB = (b.social_name || b.name).toLowerCase();

        return nameA.localeCompare(nameB, "pt-BR", {
          sensitivity: "base",
        });
      });
    }

    return list;
  }, [students, filters, alphabetical]);
}
