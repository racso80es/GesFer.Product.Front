---
id: Kaizen_2026_04_26_clean_todos
title: "Limpieza de comentarios TODO huérfanos"
status: pending
created: "2026-04-26"
---
# Limpieza de TODOs

Se ha detectado que existen algunos TODOs huérfanos en los test de la aplicación.
En concreto, hay un TODO en `src/tests/e2e/login.spec.ts`.

## Acción Kaizen
Eliminar ese comentario `TODO: Actualizar seed...` de `src/tests/e2e/login.spec.ts` para reducir la entropía de deuda técnica.
