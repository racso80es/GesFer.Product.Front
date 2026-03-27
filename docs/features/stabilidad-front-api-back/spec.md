---
id: stabilidad-front-api-back-spec
action_id: spec
feature_id: stabilidad-front-api-back
title: "Especificación — estabilidad front + API Back"
date: "2026-03-26"
status: in_progress
scope: "Contrato REST, BFF Next, tests de integridad"
acceptance_criteria:
  - "La API responde en endpoint de salud acorde al entorno (5020 por defecto)."
  - "El build de Next.js compila sin errores de tipo; advertencias ESLint acotadas o documentadas."
  - "Las rutas BFF que proxyean al Product API reenvían autenticación cuando el cliente la envía."
  - "Tests documentados con resultado real; bloqueos por datos/seed explícitos."
---

# Especificación

## Fuentes de contrato

- Salud API: `GET /api/health` → JSON `{ "status": "healthy", ... }` (comprobado). Existe además `GET /health` con cuerpo texto `Healthy` (mismo origen).
- Cliente HTTP producto: `NEXT_PUBLIC_PRODUCT_API_URL` por defecto `http://localhost:5020/api`; rutas relativas tipo `/mycompany` deben coincidir con OpenAPI del backend.

## Herramienta start-frontend

- Cápsula: `paths.toolCapsules.start-frontend` → `scripts/tools/start-frontend/`.
- Ejecutable **`start_frontend.exe`** en esa ruta (fuente: `scripts/tools-rs/src/bin/start_frontend.rs`; compilación: `cargo build --release` + `install.ps1`). Si no está presente en un clon, generarlo con `scripts/tools-rs/install.ps1`.
- Para validar solo compilación/tipos sin levantar el dev server: `npm run build` en `src/`.

## Tests

- Jest: integración `system-integrity.test.ts` exige login demo contra API real (credenciales y seed en BD).
- Playwright: global setup comprueba salud de API; muchos escenarios dependen de login y datos.
