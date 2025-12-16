import { useMemo } from "react";
import type { Student } from "../types/type";

export function useDisplayStudents(
  students: Student[],
  filters: Record<string, boolean>,
  alphabetical: boolean
) {
  return useMemo(() => {
    let result = [...students];

    const activeFilters = Object.keys(filters).filter(f => filters[f]);

    // 🔥 SE NÃO TEM FILTRO ATIVO, NÃO FILTRA
    if (activeFilters.length > 0) {
      result = result.filter(student =>
        student.classes?.some(c =>
          activeFilters.includes(c.class.name)
        )
      );
    }

    if (alphabetical) {
      result.sort((a, b) =>
        (a.social_name || a.name)
          .localeCompare(b.social_name || b.name)
      );
    }

    return result;
  }, [students, filters, alphabetical]);
}
