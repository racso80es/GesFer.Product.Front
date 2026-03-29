---
title: Plan Limpieza TemporalShared
type: plan
---
# Plan de Implementación

1. Modificar `src/tailwind.config.ts`.
2. Remover la línea correspondiente al directorio de `TemporalShared` en la propiedad `content`.
3. Ejecutar `npm run build`, `npm run lint` y `npm run test:all` en el directorio `src/`.