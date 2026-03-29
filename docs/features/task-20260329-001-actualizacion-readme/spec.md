---
name: Actualizacion Readme
type: feature
date: "2026-03-29"
status: active
---

# Especificación Técnica

## Descripción

El proyecto contiene actualmente documentación redundante con respecto a pruebas o guías ubicadas dentro del directorio `src/`. Esto genera confusión sobre cuál es el punto único de información (SSOT). La meta es unificar y refinar la documentación.

## Cambios Propuestos

1. Identificar archivos como `src/README-TESTS.md` o `src/config/README.md`.
2. Consolidar el contenido técnico o explicativo dentro de la raíz `README.md` o en las guías correspondientes dentro de `docs/` (p.ej., `docs/testing/testing-guide.md`).
3. Eliminar los archivos residuales en el directorio `src/` para evitar que se desactualicen.
4. Actualizar las referencias de `README.md` hacia los archivos eliminados/movidos.
