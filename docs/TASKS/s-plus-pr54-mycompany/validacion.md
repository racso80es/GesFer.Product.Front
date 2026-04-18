---
id: "s-plus-pr54-mycompany-validate"
action_id: validate
feature_id: s-plus-pr54-mycompany
title: "Validación — Checklist S+"
date: "2026-04-18"
status: draft
global: |
  Cierre de tarea s-plus-pr54-mycompany cuando todos los checks pasan.
checks: |
  - [ ] npm run lint (0 errores)
  - [ ] npm run build (éxito)
  - [ ] npm run test (todos los suites; sin fallos intermitentes en users-companies-integrity)
  - [ ] powershell -File scripts/validate-nomenclatura.ps1 -BaseBranch main → result pass
  - [ ] No queda código producto en src/hooks/ salvo excepción documentada en architect.json
  - [ ] PR o rama revisada: imports usan @/ y no ../../ fuera de límites
git_changes: |
  Esperado: archivos nuevos en src/lib/hooks/ y __tests__/; eliminación de src/hooks/;
  posible modificación de users-companies-integrity.test.ts.
---

# Validación S+

## Comandos obligatorios (qa-judge)

```powershell
cd src
npm run lint
npm run build
npm run test
```

Desde raíz del repo:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\validate-nomenclatura.ps1 -BaseBranch main
```

## Revisión architect

- [ ] Ningún import desde `src/components/` hacia `src/app/` en código tocado.
- [ ] Hook bajo `src/lib/hooks/use-my-company.ts`.

## Revisión security-engineer (regresión)

- [ ] Sin secretos nuevos en código.
- [ ] Formularios siguen validados con Zod (sin cambiar `CompanyForm` salvo necesidad).

## Criterio de “done”

La tarea `s-plus-pr54-mycompany` se considera **done** cuando `status` en los frontmatter de objectives/spec/plan pasa a `done` y existe commit en la rama del PR (o PR de seguimiento) que implementa P0 A–C.
