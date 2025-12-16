import { motion } from "framer-motion";
import { useEffect } from "react";
import { FiExternalLink, FiHelpCircle } from "react-icons/fi";

const HELP_LINK =
  "https://docs.google.com/document/d/1se6S_deVAaTcUp1sXCCYInG7xjok4VQhCX80rr1xstY/edit?usp=sharing";

export function Help() {
  
  useEffect(() => {
    window.open(HELP_LINK, "_blank");
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0C15] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#162026] max-w-md w-full rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-violet-600/20 flex items-center justify-center">
            <FiHelpCircle className="text-violet-400 text-2xl" />
          </div>
        </div>

        <h1 className="text-xl font-semibold text-white mb-2">
          Central de Ajuda
        </h1>

        <p className="text-gray-300 text-sm mb-6">
          Aqui você pode acessar o guia completo de uso do sistema,
          com instruções e explicações detalhadas.
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={HELP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 transition rounded-xl text-white font-medium"
        >
          Acessar documento
          <FiExternalLink />
        </motion.a>
      </motion.div>
    </div>
  );
}
