import { FaUserShield, FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/image1.png";
import image from "../../assets/logo.png";
import { motion } from "framer-motion";
import { Card } from "../components/card";

export function SelectLogin() {
  const navigate = useNavigate();

  const handleNavigate = (type: "ADMIN" | "TEACHER") => {
    navigate("/login", { state: { userType: type } });
  };

  return (
    <div
      id="mono"
      className="relative min-h-screen min-w-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay vermelho */}
      <div className="absolute inset-0 bg-[#1D1010]/70"></div>

      <Card>
        <motion.div
          className="flex flex-col gap-8 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.img
            src={image}
            alt="logo"
            className="w-19 h-19 mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
          />
          <h2 className=" text-2xl font-bold">Entrar como:</h2>
        </motion.div>

        <div className="flex flex-col gap-6 mb-10">
          {/* Botão Administrador */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="h-10 w-69 flex items-center border border-[#C54848] bg-[#222121] text-[#C54848] hover:border-[#535bf2] hover:bg-[#201E1E] hover:cursor-pointer hover:text-white transition"
            onClick={() => handleNavigate("ADMIN")}
          >
            <div className="flex items-center justify-center w-12 h-10 border-r border-[#C54848] hover:text-white transition">
              <FaUserShield className="text-white" />
            </div>
            <span className="flex-1 text-start px-2  text-lg">
              Administrador
            </span>
          </motion.button>

          {/* Botão Professor */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center border border-[#C54848] bg-[#222121] text-[#C54848] hover:border-[#535bf2] hover:bg-[#201E1E] hover:cursor-pointer hover:text-white transition"
            onClick={() => handleNavigate("TEACHER")}
          >
            <div className="flex items-center justify-center w-12 h-10 border-r border-[#C54848] hover:text-white transition">
              <FaChalkboardTeacher className="text-white" />
            </div>
            <span className="flex-1 text-start px-2  text-lg">
              Professor
            </span>
          </motion.button>
        </div>
      </Card>
    </div>
  );
}
