import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import type { FieldProps } from "../types/fieldProps";

export const Field = ({ icon, label, type = "text", value, onChange, onKeyDown }: FieldProps) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const inputType = type === "password" && mostrarSenha ? "text" : type;

  return (
    <div id="mono" className="flex w-full lg:w-[300px] border border-[#C54848] relative">
      <div className="flex items-center justify-center w-12 bg-[#222121] border-r border-[#C54848]">
        {icon}
      </div>

      <div className="flex-1 flex flex-col relative">
        <div className="h-5 flex items-center px-1 bg-[#222121] border-b border-[#C54848]">
          <span className="text-[10px] text-gray-200 ">{label}</span>
        </div>

        <div className="relative flex items-center">
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            className="h-5 w-full bg-[#222121] px-1 text-[12px] text-white placeholder-gray-400 focus:outline-none pr-7"
            onKeyDown={onKeyDown}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-1 text-gray-400 hover:text-white transition"
            >
              {mostrarSenha ? <FaEyeSlash size={10} /> : <FaEye size={10} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};