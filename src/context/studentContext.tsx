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

interface studentProps {
  onRegisterStudent: (data: any) => Promise<ApiResponse>;
  onDeleteStudent: (id: number) => Promise<ApiResponse>;
  onPutStudent: (id: number) => Promise<ApiResponse>;
  onGetStudent: () => Promise<ApiResponse>;
  onGraduate: (id: number) => Promise<ApiResponse>
}

interface StudentProviderProps {
  children: ReactNode;
}

const StudentContext = createContext<studentProps | undefined>(undefined);

export const useStudent = (): studentProps => {
  const context = useContext(StudentContext);
  if (!context)
    throw new Error("useStudent deve ser usado dentro de um <StudentProvider>");
  return context;
};

// POST — criar aluno
const registerStudent = async (studentData: any): Promise<ApiResponse> => {
  try {
    const result = await api.post("/student/register", studentData);
    const { id } = result.data;
    localStorage.setItem("id", id);

    return {
      error: false,
      msg: result.data?.message || "Aluno cadastrado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao cadastrar aluno.";

    if (status === 400) msg = data?.message || "Dados faltando inválida.";
    else if (status === 409) msg = data?.message || "Aluno já existe.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

// DELETE — deletar aluno
const deleteStudent = async (id: number): Promise<ApiResponse> => {
  try {
    const result = await api.delete(`/student/${id}`);

    return {
      error: false,
      msg: result.data?.message || "Aluno deletado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao deletar aluno.";

    if (status === 400) msg = data?.message || "ID inválido.";
    else if (status === 404) msg = data?.message || "Aluno não encontrado.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

// PUT — atualizar aluno
const putStudent = async (id: number): Promise<ApiResponse> => {
  try {
    const result = await api.put(`/student/${id}`);

    return {
      error: false,
      msg: result.data?.message || "Aluno atualizado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao atualizar aluno.";

    if (status === 400) msg = data?.message || "Requisição inválida.";
    else if (status === 404) msg = data?.message || "Aluno não encontrado.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

// GET — listar/buscar alunos
const getStudent = async (): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(`/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      error: false,
      msg: res.data?.message || "Estudantes encontrados!",
      data: res.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao buscar alunos.";

    if (status === 400) msg = data?.message || "Requisição inválida.";
    else if (status === 404) msg = data?.message || "Nenhum aluno encontrado.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

const graduateStudent = async(id: number) => {
  try{
    const token = localStorage.getItem("token")
    const res = await api.patch(`/student/graduate/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }},
    )

    return {
      error: false,
      msg: res.data?.message || "Estudantes encontrados!",
      data: res.data,
    };
  } 
  catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao buscar alunos.";

    if (status === 400) msg = data?.message || "Requisição inválida.";
    else if (status === 404) msg = data?.message || "Nenhum aluno encontrado.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
}

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const value: studentProps = {
    onRegisterStudent: registerStudent,
    onDeleteStudent: deleteStudent,
    onPutStudent: putStudent,
    onGetStudent: getStudent,
    onGraduate:graduateStudent,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};
