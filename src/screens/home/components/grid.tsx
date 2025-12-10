import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useStudent } from "@/context/studentContext";
import type { Student } from "@/screens/student/types/type";

interface ListaCarrosselProps {
  id?: string;
  titulo: string;
  tipo: "turmas" | "graduar" | "aniversario";
}

function ScreenCard({ id, titulo, tipo }: ListaCarrosselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { 
    onGetSTudentBirthday,
    onGetStudent,
  } = useStudent();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
  
      let list: Student[] = [];
  
      if (tipo === "aniversario") {
        const res = await onGetSTudentBirthday();
        list = res.data?.celebrants ?? [];
      }
  
      if (tipo === "turmas") {
        const res = await onGetStudent();
        list = res.data?.recentClasses ?? [];
      }
  
      if (tipo === "graduar") {
        const res = await onGetStudent();
        list = res.data?.students ?? [];
      }
  
      // 🚨 fallback UNIFICADO
      if (!list || list.length === 0) {
        list = [{
          id: 0,
          name: "Sem alunos",
          image_student_url:
            "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg",
        } as Student];
      }
  
      setStudents(list);
      setLoading(false);
    }
  
    load();
  }, [tipo]);   

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section id={id} className="flex flex-col items-center bg-[#0D0C15] py-16">
      <h2 className="w-full max-w-7xl text-3xl font-semibold mb-8 text-white text-start">
        {titulo}
      </h2>

      {/* WRAPPER: SETAS + CARROSSEL */}
      <div className="w-full max-w-7xl flex items-center gap-4">

        {/* SETA ESQUERDA FORA DO CARROSSEL */}
        <button
          onClick={scrollLeft}
          className="cursor-pointer bg-white text-black p-3 rounded-full"
        >
          ←
        </button>

        {/* CARROSSEL */}
        <div
          ref={scrollRef}
          tabIndex={0}
          className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth
                     snap-x snap-mandatory pb-6 hide-scrollbar w-full"
          role="region"
          aria-label={`Carrossel de ${titulo}`}
        >
          {students.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="w-[328px] h-[292px] snap-start flex-shrink-0 bg-[#1A1824]/90
                         rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.04]
                         transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={s.image_student_url ?? "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg"}
                  alt={s.name}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="bg-white text-black text-center py-3 text-lg font-semibold">
                {s.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SETA DIREITA FORA DO CARROSSEL */}
        <button
          onClick={scrollRight}
          className="cursor-pointer bg-white text-black p-3 rounded-full"
        >
          →
        </button>

      </div>

      <p className="mt-6 text-gray-500 text-sm select-none animate-pulse">
        ↔ role para ver mais
      </p>
    </section>
  );
}

export const TurmasRecentes = () => (
  <ScreenCard
    id="turmas"
    titulo="Turmas Recentes"
    tipo="turmas"
  />
);

export const AlunosAptosGraduar = () => (
  <ScreenCard
    id="graduacoes"
    titulo="Alunos Aptos a Graduar"
    tipo="graduar"
  />
);

export const AlunosAniversariando = () => (
  <ScreenCard
    id="aniversariantes"
    titulo="Aniversariantes do Mês" 
    tipo="aniversario"
  />
);

