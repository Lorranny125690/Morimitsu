import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { AiOutlineTeam } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface StudentProfileProps {
  closeModal: () => void;
  student: () => void;
}

export const UserProfile = ({ closeModal }: StudentProfileProps) => {

  const navigate = useNavigate();
  
  return (
    <div
      className="fixed inset-0 bg-[#000F22] flex items-center justify-center z-50 backdrop-blur-sm"
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
              onClick={() => navigate(-1)}
              size={30}
            />

            <button className="cursor-pointer hover:scale-110 transition-all bg-white text-[#7C9FC9] font-medium py-3 flex text-[12px] w-[153px] h-9 justify-center items-center rounded-full">
              Promover a professor
            </button>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              className="flex items-center gap-6 mb-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://i.pinimg.com/736x/a5/cb/1a/a5cb1a5651d178a1bde6c41e391dacd2.jpg"
                alt="Perfil"
                className="h-auto w-[21vh] max-h-[21vh] flex rounded-full hover:scale-110 transition-all cursor-pointer"
              />

              <div className="flex items-center flex-col">
                <h1 className="text-[50px] h-12 font-bold text-white">Garu</h1>
                <p className="text-[40px] font-medium text-white/60">Faixa preta</p>
                <p className="text-[20px] text-white">15 anos</p>
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

            <ul className="space-y-4 mt-4">
              <li className="text-[12px] hover:scale-105 transition-all">Turma 1 - Daniel Huckman</li>
              <li className="text-[12px] hover:scale-105 transition-all">Turma 1 - Daniel Huckman</li>
              <li className="text-[12px] hover:scale-105 transition-all">Turma 1 - Daniel Huckman</li>
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

              <button className="cursor-pointer hover:scale-110 transition-all bg-white text-[#7C9FC9] h-6 w-[76px] font-medium flex justify-center items-center py-2 px-4 rounded-lg">
                Graduar
              </button>
            </div>

            <span className="text-[30px] font-semibold text-white">15</span>
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
            <p>Nome: Lorranny</p>
            <p>Idade: 16</p>
            <p>Faixa: Preta</p>
            <p>Contato: 00 0000-0000</p>
          </div>

          <div className="space-y-2">
            <p>Matrícula: 20231031020358</p>
            <p>Cargo: rapaz</p>
            <p>Data de nasc.: 12/12/12</p>
            <p>Email: socorro@gmail.com</p>
          </div>

          <div className="space-y-2">
            <p>Apartido: Boyfriend</p>
            <p>Gênero: masculino</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
