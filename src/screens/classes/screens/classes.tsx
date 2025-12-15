import { FaUser, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useClasses, useDeleteClass } from "../hooks/classes";
import { formatBirth } from "@/utils/formatDate";
import { api } from "@/context/authContext";
import { LoadingScreen } from "@/utils/loading";

export function ClassesDesktop() {
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data: classes = [], isLoading} = useClasses();
  const { mutate: removeClass } = useDeleteClass();

  const role = localStorage.getItem("role");

  // Mapeia teacher_id para o nome do professor
  const [professores, setProfessores] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProfessores = async () => {
      const token = localStorage.getItem("my-jwt");
      if (!token || !classes?.length) return;

      try {
        const results = await Promise.all(
          classes.map(async (classe) => {
            if (!classe.teacher_id) return null;

            const res = await api.get("/user/filter", {
              params: { id: classe.teacher_id },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            return {
              teacher_id: classe.teacher_id,
              name: res.data.users[0].username,
            };
          })
        );

        const map: Record<string, string> = {};
        results.forEach((item) => {
          if (item?.teacher_id && item?.name) {
            map[item.teacher_id] = item.name;
          }
        });

        setProfessores(map);
      } catch (err) {
        console.error("Erro ao buscar professores:", err);
      }
    };

    fetchProfessores();
  }, [classes]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#0D0C15] mb-40 text-white font-sans">
      {/* Conteúdo */}
      <div className="flex flex-col max-w-6xl mx-auto px-6 mt-4">
        {/* Título + botões */}
        <div className="flex items-center justify-end mb-4">
          {/* Search + Add button */}
          <div className="flex items-center justify-center gap-6">
            {/* SEARCH COM CLICK-FORA */}
            <div
              ref={searchRef}
              className={`flex items-center bg-[#323D4E] rounded-full transition-all duration-300 
              h-[50px] cursor-pointer overflow-hidden
              ${open ? "w-[220px] px-4" : "w-[50px] justify-center"}`}
              onClick={() => setOpen(true)}
            >
              {/* Ícone */}
              <FaSearch size={20} className="text-white shrink-0" />

              {/* Input aparece só quando expandido */}
              {open && (
                <input
                  type="text"
                  autoFocus
                  placeholder="Pesquisar..."
                  className="bg-transparent text-white ml-3 outline-none w-full"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>

            {role !== "TEACHER" && (
              <a href="/add_classes">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer flex justify-center flex-row text-[15px] items-center h-10 w-[177px] gap-2 py-2 bg-[#076185] hover:bg-blue-700 rounded-[10px] font-medium transition"
                >
                  Adicionar turma <IoMdAdd size={20} />
                </motion.button>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="w-full border-b border-gray-700" />

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-6xl mx-auto mt-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[64px] w-full">
        {classes.length === 0 ? (
          <div className="col-span-full flex items-center justify-center text-white h-40">
            <p>Sem turmas cadastradas</p>
          </div>
        ) : (
          classes.map((classe) => (
            <motion.div key={classe.id} whileHover={{ scale: 1.02 }}>
              {role !== "TEACHER" && (
                <div className="flex justify-end items-center gap-3 w-full mb-4">
                  <FaEdit className="cursor-pointer hover:text-blue-500 transition" />
                  <FaTrash
                  onClick={() => removeClass(classe.id)}
                  className="cursor-pointer hover:text-red-500 transition"
                />
                </div>
              )}

              {/* Imagem */}
              <div onClick={() => navigate("/class", { state: classe })} className="bg-[#19262A] rounded-b-[6px]">
                <div className="h-[200px] w-full overflow-hidden">
                <img
                  src={
                    classe.image_class_url ??
                    "https://via.placeholder.com/400x200?text=Turma"
                  }
                  alt={classe.name}
                  className="h-full w-full object-cover"
                />

                </div>

                {/* Conteúdo */}
                <div className="p-4 flex items-center flex-col gap-2">
                  <h2 className="text-[16px] font-semibold">
                    {classe.name || "Turma de faixas pretas"}
                  </h2>

                  {/* Instrutor */}
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-300" size={14} />
                    <p className="text-gray-300 text-sm">
                      {professores[classe.teacher_id] || "Instrutor não definido"}
                    </p>
                    <div className="relative group">
                      <RiEditLine
                        className="hover:scale-120 cursor-pointer transition-all text-white"
                        size={20}
                        onClick={() => navigate("/frequency")}
                      />

                      {/* Tooltip */}
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -top-7
                                  bg-black text-white text-xs py-1 px-2 rounded
                                  opacity-0 group-hover:opacity-100 transition-opacity
                                  whitespace-nowrap pointer-events-none"
                      >
                        Frequência
                      </span>
                    </div>
                  </div>

                  {/* Infos */}
                  <div className="flex flex-row gap-2 mt-12 text-gray-400 text-[10px]">
                    <div className="flex items-center gap-2">
                      <PiStudentBold size={14} />
                      <p>{classe._count?.students ?? 0}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt size={14} />
                      <p>{formatBirth(classe.createdAt) || "00/00/0000"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt size={14} />
                      <p>{classe.local || "Local indefinido"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
