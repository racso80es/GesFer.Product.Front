---
id: "product-front-objetivos-pendientes-plan"
action_id: planning
feature_id: product-front-objetivos-pendientes
title: "Plan — Objetivos pendientes GesFer.Product.Front (orden por aislamiento)"
date: "2026-03-23"
status: done
spec_ref: "docs/features/product-front-objetivos-pendientes/spec.md"
clarify_ref: "docs/features/product-front-objetivos-pendientes/clarify.md"
orden_capas: "SddIA → skills (scripts/skills + scripts/tools) → src"
criterios_decision:
  contrato_api: "OpenAPI/swagger expuesto por el API backend (p. ej. /swagger/v1/swagger.json); el front se adecúa a esa realidad (clarify D-09)."
  propuesta: "Material histórico en scripts/Propuesta/ con README de aviso (clarify D-10)."
phases:
  - id: F1
    name: "SddIA — capa de normas y conocimiento IA"
    order: 1
  - id: F2
    name: "Skills y tools — scripts/skills, scripts/tools"
    order: 2
  - id: F3
    name: "src — aplicación cliente Next.js"
    order: 3
---

# Plan de ejecución: objetivos pendientes

Orden fijado por **aislamiento de capas** (decisión **D-11**): primero **SddIA**, luego **skills/herramientas**, por último **`src`**. El contrato HTTP lo marca el **backend** vía **swagger/OpenAPI** (**D-09**).

---

## Fase 1 — SddIA (normas, SSOT, documentación de proceso)

**Objetivo:** Mantener coherentes normas, agentes y definiciones de skills/tools con GesFer.Product.Front y con el contrato API descrito en clarify.

| # | Tarea | Entregable / criterio |
|---|--------|------------------------|
| 1.1 | Revisar referencias cruzadas a “API Admin” o nombres antiguos en `SddIA/norms/`, `SddIA/tools/` y `SddIA/skills/` donde aún apliquen. | Sin contradicciones con D-09 (contrato = swagger backend). |
| 1.2 | Documentar en norma o en `docs/features/.../implementation.md` (cuando exista) que la **fuente de verdad del contrato REST** es el OpenAPI del backend. | Párrafo explícito enlazable desde README raíz o `src/CONFIGURACION-API.md`. |
| 1.3 | Mantener `docs/features/product-front-objetivos-pendientes/` como carpeta de tarea; tras **execution**, actualizar **validate** (`validacion.md`). | Artefactos del ciclo completos. |
| 1.4 | Actualizar `EVOLUTION_LOG.md` al finalizar cada hito relevante. | Entrada fechada por fase. |

**Dependencias:** ninguna respecto a código aplicación.

---

## Fase 2 — Skills y herramientas (`scripts/skills`, `scripts/tools`)

**Objetivo:** Alinear automatización y cápsulas con el front en `src/` y con el puerto/health acordados; sin asumir soluciones .NET salvo las que sigan existiendo por otro motivo.

| # | Tarea | Entregable / criterio |
|---|--------|------------------------|
| 2.1 | Verificar `start-frontend`, `prepare-frontend-env`, `run-tests-frontend`, `validate-services-and-health.ps1` frente a **localhost:3000** y documentación actual. | Comportamiento acorde a `README.md` raíz y `scripts/tools/README.md`. |
| 2.2 | `verify-pr-protocol` (Rust): ya ejecuta lint/build/test en `src/`; validar en CI local cuando exista rama válida. | `cargo run ... --bin verify_pr_protocol` OK. |
| 2.3 | Documentar en índice de tools si algún paso debe ejecutarse **antes** de levantar el front (orden implícito SddIA → skills → src). | `scripts/tools/index.json` o README tools actualizado si hace falta. |

**Dependencias:** Fase 1 solo si afecta nombres de tools en SddIA.

---

## Fase 3 — `src` (aplicación)

**Objetivo:** Adecuar el cliente al **contrato real** del backend (swagger); unificar env; tests.

| # | Tarea | Entregable / criterio |
|---|--------|------------------------|
| 3.1 | **API / env:** Alinear `NEXT_PUBLIC_API_URL`, `API_URL`, `.env.example`, `CONFIGURACION-API.md` y fallbacks en `config.ts` / `next.config.js` con **origen** del servicio y **paths** del OpenAPI. | O-API-01, O-API-02. |
| 3.2 | **Clientes HTTP:** Revisar `src/lib/api/*` y `product-api.ts` frente a `paths` del swagger; corregir prefijos o rutas divergentes. | Sin rutas inventadas respecto al contrato. |
| 3.3 | **Tests:** Documentar y homogeneizar escenarios **API real** vs **mock** (D-06); `global-setup`, Playwright, README de tests. | O-API-03. |
| 3.4 | **Calidad:** `npm run lint`, `npm run build`, `npm run test` en `src/`. | O-QA-01 | 

**Dependencias:** Fase 2 opcional para E2E que arranquen dev server; contrato API **siempre** desde backend/swagger.

---

## Fase 4 — Documentación satélite y Propuesta

| # | Tarea | Entregable / criterio |
|---|--------|------------------------|
| 4.1 | **`scripts/Propuesta/README.md`:** aviso de que el contenido es **propuesta / histórico**, no SSOT del Product actual (**D-10**, O-DOC-01). | Fichero creado. |

*(Puede ejecutarse en paralelo a la Fase 1 o justo después; no bloquea código.)*

---

## Orden de ejecución recomendado (resumen)

1. **SddIA** — Fase 1  
2. **Skills / scripts** — Fase 2  
3. **src** — Fase 3  
4. **Propuesta README** — Fase 4 (cuando convenga)

---

## Próxima acción del ciclo

- **implementation** / **execution:** aplicar tareas concretas en repo (PRs por fase o por sub-tarea).
- **validate:** `validacion.md` con evidencias (comandos, capturas o logs breves).

---

*Plan generado tras clarify `done` (2026-03-23).*
