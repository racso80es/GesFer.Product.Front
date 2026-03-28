---
type: spec
title: Especificación técnica para la unificación de READMEs
feature: TASK-001-actualizacion-readme
---

# Especificación Técnica

## Estado actual
Existen varios ficheros markdown en `src/` (`src/CONFIGURACION-API.md`, `src/SETUP.md`, etc.) que detallan comandos y configuraciones.

## Solución
1. El `README.md` de la raíz del repositorio se consolidará absorbiendo información esencial de instalación, configuración, solución de problemas y comandos git de los MDs en `src/`.
2. Las guías especializadas (como tests y arquitectura i18n) se moverán a sus directorios canónicos: `docs/testing/` y `docs/architecture/`.
3. Los ficheros originales `.md` redundantes en `src/` serán eliminados.