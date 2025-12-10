import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { beltClasses } from "../components/beltclasses";
import { Choice } from "../components/choose";
import { useEffect, useState } from "react";
import { StudentProfile } from "./profile";
import { FiltroDropdown } from "../components/dropdown";
import type { Student } from "../types/type";
import { useStudent } from "@/context/studentContext";
import { useLocation } from "react-router-dom";
import { ModalMsg } from "@/components/modal";

export function StudentDesktop() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const { onGetStudent, onDeleteStudent } = useStudent();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const location = useLocation();
  const [originalStudents, setOriginalStudents] = useState<Student[]>([]);
  const role = localStorage.getItem("role")

// Ao carregar
  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      const res = await onGetStudent();
      if (!res.error) {
        setStudents(res.data.students);
        setOriginalStudents(res.data.students); // guarda a ordem original
      }
      setLoading(false);
    };
    loadStudents();
  }, [location.pathname]);

// Ordenar alfabeticamente
  const sortAlphabetically = () => {
    setAlphabetical(prev => !prev);

    if (!alphabetical) {
      // marca: ordena
      setStudents(prev =>
        [...prev].sort((a, b) =>
          a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
        )
      );
    } else {
      // desmarca: volta ao original
      setStudents(originalStudents);
    }
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    const res = await onDeleteStudent(studentToDelete);

    if (!res.error) {
      setStudents(prev => prev.filter(st => st.id !== studentToDelete));

      setModalMsg("Aluno excluído com sucesso!");
      setModalType("success");
      setModalVisible(true);
    }

    setConfirmDeleteOpen(false);
    setStudentToDelete(null);
  };

  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08, // atraso entre alunos
      },
    },
    hidden: {},
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };
  
  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true); // começa carregando
  
      const res = await onGetStudent();
      if (!res.error) setStudents(res.data.students);
  
      setLoading(false); // terminou
    };
  
    loadStudents();
  }, [location.pathname]);  

  // Função para abrir o modal e mostrar o perfil do aluno
  const openProfileModal = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null); // Limpar o aluno selecionado
  };

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
  
    const ddd = digits.slice(0, 2);
    const number1 = digits.slice(2, 7);
    const number2 = digits.slice(7, 11);
  
    return `(${ddd}) ${number1}-${number2}`;
  };

  const [alphabetical, setAlphabetical] = useState(false);
  
  const [filters, setFilters] = useState({
    presencas: false,
    mista: false,
    feminina: false,
    masculina: false,
    baby: false,
    kids: false,
  });

  type FilterKey = "presencas" | "mista" | "feminina" | "masculina" | "baby" | "kids";

  const toggleFilter = (key: FilterKey) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const applyFilters = () => {
    let filtered = [...students]; // use a lista bruta vinda do back
  
    if (filters.feminina) {
      filtered = filtered.filter(s => s.gender === "F");
    }
  
    if (filters.masculina) {
      filtered = filtered.filter(s => s.gender === "M");
    }
  
    if (filters.mista) {
      filtered = filtered.filter(s => s.classType === "mista");
    }
  
    if (filters.baby) {
      filtered = filtered.filter(s => s.classType === "baby");
    }
  
    if (filters.kids) {
      filtered = filtered.filter(s => s.classType === "kids");
    }
  
    if (filters.presencas) {
      filtered = filtered.filter(s => s.frequency > 0);
    }
  
    setStudents(filtered);
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
              filters={filters}
              alphabetical={alphabetical}
              onToggleFilter={toggleFilter}
              onSort={sortAlphabetically}
              onApply={applyFilters}
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
                <th className="py-3 px-4 w-28 text-center">Operação</th>
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
                students.map((s: any) => (
                  <motion.tr
                    variants={itemVariants}
                    key={s.id}
                    whileHover={{ backgroundColor: "#1E1E2F", scale: 1.01 }}
                    className="border-b border-gray-800 transition hover:cursor-pointer"
                    onClick={() => openProfileModal(s)}
                  >
                  <td className="py-3 px-4">
                  <img
                    src={
                      s.image_student_url
                        ? s.image_student_url
                        : "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg"
                    }
                    alt="Foto"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  </td>
                  <td className="py-3 px-4">{s.name}</td>
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
                    <div className="flex items-center justify-center gap-3">
                      <FaEdit className="cursor-pointer hover:text-blue-500 transition" />
                  {role !== "TEACHER" && <FaTrash
                    className="cursor-pointer hover:text-red-500 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStudentToDelete(s.id);
                      setConfirmDeleteOpen(true);
                    }}
                  />}
                  </div>
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
