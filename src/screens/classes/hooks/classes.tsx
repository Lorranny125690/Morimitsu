import { useQuery } from "@tanstack/react-query";
import { deleteClass, getClasses } from "../services/services";

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}
