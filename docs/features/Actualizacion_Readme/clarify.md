---
title: Clarificaciones
type: clarify
task_id: TASK-001
---
# Clarificaciones y Supuestos

## Decisión sobre la unificación de los READMEs de pruebas
Los archivos `src/README-TESTS.md`, `src/tests/README.md` y `src/tests/README-BEST-PRACTICES.md` tratan sobre las pruebas. De acuerdo a las instrucciones de memoria y SddIA del proyecto, la guía de pruebas debe estar ubicada en `docs/testing/testing-guide.md`. Dado el volumen de la información de Playwright vs unit testing, moveré los archivos a `docs/testing/` y renombraré como `testing-guide.md` el archivo principal de Jest, y `playwright-readme.md` el específico de E2E, con una clara referencia en el root `README.md`.

## Modificación del README.md en la raíz
Voy a incluir secciones como "Configuración de Entornos" y "Configuración de la API", y "Setup Completo" dentro de las ya existentes secciones de configuración del `README.md` principal.
