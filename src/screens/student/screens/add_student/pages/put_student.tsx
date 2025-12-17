import { motion } from "framer-motion";
import { useStudentForm } from "../hooks/studentProps";
import { ModalMsg } from "@/components/modal";
import { useStudent } from "@/context/studentContext";
import { useEffect } from "react";
import type { Student } from "@/screens/student/types/type";

interface Props {
  open: boolean;
  onClose: () => void;
  student: Student;
}

export function ModalMudarAluno({ open, onClose, student }: Props) {
  const {
    setFormData,
    formData,
    handleChange,
    modalVisible,
    modalMsg,
    modalType,
    setModalVisible,
    setModalType,
    setModalMsg
  } = useStudentForm();

  const { onPutStudent } = useStudent();

  // ✅ PREENCHE O FORM QUANDO O MODAL ABRIR

  useEffect(() => {
    if (!student) return;
  
    setFormData(prev => ({
      ...prev, // 👈 MANTÉM idade, social_name, etc
      name: student.name ?? "",
      social_name: student.social_name ?? "",
      phone: student.phone ?? "",
      email: student.email ?? "",
      cpf: student.cpf ?? "",
      gender: student.gender ?? "",
      birth_date: student.birth_date
        ? new Date(student.birth_date).toISOString().split("T")[0]
        : "",
      belt: student.belt ?? "",
      grade: String(student.grade ?? ""), // 🔥 sempre string
      status: student.status ?? "",
      current_frequency: student.current_frequency ?? 0,
      total_frequency: student.total_frequency ?? 0,
  
      city: student.city ?? "",
      street: student.street ?? "",
      district: student.district ?? "",
      number: student.number ?? "",
      complement: student.complement ?? "",
  
      guardian_phone: student.guardian_phone ?? "",
      enrollment: student.enrollment ?? "",
  
      image_student_url: student.image_student_url ?? "",
      file_image: null,
    }));
  }, [student, setFormData]);   

  // ✅ SUBMIT USANDO O ID DO STUDENT
  const handleSubmit = async () => {
    let payload: FormData | Record<string, any>;

    if (formData.file_image) {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image_student_url") return;
        if (key === "file_image") {
          if (value) form.append("image_student_url", value);
          return;
        }
        if (value === null || value === undefined) return;

        if (key === "birth_date") {
          form.append("birth_date", String(value));
          return;
        }

        if (typeof value === "number") {
          form.append(key, String(value));
          return;
        }

        if (typeof value === "string" && value.trim() !== "") {
          form.append(key, value);
        }
      });

      payload = form;
    } else {
      payload = {
        ...formData,
        guardian_phone: formData.guardian_phone || undefined,
        enrollment: formData.enrollment || undefined,
        file_image: undefined,
        image_student_url: undefined,
      };
    }

    const res = await onPutStudent(student.id, payload);

    if (!res.error) {
      setModalMsg("Aluno atualizado com sucesso!");
      setModalType("success");
      setModalVisible(true);
    } else {
      setModalMsg(res.message || "Erro ao atualizar aluno");
      setModalType("error");
      setModalVisible(true);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    handleChange({
      target: {
        name: "image_student_url",
        value: preview,
        files: [file],
      },
    });
  };

  if (!open) return null;

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

        {/* Inputs */}
        <div className="flex flex-col gap-3 w-full">

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
            <label className="text-xs text-gray-700">Telefone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Foto */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-700">URL da foto</label>
            
            <label className="relative w-full cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 p-[2px]">
              <span className="block w-full text-center bg-gray-900 text-white font-medium rounded-full py-2 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Escolher arquivo
              </span>
              <input
                type="file"
                name="image_student_url"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
          </div>

          {/* E-mail */}
          <div>
            <label className="text-xs text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* CPF */}
          <div>
            <label className="text-xs text-gray-700">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Gênero */}
          <div>
            <label className="text-xs text-gray-700">Gênero</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border bg-[#000A16] border-gray-300 rounded-lg px-3 h-9 text-sm"
            >
              <option className="border bg-[#000A16] border-gray-300" value="">Selecione</option>
              <option className="border bg-[#000A16] border-gray-300" value="MALE">Masculino</option>
              <option className="border bg-[#000A16] border-gray-300" value="FEMALE">Feminino</option>
            </select>
          </div>

          {/* Data de nascimento */}
          <div>
            <label className="text-xs text-gray-700">Data de nascimento</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Frequência atual */}
          <div>
            <label className="text-xs text-gray-700">Frequência atual</label>
            <input
              type="text"
              name="current_frequency"
              value={formData.current_frequency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Faixa */}
          <div>
            <label className="text-xs text-gray-700">Faixa</label>
            <select
              name="belt"
              value={formData.belt}
              onChange={handleChange}
              className="w-full border bg-[#000A16] border-gray-300 rounded-lg px-3 h-9 text-sm"
            >
              <option className="border bg-[#000A16] border-gray-300" value="">Selecione</option>
              <option className="border bg-[#000A16] border-gray-300" value="WHITE">Branca</option>
              <option className="border bg-[#000A16] border-gray-300" value="BLUE">Azul</option>
              <option className="border bg-[#000A16] border-gray-300" value="PURPLE">Roxa</option>
              <option className="border bg-[#000A16] border-gray-300" value="BROWN">Marrom</option>
              <option className="border bg-[#000A16] border-gray-300" value="BLACK">Preta</option>
            </select>
          </div>

          {/* Grau */}
          <div>
            <label className="text-xs text-gray-700">Grau</label>
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Cidade */}
          <div>
            <label className="text-xs text-gray-700">Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Rua */}
          <div>
            <label className="text-xs text-gray-700">Rua</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Bairro */}
          <div>
            <label className="text-xs text-gray-700">Bairro</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Número */}
          <div>
            <label className="text-xs text-gray-700">Número</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Complemento */}
          <div>
            <label className="text-xs text-gray-700">Complemento</label>
            <input
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Telefone do responsável */}
          <div>
            <label className="text-xs text-gray-700">Telefone do responsável</label>
            <input
              type="text"
              name="guardian_phone"
              value={formData.guardian_phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

          {/* Matrícula */}
          <div>
            <label className="text-xs text-gray-700">Matrícula</label>
            <input
              type="text"
              name="enrollment"
              value={formData.enrollment}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
          </div>

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
            onClick={() => handleSubmit}
            className="bg-[#4963F5] hover:bg-[#345ed3] text-white px-5 py-2 rounded-full text-sm"
          >
            Próximo
          </button>
        </div>
      </motion.div>

      <ModalMsg
      show={modalVisible}
      message={modalMsg}
      type={modalType}
      onClose={() => setModalVisible(false)}
      />
    </div>
  );
}