# Especificación de Actualización del README

## Descripción de la Tarea
- **ID Tarea:** Actualizacion_Readme
- **Contexto:** El proyecto contiene varios archivos README dispersos en la carpeta `src/`, lo que genera fragmentación de la documentación.
- **Objetivo:** Unificar todos los contenidos importantes de `src/README-TESTS.md`, `src/config/README.md`, `src/tests/README-BEST-PRACTICES.md` y `src/tests/README.md` en el `README.md` de la raíz del repositorio, para que sirva como "Single Source of Truth" (SSOT) de la documentación general, pruebas y configuración.

## Artefactos a modificar
- **`README.md` (raíz):** Añadir secciones completas para "Configuración de Entorno", "Pruebas de Playwright (E2E y API)" y "Mejores Prácticas de Pruebas", adaptando el contenido desde los READMEs de `src/`.
- **Archivos a eliminar:**
  - `src/README-TESTS.md`
  - `src/config/README.md`
  - `src/tests/README-BEST-PRACTICES.md`
  - `src/tests/README.md`

## Restricciones y consideraciones
- La lectura del `README.md` final debe seguir siendo fluida.
- El repositorio sigue una política estricta de Leyes Universales (`AGENTS.md`) donde la carpeta `docs/` y el archivo `README.md` en la raíz son las fuentes principales.
- Se debe validar que los comandos de tests (`npm run test:all`) referenciados no se rompan tras esta unificación.