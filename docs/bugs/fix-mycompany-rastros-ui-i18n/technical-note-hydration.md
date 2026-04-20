---
id: fix-mycompany-rastros-ui-i18n-technical-note-hydration
action_id: technical-note
feature_id: fix-mycompany-rastros-ui-i18n
title: Nota técnica — Hidratación (localStorage / primer render)
date: "2026-04-20"
status: done
branch: fix/mycompany-rastros-ui-i18n
---

# Nota técnica: hidratación en rutas protegidas y formularios

## Síntoma

- Consola: `Warning: Expected server HTML to contain a matching <div> in <div>` con stack en `MainLayout` / `SidebarContent` / `ProtectedRoute`.

## Causa raíz

1. **`ProtectedRoute`** leía `localStorage` (`auth_user`) en el primer render del **cliente** para mostrar ya el layout con contenido, mientras el **servidor** no puede leer storage → HTML distinto en la hidratación.
2. **`CompanyForm`** dependía de `defaultValues` fijos y de `window` para el idioma; los datos de organización pueden llegar tras el primer paint → formulario vacío o etiquetas incoherentes con el SSR.

## Corrección aplicada (resumen)

- `hasMounted` antes de usar lecturas de storage para ramificar la UI visible; norma canónica: **`SddIA/norms/nextjs-hydration-client-state.md`**.
- Hook reutilizable **`useHasMounted`** (`src/hooks/use-has-mounted.ts`).
- Formulario “Mi organización”: `values` en react-hook-form + `useLocale()` de `next-intl`.

## Evitar regresiones

- Tests de política: `src/__tests__/policies/nextjs-hydration-policy.test.ts`.
- Agente **Tekton** (`SddIA/agents/tekton-developer.json`): restricción explícita sobre paridad SSR/cliente en componentes cliente.
