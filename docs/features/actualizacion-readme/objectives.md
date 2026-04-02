---
id: actualizacion-readme
action_id: actualizacion-readme
feature_id: actualizacion-readme
title: Consolidación de Documentación (README)
status: draft
---
# Objetivos: Consolidación de Documentación

## Objetivo
Unificar el archivo `README.md` principal del repositorio con la documentación fragmentada localizada en `src/` (como `INSTRUCCIONES.md`, `SETUP.md`, `CONFIGURACION-API.md`, `SOLUCION-CORS.md`, `SOLUCION-PROBLEMAS.md`, y `COMANDOS-GIT.md`). El propósito es proporcionar un `README.md` centralizado, claro, y que refleje con precisión el estado y estructura actual del proyecto Frontend (Next.js 14, Tailwind CSS, Material UI, i18n, etc.).
Además, reubicar `README-TESTS.md` a la carpeta dedicada de documentación técnica de testing (`docs/testing/`).

## Alcance
- Extraer información valiosa (troubleshooting, scripts de inicialización, comandos útiles, configuración de API y CORS, comandos Git, etc.) de los archivos redundantes en `src/`.
- Integrar toda esta información en el archivo `README.md` de la raíz del proyecto.
- Eliminar de manera segura los archivos `.md` redundantes localizados en `src/`.
- Mover la documentación de testing al lugar correcto: `docs/testing/README-TESTS.md`.
- No alterar código fuente (`.ts`, `.tsx`, etc.).

## Ley Aplicada
- Ley de la Simplificación y Single Source of Truth (SSOT): Se evitará la duplicación de información al consolidar guías y setups en un único documento maestro, tal como está definido en los requerimientos del proyecto: "Project documentation (setup, API configuration, instructions, troubleshooting, Git commands) is fully consolidated within the root README.md."
