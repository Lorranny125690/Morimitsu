import { useState } from "react";
import { useStudent } from "@/context/studentContext";
import { MdAddBox } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export function ClassPut() {
  const { id } = useParams()
  const { onPutStudentOnClass } = useStudent();
  const { students, loading} = useStudent();
  const navigate = useNavigate()

  const [selectedStudent, setSelectedStudent] = useState<string>("");

  const handlePut = async () => {
    console.log("STUDENT ID:", id);
    console.log("CLASS ID:", selectedStudent);
    const res = await onPutStudentOnClass(selectedStudent, String(id));
  
    if (res.error) {
      alert(res.message);
      return;
    }
  
    navigate(-1);
  };

  return (
    <div className="relative w-full min-h-screen bg-white shadow-lg flex flex-col items-center w-[679px] h-[410px] border border-gray-100">
      <div className="flex flex-col w-full h-full">

        {/* Header */}
        <div className="border-b-2 border-gray-200 py-5 mb-2 flex items-center">
          <h3 className="px-4 text-gray-700 text-[10px]">
            Enturmar
          </h3>
        </div>

        {/* Lista de turmas */}
        <div className="flex-1 overflow-auto px-6 py-2 space-y-2">
          {loading && (
            <p className="text-sm text-gray-400">Carregando turmas...</p>
          )}

          {!loading && students.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setSelectedStudent(cls.id)}
              className={`cursor-pointer text-black flex items-center gap-3 border rounded-lg px-4 py-3 text-sm transition-all
                ${
                  selectedStudent === cls.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-blue-300"
                }`}
            >
              <MdAddBox size={20} />
              <div>
                <p className="font-medium">{cls.name}</p>
                {cls.birth_date && (
                  <p className="text-xs text-gray-500">{cls.birth_date}</p>
                )}
              </div>
            </div>
          ))}
        </div>

          <button
            type="button"
            onClick={() => navigate(-2)}
            className="bg-red-400 hover:bg-red-500 text-white text-sm rounded-full px-5 py-2"
          >
            Não enturmar
          </button>

          <button
            type="button"
            onClick={handlePut}
            disabled={!selectedStudent}
            className={`text-white text-sm rounded-full px-5 py-2 transition
              ${
                selectedStudent
                  ? "bg-[#4963F5] hover:bg-[#345ed3]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Enturmar
          </button>
        </div>
      </div>
  );
}
