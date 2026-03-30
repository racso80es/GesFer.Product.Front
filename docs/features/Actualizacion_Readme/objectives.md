---
id: obj-Actualizacion_Readme
title: Unificar README y adecuarlos a la estructura real
status: in_progress
---
# Objetivos

1. Consolidar el contenido disperso en múltiples archivos markdown (`src/SETUP.md`, `src/CONFIGURACION-API.md`, `src/INSTRUCCIONES.md`, `src/SOLUCION-CORS.md`, `src/SOLUCION-PROBLEMAS.md`, `src/COMANDOS-GIT.md`, `src/README-TESTS.md`) en la documentación principal del proyecto.
2. Eliminar la redundancia de archivos markdown en `src/`.
3. Según la memoria del proyecto: "Project documentation (setup, API configuration, instructions, troubleshooting, Git commands) is fully consolidated within the root `README.md`. Specialized architectural and testing guides reside in `docs/architecture/` and `docs/testing/`. Redundant localized files in `src/` must be avoided."
4. Adaptar el contenido final del README.md en la raíz para reflejar fielmente la estructura y los comandos disponibles (como `npm run test:all`, `npm run build`, y el manejo de logs/MUI recientemente implementado).
