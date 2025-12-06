import { FaUser, FaLock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import image from "@/assets/logo.png";
import sideImage from "@/assets/image.png";
import bgImage from "@/assets/image1.png";
import { Field } from "../../login/components/field";
import { ModalMsg } from "@/components/modal";
import { LoginController } from "../hooks/login";

export function Login() {

  const {
    loading,
    email,
    setEmail,
    senha,
    setSenha,
    modalVisible,
    modalMsg,
    modalType,
    handleLogin,
    setModalVisible,
    handleNavigate,
    handleKey,
    userType
  } = LoginController();  

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#1D1010]/70" />

      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex bg-[#383333] overflow-hidden shadow-xl w-[85%] lg:w-[980px] h-[600px]"
      >
        {/* esquerda: formulário */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 lg:px-20 text-white">
          <motion.img
            src={image}
            alt="logo"
            className="w-20 h-20 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          />

          {/* 👇 muda o texto conforme o tipo */}
          <h2 className="text-4xl font-bold mb-2">Entrar</h2>
          <p className="text-sm text-gray-300 mb-6 ">
            Login como <span className="text-[#C54848] font-semibold">{userType}</span>
          </p>

          <div className="mt-4 w-full flex items-center justify-center flex-col space-y-6">
            <Field
              icon={<FaUser className="text-white" />}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
            />
            <Field
              icon={<FaLock className="text-white" />}
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={handleKey}
            />
          </div>

          <a
            className="hover:underline cursor-pointer text-xs flex text-gray-300 self-start px-4 mt-3 mb-8 transition"
            onClick={(e) => {
              e.preventDefault(); // previne reload
              handleNavigate("1"); // navega para login com tipo 1
            }}
          >
            Esqueceu a senha?
          </a>

          {/* botão login */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="mt-2 w-[109px] h-[37px] bg-[#C54848] hover:bg-red-700 hover:cursor-pointer text-white  text-[15px] rounded-t-[30px] rounded-b-[20px] transition disabled:opacity-50"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </motion.button>

          <p className="text-lg text-gray-200 mt-6  text-center leading-tight">
            Não tem uma conta?
            <br />
            <a onClick={(e) => {e.preventDefault(); handleNavigate("2");}} className="cursor-pointer text-[#C54848] hover:underline">
              Enviar email ao Administrador
            </a>
          </p>
        </div>

        {/* direita: imagem */}
        <div className="hidden lg:block w-1/2">
          <img src={sideImage} alt="login" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* overlay de loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              className="rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <ModalMsg
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMsg}
        type={modalType}
      />
    </div>
  );
}
export { ModalMsg };

