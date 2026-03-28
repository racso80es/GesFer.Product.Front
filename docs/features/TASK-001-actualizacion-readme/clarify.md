---
type: clarify
title: Clarificaciones para la unificación
feature: TASK-001-actualizacion-readme
---

# Clarificaciones

- ¿Debemos mantener los readmes especializados en `src/`?
  - No, los readmes especializados (testing, i18n) deben moverse a la ruta canónica `docs/testing/` y `docs/architecture/` respectivamente.
- ¿Qué información se transfiere a `README.md`?
  - Información de API, Comandos, Solución de problemas, Setup e Instrucciones.
- ¿Se debe borrar el `src/README-TESTS.md`?
  - Sí, su contenido será consolidado en `docs/testing/testing-guide.md` o referenciado correctamente.