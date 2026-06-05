---
id: correccion-auditorias-e2e-auth
action_id: correccion-auditorias-e2e-auth
feature_id: correccion-auditorias-e2e-auth
title: Actualización de selectores Auth en pruebas E2E
date: 2026-04-29
status: in_progress
---

# Objetivos

1. Reemplazar la palabra prohibida "usuario" en las pruebas E2E especificadas (`logging-persistence.spec.ts`, `logs_purge_logic.spec.ts` y `admin_logs.spec.ts`) por `username`.
2. Seguir las convenciones del repositorio para pruebas estandarizadas (uso de username en vez de email o usuario).
3. Asegurar que las correcciones reflejen los cambios realizados previamente en la API.
