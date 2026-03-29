---
title: Objetivo Limpieza TemporalShared
type: objectives
---
# Objetivo Limpieza TemporalShared

Eliminar referencias temporales a `TemporalShared` en el frontend, en particular en `src/tailwind.config.ts`, dado que el directorio `src/TemporalShared` ya no existe y no hay código fuente dependiendo de él. Se debe validar que los imports de `@shared/` funcionen correctamente si estuvieran en uso.