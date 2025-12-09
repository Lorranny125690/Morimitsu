// src/components/student/StudentProfileCard.tsx

interface Props {
  photo: string;
  nome: string;
  faixa: string;
  frequencia: string;
  idade: number;
  cpf: string;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const fallback = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84_7_fFb0sw22D9ijKueKKiysMDBLccvWog&s";

export function StudentProfileCard({ photo, nome, faixa, frequencia, idade, cpf, onChangeImage }: Props) {
  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-lg space-y-6 p-6 w-[90%] max-w-[220px] md:w-[200px] h-auto md:h-[410px] border border-gray-100 rounded-xl">

      {/* FOTO + NOME */}
      <div className="flex flex-col items-center">
        <input
          id="profile-photo-input"
          type="file"
          accept="image/*"
          name="image_student_url"
          className="hidden"
          onChange={onChangeImage}
        />

        {/* Foto clicável */}
        <div
          onClick={() =>
            document.getElementById("profile-photo-input")?.click()
          }
          className="cursor-pointer w-[94px] h-[94px] rounded-full overflow-hidden"
        >
          <img
            src={photo ? photo : fallback}
            alt={nome}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="font-medium text-black text-[15px] mt-4">
          {nome || "Nome do aluno"}
        </h2>

        <p className="text-gray-400 text-[10px]">
          {faixa || "Faixa não selecionada"}
        </p>
      </div>

      {/* INFORMAÇÕES */}
      <div className="flex flex-col gap-4 text-[10px] text-gray-600 w-full">
        {[
          { label: "Nome", value: nome },
          { label: "Frequência", value: frequencia },
          { label: "Idade", value: idade ? `${idade} anos` : "-" },
          { label: "CPF", value: cpf }
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <p className="w-[60px] flex justify-center items-center text-black">
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
