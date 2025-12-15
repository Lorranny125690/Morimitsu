import { FaCalendar, FaDownload } from "react-icons/fa";
import bg from "../../assets/bakcgorund.png";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/context/authContext";

export function FrequencyDesktop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { classId, teacherId } = location.state || {};

  interface FrequencyStudent {
    id: string;
    nome: string;
    presencaHoje: boolean;
    ultimos7dias: number[];
    total: number;
  }

  const [dataAula, setDataAula] = useState("");
  const [classroomId, setClassroomId] = useState<string | null>(null);
  const [_creating, setCreating] = useState(false);

  async function criarAulaSeNecessario(): Promise<string> {
    if (classroomId) return classroomId;
  
    if (!dataAula) {
      alert("Defina a data da aula");
      throw new Error("Data não definida");
    }
  
    const res = await api.post(`/classroom/${classId}`, {
      teacher_id: teacherId,
      classroom_date: dataAula,
    });
  
    const newClassroomId = res.data.clasroom.id;
  
    setClassroomId(newClassroomId);
    return newClassroomId;
  }  
  
  const [alunos, setAlunos] = useState<FrequencyStudent[]>([]);

  async function confirmarPresenca() {
    try {
      setCreating(true);
  
      const classroom_id = await criarAulaSeNecessario();
  
      await Promise.all(
        alunos.map(aluno =>
          api.post(`/presence/add/${classroom_id}`, {
            student_id: aluno.id,
            presence: aluno.presencaHoje,
          })
        )
      );
  
      alert("Frequência registrada com sucesso!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Erro ao registrar frequência");
    } finally {
      setCreating(false);
    }
  }  

  useEffect(() => {
    if (!location.state?.students) return;
  
    const alunosFormatados: FrequencyStudent[] =
      location.state.students.map((item: any) => {
        const s = item.student;
  
        return {
          id: s.id,
          nome: s.social_name || s.name,
          presencaHoje: false,
          ultimos7dias: [],
          total: s.current_frequency ?? 0,
        };
      });
  
    setAlunos(alunosFormatados);
  }, [location.state]);  
  
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative w-[80%] min-h-[90vh] max-h-screen bg-white border border-gray-300 rounded-xl p-4 mx-auto overflow-hidden">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between mb-8">

          {/* Título */}
          <div className="flex items-center gap-2">
            <h1 className="text-[16x] px-6 font-semibold text-black">Frequência Diária</h1>

            <span className="bg-black/30 w-0.5 h-16" />

            <button className="text-[15px] text-black/30 font-medium">
              Turma do babys
            </button>
          </div>

          {/* Data e download */}
          <div className="flex flex-row gap-12">

            <div className="flex items-center border px-3 py-2 rounded-md bg-white text-[#555]">
              <div className="flex flex-col leading-none">
                <p className="text-[#560000]/60 text-[16px]">Data</p>
                <input
                  type="date"
                  value={dataAula}
                  onChange={(e) => setDataAula(e.target.value)}
                  className="text-black outline-none w-45 text-xl"
                />
              </div>
              <FaCalendar size={20} className="cursor-pointer text-[#560000]" />
            </div>

            <button className="flex cursor-pointer items-center gap-2 text-red-900 text-sm">
              <FaDownload size={20} className="text-[#560000]" /> 
              Baixar relatório
            </button>
          </div>
          
          <IoMdClose onClick={() => navigate(-1)} className="cursor-pointer text-[#460000] w-30" size={32}/>
        </div>

        {/* TABELA */}
        <div className="w-full h-[calc(90vh-140px)] border rounded-xl overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#EDEDED] text-gray-700">
              <tr>
                <th className="py-3 font-semibold text-center w-12">#</th>
                <th className="py-3 px-3 font-semibold w-12">Nome</th>
                <th className="py-3 px-20 font-semibold text-center">Presença</th>
                <th className="px-80 py-3 font-semibold text-start">
                  Últimos 7 dias de aula
                </th>
                <th className="py-3 pr-4 font-semibold text-center">
                  Total de Presenças
                </th>
              </tr>
            </thead>

            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="border-t">
                  
                  <td className="py-4 px-4 text-gray-700 text-center">
                    {aluno.id}
                  </td>

                  <td className="py-4 px-4 font-semibold text-gray-900">
                    {aluno.nome}
                  </td>

                  <td className="py-4 px-20 text-center">
                    <input
                      type="checkbox"
                      checked={aluno.presencaHoje}
                      className="h-4 w-4 accent-green-600 cursor-pointer"
                      onChange={() => {
                        setAlunos(prev =>
                          prev.map(a =>
                            a.id === aluno.id
                              ? { ...a, presencaHoje: !a.presencaHoje }
                              : a
                          )
                        );
                      }}
                      
                    />
                  </td>

                  <td className="py-4 px-80">
                    <div className="flex items-center justify-start gap-3 text-lg">
                      {aluno.ultimos7dias.map((v, idx) => (
                        <span
                          key={idx}
                          className={v ? "text-green-600" : "text-gray-400"}
                        >
                          {v ? "✔" : "✕"}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 font-bold text-center text-gray-900 text-lg">
                    {aluno.total}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end items-end absolute bottom-0 right-0 w-full pr-8 pb-6">
            <button className="w-[140px] rounded-full h-[46px] text-[#989898]">
              Cancelar
            </button>
            <button
              onClick={confirmarPresenca}
              className="w-[140px] rounded-full h-[46px] text-white bg-[#720000]"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
