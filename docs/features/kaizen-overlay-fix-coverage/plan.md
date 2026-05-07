---
id: P-KAIZEN-OVERLAY-001
action_id: T-KAIZEN-OVERLAY-001
feature_id: feat/kaizen-overlay-fix-coverage
title: Plan
status: active
---
# Plan

1. Iniciar un entorno de Jest falso (`jest.useFakeTimers()`).
2. Insertar elementos DOM que simulen overlays bloqueantes.
3. Renderizar el componente `OverlayFix`.
4. Avanzar los temporizadores.
5. Afirmar (Assert) que el DOM ha sido limpiado/restaurado.
