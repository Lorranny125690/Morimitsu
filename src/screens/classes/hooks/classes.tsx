import { useQuery } from "@tanstack/react-query";
import { deleteClass, getClasses } from "../services/services";

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStudent } from "@/context/studentContext";

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}

export function usePutStudentOnClassRQ(classId: string) {
  const { onPutStudentOnClass } = useStudent();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (studentId: string) =>
      onPutStudentOnClass(studentId, classId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class", classId] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}



