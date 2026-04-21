---
id: "kaizen-overlay-fix-test-id-spec"
action_id: spec
feature_id: kaizen-overlay-fix-test-id
title: "Especificación técnica OverlayFix test-id"
date: "2026-04-21"
status: done
scope: src/components/ui/overlay-fix.tsx
acceptance_criteria: El componente debe aceptar 'data-testid' y renderizarlo en el DOM para pruebas e2e.
---
# Especificación Técnica

El componente `OverlayFix` actualmente retorna `null`. Se debe actualizar para aceptar las props `{ 'data-testid'?: string }` y devolver un `<div data-testid={...} style={{ display: 'none' }} />` para que el data-testid sea localizable en el DOM.