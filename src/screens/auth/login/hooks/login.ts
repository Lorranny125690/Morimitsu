import { useAuth } from "@/router";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function LoginController() {
  const navigate = useNavigate();
  const location = useLocation();
  const { onLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");

  const userType = location.state?.userType || "Usuário";

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      setModalMsg("📧 Oops... falta preencher tudo!");
      setModalType("error");
      setModalVisible(true);
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await onLogin!(email, senha, userType);
    
      if (!res.error) {
        setModalMsg("🎉 Login feito com sucesso! Bem-vindo de volta 💖");
        setModalType("success");
        setModalVisible(true);
        setTimeout(() => navigate("/home"), 1500);
      } else {
        if (res.status === 400) {
          setModalMsg("⚠️ " + res.msg);
        } else if (res.status === 401) {
          setModalMsg("🙈 " + res.msg);
        } else if (res.status === 403) {
          setModalMsg("🚫 " + res.msg);
        } else if (res.status === 422) {
          setModalMsg("🚫 " + res.msg);
        } else {
          setModalMsg("😕 " + res.msg);
        }
    
        setModalType("error");
        setModalVisible(true);
      }
    } catch {
      setModalMsg("💥 Erro inesperado! Verifica tua conexão, ok?");
      setModalType("error");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  }

  const handleNavigate = (type: "1" | "2") => {
    navigate("/email", { state: { userType: type } });
  };

  return {
    loading,
    email,
    setEmail,
    senha,
    setSenha,
    modalVisible,
    modalMsg,
    modalType,
    handleLogin,
    setModalVisible,
    handleNavigate,
    handleKey,
    userType
  }
}