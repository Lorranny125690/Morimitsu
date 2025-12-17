import { motion } from "framer-motion";
import { ModalMsg } from "@/components/modal";
import { useForm } from "../hooks/change";
import type { FormDataType } from "../types/type";
import { useTeachers } from "../hooks/loadStudents";
import { useCreateClass } from "../services/create";
import { turmasRecentes } from "./images";

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

export function ModalAdicionarAluno({open, onClose}: Props) {
  if (!open) return null;
  const { formData, handleChange, setFormData } = useForm(initialFormData);
  const teachers = useTeachers();
  const { handleCreate, setModalVisible, onConfirm, modalMsg, modalType, modalVisible } = useCreateClass(formData);

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
                className="w-full h-8 text-[12px] text-white border border-gray-300 rounded px-3 focus:ring-2 focus:ring-blue-400 shadow-sm"
              >
                <option className="text-black" value="">Selecione um professor</option>
                {teachers.map((teacher) => (
                  <option className="text-black" key={teacher.id} value={teacher.id}>
                    {teacher.username}
                  </option>
                  ))}
              </select>
            </div>

          <div className="mt-2">
            <label className="block text-[11px] text-gray-400 mb-2">
              Imagem da turma
            </label>

            <div className="max-h-[160px] overflow-y-auto pr-1">
              <div className="grid grid-cols-3 gap-3">
                {turmasRecentes.map((turma) => {
                  const selected = formData.image_class_url === turma.imagem;

                  return (
                    <button
                      key={turma.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          image_class_url: turma.imagem,
                        }))
                      }
                      className={`
                        relative aspect-square rounded-lg overflow-hidden
                        border transition-all
                        ${selected
                          ? "border-[#4963F5] ring-2 ring-[#4963F5]/40 scale-[1.03]"
                          : "border-white/10 hover:border-white/30"
                        }
                      `}
                    >
                      <img
                        src={turma.imagem}
                        alt={turma.nome}
                        className="w-full h-full object-cover"
                      />

                      {selected && (
                        <div className="absolute inset-0 bg-[#4963F5]/30 flex items-center justify-center">
                          <span className="bg-[#4963F5] text-white text-[10px] px-2 py-1 rounded-full">
                            Selecionada
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
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
            onClick={handleCreate}
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
