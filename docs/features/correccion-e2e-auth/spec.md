---
id: Kaizen_2026_04_29_actualizacion_e2e_auth
action_id: Kaizen_2026_04_29_actualizacion_e2e_auth
feature_id: correccion-e2e-auth
title: Actualización de selectores Auth en pruebas E2E (S+)
date: 2026-04-29
status: in_progress
---

# Especificación

- Renombrar `login-usuario-input` a `login-username-input` en `src/tests/TEST-IDS.md`.
- Renombrar `login-password-input` (que mencionaba "contraseña") en la tabla de `src/tests/TEST-IDS.md`.
- Reemplazar referencias literales a "usuario" en comentarios como `// El usuario admin@gesfer.local probablemente tiene username "admin"` por `// El admin@gesfer.local probablemente tiene username "admin"` en varios test specs e2e.
- Asegurarse de que no haya test strings que usen `usuario` donde `username` es lo adecuado, como `usuario-inexistente` -> `username-inexistente`.
