import type { FieldProps } from "../types/fieldProps";

export const Field = ({ icon, label, type = "text", value, onChange }: FieldProps) => (
  <div className="flex w-full lg:w-[300px] border border-[#C54848]">
    <div className="flex items-center justify-center w-12 bg-[#222121] border-r border-[#C54848]">
      {icon}
    </div>
    <div className="flex-1 flex flex-col">
      <div className="h-5 flex items-center px-1 bg-[#222121] border-b border-[#C54848]">
        <span className="text-[10px] text-gray-200">{label}</span>
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="h-5 w-full bg-[#222121] px-1 text-[12px] text-white placeholder-gray-400 focus:outline-none"
      />
    </div>
  </div>
);