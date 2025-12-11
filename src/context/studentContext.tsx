import axios from "axios";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export const API_URL = "https://morimitsu-jiu-jitsu.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

interface ApiResponse {
  error: boolean;
  message?: string;
  status?: number;
  data?: any;
}

interface studentProps {
  onRegisterStudent: (data: any) => Promise<ApiResponse>;
  onDeleteStudent: (id: number) => Promise<ApiResponse>;
  onPutStudent: (id: string, StudentData: any) => Promise<ApiResponse>;
  onGetStudent: () => Promise<ApiResponse>;
  onGraduate: (id: number) => Promise<ApiResponse>
  onGetSTudentBirthday: () => Promise<ApiResponse>
}

function denyIfTeacher(): ApiResponse {
  return {
    error: true,
    status: 403,
    message: "Professores não têm permissão para realizar esta ação.",
  };
}


interface StudentProviderProps {
  children: ReactNode;
}

const token = localStorage.getItem("my-jwt")

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
    const result = await api.post("/student/register", studentData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { id } = result.data;
    localStorage.setItem("id", id);

    return {
      error: false,
      message: result.data?.message || "Aluno cadastrado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let message = "Erro ao cadastrar aluno.";

    if (status === 400) message = data?.message || "Dados faltando inválida.";
    else if (status === 409) message = data?.message || "Aluno já existe.";
    else if (status === 422) message = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) message = "Erro interno no servidor.";

    return { error: true, status, message };
  }
};

// DELETE — deletar aluno
const deleteStudent = async (id: number): Promise<ApiResponse> => {
  try {
    if (localStorage.getItem("role") === "teacher") {
      return denyIfTeacher();
    }

    const result = await api.delete(`/student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      error: false,
      message: result.data?.message || "Aluno deletado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let message = "Erro ao deletar aluno.";

    if (status === 400) message = data?.message || "ID inválido.";
    else if (status === 404) message = data?.message || "Aluno não encontrado.";
    else if (status === 422) message = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) message = "Erro interno no servidor.";

    return { error: true, status, message };
  }
};

// PUT — atualizar aluno
const putStudent = async (id: string, studentData: any): Promise<ApiResponse> => {
  try {
    if (localStorage.getItem("role") === "teacher") {
      return denyIfTeacher();
    }

    // Se vier FormData do componente, NÃO sobrescreva!
    let payload = studentData;
    let headers: any = {
      Authorization: `Bearer ${token}`,
    };

    // Se tiver arquivo, studentData será FormData
    if (studentData instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    const result = await api.put(`/student/update/${id}`, payload, { headers });

    return {
      error: false,
      message: result.data?.message || "Aluno atualizado com sucesso!",
      data: result.data,
    };

  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;
    const message = data?.message || "Erro ao atualizar aluno.";

    return { error: true, status, message };
  }
};

// GET — listar/buscar alunos
const getStudent = async (): Promise<ApiResponse> => {
  console.log(token)
  try {
    const res = await api.get(`/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      error: false,
      message: res.data?.message || "Estudantes encontrados!",
      data: res.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let message = "Erro ao buscar alunos.";

    if (status === 400) message = data?.message || "Requisição inválida.";
    else if (status === 404) message = data?.message || "Nenhum aluno encontrado.";
    else if (status === 422) message = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) message = "Erro interno no servidor.";

    return { error: true, status, message };
  }
};

const getStudentBirthDay = async (): Promise<ApiResponse> => {
  try {
    const res = await api.get(`/celebrants-birth-day`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      error: false,
      message: res.data?.message || "Estudantes encontrados!",
      data: res.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let message = "Erro ao buscar alunos.";

    if (status === 400) message = data?.message || "Requisição inválida.";
    else if (status === 404) message = data?.message || "Nenhum aluno encontrado.";
    else if (status === 422) message = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) message = "Erro interno no servidor.";

    return { error: true, status, message };
  }
};

const graduateStudent = async(id: number) => {
  try{
    if (localStorage.getItem("role") === "teacher") {
      return denyIfTeacher();
    }
    const res = await api.patch(`/student/graduate/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }},
    )

    return {
      error: false,
      message: res.data?.message || "Estudantes encontrados!",
      data: res.data,
    };
  } 
  catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let message = "Erro ao buscar alunos.";

    if (status === 400) message = data?.message || "Requisição inválida.";
    else if (status === 404) message = data?.message || "Nenhum aluno encontrado.";
    else if (status === 422) message = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) message = "Erro interno no servidor.";

    return { error: true, status, message };
  }
}

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const value: studentProps = {
    onRegisterStudent: registerStudent,
    onDeleteStudent: deleteStudent,
    onPutStudent: putStudent,
    onGetStudent: getStudent,
    onGraduate:graduateStudent,
    onGetSTudentBirthday: getStudentBirthDay,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};
