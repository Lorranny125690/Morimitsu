import { FaCalendar, FaDownload } from "react-icons/fa";
import bg from "../../assets/bakcgorund.png";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// Dados simulados
const alunos = [
  {
    id: 1,
    nome: "Laura",
    presencaHoje: false,
    ultimos7dias: [0, 0, 0, 0, 0, 1, 1],
    total: 18,
  },
  {
    id: 2,
    nome: "Miguel",
    presencaHoje: true,
    ultimos7dias: [1, 1, 0, 1, 1, 1, 1],
    total: 23,
  },
  {
    id: 3,
    nome: "Ana",
    presencaHoje: false,
    ultimos7dias: [0, 1, 0, 0, 1, 0, 0],
    total: 12,
  },
];

export function Frequency() {

  const navigate = useNavigate();

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
                  type="text"
                  placeholder="00/00/0000"
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
                      onChange={() => {}}
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
            <button className="w-[140px] rounded-full h-[46px] text-white bg-[#720000]">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
