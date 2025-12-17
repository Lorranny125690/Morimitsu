import { api } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
     CARREGAR AULA (EDIÇÃO)
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
        if (err.response?.status === 404) {
          alert("Esta aula ainda não possui frequência registrada.");
          navigate(-1);
          return;
        }

        console.error(err);
        alert("Erro ao carregar aula");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    }

    carregarAula();
  }, [lesson?.id]);

  /* =========================
     SALVAR PRESENÇA (PUT)
     ========================= */
  async function salvarPresenca() {
    try {
      setSaving(true);

      const aulaId = lesson.id;

      await Promise.all(
        alunos.map(aluno => {
          const body = {
            student_id: aluno.id,
            presence: aluno.presencaHoje,
          };

          // 🔴 IMPORTANTE: retornar a promise
          return api.put(`/presence/update/${aulaId}`, body);
        })
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

  /* =========================
     TOGGLE
     ========================= */
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

  /* =========================
     RENDER
     ========================= */
  return (
    <div className="p-6 text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editar Frequência</h1>

        <button
          onClick={salvarPresenca}
          disabled={saving}
          className="px-6 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </header>

      <ul className="space-y-3">
        {alunos.map(aluno => (
          <li
            key={aluno.id}
            className="flex justify-between items-center bg-white/10 p-4 rounded"
          >
            <span>{aluno.nome}</span>

            <button
              onClick={() => togglePresenca(aluno.id)}
              className={`px-4 py-1 rounded ${
                aluno.presencaHoje ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {aluno.presencaHoje ? "Presente" : "Faltou"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
