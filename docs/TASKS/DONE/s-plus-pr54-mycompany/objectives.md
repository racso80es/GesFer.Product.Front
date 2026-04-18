---
id: "s-plus-pr54-mycompany-objectives"
action_id: objectives
feature_id: s-plus-pr54-mycompany
title: "Objetivos — Cumplimiento S+ post-revisión PR #54 (MyCompany)"
date: "2026-04-18"
status: done
branch: "feat/adecuar-companies-a-mycompany-1181935355670548290"
scope: |
  Cerrar brechas detectadas en revisión SDdIA (architect, qa-judge, security ya OK):
  mapa de directorios del hook, cobertura de tests de la nueva lógica, y alineación
  de integración E2E/navegación con el modelo solo-MyCompany.
ley_aplicada: |
  SddIA/agents/architect.json (allowed_paths, alias @/).
  SddIA/agents/qa-judge.json (tests para lógica nueva; build/lint/test).
  SddIA/principles/nomenclatura (validate-nomenclatura.ps1).
---

# Objetivos

1. **Arquitectura:** Colocar el hook `useMyCompany` en una ruta permitida por el contrato del architect (`src/lib/hooks/`), eliminando `src/hooks/` como ubicación no canónica.
2. **QA:** Restituir cobertura explícita para `myCompanyApi` y el hook (sustituye la eliminada de `companies` API).
3. **Integración:** Evitar fallos intermitentes o obsoletos en `users-companies-integrity` cuando el backend ya no expone multi-company (`/api/company`).
4. **Producto (Kaizen):** Documentar y planificar alineación entre rutas con `[locale]` y enlaces del panel (p. ej. `/my-company` vs `/[locale]/companies`).

**Origen:** Revisión SDdIA PR #54, rama `feat/adecuar-companies-a-mycompany-1181935355670548290`.
