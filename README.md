# Sistema de Gestión de Proyectos

Aplicación Next.js (TypeScript + Tailwind) con API Route Handlers, Prisma/MySQL, JWT y Argon2id.

## Requisitos

- Docker Desktop
- Puertos libres: `3000` (app) y `3306` 

## Variables de entorno

Copia `.env.example` a `.env`. Valores del brief:

| Variable | Valor |
|---|---|
| `DB_NAME` | `db_name` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | `db_pass` |

Dentro de Docker, `DATABASE_URL` usa el host `mysql`. Desde Windows (cliente externo) usa `127.0.0.1:3306`.

## Arranque

```
docker compose up --build
```

- App: http://localhost:3000
- MySQL en el host: `127.0.0.1:3306`

## Endpoints

| Método | Ruta | Auth |
|---|---|---|
| `POST` | `/api/auth/register` | No |
| `POST` | `/api/auth/login` | No (devuelve JWT) |
| `GET`/`POST` | `/api/proyectos` | Bearer JWT |

## Vistas

- `/login` — correo y clave
- `/registro` — nombre, correo y clave

## Porque este stack?

-Elegi este stack para actualizarme, vengo de utilizar php/laravel, js, css-html, aunque los ultimos meses estoy con tailwind, pero necesitaba actualizarme y buscar soluciones a problematicas que me encontraba al utilizar ese stack, problemas como el pagar un costo extra al utilizar cpanel o plesk (Esto en el servidor) ya que con docker anda muy lento php.
Tambien para el entorno laboral, encuentro que este stack se esta utilizando mas y hay mas mercado laboral, aunque php no muere del todo, pero los proyectos nuevos no se esta utilizando y lo que queda actualmente, son "proyectos/codigo legacy".
