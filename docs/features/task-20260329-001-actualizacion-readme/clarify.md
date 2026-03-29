---
name: Actualizacion Readme
type: feature
date: "2026-03-29"
status: active
---

# Clarificaciones

- **D-01 (Ubicación Tests Docs)**: ¿A dónde mover el README de pruebas (`src/README-TESTS.md` o `src/tests/README.md`)?
  - *Decisión*: El archivo maestro de pruebas debe ser `docs/testing/testing-guide.md` para concentrar la arquitectura de pruebas ahí y hacer referencia a este desde el root `README.md`.
- **D-02 (Archivos en src)**: ¿Se deben eliminar por completo los `README.md` locales en la carpeta de código?
  - *Decisión*: Sí. Para mantener `src/` limpio, todo documento debe vivir en `docs/` o el root principal.
