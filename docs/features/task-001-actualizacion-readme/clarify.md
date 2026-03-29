---
id: "task-001-actualizacion-readme-clarify"
action_id: clarify
feature_id: task-001-actualizacion-readme
title: "Clarificación de actualización de Readme"
date: "2026-03-29"
status: in_progress
decisions:
  - Eliminar los archivos .md sueltos en src/ después de consolidarlos para no tener redundancia de información.
  - Asegurar la estructura correcta de `docs/architecture` y `docs/testing`.
clarify_pending:
  - Ninguna por el momento.
---

# Clarificaciones

Decidimos que la carpeta de `src/` no deba tener archivos de documentación y configuraciones genéricas, si no que todo sea parte de la documentación principal del proyecto en la raíz o en los subdirectorios `docs/architecture` y `docs/testing`.
