---
id: spec-actualizacion-readme
action_id: exec-actualizacion-readme
feature_id: actualizacion-readme
title: Especificación de Actualización de Readme
status: ACTIVE
---

# Especificación

1. Los siguientes archivos deben ser movidos a `docs/architecture/`:
   - `src/I18N-GUIDE.md` -> `docs/architecture/i18n-guide.md`
   - `src/I18N-STATUS.md` -> `docs/architecture/i18n-status.md`
2. Los siguientes archivos deben ser movidos a `docs/testing/`:
   - `src/README-TESTS.md` -> `docs/testing/README-TESTS.md`
3. Los siguientes archivos deben ser revisados e integrados en el `README.md` principal, y luego eliminados:
   - `src/SETUP.md`
   - `src/INSTRUCCIONES.md`
   - `src/CONFIGURACION-API.md`
   - `src/SOLUCION-PROBLEMAS.md`
   - `src/SOLUCION-CORS.md`
   - `src/COMANDOS-GIT.md`
4. El `README.md` principal en la raíz debe reflejar la consolidación.
