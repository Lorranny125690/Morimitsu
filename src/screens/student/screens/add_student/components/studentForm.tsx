// src/components/student/StudentForm.tsx

import { useRef } from "react";
import { useStudentForm, type FormDataType } from "../hooks/studentProps";
import { ModalMsg } from "@/components/modal";

interface Props {
  formData: FormDataType;
  handleChange: (e: any) => void;
  navigate: (v: any) => void;
  goNext: () => void;
}

export function StudentForm({ formData, handleChange, navigate, goNext}: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    modalVisible,
    modalMsg,
    modalType,
    setModalVisible,
  } = useStudentForm();
  
  return (
    <div className="bg-white shadow-lg flex flex-col items-center w-[679px] h-[410px] border border-gray-100 justify-between">
      <div className="flex flex-col w-full">
        <div className="border-b-2 border-gray-200 py-5 mb-4 flex items-center">
          <h3 className="px-4 text-gray-700 font-medium text-[10px]">Dados</h3>
          <h3 className="text-gray-400 font-regular text-[10px]">Endereço</h3>
          <h3 className="px-4 text-gray-400 font-regular text-[10px]">Enturmar</h3>
        </div>

        <form
          ref={formRef}
          className="px-6 md:px-10 gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 80px",
            gridAutoRows: "min-content",
            alignItems: "start",
            gap: "16px",
          }}
        >

          {/* Nome */}
          <div>
            <label className="block text-[10px] text-black">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Data de nascimento */}
          <div>
            <label className="block text-[10px] text-black">Data de nascimento</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Grau */}
          <div>
            <label className="block text-[10px] text-black">Grau</label>
            <input
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-16 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] bg-white focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Contato */}
          <div>
            <label className="block text-[10px] text-black">Contato</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Matrícula */}
          <div>
            <label className="block text-[10px] text-black">Matrícula (opcional)</label>
            <input
              type="text"
              name="enrollment"
              value={formData.enrollment}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div />

          {/* Email */}
          <div>
            <label className="block text-[10px] text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Frequência */}
          <div>
            <label className="block text-[10px] text-black">Frequência</label>
            <input
              type="text"
              name="current_frequency"
              value={formData.current_frequency}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div />

          {/* CPF */}
          <div>
            <label className="block text-[10px] text-black">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          {/* Faixa */}
          <div>
            <label className="block text-[10px] text-black">Faixa</label>
            <select
              name="belt"
              value={formData.belt}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] bg-white focus:ring-2 focus:ring-blue-400 shadow-sm"
            >
            {/* INFANTIL */}
            <option value="WHITE">Faixa branca</option>

            <option value="GRAY_WHITE">Faixa cinza e branca</option>
            <option value="GRAY">Faixa cinza</option>
            <option value="GRAY_BLACK">Faixa cinza e preta</option>

            <option value="YELLOW_WHITE">Faixa amarela e branca</option>
            <option value="YELLOW">Faixa amarela</option>
            <option value="YELLOW_BLACK">Faixa amarela e preta</option>

            <option value="ORANGE_WHITE">Faixa laranja e branca</option>
            <option value="ORANGE">Faixa laranja</option>
            <option value="ORANGE_BLACK">Faixa laranja e preta</option>

            <option value="GREEN_WHITE">Faixa verde e branca</option>
            <option value="GREEN">Faixa verde</option>
            <option value="GREEN_BLACK">Faixa verde e preta</option>

            {/* ADULTO */}
            <option value="BLUE">Faixa azul</option>
            <option value="PURPLE">Faixa roxa</option>
            <option value="BROWN">Faixa marrom</option>
            <option value="BLACK">Faixa preta</option>

            {/* MESTRIA */}
            <option value="RED_BLACK">Faixa vermelha e preta</option>
            <option value="RED_WHITE">Faixa vermelha e branca</option>
            <option value="RED">Faixa vermelha</option>
            </select>
          </div>

          {/* Gênero */}
          <div style={{ gridColumn: "1 / 2" }}>
            <label className="block text-[10px] text-black">Gênero</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-50 h-6 text-[12px] text-black border-gray-300 border rounded-[2px] px-2 mt-[6px] bg-white focus:ring-2 focus:ring-blue-400 shadow-sm"
            >
              <option value="">Escolher gênero</option>
              <option value="MALE">Masculino</option>
              <option value="FEMALE">Feminino</option>
            </select>
          </div>

        </form>

        {/* Botões */}
        <div className="w-full px-10 h-[1px] flex items-center justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer text-gray-400 text-sm hover:text-gray-600 mr-6"
          >
            Cancelar
          </button>

          <button
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
            className="bg-[#4963F5] cursor-pointer hover:bg-[#345ed3] text-white text-sm rounded-full px-5 py-2 shadow-md"
          >
            Confirmar
          </button>
        </div>

        <ModalMsg
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMsg}
        type={modalType}
        />

      </div>
    </div>
  );
}
