import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useStudent } from "@/context/studentContext";
import { useClasses } from "@/screens/classes/hooks/classes";
import type { Student } from "@/screens/student/types/type";
import type { Class } from "@/screens/classes/components/type";

interface ListaCarrosselProps {
  id?: string;
  titulo: string;
  tipo: "turmas" | "graduar" | "aniversario";
}

interface CarouselItem {
  id: string;
  name: string;
  image?: string;
}

function ScreenCard({ id, titulo, tipo }: ListaCarrosselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { onGetSTudentBirthday, onGetStudent } = useStudent();
  const { classes } = useClasses();

  const [items, setItems] = useState<CarouselItem[]>([]);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      let list: CarouselItem[] = [];

      if (tipo === "aniversario") {
        const res = await onGetSTudentBirthday();
        list =
          res.data?.celebrants?.map((s: Student) => ({
            id: s.id,
            name: s.name,
            image: s.image_student_url,
          })) ?? [];
      }

      if (tipo === "graduar") {
        const res = await onGetStudent();
        list =
          res.data?.students?.map((s: Student) => ({
            id: s.id,
            name: s.name,
            image: s.image_student_url,
          })) ?? [];
      }

      if (tipo === "turmas") {
        list =
          classes?.map((c: Class) => ({
            id: c.id,
            name: c.name,
            image: c.image_class_url,
          })) ?? [];
      }

      if (list.length === 0) {
        list = [
          {
            id: "1",
            name: "Sem dados disponíveis",
            image:
              "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg",
          },
        ];
      }

      setItems(list);
      setLoading(false);
    }

    load();
  }, [tipo, classes]);

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

      <div className="w-full max-w-7xl flex items-center gap-4">
        <button
          onClick={scrollLeft}
          className="bg-white text-black p-3 rounded-full"
        >
          ←
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 hide-scrollbar w-full"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="w-[328px] h-[292px] snap-start flex-shrink-0 bg-[#1A1824]/90
                         rounded-2xl overflow-hidden shadow-lg hover:scale-[1.04] transition"
            >
              <img
                src={
                  item.image ??
                  "https://i.pinimg.com/736x/64/99/f8/6499f89b3bd815780d60f2cbc210b2bd.jpg"
                }
                alt={item.name}
                className="w-full h-60 object-cover"
              />

              <div className="bg-white text-black text-center py-3 text-lg font-semibold">
                {item.name}
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="bg-white text-black p-3 rounded-full"
        >
          →
        </button>
      </div>

      <p className="mt-6 text-gray-500 text-sm animate-pulse">
        ↔ role para ver mais
      </p>
    </section>
  );
}

export const TurmasRecentes = () => (
  <ScreenCard titulo="Turmas Recentes" tipo="turmas" />
);

export const AlunosAptosGraduar = () => (
  <ScreenCard titulo="Alunos Aptos a Graduar" tipo="graduar" />
);

export const AlunosAniversariando = () => (
  <ScreenCard titulo="Aniversariantes do Mês" tipo="aniversario" />
);
