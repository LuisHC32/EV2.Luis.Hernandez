import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { env } from "@/lib/env";

export type AuthTokenPayload = JWTPayload & {
  sub: string;
  correo: string;
  nombre: string;
};

function getSecretKey() {
  return new TextEncoder().encode(env.jwtSecret());
}

function parseExpiresIn(value: string): string | number {
  return value;
}

export async function signAuthToken(input: {
  userId: number;
  correo: string;
  nombre: string;
}): Promise<string> {
  return new SignJWT({
    correo: input.correo,
    nombre: input.nombre,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(input.userId))
    .setIssuedAt()
    .setExpirationTime(parseExpiresIn(env.jwtExpiresIn))
    .sign(getSecretKey());
}

export async function verifyAuthToken(
  token: string,
): Promise<AuthTokenPayload> {
  const { payload } = await jwtVerify(token, getSecretKey());

  if (!payload.sub || typeof payload.correo !== "string") {
    throw new Error("Token inválido");
  }

  return payload as AuthTokenPayload;
}
