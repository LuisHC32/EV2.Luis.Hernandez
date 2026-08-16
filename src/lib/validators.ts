import { z } from "zod";

const strongPasswordSchema = z
  .string()
  .min(8, "La clave debe tener al menos 8 caracteres")
  .regex(/[A-Z]/, "La clave debe incluir al menos una mayúscula")
  .regex(/[a-z]/, "La clave debe incluir al menos una minúscula")
  .regex(/[0-9]/, "La clave debe incluir al menos un número");

export const registerSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre es obligatorio"),
  correo: z.email("El correo no es válido").trim().toLowerCase(),
  clave: strongPasswordSchema,
});

export const loginSchema = z.object({
  correo: z.email("El correo no es válido").trim().toLowerCase(),
  clave: z.string().min(1, "La clave es obligatoria"),
});

export const proyectoSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre del proyecto es obligatorio"),
  fecha_inicio: z.string().min(1, "La fecha de inicio es obligatoria"),
  estado: z.string().trim().min(2, "El estado es obligatorio"),
  responsable: z.string().trim().min(2, "El responsable es obligatorio"),
  monto: z.coerce.number().nonnegative("El monto no puede ser negativo"),
});
