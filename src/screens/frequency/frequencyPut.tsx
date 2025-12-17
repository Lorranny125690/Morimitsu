import { api } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import bg from "../../assets/bakcgorund.png";

interface Aluno {
  id: string;
  nome: string;
  presencaHoje: boolean;
  total: number;
}

export function FrequencyDesktopPut() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { lesson } = state || {};

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* =========================
     CARREGAR AULA
     ========================= */
  useEffect(() => {
    if (!lesson?.id) {
      alert("Aula inválida");
      navigate(-1);
      return;
    }

    async function carregarAula() {
      try {
        const { data } = await api.get(`/presence/${lesson.id}`);

        const formatado: Aluno[] = data.presences.map((p: any) => ({
          id: p.student.id,
          nome: p.student.social_name || p.student.name,
          presencaHoje: p.presence,
          total: p.student.current_frequency ?? 0,
        }));

        setAlunos(formatado);
      } catch (err: any) {
        alert("Erro ao carregar frequência");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    }

    carregarAula();
  }, [lesson?.id]);

  /* =========================
     SALVAR (PUT)
     ========================= */
  async function salvarPresenca() {
    try {
      setSaving(true);

      await Promise.all(
        alunos.map(aluno =>
          api.put(`/presence/update/${lesson.id}`, {
            student_id: aluno.id,
            presence: aluno.presencaHoje,
          })
        )
      );

      alert("Frequência atualizada!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar frequência");
    } finally {
      setSaving(false);
    }
  }

  function togglePresenca(id: string) {
    setAlunos(prev =>
      prev.map(a =>
        a.id === id ? { ...a, presencaHoje: !a.presencaHoje } : a
      )
    );
  }

  if (loading) {
    return <p className="p-6 text-white">Carregando...</p>;
  }

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative w-[80%] min-h-[90vh] bg-white border rounded-xl p-4 overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-black">
              Editar Frequência
            </h1>
            <span className="bg-black/30 w-[2px] h-12" />
            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendar />
              <span>{lesson.classroom_date}</span>
            </div>
          </div>

          <IoMdClose
            onClick={() => navigate(-1)}
            className="cursor-pointer text-[#460000]"
            size={32}
          />
        </div>

        {/* TABELA */}
        <div className="w-full h-[calc(90vh-160px)] border rounded-xl overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#EDEDED] text-gray-700">
              <tr>
                <th className="py-3 px-4 text-center w-12">#</th>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4 text-center">Presença</th>
                <th className="py-3 px-4 text-center">
                  Total de Presenças
                </th>
              </tr>
            </thead>

            <tbody>
              {alunos.map((aluno, index) => (
                <tr key={aluno.id} className="border-t">
                  <td className="py-4 px-4 text-center text-gray-600">
                    {index + 1}
                  </td>

                  <td className="py-4 px-4 font-semibold text-gray-900">
                    {aluno.nome}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={aluno.presencaHoje}
                      className="h-4 w-4 accent-green-600 cursor-pointer"
                      onChange={() => togglePresenca(aluno.id)}
                    />
                  </td>

                  <td className="py-4 px-4 text-center font-bold text-gray-900">
                    {aluno.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 absolute bottom-6 right-8">
          <button
            onClick={() => navigate(-1)}
            className="w-[140px] h-[46px] rounded-full text-gray-500"
          >
            Cancelar
          </button>

          <button
            onClick={salvarPresenca}
            disabled={saving}
            className={`w-[140px] h-[46px] rounded-full text-white
              ${saving ? "bg-gray-400" : "bg-[#720000]"}`}
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
