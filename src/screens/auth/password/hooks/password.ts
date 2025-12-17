import { useAuth } from "@/router";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginController() {
  const navigate = useNavigate();
  const { onPassword } = useAuth();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");

  const handleLogin = async () => {
    if (!password) {
      setModalMsg("📧 Oops... falta preencher tudo!");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    setLoading(true);

    try {
      const res = await onPassword(password);

      if (!res.error) {
        setModalType("success");
        setModalVisible(true);
        setTimeout(() => navigate("/"), 500);
      } else {
        if (res.status === 400) {
          setModalMsg("⚠️ " + res.msg);
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
  };

  return {
    loading,
    password,
    setPassword,
    modalVisible,
    modalMsg,
    modalType,
    handleLogin,
    setModalVisible,
  };
}
