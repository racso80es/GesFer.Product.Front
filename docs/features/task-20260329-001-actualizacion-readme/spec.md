---
title: Especificación de Actualización de Readme
type: spec
---
# Especificación

Ficheros a procesar:
1. `src/README-TESTS.md` -> se moverá a `docs/testing/testing-guide.md`.
2. `src/I18N-GUIDE.md` y `src/I18N-STATUS.md` -> se combinarán y moverán a `docs/architecture/i18n-guide.md`.
3. `src/SETUP.md`, `src/INSTRUCCIONES.md`, `src/CONFIGURACION-API.md`, `src/SOLUCION-CORS.md`, `src/SOLUCION-PROBLEMAS.md` -> su contenido valioso se integrará en el `README.md` principal y luego serán eliminados.
4. `src/COMANDOS-GIT.md` -> se eliminará por ser redundante.

El resultado será que la carpeta `src/` ya no tendrá archivos markdown redundantes con guías.
