import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { AiOutlineTeam } from "react-icons/ai";
import type { Student } from "../types/type";
import { belts } from "../types/belt";
import { role, gender } from "../types/role";
import { useStudent } from "@/context/studentContext";
import { useState } from "react";
import { PasswordModal } from "../components/modal";
import { api } from "@/context/authContext";

interface StudentProfileProps {
  closeModal: () => void;
  student: Student;
}

export const StudentProfile = ({ closeModal, student }: StudentProfileProps) => {
  const { onGraduate } = useStudent();

  const userRole = localStorage.getItem("role");

  const formatPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
  
    const ddd = digits.slice(0, 2);
    const nine = digits.slice(2, 3);
    const number1 = digits.slice(3, 7);
    const number2 = digits.slice(7, 11);
  
    return `(${ddd}) ${nine} ${number1}-${number2}`;
  };

  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const studentName = (student: string) => {
    const firstName = student.split(" ")[0];
    const secondName = student.split(" ")[1];
    if (secondName === "de" || secondName === "do" || secondName === "da") {
      const thirdName = student.split(" ")[2];
      return (`${firstName} ${secondName} ${thirdName}`)
    }

    return (`${firstName} ${secondName}`)
  }

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
  
  const formatBirth = (birthDate: string | Date) => {
    const birth = new Date(birthDate);
  
    const day = String(birth.getDate() + 1).padStart(2, "0");
    const month = String(birth.getMonth() + 1).padStart(2, "0");
    const year = birth.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const handleGraduate = async(id: string) => {
    console.log(id)
    await onGraduate(id)
  }

  const handlePromote = async (password: string) => {
    const email = localStorage.getItem("email");
    const userRole = localStorage.getItem("role");
  
    try {
      await api.post(`/user/create`, {
        email,
        password,
        userRole,
      });
      console.log("Usuário promovido!");
    } catch (err) {
      console.error(err);
    }
  };
  
  const formatCPF = (cpf_number: string) => {
    const first = cpf_number.slice(0, 3);
    const second = cpf_number.slice(3, 6);
    const third = cpf_number.slice(6, 9);
    const fourth = cpf_number.slice(9, 12);

    return (`${first}.${second}.${third}-${fourth}`)
  }
  
  return (
    <div
      className="fixed inset-0 bg-[#000F22]/70 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={closeModal}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <motion.div
          className="flex h-[25vh] flex-col bg-[#7C9FC9] p-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex h-0.5 justify-between items-center">
            <IoMdArrowRoundBack
              className="hover:scale-110 cursor-pointer transition-all"
              onClick={closeModal}
              size={30}
            />

            {userRole !== "TEACHER" && (
              <button className="cursor-pointer hover:scale-110 transition-all bg-white text-[#7C9FC9] font-medium py-3 flex text-[12px] w-[153px] h-9 justify-center items-center rounded-full" onClick={() => setOpenPasswordModal(true)}>
                Promover a professor
              </button>
            )}
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              className="flex items-center gap-6 mb-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={
                  student.image_student_url
                  ? student.image_student_url
                    : "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg"
                }
                alt="Perfil"
                className="h-auto w-[21vh] max-h-[21vh] object-cover flex rounded-full transition-all cursor-pointer"
              />

              <div className="flex items-center flex-col">
                <h1 className="text-[50px] h-12 font-bold text-white">{student.social_name || studentName(student.name)}</h1>
                <p className="text-[40px] font-medium text-white/60">{belts[student.belt]}</p>
                <p className="text-[20px] text-white">{calculateAge(student.birth_date)} anos</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Conteúdo */}
        <div className="gap-12 p-6 mb-8 justify-items-center flex justify-center">
          {/* Turmas */}
          <motion.div
            className="hover:scale-110 transition-all flex flex-col justify-center items-center bg-[#7C9FC9] text-white rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-row items-center gap-2 justify-center">
              <div className="bg-white h-6 w-6 flex justify-center items-center rounded-[10px]">
                <AiOutlineTeam className="text-[#7C9FC9]" />
              </div>
              <h2 className="text-[16px] font-semibold">Turmas</h2>
            </div>

            <ul>
              {Array.isArray(student.classes) && student.classes.length > 0 ? (
                student.classes.map((cls) => (
                  <li
                    key={cls.id}
                    className="text-[12px] hover:scale-105 transition-all"
                  >
                    {cls.class_id}
                  </li>
                ))
              ) : (
                <li className="text-lg text-white/70 mt-2 mb-2">Sem classes</li>
              )}
            </ul>

          </motion.div>

          {/* Frequências */}
          <motion.div
            className="hover:scale-110 transition-all flex flex-col h-[88px] w-[208px] bg-[#7C9FC9] items-center justify-center rounded-lg p-2 px-4 shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-row gap-4 items-start justify-start">
              <h2 className="text-[16px] font-semibold text-white">Frequências</h2>

              {userRole !== "TEACHER" && (
                <button onClick={() => handleGraduate(String(student.id))} className="cursor-pointer hover:scale-110 transition-all bg-white text-[#7C9FC9] h-6 w-[76px] font-medium flex justify-center items-center py-2 px-4 rounded-lg">
                Graduar
              </button>)}
            </div>

            <span className="text-[30px] font-semibold text-white">{student.frequency || 0}</span>
          </motion.div>
        </div>

        {/* Título Informações */}
        <motion.h2
          className="px-6 text-[30px] font-medium text-[#7C9FC9]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Informações
        </motion.h2>

        {/* Informações */}
        <motion.div
          className="hover:scale-110 transition-all text-[#5482B3] bg-[#C2E8FF] ml-5 mr-5 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6 p-6 mb-8 shadow-xl/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-2">
            <p>Nome: {student.name}</p>
            <p>Idade: {calculateAge(student.birth_date)}</p>
            <p>Faixa: {belts[student.belt]}</p>
            <p>Contato: {formatPhone(student.phone)}</p>
          </div>

          <div className="space-y-2">
            <p>Matrícula: {student.enrollment}</p>
            <p>Cargo: {role[student.role]}</p>
            <p>Data de nasc.: {formatBirth(student.birth_date)}</p>
            <p>Email: {student.email}</p>
          </div>

          <div className="space-y-2">
            <p>Apelido: {student.social_name || "não tem"}</p>
            <p>Gênero: {gender[student.gender]}</p>
            <p>Grau: {student.grade}</p>
            <p>CPF: {formatCPF(student.cpf)}</p>
          </div>
        </motion.div>
      </motion.div>

      <PasswordModal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        onConfirm={(pass: string) => {
          console.log("Senha digitada:", pass);
          setOpenPasswordModal(false);
          handlePromote(pass); // aqui você envia pro backend
        }}
      />
    </div>
  );
};
