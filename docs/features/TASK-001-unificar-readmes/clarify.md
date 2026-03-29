---
title: Clarificaciones para la unificación
type: clarification
---
# Clarificación y Decisiones

## Decisiones Tomadas
1. **Unificación de contenido en README.md**: El contenido de `SETUP.md`, `CONFIGURACION-API.md`, `INSTRUCCIONES.md`, `SOLUCION-PROBLEMAS.md`, `SOLUCION-CORS.md`, `COMANDOS-GIT.md` ubicados en `src/` será movido al final de `README.md` como nuevas secciones o incrustado para prevenir pérdida de documentación de Setup. Posteriormente se borrarán los de `src/`.
2. **Archivos de Testing e Internacionalización (I18N)**: Los tests y arquitectura de i18n son más especializados. Moveremos `src/README-TESTS.md` a `docs/testing/testing-guide.md` y los `src/I18N-GUIDE.md` / `src/I18N-STATUS.md` a la carpeta de arquitectura en `docs/architecture/`.
3. Esto sigue el lineamiento: "Project documentation (setup, API configuration, instructions, troubleshooting, Git commands) is fully consolidated within the root README.md. Specialized architectural and testing guides reside in docs/architecture/ and docs/testing/. Redundant localized files in src/ must be avoided."
