import { useState } from "react";
import type { FormDataType } from "../types/type";

export const useForm = (initialState: FormDataType) => {
  const [formData, setFormData] = useState<FormDataType>(initialState);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return {
    formData,
    handleChange,
    setFormData,
  };
};
