import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { Choice } from "../components/choose";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalAdicionarAluno } from "@/screens/student/screens/add_student/pages/add_mobile";
import { useStudentForm } from "./add_student/hooks/studentProps";
import { useStudent } from "@/context/studentContext";
import type { Student } from "../types/type";

export const StudentList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { formData, handleChange } = useStudentForm();
  const { onGetStudent } = useStudent();
  const [_loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [_originalStudents, setOriginalStudents] = useState<Student[]>([]);

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      const res = await onGetStudent();
      if (!res.error) {
        setStudents(res.data.students);
        setOriginalStudents(res.data.students);
      }
      setLoading(false);
    };
    loadStudents();
  }, [location.pathname]);

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
    <motion.div
      id="poppins"
      className="bg-[#011023] z-0 text-white min-h-screen flex flex-col font-sans overflow-y-auto pb-[100px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="flex justify-between items-center p-9 mt-6 py-0"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
      >
        <div className="flex items-center relative">
          <CiSearch
            size={14}
            className="absolute left-[9px] top-1/2 transform -translate-y-1/2 text-[#00AAFF]"
          />
          <input
            type="text"
            className="w-8 h-8 flex justify-center items-center rounded-full bg-[#02385A]/70 text-white text-[10px] placeholder-[#00AAFF] focus:outline-none"
          />
        </div>

        <motion.div
          className="flex items-center gap-1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
        >
          <div className="text-sm px-6 py-[2px] font-semibold rounded-xl cursor-pointer hover:text-[#00AAFF] transition-colors">
            Filtrar por ↓
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="flex justify-center text-[#02304F] items-center bg-blue-500 h-6 w-6 rounded-sm p-[2px]"
          >
            <IoMdAdd size={16} />
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Tabs */}
      <motion.div
        className="flex justify-center mb-7"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Choice />
      </motion.div>

      {/* Cards de alunos */}
      <motion.div
        className="flex flex-col items-center gap-8 px-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {students.map((student) => (
          <motion.div
            key={student.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#052659]/60 rounded-xl p-3 w-full max-w-[346px] h-[110px] flex items-center justify-between shadow-md backdrop-blur-sm"
          >
            <div className="px-4 flex items-center gap-4">
              <motion.img
                src={student.image_student_url ?? "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg"}
                alt={student.name}
                className="w-15 h-15 rounded-full object-cover"
                whileHover={{ rotate: 3 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className="flex flex-col">
                <h3 className="text-[20px] font-semibold">{student.name}</h3>
                <p className="text-[16px] text-white/60">{student.belt}</p>
                <p className="text-[12px] text-white/60">
                  {calculateAge(student.birth_date)} | {student.frequency}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="pr-5 flex items-center justify-center text-white rounded-full"
              onClick={() => navigate("/profileMobile")}
            >
              <FaEye size={25} />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
      <ModalAdicionarAluno
        open={open}
        onClose={() => setOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleNext={() => console.log("ir para Enturmar")}
      />
    </motion.div>
  );
};
