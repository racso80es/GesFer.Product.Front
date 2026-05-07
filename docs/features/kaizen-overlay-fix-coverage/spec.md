---
id: S-KAIZEN-OVERLAY-001
action_id: T-KAIZEN-OVERLAY-001
feature_id: feat/kaizen-overlay-fix-coverage
title: Specification
status: active
---
# Especificaciones

Crear `src/__tests__/components/ui/overlay-fix.test.tsx`.
Se requieren aserciones rigurosas para:
1. Montaje y desmontaje del componente (limpieza del interval y restauración de `overflow: unset`).
2. Restauración del overflow cuando el body está `hidden` pero no hay Dialogs visibles.
3. Ocultamiento de overlays bloqueantes (elementos fixed, z-index >= 50, fullscreen, bg-black, sin parent dialog).
