---
id: e2e-auth-selectors
action_id: feature-e2e-auth-selectors
feature_id: e2e-auth-selectors
title: Actualización de selectores Auth en pruebas E2E (S+)
status: in_progress
---

# Plan

1. Reemplazar `usuarioInput` por `usernameInput` en `src/tests/page-objects/LoginPage.ts`.
2. Reemplazar `usuarioInput` por `usernameInput` en los archivos de prueba en `src/tests/e2e/`.
3. Validar con Playwright que todas las pruebas pasen.
4. Generar documentación del feature y finalizar la tarea Kaizen.