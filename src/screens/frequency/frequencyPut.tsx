import { FaCalendar, FaDownload } from "react-icons/fa";
import bg from "../../assets/bakcgorund.png";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/context/authContext";

interface FrequencyStudent {
  id: string;
  nome: string;
  presencaHoje: boolean;
  ultimos7dias: number[];
  total: number;
}

export function FrequencyDesktopPut() {
  const navigate = useNavigate();
  const location = useLocation();

  const { classroomId } = location.state || {};

  const [dataAula, setDataAula] = useState("");
  const [alunos, setAlunos] = useState<FrequencyStudent[]>([]);
  const [saving, setSaving] = useState(false);

  // 🔴 Segurança
  useEffect(() => {
    if (!classroomId) {
      alert("Aula inválida");
      navigate(-1);
    }
  }, [classroomId]);

  // 🔥 CARREGA A AULA
  useEffect(() => {
    if (!classroomId) return;

    async function carregarAula() {
      try {
        const res = await api.get(`/presence/classroom/${classroomId}`);

        setDataAula(res.data.classroom_date);

        const alunosFormatados: FrequencyStudent[] =
          res.data.students.map((s: any) => ({
            id: s.id,
            nome: s.name,
            presencaHoje: s.presence,
            ultimos7dias: [],
            total: s.total ?? 0,
          }));

        setAlunos(alunosFormatados);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar aula");
        navigate(-1);
      }
    }

    carregarAula();
  }, [classroomId]);

  // 🔥 SALVA EDIÇÃO
  async function confirmarPresenca() {
    try {
      setSaving(true);

      await Promise.all(
        alunos.map(aluno =>
          api.put(`/presence/update/${classroomId}`, {
            student_id: aluno.id,
            presence: aluno.presencaHoje,
          })
        )
      );

      alert("Frequência atualizada com sucesso!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar frequência");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative w-[80%] min-h-[90vh] bg-white border rounded-xl p-4">

        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <h1 className="px-6 font-semibold text-black">Editar Frequência</h1>

          <IoMdClose
            onClick={() => navigate(-1)}
            className="cursor-pointer text-[#460000]"
            size={32}
          />
        </div>

        {/* DATA */}
        <div className="flex gap-12 mb-6 px-6">
          <div className="flex items-center border px-3 py-2 rounded-md bg-white">
            <div className="flex flex-col">
              <p className="text-[#560000]/60 text-sm">Data</p>
              <input
                type="date"
                value={dataAula}
                disabled
                className="text-black bg-transparent outline-none"
              />
            </div>
            <FaCalendar size={20} className="text-[#560000]" />
          </div>

          <button className="flex items-center gap-2 text-red-900 text-sm">
            <FaDownload size={20} /> Baixar relatório
          </button>
        </div>

        {/* TABELA */}
        <div className="border rounded-xl overflow-auto h-[60vh]">
          <table className="w-full text-sm">
            <thead className="bg-[#EDEDED]">
              <tr>
                <th className="py-3">Nome</th>
                <th className="py-3 text-center">Presença</th>
                <th className="py-3 text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              {alunos.map(aluno => (
                <tr key={aluno.id} className="border-t">
                  <td className="py-4 px-4 font-semibold">{aluno.nome}</td>

                  <td className="py-4 text-center">
                    <input
                      type="checkbox"
                      checked={aluno.presencaHoje}
                      className="h-4 w-4 accent-green-600"
                      onChange={() =>
                        setAlunos(prev =>
                          prev.map(a =>
                            a.id === aluno.id
                              ? { ...a, presencaHoje: !a.presencaHoje }
                              : a
                          )
                        )
                      }
                    />
                  </td>

                  <td className="py-4 text-center font-bold">
                    {aluno.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 mt-6 px-6">
          <button onClick={() => navigate(-1)} className="text-gray-500">
            Cancelar
          </button>

          <button
            disabled={saving}
            onClick={confirmarPresenca}
            className={`w-[140px] h-[46px] rounded-full text-white
              ${saving ? "bg-gray-400" : "bg-[#720000]"}`}
          >
            {saving ? "Salvando..." : "Atualizar"}
          </button>
        </div>
      </div>
    </div>
  );
}
