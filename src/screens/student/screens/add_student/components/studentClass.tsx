// src/components/student/StudentForm.tsx

import type { FormDataType } from "../hooks/studentProps";
import { MdAddBox } from "react-icons/md";

interface Props {
  formData: FormDataType;
  handleChange: (e: any) => void;
  navigate: (v: any) => void;
  goBack: () => void;
}

export function StudentClass({ handleChange, navigate, goBack}: Props) {
  return (
    <div className="relative bg-white shadow-lg flex flex-col items-center w-[679px] h-[410px] border border-gray-100 justify-between">
      <div className="flex flex-col w-full">
        <div className="border-b-2 border-gray-200 py-5 mb-4 flex items-center">
          <h3 className="cursor-pointer px-4 text-gray-400 font-medium text-[10px]">Dados</h3>
          <h3 className="cursor-pointer text-gray-400 font-regular text-[10px]" onClick={goBack}>Endereço</h3>
          <h3 className="px-4 text-gray-700 font-regular text-[10px]">Enturmar</h3>
        </div>

        <div className="flex w-full justify-start items-start text-blue-500 py-2 px-6">
          <MdAddBox size={28}/>
        </div>

        {/* Botões */}
        <div className="gap-4 absolute bottom-6 right-10 flex items-center">
          <button
            type="button"
            onClick={goBack}
            className="cursor-pointer text-gray-400 transition-all text-sm hover:text-gray-600"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-red-400 cursor-pointer hover:bg-red-500 transition-all text-white text-sm rounded-full px-5 py-2 shadow-md"
          >
            Não enturmar
          </button>

          <button
            type="button"
            onChange={handleChange}
            className="bg-[#4963F5] cursor-pointer hover:bg-[#345ed3] transition-all text-white text-sm rounded-full px-5 py-2 shadow-md"
          >
            Enturmar
          </button>
        </div>

      </div>
    </div>
  );
}
