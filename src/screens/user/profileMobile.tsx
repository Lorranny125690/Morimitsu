import { AiFillEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/router";
import { api } from "@/context/authContext";
import type { User } from "@/types/user";
import { getInitials } from "@/utils/getInitials";

export function ProfileMobile() {
  const { onGet } = useAuth();
  const id = localStorage.getItem("user_id");

  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    async function loadUser() {
      if (!id) return;

      try {
        const res = await onGet(id);
        const u = res.data.users[0];
        setUser(u);
        setUsername(u.username);
      } catch (err) {
        console.error("Erro ao carregar usuário", err);
      }
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
      if (imageFile) {
        formData.append("image_user_url", imageFile);
      }

      await api.put(`/user/update/${id}`, formData);

      const updated = await onGet(id);
      setUser(updated.data.users[0]);

      setEditing(false);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  }

  const avatarPreview = imageFile
    ? URL.createObjectURL(imageFile)
    : user?.image_user_url;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#011023] text-white pb-[100px]">
      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 flex justify-between items-center"
      >
        {!editing && (
          <AiFillEdit
            size={22}
            className="cursor-pointer"
            onClick={() => setEditing(true)}
          />
        )}
      </motion.header>

      {/* ================= PERFIL ================= */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-center gap-5 px-6"
      >
        {/* AVATAR */}
        <label className="relative cursor-pointer">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-28 w-28 rounded-3xl object-cover"
            />
          ) : (
            <div className="h-28 w-28 rounded-3xl bg-[#052659] flex items-center justify-center text-[40px] font-bold">
              {getInitials(username)}
            </div>
          )}

          {editing && (
            <>
              <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center text-sm">
                Alterar foto
              </div>
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
            </>
          )}
        </label>

        {/* DADOS */}
        <div className="flex flex-col">
          {editing ? (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border-b border-white text-[22px] font-bold outline-none"
            />
          ) : (
            <p className="font-bold text-[24px]">{user.username}</p>
          )}

          <p className="text-[16px] text-white/70">{user?.email}</p>

          <p className="text-[15px] text-white/60">
            {user.role === "TEACHER" ? "Professor" : "Aluno"}
          </p>
        </div>
      </motion.div>

      {/* ================= SALVAR ================= */}
      {editing && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleUpdateUser}
            disabled={saving}
            className="bg-green-600 px-6 py-2 rounded-lg"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      )}

      {/* ================= CARDS ================= */}
      <div className="flex justify-center gap-6 mt-10 flex-wrap">
        <div className="bg-[#052659]/70 w-[40%] h-24 rounded-lg p-3">
          <p className="text-sm">Turmas</p>
          <p className="text-[48px] leading-none">
            {user.classes.length}
          </p>
        </div>

        <div className="bg-[#052659]/70 w-[40%] h-24 rounded-lg p-3">
          <p className="text-sm">Cargo</p>
          <p className="text-[22px] leading-none mt-2">
            {user.role === "TEACHER" ? "Professor" : "Aluno"}
          </p>
        </div>
      </div>

      {/* ================= INFORMAÇÕES ================= */}
      <div className="px-6 mt-10">
        <h3 className="text-[22px] font-bold mb-2">Informações</h3>
        <div className="h-[2px] bg-white mb-4" />

        <div className="gap-4 space-y-6 text-sm">
          <Info label="Nome" value={user.username} />
          <Info label="Email" value={user.email} />
          <Info
            label="Cargo"
            value={user.role === "TEACHER" ? "Professor" : "Aluno"}
          />
          <Info
            label="Criado em"
            value={new Date(user.createdAt).toLocaleDateString("pt-BR")}
          />
        </div>
      </div>
    </div>
  );
}

/* ================= ITEM INFO ================= */
function Info({ label, value }: { label: string; value?: string }) {
  return (
    <p>
      <span className="font-semibold">{label}:</span>{" "}
      <span className="text-white/80">{value || "-"}</span>
    </p>
  );
}
