import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre es obligatorio"),
  correo: z.email("El correo no es válido").trim().toLowerCase(),
  clave: z.string().min(6, "La clave debe tener al menos 6 caracteres"),
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
