---
id: spec-20260330-001
action_id: spec
feature_id: actualizacion-readme
title: Especificación de actualizacion-readme
status: DONE
---

# Especificación Técnica

## Requisitos
- Mover toda la información operativa y técnica listada a continuación del directorio `src/` al `README.md` principal:
  - `src/SETUP.md`
  - `src/CONFIGURACION-API.md`
  - `src/INSTRUCCIONES.md`
  - `src/SOLUCION-CORS.md`
  - `src/SOLUCION-PROBLEMAS.md`
  - `src/COMANDOS-GIT.md`
- Mover archivos específicos de áreas a sus respectivos directorios de documentación:
  - `src/README-TESTS.md` -> `docs/testing/testing-guide.md`
  - `src/I18N-GUIDE.md` -> `docs/architecture/i18n-guide.md`
  - `src/I18N-STATUS.md` -> `docs/architecture/i18n-status.md`
- Mantener los pasos de compilación y pruebas del repositorio como parte del flujo pre-commit.
- Actualizar EVOLUTION_LOG.md con la finalización de esta tarea Kaizen/Feature.

## Arquitectura y Componentes
- `README.md` (Raíz): Actuará como SSOT principal, incluyendo setup, configuración, guías de usuario de GIT y solución de problemas CORS/API.
- `docs/testing/` y `docs/architecture/`: Nuevos hogares para guías especializadas (testing, i18n).