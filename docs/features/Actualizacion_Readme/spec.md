---
title: Especificación técnica para unificar y migrar READMEs
type: spec
task_id: TASK-001
---
# Especificación Técnica

## Requerimientos
1. Leer y analizar el contenido de los siguientes archivos en la carpeta `src/`:
   - `src/SETUP.md`
   - `src/CONFIGURACION-API.md`
   - `src/config/README.md`
   - `src/README-TESTS.md`
   - `src/tests/README.md`
   - `src/tests/README-BEST-PRACTICES.md`
2. Modificar el archivo principal `README.md` (raíz del proyecto) para incorporar el contenido esencial de `src/SETUP.md`, `src/CONFIGURACION-API.md`, y `src/config/README.md`.
3. Crear o actualizar `docs/testing/testing-guide.md` con la información contenida en los READMEs de pruebas.
4. Eliminar los archivos originales después de migrar su información para mantener limpia la carpeta `src/`.

## Normativa SddIA Aplicable
- Los archivos con guías de arquitectura y pruebas deben estar en `docs/architecture/` y `docs/testing/` y referenciados en el `README.md` principal.
- No se permiten archivos de documentación redundantes y sueltos dentro del directorio `src/`.
