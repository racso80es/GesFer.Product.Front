---
id: execution-actualizacion-e2e-auth
action_id: execution
feature_id: actualizacion_e2e_auth
title: Ejecución - Actualización de selectores Auth en pruebas E2E (S+)
date: 2026-06-12
status: active
---

## Ejecución
1. Se utilizó un script de Node.js para buscar y reemplazar `fill('usuario-inexistente')` con `fill('username-inexistente')` en `logging-persistence.spec.ts`.
2. Se utilizó un script de Node.js para reemplazar referencias de "usuario admin" a "username admin" en comentarios dentro de `admin_logs.spec.ts` y la descripción en `logs_purge_logic.spec.ts`.
3. Los cambios fueron validados con `git diff --cached`.
