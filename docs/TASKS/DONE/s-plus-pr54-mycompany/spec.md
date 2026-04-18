---
id: "s-plus-pr54-mycompany-spec"
action_id: spec
feature_id: s-plus-pr54-mycompany
title: "Especificación — Cumplimiento S+ PR #54"
date: "2026-04-18"
status: done
scope: |
  Tareas correctivas y de calidad sobre el refactor MyCompany ya mergeado o en PR,
  sin reintroducir multi-empresa salvo que el dominio lo exija.
acceptance_criteria: |
  - El hook vive bajo src/lib/hooks/ y los imports usan @/lib/hooks/use-my-company.
  - Existen tests Jest que cubren al menos get/update de myCompanyApi (mock de apiClient)
    y el comportamiento observable del hook (QueryClient de prueba o mock de myCompanyApi).
  - npm run lint, npm run build y npm run test pasan de forma estable.
  - users-companies-integrity no falla por contrato obsoleto: o se actualiza a MyCompany,
    o se omite de forma explícita cuando el entorno no soporta el flujo legacy.
  - validate-nomenclatura.ps1 -BaseBranch main sigue en pass tras los cambios.
---

# Especificación

## Contexto

El PR #54 introduce `useMyCompany` y elimina el cliente `companies`. La revisión S+ identificó:

- Violación del **mapa de directorios** (`src/hooks/` no está en `allowed_paths` de `SddIA/agents/architect.json`).
- **Ausencia de tests** dedicados a la nueva superficie (`myCompanyApi`, hook).
- **Fragilidad E2E:** tests que llaman a `/api/company` pueden fallar si el token existe y el API multi-empresa ya no está.

## Fuera de alcance (salvo nueva decisión de producto)

- Rediseño completo del panel admin vs app localizada; solo se documenta la deuda de rutas.

## Referencias de código

- Hook actual: `src/hooks/use-my-company.ts` → destino: `src/lib/hooks/use-my-company.ts`.
- Consumidor: `src/app/[locale]/companies/page.tsx`.
- API: `src/lib/api/my-company.ts`.
- Formulario (Zod ya presente): `src/components/companies/company-form.tsx`.
