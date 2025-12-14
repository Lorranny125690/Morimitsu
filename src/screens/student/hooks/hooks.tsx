import { useMemo } from "react";
import { useStudent } from "@/context/studentContext";
import type { Student } from "@/screens/student/types/type";

interface Filters {
  presencas: boolean;
  mista: boolean;
  feminina: boolean;
  masculina: boolean;
  baby: boolean;
  kids: boolean;
}

export function useDisplayStudents(
  filters: Filters,
  alphabetical: boolean
): Student[] {
  const { students } = useStudent();

  return useMemo(() => {
    let list = [...students];

    if (filters.feminina) list = list.filter(s => s.gender === "F");
    if (filters.masculina) list = list.filter(s => s.gender === "M");
    if (filters.mista) list = list.filter(s => s.classType === "mista");
    if (filters.baby) list = list.filter(s => s.classType === "baby");
    if (filters.kids) list = list.filter(s => s.classType === "kids");
    if (filters.presencas) list = list.filter(s => s.frequency > 0);

    if (alphabetical) {
      list.sort((a, b) =>
        a.social_name.localeCompare(b.social_name, "pt-BR", {
          sensitivity: "base",
        })
      );
    }

    return list;
  }, [students, filters, alphabetical]);
}
