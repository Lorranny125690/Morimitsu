import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  formData: any;
  handleChange: (e: any) => void;
  handleNext: () => void;
}

export function ModalAdicionarAluno({ open, onClose, formData, handleChange, handleNext }: Props) {
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
          <div>
            <label className="text-xs text-gray-700">URL da foto</label>
            <input
              type="text"
              name="image_student_url"
              value={formData.image_student_url}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 h-9 text-sm"
            />
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
            onClick={handleNext}
            className="bg-[#4963F5] hover:bg-[#345ed3] text-white px-5 py-2 rounded-full text-sm"
          >
            Próximo
          </button>
        </div>
      </motion.div>
    </div>
  );
}
