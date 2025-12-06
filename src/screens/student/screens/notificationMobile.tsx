import { HeaderMobile } from "@/components/headerMobile";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { Choice } from "../components/choose";

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
  },
];

export const NotificationMobile = () => {
  return (
    <div id="poppins" className="bg-[#011023] text-white min-h-screen flex flex-col font-sans overflow-y-auto pb-[100px]">
      {/* Header */}
      <header className="flex justify-between items-center p-9 mt-6  py-0">
        <div className="flex items-center relative">
          <CiSearch
            size={14}
            className="absolute left-[9px] top-1/2 transform -translate-y-1/2 text-[#white]"
          />
          <input
            type="text"
            className="w-8 h-8 flex justify-center items-center rounded-full bg-[#02385A]/70 text-white text-[10px] placeholder-[#00AAFF] focus:outline-none"
          />
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-center gap-1">
            <div className="text-sm px-6 py-[2px] font-semibold rounded-xl cursor-pointer">
              Filtrar por ↓
            </div>
            <button className="flex justify-center text-[#02304F] items-center bg-blue-500 h-6 w-6 rounded-sm p-[2px]">
              <IoMdAdd size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mb-7">
        <Choice />
      </div>

      {/* Cards de alunos */}
      <div className="flex flex-col items-center gap-8 px-3">
        {students.map((student) => (
          <motion.div
            key={student.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="bg-[#052659]/60 rounded-xl p-3 w-full max-w-[346px] h-[110px] flex items-center justify-between shadow-md"
          >
            <div className="px-4 flex items-center gap-4">
              <img
                src={student.photo}
                alt={student.name}
                className="w-15 h-15 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="text-[20px] font-semibold">{student.name}</h3>
                <p className="text-[16px] text-white/60">{student.belt}</p>
                <p className="text-[12px] text-white/60">
                  {student.age} | {student.presences}
                </p>
              </div>
            </div>
            <button className="pr-5 flex items-center justify-center text-white rounded-full">
              <FaEye size={25} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <HeaderMobile />
      </div>
    </div>
  );
};
