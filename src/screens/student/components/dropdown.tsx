import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FilterKey = "presencas" | "mista" | "feminina" | "masculina" | "baby" | "kids";

export function FiltroDropdown({
  filters,
  onToggleFilter,
  alphabetical,
  onSort,
}: {
  filters: Record<FilterKey, boolean>;
  onToggleFilter: (key: FilterKey) => void;
  alphabetical: boolean;
  onSort: () => void;
  onApply: () => void;
}) {
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
            <div className="flex justify-start items-start text-start flex-col gap-4 text-white text-sm">

            <button className="flex gap-2" onClick={() => onToggleFilter("presencas")}>
              <input type="checkbox" checked={filters.presencas} />
              Presenças
            </button>

            <button className="flex gap-2" onClick={() => onToggleFilter("mista")}>
              <input type="checkbox" checked={filters.mista} />
              Turma mista
            </button>

            <button className="flex gap-2" onClick={() => onToggleFilter("feminina")}>
              <input type="checkbox" checked={filters.feminina} />
              Turma feminina
            </button>

            <button className="flex gap-2" onClick={() => onToggleFilter("masculina")}>
              <input type="checkbox" checked={filters.masculina} />
              Turma masculina
            </button>

            <button className="flex gap-2" onClick={() => onToggleFilter("baby")}>
              <input type="checkbox" checked={filters.baby} />
              Turma baby
            </button>

            <button className="flex gap-2" onClick={() => onToggleFilter("kids")}>
              <input type="checkbox" checked={filters.kids} />
              Turma kids
            </button>

            <button className="flex gap-2">
              <input type="checkbox" onChange={onSort} checked={alphabetical}  readOnly/>
              Ordem Alfabética
            </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}