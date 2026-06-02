---
id: Kaizen_2026_04_29_actualizacion_e2e_auth
action_id: Kaizen_2026_04_29_actualizacion_e2e_auth
feature_id: correccion-e2e-auth
title: Actualización de selectores Auth en pruebas E2E (S+)
date: 2026-04-29
status: completed
---

# Finalización

- Todos los `data-testid` relacionados a la autenticación fueron actualizados de `login-usuario-input` y `login-password-input` (con descripciones desfasadas) a `username` y `password`.
- Se corrigieron los comentarios en E2E tests (`admin_logs.spec.ts`, `logs_purge_logic.spec.ts`) para eliminar la terminología "usuario".
- Se actualizó el EVOLUTION_LOG.md.
- Tarea movida a DONE.
