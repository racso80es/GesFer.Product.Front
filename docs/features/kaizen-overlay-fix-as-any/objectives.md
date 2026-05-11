---
name: kaizen-overlay-fix-as-any
status: ACTIVE
related_tasks:
  - paths.tasksPath/ACTIVE/Kaizen_2026_05_06_overlay-fix-as-any.md
---
# Objetivos

Eliminar el anti-patrón de uso de `as any` en el archivo de testing `src/__tests__/components/ui/overlay-fix.test.tsx` al hacer un mock de la función de DOM `window.getComputedStyle`.
