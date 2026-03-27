---
spec_id: add-logs-spec
feature_name: add-logs
description: Especificación técnica para la implementación de logging persistente y estructurado.
---

# Especificación Técnica: add-logs

## Arquitectura de Logging
Para una aplicación de Next.js (App Router), el sistema de logs se dividirá en dos vertientes:
1. **Server-Side Logging (Server Components, API Routes, Middleware):** Escribirá directamente a un fichero de logs local o stdout utilizando `pino`.
2. **Client-Side Logging (Client Components):** Enviará eventos de logging al servidor a través de una API route (`/api/logs`). El servidor validará los niveles y los escribirá usando el logger del lado del servidor.

## Reglas de Negocio
- **Entorno DEV (`NODE_ENV === 'development'`):** Nivel mínimo `debug` / `info`.
- **Entorno PROD (`NODE_ENV === 'production'`):** Nivel mínimo `error`.

## Implementación Técnica
1. **Módulo de Logger (`src/lib/logger/index.ts`):**
   - Modificaremos la configuración base de `pino` para crear flujos dinámicos basados en el entorno.
   - En DEV: Log a consola (`pino-pretty`) o estándar.
   - En PROD: Log a consola + fichero físico si aplica, o solo consola en formato JSON para contenedores.
   - Puesto que se solicita "configurar la escritura en ficheros", configuraremos un transporte de ficheros en el servidor, asegurando que la ruta (`logs/app.log`) exista. Se utilizará `pino/file` (nativo en pino v10+).

2. **API de Logging Client-Side (`src/app/api/logs/route.ts`):**
   - Recibe eventos en JSON desde el cliente (`level`, `message`, `exception`, `properties`).
   - Verifica el nivel contra la regla de negocio del entorno.
   - Persiste el log mediante el logger del servidor.

3. **Captura Global de Excepciones:**
   - Crearemos `src/app/global-error.tsx` (App Router) que captura excepciones no manejadas en el layout raíz y utiliza el logger para registrar `Fatal`/`Error`.
   - Modificaremos `src/lib/logger/index.ts` para capturar errores de cliente o crear un wrapper para manejar errores de componentes en el cliente, si el `telemetryHook` actual no los atrapa globalmente.

4. **Prevención de Errores de Construcción:**
   - Todas las dependencias (como `pino/file`) deben ser compatibles o transpilarse correctamente en el contexto de un Server Component en Next.js.
   - Modificaremos la configuración de Next.js si se requiere excluir el paquete `pino` del empaquetado del cliente cuando se usan transportes de servidor, u optimizaremos las importaciones condicionales.
