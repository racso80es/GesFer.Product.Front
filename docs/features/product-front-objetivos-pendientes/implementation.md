---
id: "product-front-objetivos-pendientes-implementation"
action_id: implementation
feature_id: product-front-objetivos-pendientes
title: "Implementación por fases (SddIA → skills → src)"
date: "2026-03-23"
status: in_progress
plan_ref: "docs/features/product-front-objetivos-pendientes/plan.md"
---

# Implementación — product-front-objetivos-pendientes

Registro de **touchpoints** aplicados por fase (commits separados).

## Fase 1 — SddIA

- Norma nueva: `SddIA/norms/openapi-contract-rest-frontend.md` (contrato REST = OpenAPI del backend).
- Tabla de documentación raíz actualizada en `README.md`.
- `EVOLUTION_LOG.md` actualizado por hito.

## Fase 2 — Skills / tools

- `scripts/tools/README.md`: orden de trabajo respecto a SddIA y `src/`.
- `scripts/tools/index.json`: nota de flujo en descripción cuando aplique.

## Fase 3 — src

- Origen por defecto **http://localhost:5020** alineado con API backend local de referencia: `config.ts`, `config.test.ts`, `next.config.js`, `auth.ts`, `product-api.ts`, `.env.example`, guías, scripts `setup*.ps1`, `diagnostico.ps1`, tests E2E y `tests/README.md`, `global-setup.ts`, `.playwright.env.example`.
- Comentarios en `client.ts` referenciando OpenAPI.

## Fase 4 — Propuesta

- `scripts/Propuesta/README.md` (material histórico, no SSOT). Commit en fase 4.

## TemporalShared

- Inventario: carpeta `src/TemporalShared/` presente; **sin imports** desde aplicación en el árbol actual. Migración pendiente cuando se conecten componentes.
