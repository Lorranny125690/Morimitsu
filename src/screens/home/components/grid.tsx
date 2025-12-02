import { motion } from "framer-motion";
import { useRef } from "react";
import { turmasRecentes, alunosGraduar, alunosAniversariando } from "./list";

interface ListaCarrosselProps {
  id?: string;
  titulo: string;
  itens: { id: number; nome: string; imagem: string }[];
}

function ScreenCard({ id, titulo, itens }: ListaCarrosselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
          {itens.map((item, i) => (
            <motion.div
              key={item.id}
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
                  src={item.imagem}
                  alt={item.nome}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="bg-white text-black text-center py-3 text-lg font-semibold">
                {item.nome}
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
  <ScreenCard id="turmas" titulo="Turmas Recentes" itens={turmasRecentes} />
);

export const AlunosAptosGraduar = () => (
  <ScreenCard id="graduacoes" titulo="Alunos Aptos a Graduar" itens={alunosGraduar} />
);

export const AlunosAniversariando = () => (
  <ScreenCard id="aniversariantes" titulo="Aniversariantes do Mês" itens={alunosAniversariando} />
);
