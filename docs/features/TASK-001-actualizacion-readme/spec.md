---
id: "TASK-001-spec"
action_id: spec
feature_id: TASK-001-actualizacion-readme
title: "Especificación para Unificar README"
date: "2024-03-28"
status: in_progress
scope: README.md consolidation
acceptance_criteria:
  - README.md centraliza todos los detalles técnicos relevantes.
  - Los archivos .md (excluyendo documentación vital si la hay, aunque se prioriza mover todo a README.md o docs) dentro de src/ desaparecen.
  - La build y las validaciones locales pasan.
---

# Especificación Técnica

## Requisitos
Se requiere agrupar la documentación distribuida en la carpeta `src/` (`src/COMANDOS-GIT.md`, `src/CONFIGURACION-API.md`, `src/I18N-GUIDE.md`, `src/I18N-STATUS.md`, `src/INSTRUCCIONES.md`, `src/README-TESTS.md`, `src/SETUP.md`, `src/SOLUCION-CORS.md`, `src/SOLUCION-PROBLEMAS.md`) hacia el archivo `README.md` principal ubicado en la raíz del proyecto.

## Análisis de contenido
- **COMANDOS-GIT.md**: Comandos útiles de Git. Se pueden añadir a una sección de "Comandos Útiles".
- **CONFIGURACION-API.md**: Detalles de conexión a la API. Debe integrarse en "Configuración y API".
- **I18N-GUIDE.md / I18N-STATUS.md**: Guías de internacionalización. Se debe crear una sección de "Internacionalización (i18n)" o referenciar si la lógica es estándar de next-intl.
- **INSTRUCCIONES.md / SETUP.md**: Pasos de instalación y configuración. Completarán la sección de "Inicio rápido" y "Requisitos".
- **README-TESTS.md**: Instrucciones sobre cómo correr pruebas. Se agregará a la sección de "Testing".
- **SOLUCION-CORS.md / SOLUCION-PROBLEMAS.md**: Guías para solucionar errores. Se sumarán a la sección de "Solución de problemas".

## Acciones detalladas
1. Leer y extraer el contenido esencial de los archivos listados arriba.
2. Inyectar este contenido en secciones claramente delineadas dentro de `README.md`.
3. Borrar los archivos de `src/`.