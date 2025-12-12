import { AiFillEdit } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { belts } from "../types/belt";
import { gender, role } from "../types/role";
import { FaTrash } from "react-icons/fa";
import { useStudent } from "@/context/studentContext";
import { useState } from "react";
import type { Student } from "../types/type";
import { ModalMsg } from "@/components/modal";

export function ProfileMobile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const student = state?.student;

  const studentName = (student: string) => {
    const firstName = student.split(" ")[0];
    const secondName = student.split(" ")[1];
    if (secondName === "de" || secondName === "do" || secondName === "da") {
      const thirdName = student.split(" ")[2];
      return (`${firstName} ${secondName} ${thirdName}`)
    }

    return (`${firstName} ${secondName}`)
  }

  const { onDeleteStudent } = useStudent();

  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [_students, setStudents] = useState<Student[]>([]);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    const res = await onDeleteStudent(studentToDelete);

    if (!res.error) {
      setStudents(prev => prev.filter(st => st.id !== studentToDelete));

      setModalMsg("Aluno excluído com sucesso!");
      setModalType("success");
      setModalVisible(true);
      navigate(-1)
    }

    setConfirmDeleteOpen(false);
    setStudentToDelete(null);
  };

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
  
    const ddd = digits.slice(0, 2);
    const number1 = digits.slice(2, 7);
    const number2 = digits.slice(7, 11);
  
    return `(${ddd}) ${number1}-${number2}`;
  };

  const formatBirth = (birthDate: string | Date) => {
    const birth = new Date(birthDate);
  
    const day = String(birth.getDate() + 1).padStart(2, "0");
    const month = String(birth.getMonth() + 1).padStart(2, "0");
    const year = birth.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const alunoInfo = {
    nome: student?.name,
    matricula: student?.enrollment,
    contato: formatPhone(student?.phone),
    Anivesário: formatBirth(student?.birth_date),
    cpf: student?.cpf,
    email: student?.email,
    apelido: student?.nickname,
    faixa: belts[student?.belt],
    cargo: role[student?.role],
    genero: gender[student?.gender],
  };

  const calculateAge = (birthDate: string | Date) => {
    if (!birthDate) return 0;
  
    const today = new Date();
    const birth = new Date(birthDate);
  
    let age = today.getFullYear() - birth.getFullYear();
  
    const monthDiff = today.getMonth() - birth.getMonth();
  
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
  
    return age;
  };

  return (
    <div className="min-h-screen bg-[#011023]">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="p-8 flex flex-row justify-between items-center mb-6"
      >
        <IoMdArrowRoundBack onClick={() => navigate(-1)} size={20} />
        <button
          className="active:scale-105 transition-all absolute left-1/2 -translate-x-1/2 bg-[#02304F] py-1 px-4 text-[10px] rounded-full whitespace-nowrap"
        >
          Promover a professor
        </button>
        <div className="flex flex-row gap-4 items-center">
          <AiFillEdit className="active:scale-105 transition-all" size={20} />
          <FaTrash className="text-red-500 active:scale-105 transition-all"                       onClick={(e) => {
                        e.stopPropagation();
                        setStudentToDelete(student.id);
                        setConfirmDeleteOpen(true);
                      }}/>
        </div>
      </motion.header>

      {/* Perfil */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-row items-center justify-center gap-5 mb-13"
      >
        <img
          className="h-34 w-34 object-cover rounded-4xl"
          src={student.image_student_url ?? "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg"}
          alt="no tenemos"
        />
        <div className="flex flex-col text-center">
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-bold text-[28px] flex flex-wrap w-40 items-center justify-center"
          >
            {studentName(student?.name)}
          </motion.p>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-medium text-[24px]"
          >
            {belts[student.belt]}
          </motion.p>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-thin text-[20px]"
          >
            {calculateAge(student.birth_date)} anos
          </motion.p>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-regular text-[16px]"
          >
            {student.grade}° grau
          </motion.p>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-row justify-center items-center mt-8 gap-9">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#052659]/60 w-[36%] h-24 rounded-lg"
        >
          <div className="flex flex-row items-center justify-start">
            <p className="px-2 text-[16px]">Frequência</p>
            <div className="text-[#011023] ftext-bold flex justify-center items-center bg-white py-1 px-2 rounded-full text-[10px]">
              Graduar
            </div>
          </div>
          <p className="px-2 text-[64px] leading-none">15</p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#052659]/60 w-[36%] h-24 rounded-lg"
        >
          <div className="flex flex-row items-center justify-start px-2 gap-2">
            <p className="text-[16px]">Turmas</p>
          </div>
          <p className="px-2 text-[64px] leading-none">02</p>
        </motion.div>
      </div>

      {/* Informações */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="px-12 py-8"
      >
        <h3 className="text-[28px] font-bold mb-2">Informações</h3>
        <div className="h-0.5 bg-white mb-2" />
        {Object.entries(alunoInfo).map(([chave, valor]) => (
          <motion.p
            key={chave}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-[16px] capitalize">{chave}:</span> {valor}
          </motion.p>
        ))}
      </motion.div>

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
