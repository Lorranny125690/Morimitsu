import { FaSearch, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { itemVariants, listVariants } from "@/utils/variants";
import { studentName } from "@/utils/formatName";
import { formatPhone } from "@/utils/formatPhone";
import { useEffect, useState } from "react";
import type { Class } from "../types/type";
import { api } from "@/context/authContext";
import { getInitials } from "@/utils/getInitials";
import { beltClasses } from "@/screens/student/components/beltclasses";
import { StudentProfile } from "@/screens/student/screens/profile";
import type { Student } from "@/screens/student/types/type";

export default function ClassDesktop() {
  const navigate = useNavigate();
  const [classData, setClassData] = useState<Class | null>(null);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const openProfileModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const fetchClass = async (id: string) => {
    const res = await api.get("/class/filter", {
      params: { id },
    });
  
    setClassData(res.data.classes[0]);
  };  

  useEffect(() => {
    if (location.state?.id) {
      fetchClass(location.state.id);
    }
  }, [location.state]);  

  const handleDelete = async (class_id: string, student_id: string) => {
    await api.delete(`/class/remove-student/${class_id}`, {
      data: { student_id },
    });
  
    fetchClass(class_id); // 🔥 atualiza na hora
  };
  
  const loading = false;

  const [professores, setProfessores] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProfessor = async () => {
      const token = localStorage.getItem("my-jwt");
      if (!token || !classData?.teacher_id) return;
  
      try {
        const res = await api.get("/user/filter", {
          params: { id: classData.teacher_id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setProfessores({
          [classData.teacher_id]: res.data.users[0].username,
        });
      } catch (err) {
        console.error("Erro ao buscar professor:", err);
      }
    };
  
    fetchProfessor();
  }, [classData]);  
  
  const role = localStorage.getItem("role")

  return (
    <div className="min-h-screen text-white font-sans">
  
      {/* CONTAINER 6XL */}
      <div className="max-w-6xl mx-auto px-10">
  
        {/* HEADER */}
        <div className="mt-10 flex justify-between items-center mb-8">
          <div className="flex gap-4 flex-row items-center justify-center">
            <h2 className="text-2xl font-bold">{classData?.name}</h2>
            <span className="h-10 bg-white w-0.5"></span>
            <h2 onClick={() => navigate(`/history/${classData?.id}`, {state: classData})} className="text-xl text-white/40 hover:text-white cursor-pointer transition-all">Histórico</h2>
          </div>
          <p className="text-sm">  Prof.: {professores[classData?.teacher_id ?? ""] ?? "Carregando..."}</p>
        </div>
  
      </div>
  
      {/* LINHA FULL TELA */}
      <div className="w-full border-b border-gray-700 my-6" />
  
      {/* CONTAINER 6XL */}
      <div className="max-w-6xl mx-auto px-10">
  
        {/* AÇÕES */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-[#1C2433] rounded-lg px-4 h-10 w-64">
            <FaSearch className="text-gray-400" />
            <input
              placeholder="Pesquisar equipes"
              className="bg-transparent outline-none text-sm ml-3 w-full"
            />
          </div>
  
          <div className="flex gap-3">
            <button onClick={() => navigate(`/putClass/${classData?.id}`, { state: classData })} className="hover:scale-105 transition-all cursor-pointer px-4 h-10 rounded-lg bg-[#076185]">Editar turma</button>
            <button onClick={() => navigate(`/enturmar/${classData?.id}`)} className="hover:scale-105 transition-all cursor-pointer px-4 h-10 rounded-lg bg-[#076185]">Adicionar aluno</button>
            <button
              onClick={() =>
                navigate(`/frequency/${classData?.id}`, {
                  state: {
                    classId: classData?.id,
                    teacherId: classData?.teacher_id,
                    classroomName: classData?.name,
                    students: classData?.students,
                  },
                })                
              }
              className="cursor-pointer hover:scale-105 transition-all px-4 h-10 rounded-lg bg-[#076185]"
            >
              Fazer frequência
            </button>
          </div>
        </div>
  
        {/* TABELA */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#162026] mt-10 rounded-md shadow-lg overflow-hidden max-w-6xl mx-auto"
      >
          <table className="w-full border-collapse text-left table-fixed">
            <thead className="text-gray-400 text-sm">
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 w-24">Foto</th>
                <th className="py-3 px-3 w-38">Nome</th>
                <th className="py-3 px-4 w-38">Número</th>
                <th className="py-3 px-4 w-20 text-center">Faixa</th>
                <th className="py-3 px-4 w-16 text-center">Grau</th>
                <th className="py-3 px-4 w-28 text-center">Frequência</th>
                <th className="py-3 px-4 w-24 text-center">Status</th>
                {role !== "TEACHER" && <th className="py-3 px-4 w-28 text-center">Operação</th>}
                <th className="py-3 px-4 w-24 text-center">Conferir</th>
              </tr>
            </thead>
            <motion.tbody variants={listVariants}>
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-10">
                    <div className="w-full flex justify-center items-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                  </td>
                </tr>
              ) : (
                classData?.students.map((item) => {
                  const s = item.student;
                  return(
                  <motion.tr
                    variants={itemVariants}
                    key={item.id}
                    whileHover={{ backgroundColor: "#1E1E2F", scale: 1.011 }}
                    className="border-b border-gray-800 transition hover:cursor-pointer"
                    onClick={() => openProfileModal(s)}
                  >
                  <td className="py-3 px-4">
                  {s.image_student_url ? (
                  <img
                    src={s.image_student_url}
                    alt="Perfil"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  ) : (
                    <div className="w-12 h-12 max-h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-[12px] select-none">
                      {getInitials(s.social_name || s.name)}
                    </div>
                  )}
                  </td>
                  <td className="py-3 px-4">{s.social_name || studentName(s.name)}</td>
                  <td className="py-3 px-4">{formatPhone(s.phone)}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block w-6 h-6 rounded-md ${
                        beltClasses[s.belt] ?? "bg-gray-500"
                      }`}                      
                    />
                  </td>
                  <td className="py-3 px-4 text-center">{s.grade}</td>
                  <td className="py-3 px-4 text-center">{s.current_frequency}</td>
                  <td className="py-3 px-4 text-center text-green-500 font-medium">
                    {s.status}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {role !== "TEACHER" && <div className="flex items-center justify-center gap-3">
                      <FaTrash
                      className="cursor-pointer hover:text-red-500 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(
                          classData?.id,
                          s.id
                        )                        
                      }}
                    />
                  </div>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hover:cursor-pointer px-4 py-1 bg-[#0070F3] hover:bg-blue-700 rounded-[20px] text-white text-sm font-medium transition"
                      onClick={() => openProfileModal(s)}
                    >
                      Ver
                    </motion.button>
                  </td>
                </motion.tr>)
                }))}
             </motion.tbody>
           </table>
         </motion.div>
      </div>

      {isModalOpen && selectedStudent && (
        <StudentProfile
          closeModal={closeModal}
          student={selectedStudent}
        />
      )}
    </div>
  );
}  