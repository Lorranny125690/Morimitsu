import type { ModalMsgProps } from "@/types/modalTypes";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export const ModalMsg = ({
  show,
  onClose,
  onConfirm,
  message,
  type = "error",
}: ModalMsgProps) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    else onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative bg-[#2c2222] rounded-2xl shadow-2xl w-[320px] p-6 text-center border ${
              type === "error" ? "border-red-400" : "border-green-400"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
              onClick={onClose}
            >
              <FaTimes size={14} />
            </button>

            <div className="text-4xl mb-2">
              {type === "error" ? "💔" : "✨"}
            </div>

            <p className="text-gray-200 text-sm leading-snug">{message}</p>

            <motion.button
              onClick={handleConfirm}
              whileTap={{ scale: 0.95 }}
              className={`mt-5 w-[100px] py-1 rounded-full text-sm font-semibold ${
                type === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              Ok
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
