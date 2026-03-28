---
id: "TASK-20260328-actualizacion-readme-spec"
action_id: "spec"
feature_id: "TASK-20260328-actualizacion-readme"
title: "Especificación de unificación de README"
date: "2026-03-28"
status: "done"
scope: "Consolidar información de setup y configuración en README.md raíz, mover guías a docs/"
acceptance_criteria: ["README.md principal actualizado", "Archivos redundantes eliminados en src/", "Guías de testing y arquitectura reubicadas"]
---
# Especificación
Se extraen las instrucciones de `src/SETUP.md`, `src/CONFIGURACION-API.md`, `src/INSTRUCCIONES.md`, `src/SOLUCION-CORS.md`, `src/SOLUCION-PROBLEMAS.md` y `src/COMANDOS-GIT.md` hacia la raíz `README.md`.
Se mueve `src/README-TESTS.md` a `docs/testing/testing-guide.md`.
Se mueve `src/I18N-GUIDE.md` a `docs/architecture/i18n-guide.md`.
Se mueve `src/I18N-STATUS.md` a `docs/architecture/i18n-status.md`.
