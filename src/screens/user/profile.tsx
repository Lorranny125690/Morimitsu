import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { AiOutlineTeam } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/router";
import type { User } from "@/types/user";
import { belts } from "../student/types/belt";
import { getInitials } from "@/utils/getInitials";
import { api } from "@/context/authContext";

export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { onGet } = useAuth();
  const navigate = useNavigate();
  const id = localStorage.getItem("user_id");

  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    async function loadUser() {
      if (!id) return;
      const res = await onGet(id);
      const u = res.data.users[0];
      setUser(u);
      setUsername(u.username);
    }
    loadUser();
  }, [id]);

  /* ================= UPDATE USER ================= */
  async function handleUpdateUser() {
    if (!id) return;

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("username", username);
      if (imageFile) formData.append("image_user_url", imageFile);

      await api.put(`/user/update/${id}`, formData);

      const updated = await onGet(id);
      setUser(updated.data.users[0]);

      setEditing(false);
      setImageFile(null);
      alert("Perfil atualizado!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  }

  /* ================= AVATAR PREVIEW ================= */
  const avatarPreview = imageFile
    ? URL.createObjectURL(imageFile)
    : user?.image_user_url;

  return (
    <div className="fixed inset-0 bg-[#000F22] flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* ================= HEADER ================= */}
        <div className="bg-[#7C9FC9] p-6 relative">
          <IoMdArrowRoundBack
            className="absolute left-4 top-4 cursor-pointer hover:scale-110"
            size={30}
            onClick={() => navigate(-1)}
          />

          <div className="flex flex-col items-center mt-4 gap-4">
            {/* AVATAR */}
            <label className="relative cursor-pointer group">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  className="w-[160px] h-[160px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[160px] h-[160px] rounded-full bg-white/20 flex items-center justify-center text-white text-[56px] font-bold">
                  {getInitials(username)}
                </div>
              )}

              {/* OVERLAY AO EDITAR */}
              {editing && (
                <div className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center text-white opacity-0 opacity-100 transition">
                  <span className="text-sm font-semibold">Alterar foto</span>
                </div>
              )}

              {editing && (
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
              )}
            </label>

            {/* USERNAME */}
            {editing ? (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent border-b border-white text-white text-[32px] font-bold text-center outline-none"
              />
            ) : (
              <h1 className="text-[40px] font-bold text-white">
                {user?.username}
              </h1>
            )}

            <p className="text-[22px] text-white/70">
              {belts[String(user?.belt)]}
            </p>

            {/* BOTÃO */}
            {editing ? (
              <button
                onClick={handleUpdateUser}
                disabled={saving}
                className="bg-green-600 text-white px-6 py-2 rounded-lg mt-2"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-white text-[#7C9FC9] px-6 py-2 rounded-lg mt-2"
              >
                Editar perfil
              </button>
            )}
          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="p-6 flex justify-center gap-8">
          <div className="bg-[#7C9FC9] text-white rounded-lg p-4 w-[220px]">
            <div className="flex items-center gap-2">
              <AiOutlineTeam />
              <h2 className="font-semibold">Turmas</h2>
            </div>
            <ul className="mt-4 text-sm space-y-2">
              <li>Turma 1 - Daniel</li>
              <li>Turma 2 - Daniel</li>
            </ul>
          </div>

          <div className="bg-[#7C9FC9] text-white rounded-lg p-4 w-[220px] text-center">
            <h2 className="font-semibold">Frequências</h2>
            <span className="text-[32px] font-bold">15</span>
          </div>
        </div>

        {/* ================= INFO ================= */}
        <h2 className="px-6 text-[26px] font-medium text-[#7C9FC9]">
          Informações
        </h2>

        <div className="mx-6 my-4 bg-[#C2E8FF] rounded-lg p-6 grid grid-cols-3 gap-6 text-[#5482B3]">
          <div>
            <p>Nome: {user?.username}</p>
            <p>Email: {user?.email}</p>
          </div>
          <div>
            <p>Faixa: Preta</p>
            <p>Idade: 16</p>
          </div>
          <div>
            <p>Gênero: masculino</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
