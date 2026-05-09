---
contract_ref: paths.processPath/process-contract.json
name: Especificación de la corrección
---
# Especificación

Se reemplazarán todas las ocurrencias de `as any` en el archivo `src/__tests__/components/ui/overlay-fix.test.tsx` con `as unknown as typeof window.getComputedStyle` de modo que se cumpla estrictamente el patrón The Wall y se elimine la deuda técnica.
