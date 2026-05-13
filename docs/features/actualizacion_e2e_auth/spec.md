---
id: actualizacion_e2e_auth_spec
title: Especificaciones para Actualización de selectores Auth en E2E
status: completed
created: 2026-05-11
---

## Diseño Técnico
- En `src/tests/TEST-IDS.md`, reemplazar `login-usuario-input` por `login-username-input` y `Input Contraseña` por `Input Password`.
- En `src/tests/e2e/logging-persistence.spec.ts`, reemplazar el valor `.fill('usuario-inexistente')` por `'username-inexistente'`.
- En `src/tests/e2e/logs_purge_logic.spec.ts`, actualizar el título del test 'debe purgar logs antiguos con usuario Admin' a 'con Admin'.
- En `src/tests/e2e/admin_logs.spec.ts`, reemplazar comentarios de 'El usuario admin' a 'El admin' y '(el usuario admin@gesfer.local tiene este username)' a '(admin@gesfer.local tiene este username)'.
- En `src/tests/page-objects/LoginPage.ts`, reemplazar el comentario que menciona 'tenga el usuario' por 'tenga el auth_user'.
