# Análisis temporal — estabilidad front / API Back

**Fecha:** 2026-03-26  
**Última actualización:** 2026-03-26 — herramientas Rust compiladas; informe de usuario en `informe-situacion-actual.md`.  
**Entorno:** Windows, API en `http://127.0.0.1:5020` (usuario: API en ejecución).

## 1. Verificación de entorno

| Comprobación | Resultado |
|--------------|-----------|
| `GET http://127.0.0.1:5020/health` | **200**, cuerpo `Healthy` |
| `GET http://127.0.0.1:5020/api/health` | **200**, JSON `{"status":"healthy",...}` |

## 2. Herramienta start-frontend

| Ítem | Resultado |
|------|-----------|
| `scripts/tools/start-frontend/start_frontend.exe` | **Presente** — generado con `scripts/tools-rs` (`cargo build --release` + `install.ps1`). |
| `prepare_frontend_env.exe` / `run_tests_frontend.exe` | **Presentes** en sus cápsulas (misma instalación). |
| Validación alternativa (sin tool) | `npm run build` en `src/` sigue siendo válido para comprobar compilación/tipos. |

**Hallazgos build (antes de corrección BFF):**

- Log en generación estática: `Error fetching my company: API error: Unauthorized` — el route handler `app/api/my-company` llamaba al backend **sin** reenviar `Authorization`.
- ESLint (jsx-a11y): advertencias en `components/ui/select.tsx` (roles `combobox` / `option`).

## 3. Tests Jest (`npm test`)

- **jest-haste-map:** colisión `package.json` raíz vs `.next/standalone/package.json` tras build — mitigado con `modulePathIgnorePatterns` en `jest.config.js`.
- **`system-integrity.test.ts`:** 2 tests fallan: login devuelve **401** con credenciales demo (`Empresa Demo` / `admin`). Causa probable: **BD sin seed** o credenciales no coincidentes con el backend desplegado — no es fallo de compilación del front.

Resumen: **130 passed**, **2 failed** (login integridad), **1 skipped**.

## 4. Tests E2E Playwright

Comando: `API_URL=http://127.0.0.1:5020` + `npx playwright test`.

- **4 passed**, **28 failed** — la mayoría ligados a autenticación / datos / flujos que requieren usuarios y permisos acordes al seed.

## 5. Mapeo TODO: [STB-FRONT]

| ID | Descripción | Referencia |
|----|-------------|------------|
| ~~STB-FRONT-001~~ | BFF `/api/my-company` sin reenvío de Bearer al backend | **Corregido** en `product-api.ts`, `route.ts`, `app/my-company/page.tsx` |
| STB-FRONT-002 | Suite Jest `system-integrity` requiere login 200 con seed demo en API | Resultado Jest 401; ver `__tests__/integration/system-integrity.test.ts` |
| STB-FRONT-003 | Suite E2E depende de credenciales, seed y front en `:3000` | Resultado Playwright (28 failed) |
| STB-FRONT-004 | `components/ui/select.tsx` — cumplimiento aria-controls / aria-expanded / aria-selected | ESLint jsx-a11y (warning) |

---

*Este archivo es un volcado temporal de análisis; el cierre formal está en `validacion.md`.*
