import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export function FrequencyMobile() {
  return (
    <div className="bg-[#011023] text-white min-h-screen flex flex-col items-center font-sans overflow-y-auto pb-10">

      {/* HEADER */}
      <div className="w-full max-w-[350px] flex items-center justify-between py-12 p-4">
        <h3 className="text-sm font-regular flex items-center justify-center text-center leading-tight">
          Frequência <br /> Diária
        </h3>

        <div className="flex items-center">
          <input
            type="date"
            className="border-1 text-sm px-2 py-1 rounded-lg outline-none"
          />
        </div>

        <FaDownload size={12} className="cursor-pointer" />
        <IoMdClose size={16} className="cursor-pointer" />
      </div>

      {/* CARD */}
      <motion.div
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        className="bg-white text-black max-w-[336px] w-full max-h-[674px] rounded-xl shadow-xl overflow-hidden mt-4"
      >
        {/* Agora a tabela respeita o border radius */}
        <table className="w-full table-fixed border-collapse rounded-xl overflow-hidden">
          <colgroup>
            <col style={{ width: "40px" }} />
            <col style={{ width: "1fr" }} />
            <col style={{ width: "110px" }} />
            <col style={{ width: "80px" }} />
          </colgroup>

          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-sm">
              <th className="py-3 px-2 text-left">#</th>
              <th className="py-3 px-2 text-left">Nome</th>
              <th className="py-3 px-2 text-left">Presença</th>
              <th className="py-3 px-2 text-center">Total</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            <tr className="border-t">
              <td className="py-3 px-2 text-sm font-medium">1</td>

              <td className="py-3 px-2 text-sm font-medium truncate max-w-[1px]">
                Cebolinha com nome super comprido que deveria truncar
              </td>

              <td className="py-3 px-2">
                <button
                  className="border border-gray-400 rounded-lg text-xs px-3 py-1 min-w-[64px] whitespace-nowrap"
                >
                  Presente
                </button>
              </td>

              <td className="py-3 px-2 text-center text-sm font-semibold">18</td>
            </tr>

            <tr className="border-t">
              <td className="py-3 px-2 text-sm font-medium">2</td>
              <td className="py-3 px-2 text-sm font-medium">Maria</td>
              <td className="py-3 px-2">
                <button className="border border-gray-400 rounded-lg text-xs px-3 py-1 min-w-[64px] whitespace-nowrap">
                  Ausente
                </button>
              </td>
              <td className="py-3 px-2 text-center text-sm font-semibold">12</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
