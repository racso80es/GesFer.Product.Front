---
id: "CLARIFY-001"
action_id: "clarify-001"
feature_id: "actualizacion-readme"
title: "Clarificaciones para Actualización de Readme"
status: "DONE"
---

# Clarificaciones y Decisiones

1.  **¿Se deben eliminar los READMEs internos de componentes específicos (ej. en `config`, `tests`)?**
    *   No. La directiva y el alcance especificado indican que nos enfoquemos en los archivos redundantes a nivel de `src/` que compiten o repiten la información de inicio y configuración: `src/SETUP.md`, `src/INSTRUCCIONES.md`, y `src/README-TESTS.md`.
2.  **¿Qué ocurre con las secciones repetidas entre `SETUP.md` y `INSTRUCCIONES.md`?**
    *   Se consolidarán en una sola sección coherente en el `README.md` principal, priorizando la estructura más clara (normalmente la de `INSTRUCCIONES.md` con los pasos explícitos para el script de PowerShell `setup.ps1` vs la configuración manual).
3.  **¿Se deben actualizar los enlaces internos en otros documentos que apunten a los archivos eliminados?**
    *   El propio `README.md` actual tiene una referencia: `Más detalle operativo: src/SETUP.md, src/CONFIGURACION-API.md, tests en src/tests/README.md.`. Estos se eliminarán o actualizarán para reflejar que la información ahora está en el propio `README.md`.