import React, { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiEdit3,
  FiUsers,
  FiDownload,
  FiPieChart,
  FiUserCheck,
  FiClock,
} from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

interface Student {
  name: string;
  faixa: string;
  presences: number;
}
const advancedStudents: Student[] = [
  { name: "Carlos Oliveira", faixa: "Roxa", presences: 45 },
  { name: "Fernanda Souza", faixa: "Marrom", presences: 52 },
  { name: "Lucas Mendes", faixa: "Preta", presences: 60 },
];

import {
  getSummary,
  getWeekGraphic,
  getMonthGraphic,
  type WeekGraphic,
  type MonthGraphic,
} from "@/utils/get";
import { LoadingScreen } from "@/utils/loading";
import { Student } from "../student";
import { useStudent } from "@/context/studentContext";
import { studentName } from "../../utils/formatName";
import { useNavigate } from "react-router-dom";
import { api } from "@/context/authContext";
import { belts } from "../student/types/belt";

/* ---------------- Components ---------------- */
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
}

const graphicToArray = (graphic: Record<string, number>) =>
  Object.entries(graphic).map(([name, value]) => ({
    name,
    value,
  }));


const StatCard: React.FC<StatCardProps> = ({ title, value, icon, accent }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-gradient-to-br from-white to-[#F8F9FF] rounded-2xl p-6 shadow-lg flex flex-col justify-between border border-gray-100"
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-sm text-[#6b61bd] font-medium tracking-wide">
          {title}
        </span>
        <span className="text-3xl font-extrabold text-[#20164a] mt-1">
          {value}
        </span>
      </div>
      <div className={`p-3 rounded-xl ${accent} bg-opacity-20 shadow-inner`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

interface BirthdayStudent {
  id: string;
  name: string;
  birth_date: Date | string;
}

interface Summary {
  totalStudents: number;
  studentsEligible: number;
  avgAttendancePercent: number;
  activeClasses: number;
  totalTeachers: number;
  futureClasses: number;
}

/* ---------------- Dashboard Page ---------------- */
export const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [week, setWeek] = useState<WeekGraphic[]>([]);
  const [month, setMonth] = useState<MonthGraphic[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentBirth, setStudentBirth] = useState<BirthdayStudent[]>([])
  const [studentG, setStudentG] = useState<BirthdayStudent[]>([])
  const { onGetSTudentBirthday } = useStudent();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const [summaryRes, weekRes, monthRes] = await Promise.all([
          getSummary(),
          getWeekGraphic(),
          getMonthGraphic(),
        ]);
  
        const s = summaryRes.data.statistics;

        const res = await onGetSTudentBirthday();
        console.log(res.data)
        setStudentBirth(res.data?.celebrants)

        const resG = await api.get("/student/fits-graduate")
        setStudentG(resG.data?.students)
  
        setSummary({
          totalStudents: s.quant_students,
          studentsEligible: s.fits_to_graduate,
          avgAttendancePercent: s.media_frequency,
          activeClasses: s.quant_classes,
          totalTeachers: s.quant_teachers,
          futureClasses: s.future_classrooms,
        });
  
        setWeek(
          graphicToArray(weekRes.data.graphic).map(item => ({
            name: item.name,
            presences: item.value,
          }))
        );
  
        setMonth(graphicToArray(monthRes.data.graphic));
      } finally {
        setLoading(false);
      }
    }
  
    load();
  }, []);  

  if (loading || !summary) return <LoadingScreen />;
  
  return (
    <div className="overflow-y-auto pb-[100px] bg-gradient-to-br from-[#0D0C15] via-[#161422] to-[#1E1A30]">
    <div className="max-w-6xl mx-auto min-h-screen text-white font-sans px-6 py-10 space-y-12">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/90 w-12 h-12 flex items-center justify-center shadow-md">
            <FiPieChart className="text-[#6B61BD] text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-white">Painel de Controle</h2>
        </div>
      </header>

      {/* Seção 1 - Estatísticas rápidas */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-200">
          📊 Resumo Rápido
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <StatCard
            title="Alunos registrados"
            value={summary.totalStudents}
            icon={<FiUsers className="text-lg text-white" />}
            accent="bg-[#6B61BD]"
          />
          <StatCard
            title="Aptos à graduação"
            value={summary.studentsEligible}
            icon={<FiBookOpen className="text-lg text-white" />}
            accent="bg-[#6B61BD]"
          />
          <StatCard
            title="Média de frequência"
            value={`${summary.avgAttendancePercent}%`}
            icon={<FiEdit3 className="text-lg text-white" />}
            accent="bg-[#6B61BD]"
          />
          <StatCard
            title="Turmas ativas"
            value={summary.activeClasses}
            icon={<FiUserCheck className="text-lg text-white" />}
            accent="bg-[#6B61BD]"
          />
          <StatCard
            title="Professores"
            value={summary.totalTeachers} 
            icon={<FiUsers className="text-lg text-white" />}
            accent="bg-[#6B61BD]"
          />
          <StatCard
            title="Aulas futuras"
            value={summary.futureClasses}
            icon={<FiClock className="text-lg text-white" />}
            accent="bg-[#6B61BD]"
          />
        </div>
      </section>

      {/* Seção 2 - Gráficos */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-200">📈 Gráficos</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Frequência semanal */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#20164a] text-lg font-semibold">
                Frequência semanal
              </h4>
              <span className="text-sm text-gray-500">Últimas 4 semanas</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={week}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="presences"
                  stroke="#6B61BD"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Atividades por mês */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#20164a] text-lg font-semibold">
                Atividades por mês
              </h4>
              <span className="text-sm text-gray-500">Ano atual</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={month}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="value" fill="#6B61BD" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Seção 3 - Listas e Tabelas */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-200">
          📋 Listas & Detalhes
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Aptos à graduação */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-[#20164a] text-lg font-semibold mb-4">
              Aptos à graduação
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              {studentG.map((s: any) => <li className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition">
                <span>{s.name} — {belts[s.belt]}</span>
                <button className="text-sm text-[#6B61BD] hover:underline">
                  Conferir
                </button>
              </li>)}
            </ul>
          </div>

          {/* Aniversariantes */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#20164a] text-lg font-semibold">
                Aniversariantes (mês)
              </h4>
              <FaBirthdayCake className="text-[#6B61BD]" />
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {studentBirth.map((s: any) => (
                <li key={s.id}>
                  🎂 {studentName(s.name)} — {s.birth_date}
                </li>
              ))}
            </ul>
          </div>

          {/* Ações rápidas */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#20164a] text-lg font-semibold">
                Ações rápidas
              </h4>
              <FiDownload className="text-gray-500" />
            </div>
            <div className="grid text-slate-500 gap-3">
              <button onClick={() => navigate("/add_student")} className="w-full text-left px-4 py-2 rounded-md bg-[#F5F7FF] hover:bg-[#E9ECFF] transition">
                ➕ Cadastrar aluno
              </button>
              <button onClick={() => navigate("/classes")} className="w-full text-left px-4 py-2 rounded-md bg-[#F5F7FF] hover:bg-[#E9ECFF] transition">
                📝 Registrar presença
              </button>
              <button className="w-full text-left px-4 py-2 rounded-md bg-[#F5F7FF] hover:bg-[#E9ECFF] transition">
                📊 Gerar relatório
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4 - Tabela avançados */}
      <section>
        <h3 className="text-lg font-semibold mb-4 text-gray-200">
          🥋 Alunos — Faixa Roxa ou superior
        </h3>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-[#F8F9FF]">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Nome</th>
                <th className="px-6 py-3 text-left font-semibold">Faixa</th>
                <th className="px-6 py-3 text-left font-semibold">Presenças</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {advancedStudents.map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{student.name}</td>
                  <td className="px-6 py-3">{student.faixa}</td>
                  <td className="px-6 py-3">{student.presences}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
    </div>
  );
};
