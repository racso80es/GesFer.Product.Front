---
execution_id: add-logs-execution
feature_name: add-logs
description: Registro de implementación.
---

# Ejecución: add-logs

## Acciones Realizadas
- **`src/lib/logger/server.ts`**: Creado transport de servidor con `pino/file` para escribir en `logs/app.log`. Configurado para filtrar `error`/`fatal` en PRODUCCIÓN y `debug`/`info` en DESARROLLO.
- **`src/app/api/logs/route.ts`**: API Endpoint (POST) creado. Recibe peticiones del cliente (a través del transportador del navegador) y usa `serverLogger` para volcar de forma persistente.
- **`src/lib/logger/index.ts`**: Modificado `TelemetryTransport` para que la propiedad `apiUrl` sea ignorada/combinada y envíe el POST a la ruta relativa `/api/logs` independientemente de si el env flag para telemetría a servicio externo está activo o no. (Lo hemos activado explícitamente y cambiado el endpoint a interno).
- **`src/app/global-error.tsx`**: Añadido manejador de error global usando App Router Client Component para notificar sobre excepciones de enrutado u otros fallos a nivel de raíz.

## Estado
Implementación de código completada.
