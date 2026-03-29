---
id: "task-001-actualizacion-readme-spec"
action_id: spec
feature_id: task-001-actualizacion-readme
title: "Especificación técnica de actualización de Readme"
date: "2026-03-29"
status: in_progress
scope: Refactorización de Documentación
acceptance_criteria:
  - Consolidar múltiples READMEs y guías sueltas en `src/` dentro del `README.md` de la raíz del repositorio.
  - Eliminar los archivos consolidados de `src/`.
  - Mover guías arquitecturales y de testing a subdirectorios `docs/architecture/` y `docs/testing/`.
  - Mantener los tests, compilación y linting funcionando.
---

# Especificación

1. **Reubicación de Documentación Especializada**:
   - `src/I18N-GUIDE.md` -> `docs/architecture/i18n-guide.md`
   - `src/I18N-STATUS.md` -> `docs/architecture/i18n-status.md`
   - `src/README-TESTS.md` -> `docs/testing/testing-guide.md`
2. **Consolidación en `README.md` Principal**:
   - Mover el contenido de `src/SETUP.md`, `src/INSTRUCCIONES.md`, `src/CONFIGURACION-API.md`, `src/SOLUCION-PROBLEMAS.md`, `src/SOLUCION-CORS.md`, y `src/COMANDOS-GIT.md` al `README.md` principal.
3. **Limpieza**:
   - Borrar los archivos de `src/` mencionados tras consolidar su contenido.
