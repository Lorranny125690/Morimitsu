import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { studentsMock } from "../components/studentMosck";
import { beltClasses } from "../components/beltclasses";
import { Choice } from "../components/choose";
import { useState } from "react";
import { StudentProfile } from "./profile";
import { FiltroDropdown } from "../components/dropdown";

export function StudentDesktop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Função para abrir o modal e mostrar o perfil do aluno
  const openProfileModal = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
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
            <FiltroDropdown />
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
                <th className="py-3 px-4 w-28 text-center">Operação</th>
                <th className="py-3 px-4 w-24 text-center">Conferir</th>
              </tr>
            </thead>
            <tbody>
              {studentsMock.map((student) => (
                <motion.tr
                  key={student.id}
                  whileHover={{ backgroundColor: "#1E1E2F", scale: 1.01 }}
                  className="border-b border-gray-800 transition hover:cursor-pointer"
                  onClick={() => openProfileModal(student)}
                >
                  <td className="py-3 px-4">
                    <img
                      src={student.photo || "/foto.jpg"}
                      alt="Foto"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.number}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block w-6 h-6 rounded-md ${beltClasses[student.beltColor]}`}
                    />
                  </td>
                  <td className="py-3 px-4 text-center">{student.degree}</td>
                  <td className="py-3 px-4 text-center">{student.frequency}</td>
                  <td className="py-3 px-4 text-center text-green-500 font-medium">
                    {student.status}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <FaEdit className="cursor-pointer hover:text-blue-500 transition" />
                      <FaTrash className="cursor-pointer hover:text-red-500 transition" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hover:cursor-pointer px-4 py-1 bg-[#0070F3] hover:bg-blue-700 rounded-[20px] text-white text-sm font-medium transition"
                      onClick={() => openProfileModal(student)}
                    >
                      Ver
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
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
    </div>
  );
}
