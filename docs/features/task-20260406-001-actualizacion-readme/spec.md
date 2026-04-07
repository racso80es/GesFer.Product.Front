---
id: "TASK-20260406-001"
action_id: "spec"
feature_id: "task-20260406-001-actualizacion-readme"
title: "Unificar READMEs y organizar documentación"
status: "in-progress"
---
# Especificación Técnica
- Mover guías i18n (`src/I18N-GUIDE.md` y `src/I18N-STATUS.md`) a `docs/architecture/`.
- Mover guías de test (`src/README-TESTS.md`, `src/tests/README-BEST-PRACTICES.md`, `src/tests/README.md`) a `docs/testing/`.
- Integrar la información relevante de configuración de entornos en `README.md` (o mantener `src/config/README.md` si es puramente un markdown interno para los programadores del config, aunque la norma dice "Redundant localized files in src/ must be avoided", por tanto lo movemos/unificamos).
- Integrar la información relevante de `src/COMANDOS-GIT.md`, `src/CONFIGURACION-API.md`, `src/INSTRUCCIONES.md`, `src/SETUP.md`, `src/SOLUCION-CORS.md`, `src/SOLUCION-PROBLEMAS.md` en el `README.md` principal si falta algo, y luego eliminar estos ficheros de `src/`.