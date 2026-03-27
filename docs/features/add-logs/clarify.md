---
clarify_id: add-logs-clarify
feature_name: add-logs
description: Clarificaciones y decisiones de diseño tomadas para el logging.
---

# Clarificaciones: add-logs

## Decisiones Técnicas
1. **Pino en Next.js Client-Side vs Server-Side:**
   - En el cliente, no podemos utilizar `fs` o escribir a ficheros. Por lo tanto, el cliente utilizará la implementación actual que envía logs vía POST, pero en lugar de enviarlo a un backend monolítico directo (o adicionalmente a él), lo canalizaremos a un endpoint interno (`/api/logs`) de la app Next.js, que luego usará el logger de servidor (con `fs`) para persistir la información.
2. **Rutas de Ficheros de Log:**
   - La ruta para logs en local será `logs/app.log` en el directorio raíz del proyecto (`src/logs/app.log` o similar).
   - Utilizaremos `pino` transport configurado dinámicamente:
     - DEV: `pino-pretty` y `pino/file` (app.log).
     - PROD: `pino/file` (app.log) o consola JSON.
3. **Niveles de Log:**
   - Dev: Nivel "info" y "debug".
   - Prod: Nivel "error" y "fatal".
4. **Manejo de Errores Global:**
   - Se creará o adaptará el componente `src/app/global-error.tsx` para interceptar errores no controlados.
