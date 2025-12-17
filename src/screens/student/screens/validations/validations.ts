import z, { ZodError } from "zod";

export const computeAgeFromString = (dateStr: string): number => {
  if (!dateStr) return 0;
  const today = new Date();
  const birth = new Date(dateStr);
  if (Number.isNaN(birth.getTime())) return -1;
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const phoneRegex = /^\d{10,11}$/; // exemplo: DDD + número (10-11 dígitos)
const cpfRegex = /^\d{11}$/;

export const StudentBaseSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter no mínimo 3 caracteres"),

  phone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .regex(phoneRegex, "Telefone inválido (somente números, 10-11 dígitos)"),

  image_student_url: z.string().optional().nullable(),

  email: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || /^\S+@\S+\.\S+$/.test(v), "Email inválido"),

  cpf: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || cpfRegex.test(v), "CPF inválido (somente números, 11 dígitos)"),

  gender: z.string().optional().nullable(),

  birth_date: z
    .string()
    .min(1, "A data de nascimento é obrigatória")
    .refine((v) => {
      const d = new Date(v);
      return !Number.isNaN(d.getTime());
    }, "Data de nascimento inválida"),

  current_frequency: z
    .number().optional().nullable(),

  belt: z
    .string()
    .min(1, "A graduação (faixa) é obrigatória"),

  grade: z
    .string()
    .min(1, "O grau é obrigatório"),

  city: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  number: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),

  guardian_phone: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || phoneRegex.test(v), "Telefone do responsável inválido (somente números, 10-11 dígitos)"),

  enrollment: z.string().optional().nullable(),

  idade: z
    .number()
    .int()
    .refine((v) => v >= 3 && v <= 120, "Idade inválida (deve estar entre 3 e 120 anos)"),

  social_name: z.string().optional().nullable(),

  file_image: z.any().optional().nullable(),
});

// -------- FULL SCHEMA (final submit) -----------
export const StudentFullSchema = StudentBaseSchema.extend({
  city: z.string().min(1, "Cidade é obrigatória"),
  street: z.string().min(1, "Rua é obrigatória"),
  district: z.string().min(1, "Bairro é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
});

// -------- STEP DATA (primeiro passo) ----------
export const StudentStepDataSchema = StudentBaseSchema.pick({
  name: true,
  phone: true,
  birth_date: true,
  idade: true,
  current_frequency: true,
  belt: true,
  grade: true,
});

// -------- STEP ADDRESS (segundo passo) -------
export const StudentStepAddressSchema = z.object({
  city: z.string().min(1, "Cidade é obrigatória"),
  street: z.string().min(1, "Rua é obrigatória"),
  district: z.string().min(1, "Bairro é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  guardian_phone: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || phoneRegex.test(v), "Telefone do responsável inválido (somente números, 10-11 dígitos)"),
});

// helper: transforma ZodError em Record<campo, mensagem> e em string concatenada
export const formatZodErrors = (err: ZodError): { byField: Record<string, string>; message: string } => {
  const byField: Record<string, string> = {};
  const messages: string[] = [];

  for (const e of err.issues) {
    // path pode ser [] para raiz; usamos join(".")
    const path = e.path && e.path.length ? e.path.join(".") : "_root";
    const msg = e.message || "Campo inválido";
    // concatena se já houver mensagem pro campo
    if (byField[path]) {
      byField[path] = `${byField[path]}; ${msg}`;
    } else {
      byField[path] = msg;
    }
    messages.push(`${path === "_root" ? "" : `${path}: `}${msg}`);
  }

  return {
    byField,
    message: messages.join(" — "),
  };
};