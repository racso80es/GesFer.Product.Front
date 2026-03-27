---
finalize_id: add-logs-finalize
feature_name: add-logs
description: Resumen final de la feature.
---

# Finalización: add-logs

La tarea ha sido completada exitosamente. Se ha integrado el sistema de logs con la librería `pino`.
- Los logs del cliente se envían al servidor mediante un endpoint interno POST `/api/logs`.
- El servidor los recibe y los registra físicamente en `logs/app.log` usando `pino/file` (junto a los propios logs del servidor).
- Se manejan errores globales con `global-error.tsx`.
- Se respeta la política de niveles (DEV: verbose/info, PROD: error/fatal).

Se movió la tarea a `docs/TASKS/DONE/` y se actualizaron los `docs/EVOLUTION_LOG.md`.
Lista para PR.
