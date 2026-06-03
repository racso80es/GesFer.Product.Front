---
id: correccion-auditorias-e2e-auth-spec
action_id: Kaizen_2026_04_29_actualizacion_e2e_auth
feature_id: correccion-auditorias-e2e-auth
title: "Especificación técnica - Nomenclatura Auth E2E"
date: "2026-04-29"
status: "active"
---

# Especificación

- Renombrar `login-usuario-input` a `login-username-input` en `src/tests/TEST-IDS.md`.
- Cambiar la descripción "Campo de entrada para usuario" a "Campo de entrada para username" (y "contraseña" a "password") en `src/tests/TEST-IDS.md`.
- Actualizar `src/tests/e2e/logs_purge_logic.spec.ts` para que mencione "username" en vez de "usuario" en el texto del test.
- Revisar `src/tests/e2e/admin_logs.spec.ts`, `src/tests/e2e/logging-persistence.spec.ts`, `src/tests/e2e/usuario-completo.spec.ts`, `src/tests/e2e/usuarios.spec.ts` en caso de que necesiten reemplazos similares (solamente los relacionados al concepto de auth "usuario"/"contraseña", sin romper la funcionalidad general de la página de "usuarios" que es un endpoint distinto).
