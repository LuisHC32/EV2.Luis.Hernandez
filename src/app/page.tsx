import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center gap-6 px-4 py-16">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Desarrollo de Software 1
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Sistema de Gestión de Proyectos
        </h1>
        <p className="max-w-xl text-zinc-600">
          Registro y autenticación de usuarios con JWT, y API protegida para
          gestionar proyectos.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/login"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          Iniciar sesión
        </Link>
        <Link
          href="/registro"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900"
        >
          Registrarse
        </Link>
      </div>
    </main>
  );
}
