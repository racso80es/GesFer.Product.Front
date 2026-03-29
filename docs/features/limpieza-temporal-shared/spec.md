---
title: Especificación Limpieza TemporalShared
type: spec
---
# Especificación

1. Remover de `src/tailwind.config.ts` el patrón de contenido `"./TemporalShared/Front/components/**/*.{js,ts,jsx,tsx,mdx}"`.
2. Validar que no haya otras menciones de `"TemporalShared"` en todo el proyecto mediante grep.
3. Asegurar que la compilación (build), test y lint sean exitosos en `src/`.