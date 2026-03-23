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

- Alineación de `NEXT_PUBLIC_API_URL` / `API_URL` y documentación al origen local de referencia del API (**5020** según planificación).
- Comentarios en clientes HTTP; tests y `global-setup` coherentes con API real vs mock.

## Fase 4 — Propuesta

- `scripts/Propuesta/README.md` (material histórico, no SSOT).

## TemporalShared

- Inventario: carpeta `src/TemporalShared/` presente; **sin imports** desde aplicación en el árbol actual. Migración pendiente cuando se conecten componentes.
