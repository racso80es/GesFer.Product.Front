---
feature: kaizen-clean-code
phase: spec
---
# Especificaciones
Localizar todas las ocurrencias de `as any;` en `src/__tests__/components/ui/overlay-fix.test.tsx` (que son retornos mockeados de `window.getComputedStyle`) y reemplazarlas por `as unknown as ReturnType<typeof window.getComputedStyle>;`.
