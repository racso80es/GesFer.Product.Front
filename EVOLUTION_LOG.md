# Evolution Log — GesFer.Product.Front

Registro obligatorio de cambios relevantes de evolución del repositorio (Cúmulo: `paths.evolutionLogFile`). Mantener entradas breves y cronológicas (más reciente arriba).

---

## 2026-03-29

- **TASK-20260329-001-actualizacion-readme:** Consolidación de documentación. Centralización de guías de pruebas (`docs/testing/testing-guide.md`) y eliminación de archivos `README.md` locales en `src/` unificando información en el `README.md` principal. `docs/features/task-20260329-001-actualizacion-readme/objectives.md`.

## 2026-03-26

- **Kaizen / cierre adaptación monorepo:** Dockerfile para árbol aislado (`docker build -f src/Dockerfile .`); skill `frontend-build` y normas Cursor/SddIA alineadas a `src/`; `.gitignore` sin rutas `Product/Front` ni Admin; guía `README-TESTS` con `@/`; `spec` de feature `product-front-objetivos-pendientes` cerrado (`done`).

## 2026-03-23

- **Implementación por fases (commits):** (1) SddIA norma OpenAPI + `implementation.md` + README + evolution; (2) `scripts/tools` orden capas; (3) `src/` origen API **5020**, env, tests, guías; (4) `scripts/Propuesta/README` + `spec`/`clarify`/`plan` de la feature.
- **Fase 1 (implementation):** norma `SddIA/norms/openapi-contract-rest-frontend.md`; `implementation.md` de la feature; README raíz enlaza la norma; commits por fase (SddIA → skills → src → Propuesta).
- **Planning** (`docs/features/product-front-objetivos-pendientes/plan.md`): orden **SddIA → skills → src**; contrato API = OpenAPI del backend (D-09); **Propuesta** con README de aviso.
- **Clarify** cerrado: D-09, D-10, D-11.

## 2026-03-23 (entrada anterior)

- **Clarify** inicial: decisiones D-05 a D-08 — HTTP y HTTPS locales; tests API real + mock; `EVOLUTION_LOG.md` obligatorio.
