---
id: plan-actualizacion-readme
action_id: exec-actualizacion-readme
feature_id: actualizacion-readme
title: Plan de Actualización de Readme
status: ACTIVE
---

# Plan

1. Crear directorios `docs/architecture/` y `docs/testing/` si no existen.
2. Mover archivos a `docs/architecture/`:
   - `mv src/I18N-GUIDE.md docs/architecture/i18n-guide.md`
   - `mv src/I18N-STATUS.md docs/architecture/i18n-status.md`
3. Mover archivos a `docs/testing/`:
   - `mv src/README-TESTS.md docs/testing/README-TESTS.md`
4. Leer y analizar `src/SETUP.md`, `src/INSTRUCCIONES.md`, `src/CONFIGURACION-API.md`, `src/SOLUCION-PROBLEMAS.md`, `src/SOLUCION-CORS.md`, `src/COMANDOS-GIT.md`.
5. Modificar el `README.md` de la raíz para incorporar la información relevante.
6. Eliminar los archivos `.md` de `src/` que fueron integrados.
7. Validar que la compilación y los tests siguen pasando y no hay referencias rotas.
