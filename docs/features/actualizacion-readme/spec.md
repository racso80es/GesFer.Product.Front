---
id: spec-actualizacion-readme
action_id: spec
feature_id: actualizacion-readme
title: Especificación de Consolidación de README
status: draft
---
# Especificación Técnica

## Descripción General
La tarea consiste en refactorizar la estructura de documentación del proyecto para cumplir con los estándares de diseño. Toda la información general (instalación, configuración de la API, CORS, comandos de Git, y troubleshooting) se agrupará en el `README.md` de la raíz del proyecto. El archivo relativo al testing se ubicará en la carpeta especializada `docs/testing/`. Los archivos de ayuda fragmentados en `src/` serán borrados para evitar desorden.

## Archivos a Modificar
- `README.md` (Sobrescribir y añadir detalles de troubleshooting, scripts de entorno, APIs y CORS)
- `docs/testing/README-TESTS.md` (Nuevo destino)

## Archivos a Eliminar
- `src/COMANDOS-GIT.md`
- `src/CONFIGURACION-API.md`
- `src/INSTRUCCIONES.md`
- `src/README-TESTS.md`
- `src/SETUP.md`
- `src/SOLUCION-CORS.md`
- `src/SOLUCION-PROBLEMAS.md`
