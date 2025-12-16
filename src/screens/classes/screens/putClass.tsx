import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import bgImage from "../../../assets/image4.png";
import { ModalMsg } from "@/components/modal";
import { useEffect } from "react";
import { useForm } from "../hooks/change";
import type { FormDataType } from "../types/type";
import { useCreateClass } from "../services/create";
import { motion } from "framer-motion";
import { useTeachers } from "../hooks/loadStudents";
import { turmasRecentes } from "../components/images";

// Dados iniciais para o formulário
const initialFormData: FormDataType = {
  name: "",
  teacher_id: "",
  local: "",
  image_class_url: "",
};

export function PutClass() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
    <div className="flex min-h-screen items-center justify-center bg-[#41414B] flex-col">
      {/* VOLTAR */}
      <div className="w-full px-6 flex justify-start max-w-7xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-white transition"
        >
          <IoMdArrowRoundBack size={28} />
        </button>
      </div>

      {/* CONTAINER PRINCIPAL */}
      <div className="relative w-full max-w-7xl h-[721px] bg-white shadow-xl overflow-hidden">
        {/* TOPO COM IMAGEM */}
        <div
          className="absolute top-0 left-0 w-full h-[40%] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        {/* BASE BRANCA */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-white" />

        <motion.div
          className="relative z-10 flex justify-center items-center h-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* CARD */}
          <div className="bg-white shadow-lg w-[680px] h-[460px] border border-gray-100 flex flex-col">
            {/* HEADER */}
            <div className="border-b border-gray-200 px-6 py-4 flex gap-4">
              <span className="text-[10px] text-gray-700 font-medium">Dados</span>
              <span className="text-[10px] text-gray-400">Enturmar</span>
            </div>

            {/* FORM */}
            <form className="flex-1 overflow-hidden flex flex-col">
              {/* CAMPOS */}
              <div className="flex flex-col gap-5 px-6 py-4">
                <div>
                  <label className="block text-[10px] text-black mb-1">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-8 text-[12px] text-black border border-gray-300 rounded px-3 focus:ring-2 focus:ring-blue-400 shadow-sm"
                  />
                </div>

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

                <div>
                  <label className="block text-[10px] text-black mb-1">Local</label>
                  <input
                    type="text"
                    name="local"
                    value={formData.local}
                    onChange={handleChange}
                    className="w-full h-8 text-[12px] text-black border border-gray-300 rounded px-3 focus:ring-2 focus:ring-blue-400 shadow-sm"
                  />
                </div>
              </div>

              {/* IMAGENS */}
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

              {/* FOOTER FIXO */}
              <div className="mt-auto border-t border-gray-200 px-6 py-4 flex justify-end gap-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-gray-400 text-[10px] hover:text-gray-600 transition"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-[10px] rounded-full h-[32px] w-[100px] shadow-md transition"
                >
                  Enturmar
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
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
