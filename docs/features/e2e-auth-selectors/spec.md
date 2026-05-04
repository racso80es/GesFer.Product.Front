---
id: e2e-auth-selectors
action_id: feature-e2e-auth-selectors
feature_id: e2e-auth-selectors
title: Actualización de selectores Auth en pruebas E2E (S+)
status: in_progress
---

# Especificación Técnica

Se debe actualizar la nomenclatura de las variables y selectores en los archivos de prueba e2e de Playwright y en los objetos de página (`Page Objects`) relacionados con el inicio de sesión.
- En `src/tests/page-objects/LoginPage.ts`:
  - Cambiar `usuarioInput` a `usernameInput`.
  - Cambiar el selector `login-usuario-input` a `login-username-input`.
- En todos los archivos e2e aplicables (`logging-persistence.spec.ts`, `logs.spec.ts`, `logs_purge_logic.spec.ts`, `login.spec.ts`, `admin_logs.spec.ts`):
  - Cambiar las referencias a `usuarioInput` por `usernameInput`.