---
id: Kaizen_2026_05_11_remove_as_any
title: "Eliminar as any en src/__tests__/components/ui/overlay-fix.test.tsx"
status: ACTIVE
type: KAIZEN
created: 2026-05-11
---
# Eliminar as any

Se han detectado múltiples usos de `as any` al sobrescribir `window.getComputedStyle` en `src/__tests__/components/ui/overlay-fix.test.tsx`.
Se deben cambiar por `as unknown as typeof window.getComputedStyle` para mejorar la solidez de los tipos.
