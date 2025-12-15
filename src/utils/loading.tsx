import { motion } from "framer-motion";

export function LoadingScreen() {

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0C15] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="w-16 h-16 rounded-full border-4 border-[#6B61BD] border-t-transparent"
        />

        {/* Texto */}
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm tracking-widest text-gray-300 uppercase"
        >
          Carregando...
        </motion.span>
      </motion.div>
    </div>
  );
}
