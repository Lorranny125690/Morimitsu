import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export const API_URL = "https://morimitsu-jiu-jitsu.onrender.com";

const token = localStorage.getItem("my-jwt")

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

interface AuthState {
  token: string | null;
  authenticated: boolean | null;
  username: string | null;
}

interface ApiResponse {
  error: boolean;
  msg?: string;
  status?: number;
  data?: any;
}

interface AuthProps {
  authState: AuthState;
  authReady: boolean;
  onLogin: (email: string, password: string, role: string) => Promise<ApiResponse>;
  onLogout: () => Promise<void>;
  onVerify: (email: string) => Promise<ApiResponse>;
  onCode: (code: number) => Promise<ApiResponse>;
  onPassword: (password: string) => Promise<ApiResponse>;
  onAskRequest: (email: string) => Promise<ApiResponse>;
  onGet: (id: string | null) => Promise<ApiResponse>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = (): AuthProps => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um <AuthProvider>");
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
    username: null,
  });

  const [authReady, setAuthReady] = useState(false);

  // Carregar token e username salvos no primeiro render
  useEffect(() => {
    const token = localStorage.getItem("my-jwt");
    const username = localStorage.getItem("username");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({ token, authenticated: true, username: username || null });
    } else {
      setAuthState({ token: null, authenticated: false, username: null });
    }

    setAuthReady(true);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<ApiResponse> => {
    try {
      const result = await api.post(`/auth/login`, { email, password, role });
      const { token, user, status } = result.data;

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("my-jwt", token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("status", status);
        localStorage.setItem("user_id", user.id);      
        localStorage.setItem("email", user.email);
        console.log("email", localStorage.getItem("email"))

        setAuthState({
          token,
          authenticated: true,
          username: user.username,
        });

        return { error: false, data: result.data };
      }

      return { error: true, msg: "Usuário ou senha inválidos" };
    } catch (e: any) {
      const status = e.response?.status;
      const data = e.response?.data;

      let msg = "Erro ao fazer login";

      if (status === 400) msg = data?.message || "Email e senha obrigatórios!";
      else if (status === 401) msg = data?.message || "Email ou senha incorretos!";
      else if (status === 403) msg = data?.message || "Usuário não está cadastrado com este tipo de login!";
      else if (status === 422) msg = data?.message || "Formato de email inválido.";
      else if (status >= 500) msg = "Erro no servidor. Tente novamente mais tarde.";

      return { error: true, status, msg };
    }
  };

  const getUser = async (id: string | null): Promise<ApiResponse> => {
    try {
      const res = await api.get(`user/filter/`, {
          params: {
            id: id
          }
      });
      console.log(res.data);

      return {error: false, data: res.data}
    } catch (e: any) {
      const status = e.response?.status;

      return {error: true, status}
    }
  };  

  const verify = async (email: string): Promise<ApiResponse> => {
    try {
      const result = await api.post(`/auth/request-reset`, { email });

      return {
        error: false,
        msg: result.data?.msg || "E-mail de recuperação enviado com sucesso",
      };
    } catch (e: any) {
      const status = e.response?.status;
      const data = e.response?.data;

      let msg = "Erro ao enviar solicitação de recuperação";

      if (status === 400) msg = data?.message || "Email obrigatório!";
      else if (status === 401) msg = data?.message || "Email incorreto!";
      else if (status === 422) msg = data?.message || "Formato de email inválido.";
      else if (status >= 500) msg = "Erro no servidor. Tente novamente mais tarde.";

      return { error: true, status, msg };
    }
  };

  const codeVerify = async (code: number): Promise<ApiResponse> => {
    try {
      const result = await api.post(`/auth/verify-code`, { code });
      return {
        error: false,
        msg: result.data?.msg || "Código avaliado com sucesso",
      };
    } catch (e: any) {
      const status = e.response?.status;
      const data = e.response?.data;

      let msg = "Erro ao enviar solicitação de recuperação";

      if (status === 400) msg = data?.message || "Nova senha obrigatória!";
      else if (status === 422) msg = data?.message || "Senha muito curta (Mínimo 6 dígitos)";
      else if (status >= 500) msg = "Erro no servidor. Tente novamente mais tarde.";

      return { error: true, status, msg };
    }
  };

  const changePassword = async (password: string): Promise<ApiResponse> => {
    try {
      const id = localStorage.getItem("id");
      console.log(id)
      const result = await api.post(`/auth/reset-password/${id}`, { password });
      return {
        error: false,
        msg: result.data?.msg || "Senha alterada com sucesso",
      };
    } catch (e: any) {
        const status = e.response?.status;
        const data = e.response?.data;

        let msg = "Erro ao enviar solicitação de recuperação";

        if (status === 400) msg = data?.message || "Nova senha obrigatória!";
        else if (status === 422) msg = data?.message || "Senha muito curta (Mínimo 6 dígitos)";
        else if (status >= 500) msg = "Erro no servidor. Tente novamente mais tarde.";

        return { error: true, status, msg };
    }
  };

  const askforRegister = async (email: string): Promise<ApiResponse> => {
    try {
      const result = await api.post(`/auth/request-registration`, { email });
      return {
        error: false,
        msg: result.data?.msg || "Pedido enviado com sucesso",
      };
    } catch (e: any) {
        const status = e.response?.status;
        const data = e.response?.data;

        let msg = "Erro ao enviar solicitação de recuperação";

        if (status === 400) msg = data?.message || "Email obrigatório!";
        else if (status === 409) msg = data?.message || "Email já cadastrado"
        else if (status === 422) msg = data?.message || "Formato inválido de email!";
        else if (status >= 500) msg = "Erro no servidor. Tente novamente mais tarde.";

        return { error: true, status, msg };
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem("my-jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    delete api.defaults.headers.common["Authorization"];
    setAuthState({ token: null, authenticated: false, username: null });
  };

  const value: AuthProps = {
    authState,
    authReady,
    onLogin: login,
    onLogout: logout,
    onVerify: verify,
    onCode: codeVerify,
    onPassword: changePassword,
    onAskRequest: askforRegister,
    onGet: getUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
