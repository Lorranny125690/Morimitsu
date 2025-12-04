import { useAuth } from "@/router";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function emailController() {
  const navigate = useNavigate();
  const {onVerify, onAskRequest} = useAuth();
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");
  const location = useLocation();
  const askType = location.state?.userType || "Nada";

  const handleChoice = async () => {
    if (askType === "2") handleAsk();
    else if (askType === "1") handleEmail();
    else "não existe pedido";
  }

  const handleAsk = async () => {
    if (!email) {
      setModalMsg("📧 Oops... falta preencher tudo!");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    setLoading(true);

    try {
      const res = await onAskRequest(email);
    
      if (!res.error) {
        setModalMsg("🎉 Login feito com sucesso! Bem-vindo de volta 💖");
        setModalType("success");
        setModalVisible(true);
        setTimeout(() => navigate("/"), 1500);
      } else {
        if (res.status === 400) {
          setModalMsg("⚠️ " + res.msg);
        } else if (res.status === 409) {
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

  const handleEmail = async () => {
    if (!email) {
      setModalMsg("📧 Oops... falta preencher tudo!");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    setLoading(true);

    try {
      const res = await onVerify(email);

      if (!res.error) {
        setModalMsg("🎉 Login feito com sucesso! Bem-vindo de volta 💖");
        setModalType("success");
        setModalVisible(true);
        setTimeout(() => navigate("/code"), 500);
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

  return {
    loading,
    email,
    setEmail,
    modalVisible,
    modalMsg,
    modalType,
    handleChoice,
    setModalVisible,
  }
}