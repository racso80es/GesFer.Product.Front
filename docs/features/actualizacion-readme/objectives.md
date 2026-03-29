---
title: Objetivos de Actualización de README
type: objectives
feature_id: actualizacion-readme
task_id: TASK-20260329-001
---
# Objetivo de la feature actualizacion-readme

## Objetivo principal
Unificar la documentación dispersa del proyecto (los archivos `README.md` existentes en `src/`) y reflejarla correctamente en el repositorio, alineado a las normas arquitectónicas de SddIA: *Project documentation (setup, API configuration, instructions, troubleshooting, Git commands) is fully consolidated within the root README.md. Specialized architectural and testing guides reside in docs/architecture/ and docs/testing/. Redundant localized files in src/ must be avoided.*

## Alcance
- Extraer contenido de configuración de `src/config/README.md` y trasladarlo a la raíz `README.md` o secciones adecuadas.
- Extraer contenido de testing de `src/tests/README.md` y centralizarlo en `docs/testing/testing-guide.md` (y hacer mención en el `README.md` principal).
- Eliminar `src/config/README.md` y `src/tests/README.md`.
- Asegurar que la raíz `README.md` ofrezca una visión completa, actualizada y unificada del proyecto de FrontEnd.

## Leyes y normativas aplicadas
- Ley de Soberanía Documental (Cúmulo).
- Invariante de documentación SddIA (SddIA/norms/...).