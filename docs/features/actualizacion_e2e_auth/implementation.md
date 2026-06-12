---
id: implementation-actualizacion-e2e-auth
action_id: implementation
feature_id: actualizacion_e2e_auth
title: Implementación - Actualización de selectores Auth en pruebas E2E (S+)
date: 2026-06-12
status: active
---

## Implementación
Se actualizaron las llamadas `fill('usuario-inexistente')` a `fill('username-inexistente')` en `src/tests/e2e/logging-persistence.spec.ts`. También se actualizaron los comentarios en `admin_logs.spec.ts` y la descripción del test en `logs_purge_logic.spec.ts` para usar "username" en vez de "usuario".
