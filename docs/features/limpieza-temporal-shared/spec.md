---
name: Especificación (Spec)
feature_name: limpieza-temporal-shared
task_id: T-20260325-001
---
# Especificación Técnica

## Descripción
La base de código actualmente usa componentes bajo un directorio temporal `src/TemporalShared/Front`. La intención inicial era hacer un alias hacia un paquete `@shared` en un monorepo, pero esto rompe la cohesión del proyecto (el contexto "shared" del monolito GesFer no es aplicable a este proyecto separado).

La nueva arquitectura requerida es mover todo lo que hay en `src/TemporalShared/Front` (como `components/` y `lib/`) a las carpetas `src/components/` y `src/lib/` respectivas.

## Requerimientos Técnicos
1. Copiar y mover todos los archivos de `src/TemporalShared/Front/components/` a `src/components/`.
2. Copiar y mover todos los archivos de `src/TemporalShared/Front/lib/` a `src/lib/`.
3. Eliminar la carpeta temporal `src/TemporalShared`.
4. Buscar y reemplazar de manera global los imports `@/TemporalShared/Front/components/` por `@/components/`.
5. Buscar y reemplazar de manera global los imports `@/TemporalShared/Front/lib/` por `@/lib/`.
6. Actualizar las referencias en `tailwind.config.ts` y `tsconfig.json` para eliminar rastros de `TemporalShared/Front`.