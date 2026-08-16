import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center gap-6 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Inicio de sesión
        </h1>
        <p className="text-sm text-zinc-600">
          Ingresa correo y clave para iniciar sesión.
        </p>
      </div>

      <LoginForm />

      <p className="text-sm text-zinc-600">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-medium text-zinc-900 underline">
          Registrarse
        </Link>
      </p>
    </main>
  );
}
