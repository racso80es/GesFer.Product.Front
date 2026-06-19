---
id: Kaizen_2026_04_29_actualizacion_e2e_auth
action_id: update_e2e_auth_selectors
feature_id: actualizacion_e2e_auth
title: Actualización de selectores Auth en pruebas E2E
date: 2026-04-29
status: active
---

## Objetivos
Reemplazar la nomenclatura desfasada "usuario" y "contraseña" en las pruebas E2E (Playwright) y Page Objects por la nomenclatura estándar `username` y `password`, siguiendo las directrices del proyecto y el contrato API.

- Modificar descripciones en archivos de pruebas E2E (logs_purge_logic.spec.ts, admin_logs.spec.ts, logging-persistence.spec.ts)
- Actualizar data-testids y test IDs documentados en src/tests/TEST-IDS.md.
