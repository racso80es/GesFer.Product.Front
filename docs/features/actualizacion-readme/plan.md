---
id: actualizacion-readme-plan
title: Planificación para Actualizacion_Readme
feature_id: actualizacion-readme
status: COMPLETED
---
# Planificación

1. Revisar contenido de `README.md` actual en la raíz y los varios archivos `*.md` dentro de `src/` (como `SETUP.md`, `CONFIGURACION-API.md`, etc.).
2. Combinar toda la información relevante sobre solución de problemas (CORS, problemas de puertos, caché), configuración y scripts desde `src/*.md` en el `README.md` principal.
3. Eliminar los archivos `.md` redundantes en `src/` (`SETUP.md`, `CONFIGURACION-API.md`, `INSTRUCCIONES.md`, `SOLUCION-CORS.md`, `SOLUCION-PROBLEMAS.md`, `COMANDOS-GIT.md`).
4. Mover la documentación arquitectural (`I18N-GUIDE.md` e `I18N-STATUS.md`) a `docs/architecture/`.
5. Mover la documentación de testing (`README-TESTS.md`) a `docs/testing/`.
6. Correr tests, linter y build para comprobar la estabilidad del proyecto.
7. Generar documentos del proceso en `docs/features/actualizacion-readme/`.
8. Completar las tareas de finalización (mover a DONE, update EVOLUTION_LOG, pre_commit_instructions, y PR).
