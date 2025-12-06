import { motion } from "framer-motion";

export function FrequencyMobile() {

  return (
    <div className="bg-[#011023] z-0 text-white min-h-screen flex flex-col font-sans overflow-y-auto pb-[100px]">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white overflow-y-auto max-w-[336px] max-h-[674px] rounded-xl shadow-xl p-6 relative"
      >
      </motion.div>
    </div>
  );
}
