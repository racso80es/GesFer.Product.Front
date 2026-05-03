---
id: feature_actualizacion_e2e_auth_plan
action_id: feature
feature_id: actualizacion-e2e-auth
title: "Plan de actualización de E2E auth"
status: done
---
# Plan
1. Buscar variables "usuario" y "contraseña" o "usuarioInput" y "passwordInput" en los E2E tests (`src/tests/e2e/`) y los page-objects (`src/tests/page-objects/`).
2. Reemplazar dichas ocurrencias con `username` y `password`.
3. Ejecutar las verificaciones del frontend (lint, build, tests) para asegurar que la compilación funciona y los tests son verdes.
4. Generar la documentación SDDIA del ciclo de vida.