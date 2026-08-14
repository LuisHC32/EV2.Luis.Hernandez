import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  const count = await prisma.usuario.count();
  console.log(`db_ok count=${count}`);
  process.exitCode = 0;
} catch (error) {
  const code = error?.code ?? "";
  const message = error?.message ?? String(error);
  console.log(`db_fail ${code} ${message}`);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
