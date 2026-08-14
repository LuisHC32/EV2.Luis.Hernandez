# Sistema de Gestión de Proyectos

## 1. Objetivo

Desarrollar un sistema web que permita registrar y autenticar usuarios y gestionar información de proyectos mediante una API protegida con JWT.

## 2. Base de datos

La aplicación utilizará MySQL con la siguiente configuración:

- Base de datos: `desarrollo_software_1`
- Usuario: `root`
- Clave: `desarrollo_software_1`

Estas configuraciones deben establecerse mediante variables de entorno.

## 3. Usuarios

El sistema debe disponer de un modelo `Usuario` con los siguientes campos:

- `id`
- `nombre`
- `correo`
- `clave`

El campo `correo` debe ser único.

Las contraseñas de los usuarios deberán almacenarse mediante un hash seguro utilizando Argon2id.

## 4. Proyectos

El sistema debe disponer de un modelo `Proyecto` con los siguientes campos:

- `id`
- `nombre`
- `fecha_inicio`
- `estado`
- `responsable`
- `monto`
- `created_by`

El campo `created_by` debe almacenar el ID del usuario que creó el proyecto.

## 5. API y autenticación
- Crear endpoints para registro e inicio de sesión.
- Validar y registrar usuarios con contraseña protegida mediante Argon2id.
- Verificar las credenciales durante el login.
- Generar y devolver un JWT cuando el login sea correcto.
- Implementar un middleware JWT para proteger las rutas.
- Validar el token y asociarlo al usuario autenticado.
- Rechazar tokens inexistentes, inválidos o expirados.
- Enviar el token mediante Authorization: Bearer <token>.

## 6. Vistas

Se deben construir las vistas para:

### Inicio de sesión

Debe permitir ingresar:

- Correo
- Clave

### Registro

Debe permitir ingresar:

- Nombre
- Correo
- Clave

Las vistas deben mostrar los mensajes o respuestas correspondientes entregados por el controlador.

## 7. Docker Compose

La aplicación debe ejecutarse mediante Docker Compose, con los siguientes servicios:

### MySQL

- Imagen: MySQL
- Base de datos, usuario y clave según la sección 2
- Puerto interno: `3306`
- Puerto publicado en el host: por defecto `3306`. Si está ocupado, usar el siguiente puerto libre (`3307`, `3308`, …)

### App (Node.js)

- Runtime: Node.js
- Gestor de paquetes: pnpm
- Puerto publicado: `3000`
- Debe conectarse al servicio MySQL usando el hostname `mysql`
- Las credenciales de base de datos y JWT deben leerse desde variables de entorno

## 8. Stack

- Framework: Next.js
- UI: React
- Lenguaje: TypeScript
- Runtime: Node.js
- Contenedores: Docker Compose
- Estilos: Tailwind CSS
- Backend/API: Next.js Route Handlers
- Base de datos: MySQL
- ORM: Prisma
- Autenticación: JWT
- Hash de contraseñas: Argon2id
