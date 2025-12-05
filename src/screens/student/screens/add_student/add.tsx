import { StudentAdress } from "@/router";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { StudentProfileCard } from "./components/card";
import { StudentForm } from "./components/studentForm";
import { useStudentForm } from "./hooks/studentProps";
import bgImage from "../../../../assets/image4.png";
import { StudentClass } from "./components/studentClass";

export function StudentScreen() {
  const navigate = useNavigate();
  const { formData, handleChange, handleSubmit } = useStudentForm();
  const [currentStep, setCurrentStep] = useState<"DATA" | "ADDRESS" | "PUT">("DATA");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    handleChange({
      target: { name: "image_student_url", value: url }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#41414B] flex-col px-4">
      <div className="w-full px-6 flex justify-start max-w-7xl mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white">
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
            photo={formData.image_student_url}
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
              handleSubmit={handleSubmit}
              navigate={navigate}
              goNext={() => setCurrentStep("ADDRESS")}
            />
          )}

          
          {currentStep === "PUT" && (
            <StudentClass
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              navigate={navigate}
              goBack={() => setCurrentStep("ADDRESS")}
            />
          )}

          {currentStep === "ADDRESS" && (
            <StudentAdress
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              goBack={() => setCurrentStep("DATA")}
              goNext={() => setCurrentStep("PUT")}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
