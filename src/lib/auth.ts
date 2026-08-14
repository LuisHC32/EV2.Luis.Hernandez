import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken } from "@/lib/jwt";

export type AuthenticatedUser = {
  id: number;
  nombre: string;
  correo: string;
};

export function extractBearerToken(request: NextRequest): string | null {
  const header = request.headers.get("authorization");
  if (!header) return null;

  const [scheme, token] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
}

export async function getAuthenticatedUser(
  request: NextRequest,
): Promise<AuthenticatedUser | null> {
  const token = extractBearerToken(request);
  if (!token) return null;

  try {
    const payload = await verifyAuthToken(token);
    const userId = Number(payload.sub);
    if (!Number.isInteger(userId) || userId <= 0) return null;

    const user = await prisma.usuario.findUnique({
      where: { id: userId },
      select: { id: true, nombre: true, correo: true },
    });

    return user;
  } catch {
    return null;
  }
}
