import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FiltroDropdown({
  classes,
  filters,
  onToggleFilter,
  alphabetical,
  onSort,
}: {
  classes: { id: string; name: string }[];
  filters: Record<string, boolean>;
  onToggleFilter: (id: string) => void;
  alphabetical: boolean;
  onSort: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* BOTÃO */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2 bg-[#0070F3] hover:bg-blue-700 rounded-md font-medium transition"
        onClick={() => setOpen((prev) => !prev)}
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
            className="absolute left-0 mt-2 w-56 bg-[#273240] rounded-md shadow-lg p-3 z-50"
          >
            <div className="flex flex-col gap-3 text-white text-sm">
              {/* filtros por turma */}
              {classes.map((cls) => (
                <label
                  key={cls.id}
                  className="flex gap-2 items-center cursor-pointer hover:text-blue-400 transition"
                >
                  <input
                    type="checkbox"
                    checked={!!filters[cls.id]}
                    onChange={() => onToggleFilter(cls.id)}
                  />
                  {cls.name}
                </label>
              ))}

              <hr className="border-white/10 my-2" />

              {/* ordenação */}
              <label className="flex gap-2 items-center cursor-pointer hover:text-blue-400 transition">
                <input
                  type="checkbox"
                  checked={alphabetical}
                  onChange={onSort}
                />
                Ordem alfabética
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
