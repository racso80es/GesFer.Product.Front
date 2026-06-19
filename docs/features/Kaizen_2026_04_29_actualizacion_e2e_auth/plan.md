---
id: Kaizen_2026_04_29_actualizacion_e2e_auth
action_id: update_e2e_auth_selectors
feature_id: actualizacion_e2e_auth
title: Plan - Actualización de selectores Auth en pruebas E2E
date: 2026-04-29
status: active
---

## Plan de Ejecución

1. Modificar referencias a "usuario" en archivos E2E
   - `src/tests/e2e/logs_purge_logic.spec.ts`: Cambiar "usuario Admin" por "username Admin"
   - `src/tests/e2e/admin_logs.spec.ts`: Cambiar "El usuario" por "El username" o algo similar que no incluya "usuario", asegurando la coherencia.
   - `src/tests/e2e/logging-persistence.spec.ts`: Cambiar el valor "usuario-inexistente" por "username-inexistente"
2. Modificar documentaciones de Test IDs y Page Objects
   - `src/tests/TEST-IDS.md`: Reemplazar "Input Usuario", "login-usuario-input" por "Input Username" y `login-username-input` respectivamente. Reemplazar "Input Contraseña" por "Input Password".
3. Validar los cambios corriendo las pruebas E2E o las de linting.
4. Asegurar el pre-commit step
5. Mover tarea a estado DONE y actualizar EVOLUTION_LOG.md.
