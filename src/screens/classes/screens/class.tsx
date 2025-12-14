import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { itemVariants, listVariants } from "@/utils/variants";
import { studentName } from "@/screens/student/utils/formatName";
import { formatPhone } from "@/screens/student/utils/formatPhone";

export default function ClassDesktop() {
  const navigate = useNavigate();

  // 🔧 mocks mínimos (substitua pelo que você já tem)
  const loading = false;
  const displayStudents: any[] = [];

  const beltClasses: Record<string, string> = {
    branca: "bg-white",
    azul: "bg-blue-500",
    roxa: "bg-purple-500",
    marrom: "bg-amber-700",
    preta: "bg-black",
  };

  function openProfileModal(student: any) {
    console.log(student);
  }

  function setStudentToDelete(id: number) {
    console.log(id);
  }

  function setConfirmDeleteOpen(state: boolean) {
    console.log(state);
  }

  const role = localStorage.getItem("role")

  return (
    <div className="min-h-screen text-white font-sans">
  
      {/* CONTAINER 6XL */}
      <div className="max-w-6xl mx-auto px-10">
  
        {/* HEADER */}
        <div className="mt-10 flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Turma número 01</h2>
            <p className="text-gray-400 text-sm">Faixa azul · Sub-16</p>
          </div>
          <p className="text-sm">Prof.: Daniel Heckman</p>
        </div>
  
      </div>
  
      {/* LINHA FULL TELA */}
      <div className="w-full border-b border-gray-700 my-6" />
  
      {/* CONTAINER 6XL */}
      <div className="max-w-6xl mx-auto px-10">
  
        {/* AÇÕES */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-[#1C2433] rounded-lg px-4 h-10 w-64">
            <FaSearch className="text-gray-400" />
            <input
              placeholder="Pesquisar equipes"
              className="bg-transparent outline-none text-sm ml-3 w-full"
            />
          </div>
  
          <div className="flex gap-3">
            <button className="px-4 h-10 rounded-lg bg-[#1E90FF]">Editar turma</button>
            <button className="px-4 h-10 rounded-lg bg-[#16A3B8]">Adicionar aluno</button>
            <button className="px-4 h-10 rounded-lg bg-[#0D9488]">Fazer frequência</button>
          </div>
        </div>
  
        {/* TABELA */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#162026] mt-10 rounded-md shadow-lg overflow-hidden max-w-6xl mx-auto"
      >
        <table className="w-full border-collapse text-left table-fixed">
          <thead className="text-gray-400 text-sm">
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 w-24">Foto</th>
              <th className="py-3 px-4 w-40">Nome</th>
              <th className="py-3 px-4 w-32">Número</th>
              <th className="py-3 px-4 w-20 text-center">Faixa</th>
              <th className="py-3 px-4 w-16 text-center">Grau</th>
              <th className="py-3 px-4 w-28 text-center">Frequência</th>
              <th className="py-3 px-4 w-24 text-center">Status</th>
              {role !== "TEACHER" && (
                <th className="py-3 px-4 w-28 text-center">Operação</th>
              )}
              <th className="py-3 px-4 w-24 text-center">Conferir</th>
            </tr>
          </thead>

          <motion.tbody
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              <tr>
                <td colSpan={role !== "TEACHER" ? 9 : 8} className="py-10">
                  <div className="flex justify-center">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
                  </div>
                </td>
              </tr>
            ) : (
              displayStudents.map((s) => (
                <motion.tr
                  key={s.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: "#1E1E2F", scale: 1.01 }}
                  className="border-b border-gray-800"
                  onClick={() => openProfileModal(s)}
                >
                  <td className="py-3 px-4">
                    <img
                      src={s.image_student_url || "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>

                  <td className="py-3 px-4">
                    {s.social_name || studentName(s.name)}
                  </td>

                  <td className="py-3 px-4">{formatPhone(s.phone)}</td>

                  <td className="py-3 px-4 text-center">
                    <span className={`w-6 h-6 inline-block rounded-md ${beltClasses[s.belt] || "bg-gray-500"}`} />
                  </td>

                  <td className="py-3 px-4 text-center">{s.grade}</td>
                  <td className="py-3 px-4 text-center">{s.current_frequency}</td>

                  <td className="py-3 px-4 text-center text-green-500">
                    {s.status}
                  </td>

                  {role !== "TEACHER" && (
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-3">
                        <FaEdit
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit_student/${s.id}`, { state: s });
                          }}
                          className="cursor-pointer hover:text-blue-500"
                        />
                        <FaTrash
                          onClick={(e) => {
                            e.stopPropagation();
                            setStudentToDelete(s.id);
                            setConfirmDeleteOpen(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />
                      </div>
                    </td>
                  )}

                  <td className="py-3 px-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1 bg-[#0070F3] rounded-full text-sm"
                    >
                      Ver
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </motion.div>
  
      </div>
    </div>
  );
}  