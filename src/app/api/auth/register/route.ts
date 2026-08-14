import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validators";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    const existing = await prisma.usuario.findUnique({
      where: { correo: data.correo },
    });

    if (existing) {
      return jsonError("El correo ya está registrado", 409);
    }

    const claveHash = await hashPassword(data.clave);

    const usuario = await prisma.usuario.create({
      data: {
        nombre: data.nombre,
        correo: data.correo,
        clave: claveHash,
      },
      select: {
        id: true,
        nombre: true,
        correo: true,
      },
    });

    return jsonOk(
      {
        message: "Usuario registrado correctamente",
        usuario,
      },
      201,
    );
  } catch (error) {
    return handleApiError(error);
  }
}
