import { motion } from "framer-motion";

export const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="flex flex-col bg-[#383333] lg:w-105 h-137 p-8 items-center justify-center shadow-lg text-center relative z-10"
  >
    {children}
  </motion.div>
);