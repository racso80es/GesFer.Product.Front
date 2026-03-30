---
id: plan-20260330-001
action_id: planning
feature_id: actualizacion-readme
title: Plan de actualizacion-readme
status: DONE
---

# Plan de Implementación de actualizacion-readme

## Fases de Implementación

1.  **Lectura de Fuentes**: Leer el contenido de `README.md` y todos los archivos a consolidar (`src/SETUP.md`, `src/CONFIGURACION-API.md`, `src/INSTRUCCIONES.md`, `src/SOLUCION-CORS.md`, `src/SOLUCION-PROBLEMAS.md`, `src/COMANDOS-GIT.md`).
2.  **Consolidación y Edición**: Consolidar en memoria el texto y re-escribir el archivo principal `README.md` en la raíz.
3.  **Limpieza del Repositorio**: Borrar los 6 archivos consolidados de la carpeta `src/`.
4.  **Reubicación**:
    - `mv src/README-TESTS.md docs/testing/README-TESTS.md`
    - `mv src/I18N-GUIDE.md docs/architecture/i18n-guide.md`
    - `mv src/I18N-STATUS.md docs/architecture/i18n-status.md`
5.  **Verificación Final y Actualización de Histórico**: Correr comprobaciones de QA (`lint`, `build`, `test:all`) y escribir los logs finales (`execution.md`, `validacion.md`, `finalize.md`, `EVOLUTION_LOG.md`). Mover la tarea a `DONE/`.