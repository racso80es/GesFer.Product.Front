---
title: Especificación Actualización README
type: specification
task_id: TASK-001-Actualizacion_Readme
---

# Especificación Actualización README

## Resumen Técnico
Para lograr una documentación más limpia y concisa, el README.md principal debe abarcar la inicialización del proyecto, configuración, troubleshooting principal y referencias claras a guías adicionales.

## Cambios Estructurales
1. **`docs/architecture/`**: Recibirá archivos técnicos como `I18N-GUIDE.md` y `I18N-STATUS.md` desde `src/`.
2. **`docs/testing/testing-guide.md`**: Se creará a partir del contenido de `src/README-TESTS.md` y `src/tests/README.md`.
3. **`README.md` (raíz)**: Se enriquecerá con las instrucciones de instalación (`src/SETUP.md`), configuración API (`src/CONFIGURACION-API.md`), comandos GIT útiles (`src/COMANDOS-GIT.md`), y solución de problemas (`src/SOLUCION-PROBLEMAS.md`, `src/SOLUCION-CORS.md`).
4. **Archivos a eliminar**: Se eliminarán de `src/` los archivos integrados en el README principal o reubicados, incluyendo `src/config/README.md`, `src/INSTRUCCIONES.md`, etc.
