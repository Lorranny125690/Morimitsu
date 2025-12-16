import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/context/authContext";

type BeltConfig = {
  belt: string;
  min_age: number;
  max_age: number;
  max_frequency: number;
  grade: number;
};

export function BeltConfigDesktop() {
  const [configs, setConfigs] = useState<BeltConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  // 🔹 fetch inicial
  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/belt-config");

      // Certificando que o retorno de dados seja um array
      const data = Array.isArray(res.data.belts)
        ? res.data.belts
        : []; // Fallback para array vazio

      setConfigs(data);
    } catch (err) {
      console.error("Erro ao buscar faixas", err);
      setConfigs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    belt: string,
    field: keyof BeltConfig,
    value: number
  ) => {
    setConfigs((prev) =>
      prev.map((cfg) =>
        cfg.belt === belt ? { ...cfg, [field]: value } : cfg
      )
    );
  };

  const handleSave = async (config: BeltConfig) => {
    setSaving(config.belt);
    try {
      await api.put(`/belt-config/update/${config.belt}`, {
        min_age: config.min_age,
        max_age: config.max_age,
        max_frequency: config.max_frequency,
        grade: config.grade,
      });
    } catch (err) {
      console.error("Erro ao salvar faixa", err);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="min-h-screen text-white px-10 py-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Configuração de Faixas</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {configs.map((cfg) => (
            <motion.div
              key={cfg.belt}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#162026] rounded-lg p-6 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-4">
                Faixa {cfg.belt.replace("_", " ")}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Idade mínima"
                  value={cfg.min_age}
                  onChange={(v) =>
                    handleChange(cfg.belt, "min_age", v)
                  }
                />
                <Input
                  label="Idade máxima"
                  value={cfg.max_age}
                  onChange={(v) =>
                    handleChange(cfg.belt, "max_age", v)
                  }
                />
                <Input
                  label="Frequência máx."
                  value={cfg.max_frequency}
                  onChange={(v) =>
                    handleChange(cfg.belt, "max_frequency", v)
                  }
                />
                <Input
                  label="Grau"
                  value={cfg.grade}
                  onChange={(v) =>
                    handleChange(cfg.belt, "grade", v)
                  }
                />
              </div>

              <button
                disabled={saving === cfg.belt}
                onClick={() => handleSave(cfg)}
                className="mt-6 w-full h-10 rounded-lg bg-[#076185] hover:scale-105 transition disabled:opacity-50"
              >
                {saving === cfg.belt ? "Salvando..." : "Salvar alterações"}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full h-10 rounded-md bg-[#1C2433] px-3 outline-none text-white"
      />
    </div>
  );
}
