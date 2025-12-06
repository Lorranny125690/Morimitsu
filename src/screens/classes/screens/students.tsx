import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

const students = [
  {
    id: 1,
    name: "Manoel Gomes",
    belt: "Faixa azul",
    age: "16 anos",
    presences: "15 presenças",
    photo: "https://i.pinimg.com/736x/01/97/64/019764eba3f4699ef0bbc5927b21a178.jpg",
  },
  {
    id: 2,
    name: "Manoel Gomes",
    belt: "Faixa azul",
    age: "16 anos",
    presences: "15 presenças",
    photo: "https://i.pinimg.com/736x/01/97/64/019764eba3f4699ef0bbc5927b21a178.jpg",
  },
  {
    id: 3,
    name: "Manoel Gomes",
    belt: "Faixa azul",
    age: "16 anos",
    presences: "15 presenças",
    photo: "https://i.pinimg.com/736x/01/97/64/019764eba3f4699ef0bbc5927b21a178.jpg",
  }
];

export const StudentClassList = () => {
  const navigate = useNavigate();
  
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
        className="flex items-center p-9 mt-6 mb-6 py-0"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
      >
        <div className="flex items-center justify-start relative">
          <CiSearch
            size={14}
            className="absolute left-[9px] top-1/2 transform -translate-y-1/2 text-white"
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
          <div 
          onClick={() => navigate("/frequency")}
          className="flex flex-row gap-2 items-center text-md px-22 py-[2px] font-semibold rounded-xl cursor-pointer hover:text-[#00AAFF] transition-colors">
            <AiFillEdit /> Frequência
          </div>
        </motion.div>
      </motion.header>

      <motion.div
        className="flex items-center p-9 mb-6 py-0"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
      >
        <div className="flex items-center w-full justify-start relative">
          Nome da turma
        </div>

        <motion.div
          className="flex w-full text-[12px] items-center gap-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
        >
          <p>Editar</p>
          <p className="text-red-400">Excluir</p>
          <p>Adicionar aluno</p>
        </motion.div>
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
                src={student.photo}
                alt={student.name}
                className="w-15 h-15 rounded-full object-cover"
                whileHover={{ rotate: 3 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <div className="flex flex-col">
                <h3 className="text-[20px] font-semibold">{student.name}</h3>
                <p className="text-[16px] text-white/60">{student.belt}</p>
                <p className="text-[12px] text-white/60">
                  {student.age} | {student.presences}
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
    </motion.div>
  );
};
