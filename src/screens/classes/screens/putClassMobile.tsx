import { motion } from "framer-motion";
import { ModalMsg } from "@/components/modal";
import { useForm } from "../hooks/change";
import type { FormDataType } from "../types/type";
import { useTeachers } from "../hooks/loadStudents";
import { useCreateClass } from "../services/create";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { turmasRecentes } from "../components/images";

interface Props {
  open: boolean;
  onClose: () => void;
}

const initialFormData: FormDataType = {
  name: "",
  teacher_id: "",
  local: "",
  image_class_url: "",
};

export function ModalMudarAluno({open, onClose}: Props) {
  if (!open) return null;
  const { id } = useParams();
  const location = useLocation();
  const teachers = useTeachers();
  
  // Pegando os dados da turma pela navegação
  const classData = location.state; // Renomeado para classData, que é mais claro

  const { formData, handleChange, setFormData } = useForm(initialFormData);
  
  // Usando o hook para editar a turma
  const { handlePutClass, setModalVisible, onConfirm, modalMsg, modalType, modalVisible } = useCreateClass(formData);

  // Atualizando os dados do formulário ao carregar os dados da turma
  useEffect(() => {
    console.log(classData); // Verifique os dados recebidos
    if (classData) {
      setFormData({
        name: classData.name ?? "",
        teacher_id: classData.teacher_id ?? "",
        local: classData.local ?? "",
        image_class_url: classData.image_class_url ?? "",
      });
    }
  }, [classData, setFormData]);
  

  // Função de submit
  const handleSubmit = async () => {
    if (id) {
      await handlePutClass(id); // Passando id diretamente para o PUT
    }
  };

  return (
    <div className="fixed inset-0 bg-[#011023]/50 backdrop-blur-sm flex items-center justify-center z-[1000]">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#000A16] overflow-y-auto max-w-[332px] max-h-[480px] rounded-xl shadow-xl p-6 relative"
      >

        {/* Abas */}
        <div className="w-full flex items-center justify-center mb-4">
          <div className="flex border-b border-gray-200 w-full justify-center pb-2">
            <p className="text-white text-sm mx-6 border-b-2 border-[#4963F5] pb-1">
              Dados
            </p>
            <p className="text-gray-400 text-sm mx-6 cursor-pointer">
              Enturmar
            </p>
          </div>
        </div>

          {/* Nome */}
          <div>
            <label className="text-xs text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Telefone */}
          <div>
                  <label className="block text-[10px] text-black mb-1">Professor</label>
                  <select
                    name="teacher_id"
                    value={formData.teacher_id}
                    onChange={handleChange}
                    className="w-full h-8 text-[12px] text-black border border-gray-300 rounded px-3 focus:ring-2 focus:ring-blue-400 shadow-sm"
                  >
                    <option value="">Selecione um professor</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.username}
                      </option>
                    ))}
                  </select>
                </div>

          {/* Foto */}
          <div className="px-6">
                <label className="block overflow-hidden text-[10px] text-black mb-2">
                  Escolha uma imagem
                </label>

                <div className="max-h-[140px] pr-1">
                  <div className="grid grid-cols-5 gap-3">
                    {turmasRecentes.map((turma) => (
                      <button
                        key={turma.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            image_class_url: turma.imagem,
                          }))
                        }
                        className={`relative w-24 h-24 rounded-md overflow-hidden border-2 transition
                          ${
                            formData.image_class_url === turma.imagem
                              ? "border-blue-500 scale-105"
                              : "border-transparent hover:border-gray-300"
                          }`}
                      >
                        <img
                          src={turma.imagem}
                          alt={turma.nome}
                          className="w-full h-full object-cover"
                        />

                        {formData.image_class_url === turma.imagem && (
                          <div className="absolute inset-0 bg-blue-500/40 flex items-center justify-center text-white text-[10px] font-semibold">
                            Selecionada
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

          {/* E-mail */}
          <div>
            <label className="text-xs text-gray-700">Local</label>
            <input
              type="text"
              name="local"
              value={formData.local}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

        {/* Botões */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="text-gray-500 text-sm hover:text-gray-700"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="bg-[#4963F5] hover:bg-[#345ed3] text-white px-5 py-2 rounded-full text-sm"
          >
            Próximo
          </button>
        </div>
      </motion.div>
      <ModalMsg
      show={modalVisible}
      onClose={() => setModalVisible(false)}
      message={modalMsg}
      onConfirm={() => onConfirm}
      type={modalType}
      />
    </div>
  );
}
