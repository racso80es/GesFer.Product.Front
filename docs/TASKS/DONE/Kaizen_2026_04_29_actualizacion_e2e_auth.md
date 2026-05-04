---
id: Kaizen_2026_04_29_actualizacion_e2e_auth
title: Actualización de selectores Auth en pruebas E2E (S+)
status: pending
created: 2026-04-29
---

## Objetivo
Aplicar los hallazgos de correcciones anteriores erradicando la entropía en pruebas de frontend, eliminando referencias a la nomenclatura desfasada "usuario" y "contraseña" e igualando los localizadores de e2e con la estandarización `username` y `password`.

## Contexto
Durante el inicio de las tareas automáticas y la fase de revisión (Auditoría S+ de ayer), se determinó que existen restos de nomenclatura no-inglesa en las pruebas de playwright (`src/tests/e2e/logs.spec.ts`, `src/tests/e2e/logs_purge_logic.spec.ts`, entre otros). Estos campos fueron corregidos a `username` y `password` en el contrato API y payloads unitarios previamente. Se deben limpiar también en el código E2E.
