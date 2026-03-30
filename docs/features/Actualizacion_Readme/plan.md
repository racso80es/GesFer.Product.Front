---
id: plan-Actualizacion_Readme
title: Execution Plan for Actualizacion_Readme
status: completed
---
# Plan

1. Leer el contenido de `README.md` y de los archivos markdown en `src/` para consolidar.
2. Mover la documentación de testing `src/README-TESTS.md` a `docs/testing/README-TESTS.md` (crear carpeta si no existe).
3. Verificar que el archivo fue movido usando `ls -la docs/testing/`.
4. Sobreescribir el `README.md` en la raíz usando `write_file`, incorporando instrucciones de `src/SETUP.md`, `src/INSTRUCCIONES.md`, `src/CONFIGURACION-API.md`, `src/SOLUCION-CORS.md`, y `src/SOLUCION-PROBLEMAS.md`, manteniendo el propósito original del archivo.
5. Verificar el `README.md` actualizado usando `head` y `tail`.
6. Eliminar los archivos markdown redundantes en `src/`: `SETUP.md`, `CONFIGURACION-API.md`, `INSTRUCCIONES.md`, `SOLUCION-CORS.md`, `SOLUCION-PROBLEMAS.md`, y `COMANDOS-GIT.md` usando la herramienta `delete_file`.
7. Verificar las eliminaciones listando `src/`.
8. Documentar los cambios añadiendo la nueva entrada de log a `docs/EVOLUTION_LOG.md` usando bash.
9. Verificar la actualización de `EVOLUTION_LOG.md` usando `tail`.
10. Mover el archivo de la tarea de `docs/TASKS/ACTIVE/T-20260330-001-Actualizacion_Readme.md` a `docs/TASKS/DONE/`.
11. Verificar el movimiento del archivo listando `docs/TASKS/DONE/`.
12. Crear el documento `docs/features/Actualizacion_Readme/finalize.md` usando `write_file`.
13. Verificar la creación y contenido de `finalize.md`.
14. Ejecutar todas las pruebas requeridas y linters (`cd src && npm install && npm run lint && npm run build && npm run test:all`).
15. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
16. Submitir la rama usando la herramienta `submit`.
