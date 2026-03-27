---
implementation_id: add-logs-implementation
feature_name: add-logs
description: Detalles de la implementación.
---

# Implementación: add-logs

En esta fase se implementarán los cambios listados en el plan:

## Cambios en Código
1. **`src/lib/logger/server.ts`**: Nuevo archivo exportando un logger exclusivo de servidor. Utilizará `pino` y `pino/file` para escribir el log en la ruta especificada (`logs/app.log`). Configurará niveles y transportes basados en `NODE_ENV`.
2. **`src/app/api/logs/route.ts`**: Un endpoint POST que recibirá los logs desde el cliente y los escribirá usando el logger del servidor creado en el paso anterior.
3. **`src/lib/logger/index.ts`**: Modificaremos el `TelemetryTransport` para que, en caso de no apuntar a un servicio externo (o por defecto), haga POST al endpoint interno `/api/logs` en formato JSON, para persistir logs del cliente.
4. **`src/app/global-error.tsx`**: Un componente de Next.js App Router para capturar errores fatales globales (errores fuera de los límites de un componente estándar, normalmente en el Layout) y registrarlos como "fatal" o "error" mediante el logger del cliente.

## Scripts y Dependencias
No es necesario instalar dependencias extra pues `pino` y `pino-pretty` ya se encuentran en `package.json`. Aseguraremos compatibilidad de tipos.

## Pruebas de Integridad
- Asegurar que la carpeta `logs/` se genere automáticamente o pueda ser ignorada por git (añadiendo `logs/` a `.gitignore` si no lo está).
- Comprobar que en PROD el nivel mínimo sea `error`.
