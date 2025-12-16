import { useState } from "react";
import { MdAddBox } from "react-icons/md";
import { useStudent } from "@/context/studentContext";
import { getInitials } from "@/utils/getInitials";
import { useNavigate, useParams } from "react-router-dom";
import { usePutStudentOnClassRQ } from "../hooks/classes";

export function ClassStudents() {
  const { id } = useParams<{ id: string }>();
  const { students } = useStudent();
  const navigate = useNavigate();
  if (!id) {
    return <p>Turma não encontrada</p>;
  }

  const classId = id;

  const [selectedStudentId, setSelectedStudentId] = useState<string[]>([]);

  const { mutateAsync } = usePutStudentOnClassRQ(classId);

  const handlePut = async () => {
    try {
      await Promise.all(
        selectedStudentId.map(id => mutateAsync(id))
      );
  
      alert("Alunos enturmados com sucesso!");
      navigate(-1);
    } catch {
      alert("Erro ao enturmar alunos");
    }
  };  

  const toggleStudent = (studentId: string) => {
    setSelectedStudentId(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };  

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center">
      <div className="w-full max-w-3xl bg-white flex flex-col">

        {/* HEADER */}
        <header className="px-6 py-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Adicionar aluno à turma
          </h2>
          <p className="text-sm text-gray-400">
            Selecione um aluno abaixo
          </p>
        </header>

        {/* LISTA */}
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {students.map((student) => {
            const selected = selectedStudentId.includes(student.id);

            return (
              <button
                key={student.id}
                type="button"
                onClick={() => toggleStudent(student.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition
                  ${
                    selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {student.image_student_url ? (
                  <img
                    src={student.image_student_url}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center">
                    {getInitials(student.social_name || student.name)}
                  </div>
                )}

                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {student.social_name || student.name}
                  </p>
                  <p className="text-xs text-gray-400">{student.phone}</p>
                </div>

                <MdAddBox
                  size={20}
                  className={selected ? "text-blue-600" : "text-gray-300"}
                />
              </button>
            );
          })}
        </main>

        {/* FOOTER FIXO */}
        <footer className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>

          <button
            disabled={selectedStudentId.length === 0}
            onClick={handlePut}
            className={`px-6 py-2 rounded-full text-sm font-medium transition
              ${
                selectedStudentId.length
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Enturmar aluno
          </button>
        </footer>
      </div>
    </div>
  );
}
