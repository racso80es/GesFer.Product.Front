---
id: correccion-auditorias-e2e-auth
action_id: correccion-auditorias-e2e-auth
feature_id: correccion-auditorias-e2e-auth
title: Actualización de selectores Auth en pruebas E2E
date: 2026-04-29
status: in_progress
---

# Especificación

Se realizarán las siguientes modificaciones en `src/tests/e2e/`:

- `logging-persistence.spec.ts`: Reemplazar `usuario-inexistente` por `username-inexistente`.
- `admin_logs.spec.ts`: Reemplazar `El usuario admin@gesfer.local probablemente tiene username` por `El admin@gesfer.local probablemente tiene username`. Y `(el usuario admin@gesfer.local tiene este username)` por `(el admin@gesfer.local tiene este username)`.
- `logs_purge_logic.spec.ts`: Reemplazar `debe purgar logs antiguos con usuario Admin` por `debe purgar logs antiguos con Admin`.

Las páginas de `usuarios.spec.ts` y `usuario-completo.spec.ts` que refieren al modelo de la BD "Usuario", así como sus PageObjects no se modificarán para evitar romper la lógica de entidad actual.
