import { useStudent } from "@/context/studentContext";

export const useHandleStudent = () => {
  const { onGetStudent } = useStudent();

  const getStudents = async () => {
    const res = await onGetStudent();
    return res.data;
  };

  return { getStudents };
};
