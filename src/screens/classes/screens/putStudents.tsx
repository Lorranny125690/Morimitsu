import { useState } from "react";
import { useStudent } from "@/context/studentContext";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export function ClassPut() {
  const { id } = useParams(); // id da turma
  const { students, loading, onPutStudentOnClass } = useStudent();
  const navigate = useNavigate();

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handlePut = async () => {
    if (!id || selectedStudents.length === 0) return;

    setSubmitting(true);

    try {
      // caso backend NÃO aceite array, manda 1 por 1
      for (const studentId of selectedStudents) {
        const res = await onPutStudentOnClass(studentId, id);

        if (res?.error) {
          alert(res.message);
          setSubmitting(false);
          return;
        }
      }

      navigate("/classes");
    } catch (err) {
      console.error(err);
      alert("Erro ao enturmar alunos");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
      
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Enturmar alunos
        </h3>
        <p className="text-xs text-gray-400">
          Selecione um ou mais alunos para adicionar à turma
        </p>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-auto px-6 py-4 space-y-2">
        {loading && (
          <p className="text-sm text-gray-400">Carregando alunos...</p>
        )}

        {!loading && students.length === 0 && (
          <p className="text-sm text-gray-400">
            Nenhum aluno disponível
          </p>
        )}

        {!loading &&
          students.map((student) => {
            const isSelected = selectedStudents.includes(student.id);

            return (
              <div
                key={student.id}
                onClick={() => toggleStudent(student.id)}
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }
                `}
              >
                {isSelected ? (
                  <MdCheckBox size={22} className="text-blue-600" />
                ) : (
                  <MdCheckBoxOutlineBlank size={22} className="text-gray-400" />
                )}

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {student.name}
                  </p>
                  {student.birth_date && (
                    <p className="text-xs text-gray-500">
                      {student.birth_date}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="border-t px-6 py-4 flex justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handlePut}
          disabled={selectedStudents.length === 0 || submitting}
          className={`px-6 py-2 rounded-full text-sm font-medium text-white transition
            ${
              selectedStudents.length > 0 && !submitting
                ? "bg-[#4963F5] hover:bg-[#345ed3]"
                : "bg-gray-300 cursor-not-allowed"
            }
          `}
        >
          {submitting
            ? "Enturmando..."
            : `Enturmar (${selectedStudents.length})`}
        </button>
      </div>
    </div>
  );
}
