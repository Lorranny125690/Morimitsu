// src/components/student/StudentProfileCard.tsx
interface Props {
  photo: string;
  nome: string;
  faixa: string;
  frequencia: string;
  idade: number;
  cpf: string;
}

export function StudentProfileCard({
  photo,
  nome,
  faixa,
  frequencia,
  idade,
  cpf,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-lg space-y-6 p-6 w-[90%] max-w-[220px] md:w-[200px] h-auto md:h-[410px] border border-gray-100">
            <div className="flex flex-col items-center">
              <img
                src={photo}
                alt={nome}
                className="w-[94px] h-[94px] rounded-[50px]"
              />
              <h2
                id="poppins"
                className="font-regular text-black text-[15px] mt-4"
              >
                {nome || "Nome do aluno"}
              </h2>
              <p id="poppins" className="text-gray-400 text-[10px]">
                {faixa || "Faixa não selecionada"}
              </p>
            </div>

            <div
              id="poppins"
              className="flex flex-col gap-4 text-[10px] text-gray-600"
            >
              {[
                { label: "Frequência", value: frequencia },
                { label: "Nome", value: nome },
                { label: "Idade", value: idade },
                { label: "CPF", value: cpf },
              ].map((item) => (
                <div
                  id="poppins"
                  key={item.label}
                  className="flex items-center gap-3"
                >
                  <p className="w-[50px] flex justify-center items-center text-black">
                    {item.label}
                  </p>
                  <div className="w-[1px] h-6 bg-[#A5A1C9]/70" />
                  <span className="text-[#A5A1C9]/70">{item.value || "-"}</span>
                </div>
              ))}
            </div>
    </div>
  );
}
