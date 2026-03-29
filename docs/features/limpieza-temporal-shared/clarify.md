---
title: Clarificación Limpieza TemporalShared
type: clarify
---
# Clarificación

La carpeta `src/TemporalShared` ya no existe en el sistema de archivos actual.
La búsqueda inicial no arrojó resultados de imports usando `@/TemporalShared/Front/...`.
El único archivo que todavía tiene la referencia es `src/tailwind.config.ts`.
Por lo tanto, la tarea se limita a limpiar esa referencia en `tailwind.config.ts`.