---
title: TASK-001 - Unificar y centralizar README.md
type: objective
---
# Objetivo de TASK-001

## Descripción
Centralizar la información de configuración, setup, troubleshooting y git comandos en el `README.md` principal, y organizar las guías de tests y de i18n en las ubicaciones de documentación del proyecto (`docs/testing/` y `docs/architecture/`), eliminando los ficheros markdown redundantes del directorio `src/`.

## Alcance
- Modificar archivo: `README.md` (principal)
- Mover archivo: `src/README-TESTS.md` -> `docs/testing/testing-guide.md`
- Mover archivos: `src/I18N-GUIDE.md`, `src/I18N-STATUS.md` -> `docs/architecture/`
- Eliminar archivos redundantes: `src/SETUP.md`, `src/CONFIGURACION-API.md`, `src/INSTRUCCIONES.md`, `src/SOLUCION-PROBLEMAS.md`, `src/SOLUCION-CORS.md`, `src/COMANDOS-GIT.md`

## Ley aplicada
Ley de unificación de READMEs y documentación técnica general en el directorio raíz o en `docs/`.
