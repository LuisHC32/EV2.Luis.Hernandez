"use client";

import { FormEvent, useState } from "react";
import { AuthMessage } from "@/components/AuthMessage";
import { registerSchema } from "@/lib/validators";

type RegisterResponse = {
  message?: string;
  error?: string;
  usuario?: {
    id: number;
    nombre: string;
    correo: string;
  };
};

export function RegisterForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType(null);

    const validation = registerSchema.safeParse({ nombre, correo, clave });
    if (!validation.success) {
      setMessageType("error");
      setMessage(
        validation.error.issues.map((issue) => issue.message).join("; "),
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, clave }),
      });

      const data = (await response.json()) as RegisterResponse;

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.error ?? "No se pudo registrar el usuario");
        return;
      }

      setMessageType("success");
      setMessage(data.message ?? "Usuario registrado correctamente");
      setNombre("");
      setCorreo("");
      setClave("");
    } catch {
      setMessageType("error");
      setMessage("Error de red al contactar el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-zinc-800">Nombre</span>
        <input
          type="text"
          name="nombre"
          required
          autoComplete="name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-zinc-800">Correo</span>
        <input
          type="email"
          name="correo"
          required
          autoComplete="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-700"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-zinc-800">Clave</span>
        <input
          type="password"
          name="clave"
          required
          minLength={8}
          autoComplete="new-password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-700"
        />
        <span className="text-xs text-zinc-500">
          Mínimo 8 caracteres, con mayúscula, minúscula y número.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <AuthMessage type={messageType} text={message} />
    </form>
  );
}
