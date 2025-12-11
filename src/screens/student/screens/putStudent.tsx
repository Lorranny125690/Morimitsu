import { StudentAdress } from "@/router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import bgImage from "../../../assets/image4.png";
import { ModalMsg } from "@/components/modal";
import { useStudentForm } from "./add_student/hooks/studentProps";
import { StudentProfileCard } from "./add_student/components/card";
import { StudentForm } from "./add_student/components/studentForm";
import { useStudent } from "@/context/studentContext";

export function PutStudentScreen() {
  const { id } = useParams();
  const location = useLocation();
  const studentData = location.state;
  const navigate = useNavigate();
  const { setFormData, formData, handleChange, modalVisible, modalMsg, modalType, setModalVisible, setModalType, setModalMsg, validateStepData, validateStepAddress} = useStudentForm();
  const [currentStep, setCurrentStep] = useState<"DATA" | "ADDRESS" | "PUT">("DATA"); 
  const { onPutStudent } = useStudent();

  useEffect(() => {
    if (studentData) {
      setFormData(prev => ({
        ...prev,
        ...studentData
      }));
    }
  }, [studentData]);
  
  const handleSubmit = async (id: string) => {
    let payload: any = formData;
  
    // Se tiver imagem nova, cria FormData
    if (formData.file_image) {
      const form = new FormData();
  
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image_student_url") return; // preview, ignorar
        if (key === "file_image") {
          form.append("image_student_url", value); // arquivo real
        } else {
          form.append(key, value as any);
        }
      });
  
      payload = form;
    }
  
    const res = await onPutStudent(id, payload);
  
    if (!res.error) {
      setModalMsg("Aluno atualizado com sucesso!");
      setModalType("success");
      setModalVisible(true);
    } else {
      setModalType("error");
      setModalMsg(res.message || "Erro ao atualizar aluno");
      setModalVisible(true);
    }
  };  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const preview = URL.createObjectURL(file);
  
    handleChange({
      target: { 
        name: "image_student_url",
        value: preview,
        files: [file]   // <--- ESSENCIAL!!!
      }
    });
  };  

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#41414B] flex-col px-4">
      <div className="w-full px-6 flex justify-start max-w-7xl mb-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer text-gray-300 hover:text-white">
          <IoMdArrowRoundBack size={28} />
        </button>
      </div>

      <div className="relative w-full max-w-7xl min-h-[700px] bg-white flex items-center justify-center shadow-xl overflow-hidden mx-2 md:mx-auto">
        <div className="absolute top-0 left-0 w-full h-[40%] bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-white" />

        <motion.div
          className="relative flex gap-12 z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <StudentProfileCard
            photo={formData.image_student_url ?? ""}
            nome={formData.name}
            faixa={formData.belt}
            frequencia={formData.current_frequency}
            idade={formData.idade}
            cpf={formData.cpf}
            onChangeImage={handleImageChange}
          />

          {currentStep === "DATA" && (
            <StudentForm
              formData={formData}
              handleChange={handleChange}
              navigate={navigate}
              goNext={() => {
                const error = validateStepData(formData);
                if (error) {
                  setModalMsg(error);
                  setModalType("error");
                  setModalVisible(true);
                  return;
                }
                setCurrentStep("ADDRESS");
              }}
            />
          )}

          {currentStep === "ADDRESS" && (
            <StudentAdress
              formData={formData}
              handleChange={handleChange}
              handleSubmit={() => handleSubmit(String(id))}
              goBack={() => setCurrentStep("DATA")}
              goNext={() => {
                const error = validateStepAddress(formData);
                if (error) {
                  setModalMsg(error);
                  setModalType("error");
                  setModalVisible(true);
                  return;
                }
                setCurrentStep("ADDRESS");
              }}
            />
          )}
        </motion.div>
      </div>

      <ModalMsg
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMsg}
        type={modalType}
      />
    </div>
  );
}
