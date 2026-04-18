---
id: "s-plus-pr54-mycompany-plan"
action_id: planning
feature_id: s-plus-pr54-mycompany
title: "Plan — Fases S+ PR #54"
date: "2026-04-18"
status: draft
phases: |
  Fase A: Arquitectura (bloqueante merge estricto SDdIA).
  Fase B: Tests unitarios / contrato API.
  Fase C: Integración E2E y estabilidad.
  Fase D: Kaizen navegación (no bloqueante S+ mínimo; mejora UX/consistencia).
tasks: |
  - [ ] A1: Mover use-my-company.ts a src/lib/hooks/ y actualizar imports.
  - [ ] A2: Eliminar carpeta src/hooks/ si queda vacía.
  - [ ] B1: Crear __tests__/lib/api/my-company.test.ts (mock apiClient).
  - [ ] B2: Crear __tests__/lib/hooks/use-my-company.test.tsx o test del hook con QueryClient provider.
  - [ ] C1: Actualizar o condicionar users-companies-integrity.test.ts (MyCompany vs legacy).
  - [ ] D1: Issue o sub-tarea: unificar href Sidebar con rutas i18n o redirecciones.
---

# Plan de ejecución

| Fase | ID | Acción | Prioridad |
|------|-----|--------|-----------|
| A | A1–A2 | Hook en `src/lib/hooks/` | P0 |
| B | B1–B2 | Tests API + hook | P0 |
| C | C1 | E2E / integridad API | P0 |
| D | D1 | Navegación | P1 (Kaizen) |

**Orden recomendado:** A → B → C → validación (`npm run lint && npm run build && npm run test` + `validate-nomenclatura.ps1`).
