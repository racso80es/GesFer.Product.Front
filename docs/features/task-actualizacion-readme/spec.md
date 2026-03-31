---
id: "task-actualizacion-readme-spec"
action_id: spec
feature_id: task-actualizacion-readme
title: "Especificación de actualización del README"
date: "2026-03-31"
status: done
scope: README, docs/architecture, docs/testing
acceptance_criteria:
  - README principal incluye instrucciones de instalacion y configuracion consolidadas.
  - No existen READMEs redundantes en src/ (ej. SETUP.md, INSTRUCCIONES.md, etc).
  - Guía i18n movida a docs/architecture/i18n-guide.md.
  - Tests README movido a docs/testing/README-TESTS.md.
---
# Especificación Técnica

## Estado Actual
Hay múltiples archivos Markdown en `src/` (SETUP, INSTRUCCIONES, CONFIGURACION-API, SOLUCION-CORS, SOLUCION-PROBLEMAS, COMANDOS-GIT, README-TESTS, I18N-GUIDE, I18N-STATUS) que causan duplicidad y fragmentación.

## Solución Propuesta
1. Crear `docs/architecture/` y `docs/testing/`.
2. Mover la documentación de i18n consolidada a `docs/architecture/i18n-guide.md`.
3. Mover la documentación de testing a `docs/testing/README-TESTS.md`.
4. Borrar todos los ficheros .md redundantes en `src/`.
5. Actualizar la raíz `README.md` incorporando las partes clave de los ficheros eliminados.