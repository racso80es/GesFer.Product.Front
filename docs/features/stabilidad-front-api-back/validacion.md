---
id: stabilidad-front-api-back-validacion
action_id: validate
feature_id: stabilidad-front-api-back
title: "Validación pre-cierre"
date: "2026-03-26"
status: blocked
global:
  api_health: ok
  next_build: ok
  tools_rust: "start_frontend.exe, prepare_frontend_env.exe, run_tests_frontend.exe en scripts/tools/*/"
checks:
  - name: "Jest (npm test)"
    result: "FAIL parcial — 2 tests en system-integrity (login 401)"
  - name: "Playwright"
    result: "FAIL parcial — 28 failed, 4 passed (auth/datos)"
  - name: "start-frontend.exe"
    result: "OK — binario en scripts/tools/start-frontend/ (compilación tools-rs)"
git_changes:
  - "src/lib/api/product-api.ts"
  - "src/app/api/my-company/route.ts"
  - "src/app/my-company/page.tsx"
  - "src/jest.config.js"
---

# Validación

## Criterio “tests al 100 %”

**No cumplido** en esta sesión por dependencias de **datos y autenticación** en la API (login demo 401; E2E masivos fallidos por el mismo eje).

## Condiciones para desbloquear

1. Cargar en la BD del backend el seed esperado por los tests (`seed-data.sql` u homólogo) y validar credenciales `Empresa Demo` / `admin` (o actualizar tests con credenciales reales de tu entorno).
2. Tener el front en `:3000` para escenarios E2E que navegan el cliente.
3. ~~Generar `start_frontend.exe`~~ — **hecho**; recompilar con `scripts/tools-rs/install.ps1` si cambia el código Rust de las tools.

## Lo verificado como OK

- `npm run build` en `src/` sin error de compilación ni log `Error fetching my company` tras los cambios BFF.
- Salud API `/health` y `/api/health`.
