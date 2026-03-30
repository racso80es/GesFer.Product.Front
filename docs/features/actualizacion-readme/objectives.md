---
id: obj-20260330-001
action_id: objectives
feature_id: actualizacion-readme
title: Objetivos de actualizacion-readme
status: DONE
---

# Objetivos de actualizacion-readme

## Objetivo Principal
Unificar el archivo principal `README.md` del repositorio consolidando y eliminando la documentación dispersa redundante dentro del directorio `src/`, con el fin de tener una Única Fuente de Verdad (SSOT) para la configuración, despliegue y solución de problemas.

## Alcance
- Consolidar `src/SETUP.md`, `src/CONFIGURACION-API.md`, `src/INSTRUCCIONES.md`, `src/SOLUCION-CORS.md`, `src/SOLUCION-PROBLEMAS.md`, y `src/COMANDOS-GIT.md` en el `README.md` raíz.
- Eliminar estos archivos fuente del directorio `src/`.
- Reubicar `src/README-TESTS.md` a `docs/testing/testing-guide.md`.
- Reubicar `src/I18N-GUIDE.md` a `docs/architecture/i18n-guide.md` y `src/I18N-STATUS.md` a `docs/architecture/i18n-status.md`.
- Seguir el proceso Feature y registrar las evoluciones en los logs correspondientes.

## Ley Aplicada
- Single Source of Truth (SSOT).
- Centralización de documentación según los lineamientos de GesFer.