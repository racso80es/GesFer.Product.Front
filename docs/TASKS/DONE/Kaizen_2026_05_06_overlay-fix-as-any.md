---
contract_ref: paths.tasksPath/KAIZEN/
name: Kaizen Overlay Fix As Any
description: Remove "as any" anti-pattern from tests.
priority: medium
created: 2026-05-06
---

# Kaizen: Erradicar "as any" de los tests de overlay-fix

## Objetivo
Cumplir estrictamente con "The Wall" (TypeScript strict typing) reemplazando la coerción `as any` al mockear `window.getComputedStyle` en `src/__tests__/components/ui/overlay-fix.test.tsx`.

## Contexto
Durante exploraciones recientes se detectó que el archivo `src/__tests__/components/ui/overlay-fix.test.tsx` sigue haciendo uso de `as any` en seis ocasiones, contraviniendo la política de 'zero as any' del proyecto en tests.

## Definition of Done (DoD)
- [ ] Sustituir `as any` por un tipo adecuado (`as unknown as CSSStyleDeclaration` o retornando un objeto parcial tipado) en `src/__tests__/components/ui/overlay-fix.test.tsx`.
- [ ] Compilar sin errores (`npm run build` y `tsc --noEmit`).
- [ ] Pasar el test completo.
