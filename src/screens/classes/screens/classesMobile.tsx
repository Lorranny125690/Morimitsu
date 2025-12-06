import { HeaderMobile } from "@/components/headerMobile";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

const students = [
  {
    id: 1,
    name: "Turma 01",
    belt: "Faixa azul",
    photo: "https://i.pinimg.com/736x/01/97/64/019764eba3f4699ef0bbc5927b21a178.jpg",
    students: 12,
  },
  {
    id: 2,
    name: "Turma 02",
    belt: "Faixa azul",
    photo: "https://i.pinimg.com/736x/01/97/64/019764eba3f4699ef0bbc5927b21a178.jpg",
    students: 12,
  },
  {
    id: 3,
    name: "Turma 03",
    belt: "Faixa azul",
    photo: "https://i.pinimg.com/736x/01/97/64/019764eba3f4699ef0bbc5927b21a178.jpg",
    students: 12,
  },
];

export const ClassesMobile = () => {
  return (
    <motion.div
      id="poppins"
      className="overflow-y-auto pb-[100px] bg-[#011023] text-white min-h-screen flex flex-col font-sans overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.header
        className="flex justify-between mb-8 items-center p-9 mt-6 py-0"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
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

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex justify-center text-[#02304F] items-center bg-blue-500 h-6 w-6 rounded-sm p-[2px]"
        >
          <IoMdAdd size={16} />
        </motion.button>
      </motion.header>

      {/* Cards de alunos */}
      <motion.div
        className="flex flex-col items-center gap-8 px-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15, // delay entre os cards
            },
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
            className="bg-[#052659]/60 rounded-xl p-3 w-full max-w-[346px] h-[110px] flex items-center justify-between shadow-md backdrop-blur-sm"
            whileTap={{ scale: 0.97 }}
          >
            <div className="px-4 flex items-center gap-4">
              <motion.img
                src={student.photo}
                alt={student.name}
                className="w-15 h-15 rounded-full object-cover"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className="flex flex-col">
                <h3 className="text-[20px] font-semibold">{student.name}</h3>
                <p className="text-[16px] text-white/60">{student.belt}</p>
                <p className="text-[12px] text-white/60">
                  {student.students} alunos
                </p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="pr-5 flex items-center justify-center text-white rounded-full"
            >
              <FaEye size={25} />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <HeaderMobile />
    </motion.div>
  );
};
