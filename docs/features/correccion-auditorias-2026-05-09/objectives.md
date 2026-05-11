---
contract_ref: paths.processPath/process-contract.json
name: Objetivos de la corrección de auditoría 2026-05-09
---
# Objetivos

- **Objetivo Principal:** Eliminar el uso de `as any` en `src/__tests__/components/ui/overlay-fix.test.tsx` en los mocks de `window.getComputedStyle`.
- **Hallazgos consolidados:** Uso indebido de `as any` en lugar de una tipificación estricta.
- **Prioridad:** Alta (Crítico).
- **Criterios de Cierre:** El código debe compilar, sin `as any`, y todas las pruebas deben pasar en CI.
