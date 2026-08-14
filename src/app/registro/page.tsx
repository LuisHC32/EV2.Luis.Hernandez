import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";

export default function RegistroPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center gap-6 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Registro
        </h1>
        <p className="text-sm text-zinc-600">
          Crea una cuenta con nombre, correo y clave.
        </p>
      </div>

      <RegisterForm />

      <p className="text-sm text-zinc-600">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-zinc-900 underline">
          Iniciar sesión
        </Link>
      </p>
    </main>
  );
}
