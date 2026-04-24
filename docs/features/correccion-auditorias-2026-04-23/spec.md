---
id: spec-2026-04-23
action_id: correccion-auditorias
feature_id: correccion-auditorias
title: "Especificación Técnica de Resolución"
status: ACTIVE
---
# Especificación Técnica

## Contexto Técnico
Durante la auditoria, se reporto un fallo critico de payload al usar las llaves en español `usuario` y `contraseña` dentro de los requests en las suites de tests de API e Integracion (e.g. `users-organization-api-integrity.test.ts`), lo que causa confusión. También se necesita reparar los fallos TS del `admin_logs.spec.ts` de Playwright.
