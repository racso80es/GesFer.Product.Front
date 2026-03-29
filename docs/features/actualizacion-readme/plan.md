---
title: Plan Actualización README
type: plan
task_id: TASK-001-Actualizacion_Readme
---

# Plan Actualización README

1. **Lectura y análisis de archivos**: Recuperar el contenido de los múltiples archivos markdown en `src/` que explican configuración, testing, comandos GIT e instalación.
2. **Migración Arquitectónica y Testing**: Mover la documentación del entorno i18n (`I18N-GUIDE.md`, `I18N-STATUS.md`) hacia `docs/architecture/` y unificar los documentos de tests hacia `docs/testing/testing-guide.md`.
3. **Consolidación de README principal**: Modificar el `README.md` de la raíz del proyecto para alojar las instrucciones esenciales (SETUP, CONFIGURACION-API, INSTRUCCIONES, SOLUCION-PROBLEMAS, COMANDOS-GIT).
4. **Limpieza del repositorio**: Eliminar todos los archivos `.md` de documentación obsoletos o ya migrados en la carpeta `src/`.
5. **Documentación del Proceso (SDDia)**: Completar los archivos del flujo `feature` (plan, implementation, execution, validation, finalize).
6. **Testing de Regresión**: Asegurar que las modificaciones no han corrompido código.
7. **Cierre y Git**: Realizar commit en la rama `feat/actualizacion-readme` y cerrar la tarea en el flujo de Trabajo (EVOLUTION_LOG).
