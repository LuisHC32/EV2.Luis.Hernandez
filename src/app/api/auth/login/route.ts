import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { signAuthToken } from "@/lib/jwt";
import { loginSchema } from "@/lib/validators";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = loginSchema.parse(body);

    const usuario = await prisma.usuario.findUnique({
      where: { correo: data.correo },
    });

    if (!usuario) {
      return jsonError("Credenciales inválidas", 401);
    }

    const valid = await verifyPassword(usuario.clave, data.clave);
    if (!valid) {
      return jsonError("Credenciales inválidas", 401);
    }

    const token = await signAuthToken({
      userId: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre,
    });

    return jsonOk({
      message: "Inicio de sesión correcto",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
