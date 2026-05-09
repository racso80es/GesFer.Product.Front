---
status: DEFINED
---
# Especificaciones Técnicas

Se debe de reemplazar `as any` con `as unknown as CSSStyleDeclaration` (o usando un tipo parcial apropiado) en `src/__tests__/components/ui/overlay-fix.test.tsx` para ajustarse a las normas del proyecto de "zero as any" ("The Wall").
