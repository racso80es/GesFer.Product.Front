---
id: "limpieza-temporal-shared-spec"
action_id: spec
feature_id: limpieza-temporal-shared
title: "Especificación de Limpieza TemporalShared"
date: "2024-03-30"
status: done
scope: src
acceptance_criteria:
  - Eliminar referencias a TemporalShared en src/tailwind.config.ts.
  - Asegurar compilación exitosa sin carpeta TemporalShared.
---
# Especificación
Se detecta configuración en `src/tailwind.config.ts` apuntando a `./TemporalShared/Front/components/...`. Esta referencia debe ser removida para evitar dependencias innecesarias o errores de compilación tras la restauración del alias `@shared/`.
