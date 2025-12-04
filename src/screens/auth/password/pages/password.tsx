import { FaLock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import image from "../../assets/logo.png";
import sideImage from "../../assets/image.png";
import bgImage from "../../assets/image1.png";
import { ModalMsg } from "../../login/pages/login";
import { Field } from "../components/field";
import { LoginController } from "../hooks/password";

export function Password() {
  const {
    loading,
    password,
    setPassword,
    modalVisible,
    modalMsg,
    modalType,
    handleLogin,
    setModalVisible
  } = LoginController();  

  return (
    <div
      id="mono"
      className="z-1000 relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-[#1D1010]/70" />

      {/* card com animação de entrada */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex bg-[#383333] overflow-hidden shadow-xl w-[350px] lg:w-[980px] h-[600px]"
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
          <h2 className="text-4xl font-bold mb-8 text-center">Trocar senha</h2>

          <div className="mb-8 mt-4 w-full flex items-center justify-center flex-col space-y-6">
            <Field onChange={(e) => setPassword(e.target.value)} value={password} icon={<FaLock className="text-white" />} label="Senha" type="password" />
          </div>

          {/* botão login com animação */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="mt-2 w-[109px] h-[37px] bg-[#C54848] hover:bg-red-700 hover:cursor-pointer text-white font-serif text-[15px] rounded-t-[30px] rounded-b-[20px] transition disabled:opacity-50"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </motion.button>
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
