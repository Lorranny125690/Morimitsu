import { motion } from "framer-motion";
import { useState } from "react";

export function PasswordModal({ open, onClose, onConfirm }: any) {
  const [password, setPassword] = useState("");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={onClose} // clicar fora fecha
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-[300px]"
        onClick={(e) => e.stopPropagation()}  // ← impede abrir outro modal
      >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Confirmar promoção
        </h2>

        <label className="text-sm text-gray-600">Senha do professor:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-2 mb-4 border p-2 text-black rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between gap-3 mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-full bg-gray-200 rounded-lg py-2 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfirm(password);
            }}
            className="w-full bg-[#0070F3] text-white rounded-lg py-2 hover:bg-blue-700 transition"
          >
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
