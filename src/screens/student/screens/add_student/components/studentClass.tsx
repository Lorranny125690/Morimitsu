import { useState } from "react";
import { useStudent } from "@/context/studentContext";
import { useClasses } from "@/screens/classes/hooks/classes";
import { MdAddBox } from "react-icons/md";

interface Props {
  studentId: string;
  navigate: (v: any) => void;
  goBack: () => void;
}

export function StudentClass({ studentId, navigate, goBack }: Props) {
  const { onPutStudentOnClass } = useStudent();
  const { data: classes = [], isLoading } = useClasses();

  const [selectedClassId, setSelectedClassId] = useState<string>("");

  const handlePut = async () => {
    console.log("STUDENT ID:", studentId);
    console.log("CLASS ID:", selectedClassId);
    const res = await onPutStudentOnClass(studentId, selectedClassId);
  
    if (res.error) {
      alert(res.message);
      return;
    }
  
    navigate(-1);
  };

  return (
    <div className="relative bg-white shadow-lg flex flex-col items-center w-[679px] h-[410px] border border-gray-100">
      <div className="flex flex-col w-full h-full">

        {/* Header */}
        <div className="border-b-2 border-gray-200 py-5 mb-2 flex items-center">
          <h3 className="px-4 text-gray-400 text-[10px]">Dados</h3>
          <h3
            className="cursor-pointer text-gray-400 text-[10px]"
            onClick={goBack}
          >
            Endereço
          </h3>
          <h3 className="px-4 text-gray-700 text-[10px]">
            Enturmar
          </h3>
        </div>

        {/* Lista de turmas */}
        <div className="flex-1 overflow-auto px-6 py-2 space-y-2">
          {isLoading && (
            <p className="text-sm text-gray-400">Carregando turmas...</p>
          )}

          {!isLoading && classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`cursor-pointer text-black flex items-center gap-3 border rounded-lg px-4 py-3 text-sm transition-all
                ${
                  selectedClassId === cls.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <MdAddBox size={20} />
              <div>
                <p className="font-medium">{cls.name}</p>
                {cls.local && (
                  <p className="text-xs text-gray-500">{cls.local}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botões */}
        <div className="gap-4 absolute bottom-6 right-10 flex items-center">
          <button
            type="button"
            onClick={goBack}
            className="text-gray-400 text-sm hover:text-gray-600"
          >
            Voltar
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-red-400 hover:bg-red-500 text-white text-sm rounded-full px-5 py-2"
          >
            Não enturmar
          </button>

          <button
            type="button"
            onClick={handlePut}
            disabled={!selectedClassId}
            className={`text-white text-sm rounded-full px-5 py-2 transition
              ${
                selectedClassId
                  ? "bg-[#4963F5] hover:bg-[#345ed3]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Enturmar
          </button>
        </div>
      </div>
    </div>
  );
}
