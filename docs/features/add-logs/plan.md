---
plan_id: add-logs-plan
feature_name: add-logs
description: Plan de implementación de add-logs.
---

# Plan de Implementación: add-logs

1. **Phase 5 (Implementation Document):**
   - Crear `docs/features/add-logs/implementation.md`.

2. **Phase 6a (Update Logger Server Config):**
   - Modificar `src/lib/logger/index.ts` o crear un `src/lib/logger/server.ts` específico para servidor que configure `pino` con transportes hacia consola (con `pino-pretty` en DEV) y hacia archivo (`logs/app.log`) en todos los entornos, filtrando por el nivel de log requerido (DEV: info/debug, PROD: error/fatal).

3. **Phase 6b (Create API Route for Client Logs):**
   - Crear la ruta de API `src/app/api/logs/route.ts` que reciba el JSON desde el cliente (`level`, `message`, `error`, etc.), valide la regla de negocio del nivel de log del entorno, y escriba usando el logger de servidor.

4. **Phase 6c (Add Global Exception Handler):**
   - Crear el componente `src/app/global-error.tsx` en el App Router para manejar errores globales en producción y reportarlos mediante el logger del cliente (que llamará al API, o directamente al logger de servidor si es SSR error).

5. **Phase 6d (Update execution doc):**
   - Crear `docs/features/add-logs/execution.md` resumiendo las implementaciones realizadas.

6. **Phase 7 (Validate):**
   - Correr los procesos de build (`npm run build`) y tests (`npm run test:all`) en `src/` para verificar la robustez de la integración. Generar `validacion.md`.

7. **Phase 8 (Finalization):**
   - Finalizar proceso, mover la tarea a `DONE/`, actualizar EVOLUTION_LOG.md.
