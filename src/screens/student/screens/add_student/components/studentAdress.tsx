import { useState } from "react";

export function StudentAdress() {
  const [formData, setFormData] = useState({
    city: "",
    complement: "",
    street: "",
    guardian_phone: "",
    district: "",
    number: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("ENVIADO:", formData);
    // aqui você chama sua API
  };

  const navigate = (v: any) => {
    console.log("navigate:", v);
  };

  return (
    <div className="bg-white shadow-lg flex flex-col items-center w-[679px] h-[410px] border border-gray-100 justify-between">
      <div className="flex flex-col w-full">

        {/* Header */}
        <div className="border-b-2 border-gray-200 py-5 mb-4 flex items-center gap-4">
          <h3 className="px-4 text-gray-700 font-medium text-[10px]">Dados</h3>
          <h3 className="hover:cursor-pointer text-gray-400 text-[10px]">Enturmar</h3>
        </div>

        {/* FORM */}
        <form
          className="px-6 md:px-10 grid gap-4"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridAutoRows: "min-content",
          }}
        >
          {/* Cidade */}
          <div>
            <label className="block text-[10px] text-black">Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          {/* Complemento */}
          <div>
            <label className="block text-[10px] text-black">Complemento</label>
            <input
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          <div />

          {/* Rua */}
          <div>
            <label className="block text-[10px] text-black">Rua</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          {/* Contato Responsável */}
          <div>
            <label className="block text-[10px] text-black">Contato do responsável</label>
            <input
              type="text"
              name="guardian_phone"
              value={formData.guardian_phone}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          <div />

          {/* Bairro */}
          <div>
            <label className="block text-[10px] text-black">Bairro</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          {/* Número */}
          <div>
            <label className="block text-[10px] text-black">Número</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>
        </form>

        {/* BOTÕES */}
        <div className="w-full px-10 h-[1px] flex items-center justify-end mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer text-gray-400 text-sm hover:text-gray-600 mr-6"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#4963F5] cursor-pointer hover:bg-[#345ed3] text-white text-sm rounded-full px-5 py-2 shadow-md"
          >
            Enturmar
          </button>
        </div>
      </div>
    </div>
  );
}
