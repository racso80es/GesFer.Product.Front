---
id: "s-plus-pr54-mycompany-implementation"
action_id: implementation
feature_id: s-plus-pr54-mycompany
title: "Implementación — Pasos concretos S+"
date: "2026-04-18"
status: draft
touchpoints: |
  src/hooks/use-my-company.ts
  src/lib/hooks/use-my-company.ts
  src/app/[locale]/companies/page.tsx
  src/lib/api/my-company.ts
  src/__tests__/lib/api/my-company.test.ts (nuevo)
  src/__tests__/lib/hooks/use-my-company.test.tsx (nuevo, si aplica)
  src/__tests__/integration/users-companies-integrity.test.ts
  src/components/layout/Sidebar.tsx (solo documentación en Fase D salvo decisión de cambio)
items: |
  Ver cuerpo del documento (pasos numerados).
---

# Instrucciones de implementación

## P0 — Arquitectura (architect)

1. Crear `src/lib/hooks/use-my-company.ts` con el contenido actual de `src/hooks/use-my-company.ts` (sin cambios de lógica).
2. Actualizar el import en `src/app/[locale]/companies/page.tsx` a `@/lib/hooks/use-my-company`.
3. Buscar referencias: `grep -r "@/hooks/use-my-company"` y corregir.
4. Eliminar `src/hooks/use-my-company.ts` y la carpeta `src/hooks/` si no contiene otros archivos.

**Criterio:** `src/hooks/` no debe existir como ubicación de código de producto si el contrato del architect no la incluye.

## P0 — QA (tests nuevos)

1. **`my-company.test.ts` (API):** Mockear `@/lib/api/client` o el módulo `myCompanyApi`; verificar que `get` llama a `GET` coherente con `/api/MyCompany` y `update` envía el payload tipado `UpdateCompany`.
2. **`use-my-company.test.tsx`:** Renderizar un componente de prueba que use `useMyCompany` con `QueryClientProvider` y mocks de `myCompanyApi`; comprobar estados de carga/éxito o invalidación de cache tras mutación (según patrón de otros hooks del repo).

Referencia de estilo: tests existentes bajo `src/__tests__/lib/api/`.

## P0 — Integración E2E

1. Abrir `src/__tests__/integration/users-companies-integrity.test.ts`.
2. **Opción A (preferida si el backend solo MyCompany):** Sustituir aserciones sobre `/api/company` por flujos contra `/api/MyCompany` (o documentar skip explícito con `it.skip` y motivo en comentario).
3. **Opción B:** Mantener tests legacy solo si `process.env` o flag indica API multi-empresa disponible; en caso contrario, `describe.skip` o early return uniforme para no dejar tests “verdes” que en realidad no validan nada sin token.

**Objetivo:** La suite completa `npm run test` no debe fallar de forma intermitente cuando login devuelve token y `/api/company` devuelve 404.

## P1 — Kaizen navegación (documentación / seguimiento)

- Registrar en `plan.md` o issue: `Sidebar` usa `/my-company` mientras la vista localizada está en `/[locale]/companies`. Decidir una sola fuente de verdad (redirect, un solo entrypoint, o i18n en admin).
