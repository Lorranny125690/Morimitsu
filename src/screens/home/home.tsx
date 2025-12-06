import { Cards } from "./components/card.tsx";
import logo from "../../assets/logo.svg";
import { cards } from "./components/cards.tsx";
import { PiStudentFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { HeaderMobile } from "@/components/headerMobile.tsx";
import { useAuth } from "@/context/authContext.tsx";
import { TurmasRecentes, AlunosAptosGraduar, AlunosAniversariando } from "./components/grid.tsx";
import { SiGoogleclassroom } from "react-icons/si";
import { LuUsersRound } from "react-icons/lu";
import { FaChalkboardTeacher } from "react-icons/fa";

export function HomeMobile() {
  const { authState, onLogout } = useAuth();
  const username = authState?.username || "Usuário";

  return (
    <div
      id="poppins"
      className="min-h-screen bg-[#201E33] text-white flex flex-col overflow-y-auto pb-[100px] overflow-x-hidden"
    >
      {/* Header */}
      <div className="p-4 max-w-[600px] mx-auto w-full">
        <div className="flex justify-between items-center">
          <div onClick={onLogout}>
            <h2 className="text-[2vh] text-red-500 cursor-pointer">Sair</h2>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <p className="text-lg">{username}</p>
            <img
              src={logo}
              alt="avatar"
              className="w-[7vh] h-[7vh] rounded-full max-w-[40px] max-h-[40px]"
            />
          </div>
        </div>

        <div className="px-2 mt-4 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            Bom dia.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl font-light"
          >
            Escolha sua jornada para hoje:
          </motion.p>
        </div>

        {/* Opções de ação */}
        <div className="flex justify-center flex-wrap gap-6">
          {cards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center flex-col h-[12vh] w-[12vh] min-w-[105px] min-h-[115px] bg-[#CCC8F3] text-center shadow-[-8px_8px_0px_#6b61bd] hover:shadow-[-12px_12px_0px_#4c3fa1] transition-all duration-300 cursor-pointer">
                {card.icon}
                <p className="text-[#453E7D] w-[76px] text-[12px] font-medium">
                  {card.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Cards numéricos */}
      <div className="flex items-center grid grid-cols-2 gap-2 mt-10 mx-auto">
        {[
          { title: "Número de alunos", value: 72, icon: <PiStudentFill className="text-[#322F50]" size={20} /> },
          { title: "Número de equipes", value: 18, icon: <LuUsersRound className="text-[#322F50]" size={20} /> },
          { title: "Número de turmas", value: 12, icon: <SiGoogleclassroom className="text-[#322F50]" size={20} /> },
          { title: "Número de professores", value: 6, icon: <FaChalkboardTeacher className="text-[#322F50]" size={20} /> },
        ].map((card, i) => (
          <motion.div
            key={i}
            className="bg-[#322F50] rounded-[28px] h-[20vh] min-h-[176px] w-[20vh] flex flex-col py-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="mb-[2vh] flex items-center justify-between w-full max-w-[85%] gap-3">
              <p className="text-[2.1vh] font-regular leading-tight flex-1">
                {card.title}
              </p>
              <div className="rounded-full flex-shrink-0 flex items-center justify-center h-[4.5vh] w-[4.5vh] bg-white">
                {card.icon}
              </div>
            </div>

            <div className="flex w-full px-4 justify-start items-start">
              <p className="text-[7.2vh] font-bold leading-none">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navegação inferior */}
      <HeaderMobile />
    </div>
  );
}

export function Home() {
  return (
    <div>
      {/* Mobile e iPad */}
      <div className="block lg:hidden">
        <HomeMobile />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div id="poppins" className="min-h-screen bg-[#0D0C15] text-white">
          <Cards />
          <TurmasRecentes />
          <AlunosAptosGraduar />
          <AlunosAniversariando />
        </div>
      </div>
    </div>
  );
}
