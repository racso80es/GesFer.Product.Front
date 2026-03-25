---
name: Clarificación (Clarify)
feature_name: limpieza-temporal-shared
task_id: T-20260325-001
---
# Clarificaciones y Decisiones

## Cambios desde el plan original
El archivo de requerimientos original (`limpieza-temporal-shared.md`) sugería migrar `src/TemporalShared/Front` a un directorio `../../Shared/Front/` usando un alias `@shared/`.

## Decisión de Cambio (Confirmación del Usuario)
El usuario ha aclarado que "El nuevo destino ha de ser fuera de shared, en la capa de arquitectura que corresponda. El contexto shared no es coherente con el proyecto separado del monolito GesFer".

## Decisión de Implementación
Se descarta la idea de alias externos y se consolidan los componentes de la interfaz de usuario en el árbol principal (`src/components/`, `src/lib/`). El código se desacopla completamente del monorepo original. Los imports utilizarán los alias `@/components/` y `@/lib/` existentes.