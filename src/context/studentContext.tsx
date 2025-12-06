import axios from "axios";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export const API_URL = "https://morimitsu-jiu-jitsu.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

interface ApiResponse {
  error: boolean;
  msg?: string;
  status?: number;
  data?: any;
}

interface StudentProps {
  onRegisterStudent: (data: any) => Promise<ApiResponse>;
  onDeleteStudent: (id: number) => Promise<ApiResponse>;
}

interface StudentProviderProps {
  children: ReactNode;
}

const StudentContext = createContext<StudentProps | undefined>(undefined);

export const useStudent = (): StudentProps => {
  const context = useContext(StudentContext);
  if (!context)
    throw new Error("useStudent deve ser usado dentro de um <StudentProvider>");
  return context;
};

const registerStudent = async (studentData: any): Promise<ApiResponse> => {
  try {
    const result = await api.post("/student/register", studentData);
    const { id } = result.data;
    localStorage.setItem("id", id)

    console.log(studentData)

    return {
      error: false,
      msg: result.data?.message || "Aluno cadastrado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao cadastrar aluno.";

    if (status === 400) msg = data?.message || "Dados faltando!";
    else if (status === 409) msg = data?.message || "Aluno já cadastrado!";
    else if (status === 422) msg = data?.message || "Formato inválido (ZOD)!";
    else if (status >= 500) msg = "Erro no servidor.";

    return { error: true, status, msg };
  }
};

const deleteStudent = async (): Promise<ApiResponse> => {
  try {
    const id = localStorage.getItem("id");
    const result = await api.delete(`/student/${id}`);

    return {
      error: false,
      msg: result.data?.message || "Aluno cadastrado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao cadastrar aluno.";

    if (status === 400) msg = data?.message || "Dados faltando!";
    else if (status === 409) msg = data?.message || "Aluno já cadastrado!";
    else if (status === 422) msg = data?.message || "Formato inválido (ZOD)!";
    else if (status >= 500) msg = "Erro no servidor.";

    return { error: true, status, msg };
  }
};

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const value: StudentProps = {
    onRegisterStudent: registerStudent,
    onDeleteStudent: deleteStudent,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};
