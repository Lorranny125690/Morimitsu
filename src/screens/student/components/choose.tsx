import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useStudent } from "@/context/studentContext";

const navLinks = [
  { name: "Graduando", href: "/student" },
  { name: "Notificação sobre grau", href: "/notification" },
];

export function Choice() {
  const location = useLocation();
  const { fetchStudents } = useStudent();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchStudents(search);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);


  return (
    <div className="lg:border-b lg:border-gray-700">
      <div className="max-w-6xl mx-auto flex items-center px-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`"hover:bg-slate-600 hover:rounded-sm text-[12px] lg:text-[20px] hover:cursor-pointer transition py-3 lg:py-6 px-4 font-medium ${
              location.pathname === link.href
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-300 hover:text-gray-100"
            }`}
            role="button"
          >
            {link.name}
          </a>
        ))}
        
        {/* Campo de pesquisa visível apenas em telas lg */}
        <div className="lg:ml-auto relative hidden lg:block">
          <CiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Pesquisar aluno"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[395px] h-10 pl-11 pr-3 rounded-[20px] bg-[#313538] text-[#B0A8EE]"
          />
        </div>
      </div>
    </div>
  );
}
