---
title: "Especificación de Actualización de selectores Auth en pruebas E2E"
date: "2026-04-29"
status: "completed"
---

# Especificación Técnica

- Reemplazar "login-usuario-input" por "login-username-input" en todos los archivos del directorio `src/tests/`.
- Reemplazar la palabra estática "usuario-inexistente" por "username-inexistente" en `src/tests/e2e/logging-persistence.spec.ts`.
- Reemplazar "Input Usuario" por "Input Username" en `src/tests/TEST-IDS.md`.
- Reemplazar "Input Contraseña" por "Input Password" en `src/tests/TEST-IDS.md`.
- Reemplazar descripciones relacionadas ("Campo de entrada para contraseña", "Campo de contraseña") por el equivalente con "password" en `src/tests/TEST-IDS.md`.
- Ejecutar suite de pruebas de Playwright para validar.