import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/context/authContext";

/* ================= TIPOS ================= */

interface FrequencyStudent {
  id: string;
  nome: string;
  presencaHoje: boolean;
  total: number;
}

/* ================= COMPONENT ================= */

export function FrequencyMobile() {
  const location = useLocation();
  const navigate = useNavigate();

  const { classId, teacherId } = location.state || {};
  const students = location.state?.students ?? [];

  const [alunos, setAlunos] = useState<FrequencyStudent[]>([]);
  const [dataAula, setDataAula] = useState("");
  const [classroomId, setClassroomId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /* ================= CRIAR AULA ================= */

  async function criarAulaSeNecessario(): Promise<string> {
    if (classroomId) return classroomId;

    if (!dataAula) {
      alert("Selecione a data da aula");
      throw new Error("Data não definida");
    }

    const res = await api.post(`/classroom/${classId}`, {
      teacher_id: teacherId,
      classroom_date: dataAula,
    });

    const id = res.data.clasroom.id;
    setClassroomId(id);
    return id;
  }

  /* ================= CONFIRMAR PRESENÇA ================= */

  async function confirmarPresenca() {
    try {
      setSaving(true);

      const classroom_id = await criarAulaSeNecessario();

      await Promise.all(
        alunos.map(aluno =>
          api.post(`/presence/add/${classroom_id}`, {
            student_id: aluno.id,
            presence: aluno.presencaHoje,
          })
        )
      );

      setAlunos(prev =>
        prev.map(a => ({
          ...a,
          total: a.presencaHoje ? a.total + 1 : a.total,
          presencaHoje: false,
        }))
      );

      alert("Frequência registrada com sucesso!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar frequência");
    } finally {
      setSaving(false);
    }
  }

  /* ================= CARREGAR ALUNOS ================= */

  useEffect(() => {
    if (!Array.isArray(students)) return;

    const formatados: FrequencyStudent[] = students.map((item: any) => {
      const s = item.student ?? item;

      return {
        id: s.id,
        nome: s.social_name || s.name,
        presencaHoje: false,
        total: s.current_frequency ?? 0,
      };
    });

    setAlunos(formatados);
  }, [students]);

  /* ================= UI ================= */

  return (
    <div className="bg-[#011023] text-white min-h-screen flex flex-col items-center font-sans overflow-y-auto pb-10">

      {/* HEADER */}
      <div className="w-full max-w-[350px] flex items-center justify-between py-12 p-4">
        <h3 className="text-sm font-regular flex items-center justify-center text-center leading-tight">
          Frequência <br /> Diária
        </h3>

        <div className="flex items-center">
          <input
            type="date"
            value={dataAula}
            onChange={(e) => setDataAula(e.target.value)}
            className="border-1 text-sm px-2 py-1 rounded-lg outline-none"
          />
        </div>

        <FaDownload size={12} className="cursor-pointer" />
        <IoMdClose size={16} className="cursor-pointer" />
      </div>

      {/* CARD */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        className="bg-white text-black max-w-[336px] w-full max-h-[674px] rounded-xl shadow-xl overflow-hidden mt-4"
      >
        {/* Agora a tabela respeita o border radius */}
        <table className="w-full table-fixed border-collapse rounded-xl overflow-hidden">
          <colgroup>
            <col style={{ width: "40px" }} />
            <col style={{ width: "1fr" }} />
            <col style={{ width: "110px" }} />
            <col style={{ width: "80px" }} />
          </colgroup>

          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-sm">
              <th className="py-3 px-2 text-left">#</th>
              <th className="py-3 px-2 text-left">Nome</th>
              <th className="py-3 px-2 text-left">Presença</th>
              <th className="py-3 px-2 text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={aluno.id} className="border-t">
                <td className="py-3 px-2 text-sm">{index + 1}</td>

                <td className="py-3 px-2 text-sm truncate">
                  {aluno.nome}
                </td>

                <td className="py-3 px-2">
                  <button
                    onClick={() =>
                      setAlunos(prev =>
                        prev.map(a =>
                          a.id === aluno.id
                            ? { ...a, presencaHoje: !a.presencaHoje }
                            : a
                        )
                      )
                    }
                    className={`text-xs px-3 py-1 rounded-lg border
                      ${
                        aluno.presencaHoje
                          ? "bg-green-500 text-white border-green-500"
                          : "border-gray-400"
                      }`}
                  >
                    {aluno.presencaHoje ? "Presente" : "Ausente"}
                  </button>
                </td>

                <td className="py-3 px-2 text-center font-semibold">
                  {aluno.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <button
        disabled={saving}
        onClick={confirmarPresenca}
        className={`mt-6 w-[200px] h-[42px] rounded-full text-white
          ${saving ? "bg-gray-400" : "bg-sky-700"}`}
      >
        {saving ? "Salvando..." : "Confirmar"}
      </button>
    </div>
  );
}
