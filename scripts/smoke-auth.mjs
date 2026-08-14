const base = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";

async function main() {
  const registerRes = await fetch(`${base}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: "Ana Perez",
      correo: "ana@example.com",
      clave: "secreto123",
    }),
  });
  const registerBody = await registerRes.json();
  console.log("register", registerRes.status, JSON.stringify(registerBody));

  const loginRes = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      correo: "ana@example.com",
      clave: "secreto123",
    }),
  });
  const loginBody = await loginRes.json();
  console.log("login", loginRes.status, JSON.stringify({
    message: loginBody.message,
    hasToken: Boolean(loginBody.token),
    error: loginBody.error,
  }));

  if (!loginBody.token) {
    process.exit(1);
  }

  const proyectosRes = await fetch(`${base}/api/proyectos`, {
    headers: { Authorization: `Bearer ${loginBody.token}` },
  });
  const proyectosBody = await proyectosRes.json();
  console.log("proyectos", proyectosRes.status, JSON.stringify(proyectosBody));

  const deniedRes = await fetch(`${base}/api/proyectos`);
  const deniedBody = await deniedRes.json();
  console.log("proyectos_sin_token", deniedRes.status, JSON.stringify(deniedBody));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
