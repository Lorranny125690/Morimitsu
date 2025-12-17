import { useAuth } from "@/router";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function codeController() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | "">("");
  const { onCode } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"error" | "success">("error");
  
  const handleCode = async () => { 
    if (!code) {
      setModalMsg("📧 Oops... falta preencher tudo!");
      setModalType("error");
      setModalVisible(true);
      return;
    }

    setLoading(true);

    try {
      const res = await onCode(code);

      if (!res.error) {
        setModalMsg("🎉 Trocar senha! 💖");
        setModalType("success");
        setModalVisible(true);
        setTimeout(() => navigate("/password"), 500);
      } else {
        if (res.status === 400) {
          setModalMsg("⚠️ " + res.msg);
        } else if (res.status === 401) {
          setModalMsg("🙈 " + res.msg);
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
    code,
    setCode,
    modalVisible,
    modalMsg,
    modalType,
    handleCode,
    setModalVisible,
  };
}