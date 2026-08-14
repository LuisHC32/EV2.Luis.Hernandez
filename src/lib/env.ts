function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable de entorno requerida: ${name}`);
  }
  return value;
}

export const env = {
  dbHost: process.env.DB_HOST ?? "127.0.0.1",
  dbPort: process.env.DB_PORT ?? "3306",
  dbName: process.env.DB_NAME ?? "desarrollo_software_1",
  dbUser: process.env.DB_USER ?? "root",
  dbPassword: process.env.DB_PASSWORD ?? "desarrollo_software_1",
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: () => required("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
};
