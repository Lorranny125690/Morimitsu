import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { beltClasses } from "../components/beltclasses";
import { Choice } from "../components/choose";
import { useMemo, useState } from "react";
import { StudentProfile } from "./profile";
import { FiltroDropdown } from "../components/dropdown";
import type { Student } from "../types/type";
import { useStudent } from "@/context/studentContext";
import { useNavigate } from "react-router-dom";
import { ModalMsg } from "@/components/modal";
import { formatPhone } from "../../../utils/formatPhone";
import { useDisplayStudents } from "../hooks/hooks";
import { itemVariants, listVariants } from "@/utils/variants";
import { studentName } from "../../../utils/formatName";
import { getInitials } from "../../../utils/getInitials";

export function StudentDesktop() {
  const {
    loading,
    students,
    triggerReload,
    onDeleteStudent,
  } = useStudent();

  const navigate = useNavigate();
  const role = localStorage.getItem("role")?.toUpperCase();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error"); 
  
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  // 🔹 filtros DINÂMICOS por nome da turma
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  const [alphabetical, setAlphabetical] = useState(false);

  // 🔹 pega TODAS as turmas existentes a partir dos alunos
  const classes = useMemo(() => {
    const map = new Map<string, { id: string; name: string }>();

    students.forEach(student => {
      student.classes?.forEach(c => {
        map.set(c.class.id, {
          id: c.class.id,
          name: c.class.name,
        });
      });
    });

    return Array.from(map.values());
  }, [students]);

  const displayStudents = useDisplayStudents(
    students,
    filters,
    alphabetical
  );

  const toggleFilter = (name: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    const res = await onDeleteStudent(studentToDelete);

    if (!res.error) {
      triggerReload();
      setModalMsg("Aluno excluído com sucesso!");
      setModalType("success");
      setModalVisible(true);
    }

    setConfirmDeleteOpen(false);
    setStudentToDelete(null);
  };

  const openProfileModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="min-h-screen bg-[#0D0C15] text-white font-sans">
      {/* Tabs */}
      <Choice />

      {/* Conteúdo */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Título + botões */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Alunos graduando</h1>
          <div className="flex gap-3">
            <a href="/add_student">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hover:cursor-pointer px-5 py-2 bg-[#0070F3] hover:bg-blue-700 rounded-md font-medium transition"
              >
                Adicionar aluno
              </motion.button>
            </a>
            <FiltroDropdown
              classes={classes}
              filters={filters}
              onToggleFilter={toggleFilter}
              alphabetical={alphabetical}
              onSort={() => setAlphabetical(prev => !prev)}
            />
          </div>
        </div>

        {/* Card com tabela */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#162026] rounded-md shadow-lg overflow-hidden"
        >
          <table className="w-full border-collapse text-left table-fixed">
            <thead className="text-gray-400 text-sm">
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 w-24">Foto</th>
                <th className="py-3 px-4 w-40">Nome</th>
                <th className="py-3 px-4 w-32">Número</th>
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
                displayStudents.map((s: any) => (
                  <motion.tr
                    variants={itemVariants}
                    key={s.id}
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
                  <td
                    className={`py-3 px-4 text-center font-medium ${
                      s.status === "ATIVO"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    {s.status}
                  </td>
                  {role === "TEACHER" ? (
                    null
                  ) : <td className="py-3 px-4 text-center">
                   <div className="flex items-center justify-center gap-3">
                      <FaEdit onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit_student/${s.id}`, { state: s });
                      }}
                      className="cursor-pointer hover:text-blue-500 transition" />
                      <FaTrash
                      className="cursor-pointer hover:text-red-500 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        setStudentToDelete(s.id);
                        setConfirmDeleteOpen(true);
                      }}
                    />
                  </div>
                  </td>}
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
                </motion.tr>
              )))}
            </motion.tbody>
          </table>
        </motion.div>
      </div>

      {/* Modal de Perfil */}
      {isModalOpen && selectedStudent && (
        <StudentProfile
          closeModal={closeModal}
          student={selectedStudent}
        />
      )}
      
      {/* Modal de confirmação de exclusão */}
      {confirmDeleteOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1E1E2F] p-6 rounded-lg shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirmar exclusão</h2>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir este aluno?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteOpen(false)}
                className="cursor-pointer px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition"
              >
                Cancelar
              </button>

              <button
                onClick={confirmDelete}
                className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalMsg
      show={modalVisible}
      onClose={() => setModalVisible(false)}
      message={modalMsg}
      type={modalType}
      />

    </div>
  );
}
