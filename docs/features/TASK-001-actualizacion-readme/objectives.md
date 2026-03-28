---
id: "TASK-001-objectives"
action_id: objectives
feature_id: TASK-001-actualizacion-readme
branch: feat/TASK-001-actualizacion-readme
scope: Unificación de documentación README y eliminación de archivos redundantes en `src/`
ley_aplicada: Ley de Soberanía Documental
---

# Objetivos

El objetivo principal de esta tarea es **unificar la documentación del proyecto** en un solo archivo `README.md` principal ubicado en la raíz del repositorio. Para lograr esto, se analizarán los múltiples archivos de documentación existentes en la carpeta `src/` (como `COMANDOS-GIT.md`, `CONFIGURACION-API.md`, `SETUP.md`, `SOLUCION-PROBLEMAS.md`, `README-TESTS.md`, `INSTRUCCIONES.md`, etc.), se extraerá la información relevante que no esté duplicada o desactualizada, y se integrará de forma coherente y estructurada en el `README.md` raíz.

### Alcance
1. Analizar el contenido de `README.md` actual en la raíz y los diferentes archivos Markdown ubicados en `src/`.
2. Actualizar o completar las secciones correspondientes en `README.md` principal con la información valiosa de los archivos de `src/` que sea realmente necesaria (por ejemplo, instrucciones de configuración de entorno, ejecución de tests, resolución de problemas comunes, comandos específicos del proyecto).
3. Asegurar que la nueva documentación refleje fielmente el estado actual del proyecto GesFer.Product.Front.
4. Eliminar los archivos `.md` analizados y procesados de la carpeta `src/` para evitar redundancias y mantener una única fuente de verdad (Single Source of Truth).
