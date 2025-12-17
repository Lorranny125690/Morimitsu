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

  const {
    classId,
    teacherId,
    classroomId: classroomIdFromState,
    students,
  } = state || {};

  const [classroomId, setClassroomId] = useState<string | null>(
    classroomIdFromState ?? null
  );

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* =========================
     CARREGAR AULA (EDIÇÃO)
     ========================= */
     useEffect(() => {
      if (!classroomId) return;
    
      async function carregarAula() {
        try {
          const { data } = await api.get(`/presence/${classroomId}`);
    
          const formatado: Aluno[] = data.presences.map((p: any) => ({
            id: p.student.id,
            nome: p.student.social_name || p.student.name,
            presencaHoje: p.presence,
            total: p.student.current_frequency ?? 0,
          }));
    
          setAlunos(formatado);
        } catch (err: any) {
          if (err.response?.status === 404) {
            // aula existe, mas ainda não tem presença
            setAlunos([]);
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
    }, [classroomId]);    

  /* =========================
     NOVA AULA
     ========================= */
  useEffect(() => {
    if (classroomId || !students) return;

    const formatado: Aluno[] = students.map((item: any) => ({
      id: item.student.id,
      nome: item.student.social_name || item.student.name,
      presencaHoje: false,
      total: item.student.current_frequency ?? 0,
    }));

    setAlunos(formatado);
    setLoading(false);
  }, [students, classroomId]);

  /* =========================
     CRIAR AULA (1x)
     ========================= */
  async function criarAula() {
    if (classroomId) return classroomId;

    const { data } = await api.post("/classroom/create", {
      class_id: classId,
      teacher_id: teacherId,
      classroom_date: new Date().toISOString(),
    });

    setClassroomId(data.id);
    return data.id;
  }

  /* =========================
     SALVAR PRESENÇA
     ========================= */
     async function salvarPresenca() {
      try {
        setSaving(true);
    
        let aulaId = classroomId;
    
        if (!aulaId) {
          aulaId = await criarAula();
        }
    
        const isEdit = Boolean(classroomIdFromState);
    
        await Promise.all(
          alunos.map(aluno => {
            const body = {
              student_id: aluno.id,
              presence: aluno.presencaHoje,
            };
    
            return isEdit
              ? api.put(`/presence/update/${aulaId}`, body)
              : api.post(`/presence/add/${aulaId}`, body);
          })
        );
    
        alert("Frequência salva!");
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
        <h1 className="text-2xl font-bold">
          {classroomId ? "Editar Frequência" : "Nova Frequência"}
        </h1>

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
