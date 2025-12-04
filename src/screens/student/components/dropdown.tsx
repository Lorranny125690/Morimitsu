import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FiltroDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* BOTÃO */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hover:cursor-pointer px-5 py-2 bg-[#0070F3] hover:bg-blue-700 rounded-md font-medium transition"
        onClick={() => setOpen(!open)}
      >
        Filtrar por ▾
      </motion.button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-44 bg-[#273240] rounded-md shadow-lg p-3 z-50"
          >
            <div className="flex flex-col gap-4 text-white text-sm">

              <button className="flex gap-2 cursor-pointer text-left hover:text-blue-700 transition">
                <input type="checkbox" />
                Presenças
              </button>

              <button className="flex gap-2 cursor-pointer text-left hover:text-blue-700 transition">
                <input type="checkbox" />
                Turma mista
              </button>

              <button className="flex gap-2 cursor-pointer text-left hover:text-blue-700 transition">
                <input type="checkbox" />
                Turma feminina
              </button>

              <button className="flex gap-2 cursor-pointer text-left hover:text-blue-700 transition">
                <input type="checkbox" />
                Turma masculina
              </button>

              <button className="flex gap-2 cursor-pointer text-left hover:text-blue-700 transition">
                <input type="checkbox" />
                Turma baby
              </button>

              <button className="flex gap-2 cursor-pointer text-left hover:text-blue-700 transition">
                <input type="checkbox" />
                Turma kids
              </button>

              <button className="flex gap-2 cursor-pointer text-left hover:text-blue-700 transition">
                <input type="checkbox" />
                Ordem Alfabética
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
