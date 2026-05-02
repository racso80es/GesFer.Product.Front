---
id: actualizacion_e2e_auth_spec
action_id: spec
feature_id: actualizacion_e2e_auth
title: Specification for Actualización de selectores Auth en pruebas E2E
status: completed
---

## Especificación
Se deben limpiar los restos de nomenclatura no-inglesa en las pruebas de playwright (`src/tests/e2e/logs.spec.ts`, `src/tests/e2e/logs_purge_logic.spec.ts`, `src/tests/e2e/logging-persistence.spec.ts`, `src/tests/e2e/admin_logs.spec.ts`).
Los campos fueron corregidos a `username` y `password` en el contrato API y payloads unitarios previamente, por lo tanto, se actualizarán las variables `usuarioInput` a `usernameInput` y los selectores para que prioricen y referencien la estandarización.