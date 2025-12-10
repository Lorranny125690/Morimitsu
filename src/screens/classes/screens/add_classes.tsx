import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../assets/image4.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { api } from "@/context/authContext";

type FormDataType = {
  name: string;
  teacher_id: string;
  local: string;
  file_image: File | null;
};

export function AddClass() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    teacher_id: "",
    local: "",
    file_image: null,
  });

  // ========= HANDLERS ======================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({
      ...prev,
      file_image: file,
    }));
  };

  const handleCreate = async () => {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("teacher_id", String(formData.teacher_id));
    data.append("local", formData.local);

    // 👉 ENVIA O ARQUIVO COM O NOME CORRETO EXIGIDO PELA API
    if (formData.file_image) {
      data.append("image_class_url", formData.file_image);
    }

    await api.post(`/class/create`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate(-1);
  };

  // =========================================

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#41414B] flex-col">
      {/* Voltar */}
      <div className="w-full px-6 m-[-50px] flex justify-start max-w-7xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="hover:cursor-pointer text-gray-300 hover:text-white transition"
        >
          <IoMdArrowRoundBack size={28} />
        </button>
      </div>

      {/* Container */}
      <div className="relative w-full max-w-7xl h-[721px] bg-white flex items-center justify-center shadow-xl overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-[40%] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-white" />

        <motion.div
          className="relative flex gap-12 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white shadow-lg flex flex-col items-center w-[679px] h-[410px] border border-gray-100 justify-between">
            <div className="flex flex-col w-full">
              <div className="border-b-2 border-gray-200 py-5 mb-4 flex items-center">
                <h3 className="px-4 text-gray-700 font-medium text-[10px]">Dados</h3>
                <h3 className="hover:cursor-pointer text-gray-400 font-regular text-[10px]">
                  Enturmar
                </h3>
              </div>

              {/* FORM */}
              <form className="flex items-center justify-center flex-col gap-6">
                {/* NOME */}
                <div>
                  <label className="block text-[10px] text-black">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-50 h-5 text-[12px] text-black border-gray-300 border rounded-[2px] py-3 px-3 mt-[2px] focus:ring-2 focus:ring-blue-400 box-border shadow-md"
                  />
                </div>

                {/* PROFESSOR ID */}
                <div>
                  <label className="block text-[10px] text-black">Professor (ID)</label>
                  <input
                    type="string"
                    name="teacher_id"
                    value={formData.teacher_id}
                    onChange={handleChange}
                    className="w-50 h-5 text-[12px] text-black border-gray-300 border rounded-[2px] py-3 px-3 mt-[2px] focus:ring-2 focus:ring-blue-400 box-border shadow-md"
                  />
                </div>

                {/* LOCAL */}
                <div>
                  <label className="block text-[10px] text-black">Local</label>
                  <input
                    type="text"
                    name="local"
                    value={formData.local}
                    onChange={handleChange}
                    className="w-50 h-5 text-[12px] text-black border-gray-300 border rounded-[2px] py-3 px-3 mt-[2px] focus:ring-2 focus:ring-blue-400 box-border shadow-md"
                  />
                </div>

                {/* IMAGEM */}
                <div>
                  <label className="block text-[10px] text-black">Imagem da Turma</label>
                  <input
                    type="file"
                    name="file_image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-50 h-5 text-[12px] text-black"
                  />
                </div>
              </form>

              {/* BOTÕES */}
              <div className="flex justify-end items-center mt-8 space-x-6">
                <button
                  onClick={() => navigate(-1)}
                  type="button"
                  className="text-gray-400 text-[10px] hover:text-gray-600 transition"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleCreate}
                  className="hover:cursor-pointer mr-5 bg-blue-500 hover:bg-blue-600 text-white text-[10px] rounded-full h-[30px] w-[90px] shadow-md transition"
                >
                  Enturmar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
