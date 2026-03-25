---
name: Objetivos
feature_name: limpieza-temporal-shared
task_id: T-20260325-001
---
# Objetivo de la Tarea T-20260325-001

## Objetivo
Eliminar el directorio temporal `src/TemporalShared/Front` y mover sus contenidos a las ubicaciones adecuadas dentro del proyecto principal (`src/components/` y `src/lib/`).

## Alcance
- Mover componentes y utilidades desde `src/TemporalShared/Front/` a `src/components/` y `src/lib/`.
- Actualizar rutas de importación en todos los archivos del proyecto que actualmente referencian a `@/TemporalShared/Front/...` para que referencien `@/components/...` y `@/lib/...`.
- Eliminar la carpeta `src/TemporalShared` y referencias sobrantes en `tsconfig.json` y `tailwind.config.ts`.
- Validar mediante `npm run build` y `npm run dev` que todo funciona.

## Leyes y Normas Aplicadas
- **Single Source of Truth**: La documentación canónica de la tarea reside en esta carpeta `docs/features/limpieza-temporal-shared/`.
- El proceso SDDIA feature se seguirá fielmente para documentar todas las fases (spec, clarify, plan, implementation, execution, validation y finalize).