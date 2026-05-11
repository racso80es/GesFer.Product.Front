---
status: IMPLEMENTED
---
# Implementación

Se reemplazó el tipo `as any` por `as unknown as CSSStyleDeclaration` en el archivo de tests `src/__tests__/components/ui/overlay-fix.test.tsx` en los 6 lugares donde se realizaba el mock de `window.getComputedStyle`.
