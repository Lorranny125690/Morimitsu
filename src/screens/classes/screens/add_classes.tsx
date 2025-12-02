import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../assets/image4.png"
import { IoMdArrowRoundBack } from "react-icons/io";

export function AddClass() {

  const [formData, setFormData] = useState({
    photo: "https://i.pinimg.com/1200x/b7/61/28/b76128b44ffbef517719785ede8c1abe.jpg",
    nome: "",
    professor: "",
    lugar: "",
    nascimento: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#41414B] flex-col">
      {/* Botão de Logout */}
      <div className="w-full px-6 m-[-50px] flex justify-start max-w-7xl mb-6">
        <button
          onClick={() => navigate(-1)}
          className="hover:cursor-pointer text-gray-300 hover:text-white transition"
        >
          <IoMdArrowRoundBack size={28} />
        </button>
      </div>

      {/* Container principal */}
      <div className="relative w-full max-w-7xl h-[721px] bg-white flex items-center justify-center shadow-xl overflow-hidden">
      <div
          className="absolute top-0 left-0 w-full h-[40%] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-white" />

        {/* Cards */}
        <motion.div
          className="relative flex gap-12 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* Card Formulário */}
          <div className="bg-white shadow-lg flex flex-col items-center w-[679px] h-[410px] border border-gray-100 flex flex-col justify-between">
            <div className="flex flex-col w-full">
              <div className="border-b-2 border-gray-200 py-5 mb-4 flex items-center">
                <h3 className="px-4 text-gray-700 font-medium text-[10px]">Dados</h3>
                <h3 className="hover:cursor-pointer text-gray-400 font-regular text-[10px]">Enturmar</h3>
              </div>

              <form className="flex items-center justify-center flex-col gap-6">
                <div>
                  <label className="block text-[10px] text-black">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-50 h-5 text-[12px] text-black border-gray-300 border rounded-[2px] py-3 px-3 mt-[2px] focus:ring-2 focus:ring-blue-400 box-border shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-black">Professor</label>
                  <input
                    type="text"
                    name="professor"
                    value={formData.professor}
                    onChange={handleChange}
                    className="w-50 h-5 text-[12px] text-black border-gray-300 border rounded-[2px] py-3 px-3 mt-[2px] focus:ring-2 focus:ring-blue-400 box-border shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-black">lugar</label>
                  <input
                    type="lugar"
                    name="lugar"
                    value={formData.lugar}
                    onChange={handleChange}
                    className="w-50 h-5 text-[12px] text-black border-gray-300 border rounded-[2px] py-3 px-3 mt-[2px] focus:ring-2 focus:ring-blue-400 box-border shadow-md"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-black">Data de nascimento</label>
                  <input
                    type="date"
                    name="nascimento"
                    value={formData.nascimento}
                    onChange={handleChange}
                    className="w-50 h-5 text-[12px] text-black border-gray-300 border rounded-[2px] py-3 px-3 mt-[2px] focus:ring-2 focus:ring-blue-400 box-border shadow-md"
                  />
                </div>
              </form>
              <div className="flex justify-end items-center mt-8 space-x-6">
              <button onClick={() => navigate(-1)} type="button" className="text-gray-400 text-[10px] hover:text-gray-600 transition">
                Cancelar
              </button>
              <button
                type="submit"
                className="hover:cursor-pointer mr-5 bg-blue-500 hover:bg-blue-600 text-white text-[10px] rounded-full h-[30px] w-[90px] shadow-md transition"
              >
                Enturmar
              </button>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
