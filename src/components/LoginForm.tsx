"use client";

import { FormEvent, useState } from "react";
import { AuthMessage } from "@/components/AuthMessage";

type LoginResponse = {
  message?: string;
  error?: string;
  token?: string;
  usuario?: {
    id: number;
    nombre: string;
    correo: string;
  };
};

export function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType(null);
    setToken(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, clave }),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.error ?? "No se pudo iniciar sesión");
        return;
      }

      setMessageType("success");
      setMessage(data.message ?? "Inicio de sesión correcto");
      setToken(data.token ?? null);

      if (data.token) {
        window.localStorage.setItem("auth_token", data.token);
      }
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
          autoComplete="current-password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-700"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>

      <AuthMessage type={messageType} text={message} />

      {token ? (
        <p className="break-all rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-700">
          JWT: {token}
        </p>
      ) : null}
    </form>
  );
}
