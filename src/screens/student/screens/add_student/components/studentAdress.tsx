import { ModalMsg } from "@/components/modal";
import type { ChangeEvent } from "react";
import { useStudentForm } from "../hooks/studentProps";

interface formData {
  city: string;
  complement: string;
  street: string;
  guardian_phone: string;
  district: string;
  number: string;
}

interface Props {
  formData: formData;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void; 
  goBack: () => void;
  goNext: () => void;
}

export function StudentAdress({ formData, handleChange, handleSubmit, goBack, goNext }: Props) {
  
  const {
    modalVisible,
    modalMsg,
    modalType,
    setModalVisible,
  } = useStudentForm();

  const onFinish = async () => {
    console.log("ENVIANDO PARA API:", formData);
    await handleSubmit(); // está vindo do StudentScreen — certo!
    goNext();
  };

  return (
    <div className="bg-white shadow-lg flex flex-col items-center w-[679px] h-[410px] border border-gray-100 justify-between">
      <div className="flex flex-col w-full">

        {/* Header */}
        <div className="border-b-2 border-gray-200 py-5 mb-4 flex items-center">
          <h3 className="px-4 text-gray-400 font-medium text-[10px] cursor-pointer" onClick={goBack}>Dados</h3>
          <h3 className="text-gray-700 font-regular text-[10px]">Endereço</h3>
          <h3 className="px-4 text-gray-400 font-regular text-[10px]">Enturmar</h3>
        </div>

        {/* FORM */}
        <form
          className="px-6 md:px-10 grid gap-4"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridAutoRows: "min-content",
          }}
        >
          <div>
            <label className="block text-[10px] text-black">Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border border-gray-300 text-black rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-black">Complemento</label>
            <input
              type="text"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border text-black border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          <div />

          <div>
            <label className="block text-[10px] text-black">Rua</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border text-black border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-black">Contato do responsável</label>
            <input
              type="text"
              name="guardian_phone"
              value={formData.guardian_phone}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border text-black border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          <div />

          <div>
            <label className="block text-[10px] text-black">Bairro</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border text-black border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-black">Número</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full h-6 text-[12px] border text-black border-gray-300 rounded-[2px] px-2 mt-[6px]"
            />
          </div>
        </form>
      </div>

      <div className="w-full px-10 mb-7 flex items-center justify-end">
        <button
          type="button"
          onClick={goBack}
          className="cursor-pointer text-gray-400 text-sm hover:text-gray-600 mr-6"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={onFinish}
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
  );
}
