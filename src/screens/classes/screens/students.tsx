import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { calculateAge } from "@/utils/calAge";
import { belts } from "@/screens/student/types/belt";
import { getInitials } from "@/utils/getInitials";
import { useEffect, useState } from "react";
import { useDeleteClass } from "../hooks/classes";
import { LoadingScreen } from "@/utils/loading";
import { ModalMsg } from "@/components/modal";
import { ModalMudarAluno } from "./putClassMobile";
import { IoTrashBin } from "react-icons/io5";
import { api } from "@/context/authContext";

export const StudentClassList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: removeClass } = useDeleteClass();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<String| null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");
  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<any>(location.state || null);

  useEffect(() => {
    if (!location.state?.id) {
      setIsLoading(false);
      return;
    }
  
    fetchClass(location.state.id)
      .finally(() => setIsLoading(false));
  }, [location.state?.id]);  
  
  const confirmDelete = async () => {
    if (!studentToDelete) return;

    await removeClass(String(studentToDelete));

    setModalMsg("Turma excluída com sucesso!");
    setModalType("success");
    setModalVisible(true);

    setConfirmDeleteOpen(false);
    setStudentToDelete(null);
  };

  const fetchClass = async (id: string) => {
    const res = await api.get("/class/filter", {
      params: { id },
    });
  
    setClassData(res.data.classes[0]);
  };  

  useEffect(() => {
    if (location.state?.id) {
      fetchClass(location.state.id);
    }
  }, [classData]);  

  const handleDelete = async (class_id: string, student_id: string) => {
    await api.delete(`/class/remove-student/${class_id}`, {
      data: { student_id },
    });
  
    fetchClass(class_id); // 🔥 atualiza na hora
  };

  if (!classData) {
    return <p>Turma não encontrada</p>;
  }

  const alunos = classData.students.map(
    (item: any) => item.student
  );  

  {!isLoading && !classData && (
    <LoadingScreen />
  )}

  return (
    <motion.div
      id="poppins"
      className="bg-[#011023] z-0 text-white min-h-screen flex flex-col font-sans overflow-y-auto pb-[100px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.header
        className="flex items-center justify-between px-9 mt-6 mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 14 }}
      >
        {/* SEARCH */}
        <div className="relative">
          <CiSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
          />

          <input
            type="text"
            placeholder="Buscar"
            className="w-32 h-8 pl-8 pr-3 rounded-full 
              bg-[#02385A]/70 text-white text-[11px]
              placeholder:text-[#00AAFF]/70
              focus:outline-none focus:ring-1 focus:ring-[#00AAFF]"
          />
        </div>

        {/* ACTIONS */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 140 }}
        >
          {/* FREQUÊNCIA */}
          <button
            onClick={() =>
              navigate(`/frequency2/${classData.id}`, {
                state: {
                  classId: classData.id,
                  teacherId: classData.teacher_id,
                  students: alunos,
                },
              })
            }
            className="flex items-center gap-2 text-sm font-semibold
              text-white/80 hover:text-[#00AAFF]
              transition-colors cursor-pointer"
          >
            <AiFillEdit size={16} />
            Frequência
          </button>

          {/* HISTÓRICO */}
          <button
            onClick={() =>
              navigate(`/history/${classData?.id}`, { state: classData })
            }
            className="text-sm font-semibold text-white/40 
              hover:text-white transition-colors cursor-pointer"
          >
            Histórico
          </button>
        </motion.div>
      </motion.header>

      <motion.div
        className="flex items-center p-9 mb-6 py-0"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
      >
        <div className="flex items-center w-full justify-start relative">
          {classData?.name}
        </div>

        <motion.div
          className="flex w-full text-[12px] items-center gap-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
        >
          <p onClick={() => setOpen(true)}>Editar</p>
          <p className="text-red-400">Excluir</p>
          <p onClick={() => navigate(`/enturmar/${classData?.id}`)}>Adicionar aluno</p>
        </motion.div>
      </motion.div>

      {/* Cards de alunos */}
      <motion.div
        className="flex flex-col items-center gap-8 px-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {alunos.map((student: any) => (
          <motion.div
            key={student.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#052659]/60 rounded-xl p-3 w-full max-w-[346px] h-[110px] flex items-center justify-between shadow-md backdrop-blur-sm"
          >
            <div className="px-4 flex items-center gap-4">
              {student.image_student_url ? (
                <motion.img
                  src={student.image_student_url}
                  alt="Perfil"
                  className="w-15 h-15 object-cover flex rounded-full transition-all cursor-pointer"
                />
              ) : (
                <div className="w-15 h-15 rounded-full object-cover rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg select-none">
                  {getInitials(student.social_name || student.name)}
                </div>
              )}
              <div className="flex flex-col">
                <h3 className="text-[20px] font-semibold">{student.name}</h3>
                <p className="text-[16px] text-white/60">{belts[student.belt]}</p>
                <p className="text-[12px] text-white/60">
                  {calculateAge(student.birth_date)} anos | {student.current_frequency} presenças
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="pr-5 flex items-center justify-center text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(
                  classData?.id,
                  student.id
                )                        
              }}
            >
              <IoTrashBin size={25}/>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
      {confirmDeleteOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#1E1E2F] p-6 rounded-lg shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Confirmar exclusão</h2>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir esta turma?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteOpen(false)}
                className="cursor-pointer px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition"
              >
                Cancelar
              </button>

              <button
                onClick={confirmDelete}
                className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalMudarAluno
      open={open}
      onClose={() => setOpen(false)}
      />

      <ModalMsg
      show={modalVisible}
      onClose={() => setModalVisible(false)}
      message={modalMsg}
      type={modalType}
      />
    </motion.div>
  );
};
