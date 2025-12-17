import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { api } from "@/context/authContext";
import { formatBirth } from "@/utils/formatDate";

interface ClassroomLesson {
  id: string;
  classroom_date: Date;
}

export default function ClassroomHistoryScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const classData = location.state;

  const [lessons, setLessons] = useState<ClassroomLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError(null);
    
        const res = await api.get(`/classroom/${classData.id}`);
    
        // Verificando se res.data.classrooms é um array antes de setar
        if (Array.isArray(res.data.clasrooms)) {
          setLessons(res.data.clasrooms);
        } else {
          setError("Dados de aulas inválidos.");
        }        
    
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Acesso negado");
        } else if (err.response?.status === 404) {
          setError("Turma não encontrada");
        } else {
          setError("Erro ao carregar histórico da turma");
        }
      } finally {
        setLoading(false);
      }
    };    
  
    fetchLessons();
  }, [classData.id]);  

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <div className="w-full max-w-6xl py-6 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-white"
        >
          <IoMdArrowRoundBack size={26} />
        </button>
        <h1 className="ml-4 text-white text-xl font-semibold">
          Histórico da Turma
        </h1>
      </div>

      <motion.div
        className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {loading && (
          <p className="text-gray-500 text-center">Carregando aulas...</p>
        )}

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {!loading && !error && lessons.length === 0 && (
          <p className="text-gray-500 text-center">
            Nenhuma aula encontrada para esta turma.
          </p>
        )}

        {!loading && !error && lessons.length > 0 && (
          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex flex-row justify-between border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">
                    {formatBirth(lesson.classroom_date)}
                  </span>
                </div>

                <div onClick={() => navigate(`/frequencyPut`, { state: { classData, classroomId: lesson.id }})} className="text-white bg-sky-700 py-2 px-5 rounded-full">
                  Editar frequência
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
