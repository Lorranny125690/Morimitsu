import { useState } from "react";
import type { FormDataType } from "./type";

export const [formData, setFormData] = useState<FormDataType>({
  name: "",
  teacher_id: "",
  local: "",
  image_class_url: "",
});