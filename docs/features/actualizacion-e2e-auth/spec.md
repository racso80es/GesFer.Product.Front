---
id: actualizacion-e2e-auth-spec
action_id: feature-002
feature_id: actualizacion-e2e-auth
title: Spec
status: pending
---
# Especificaciones

- Reemplazar todas las apariciones de "usuarioInput" por "usernameInput" en las pruebas E2E.
- Modificar las variables y los locators en `src/tests/page-objects/LoginPage.ts`.
- Simplificar las expresiones regulares de locators en `LoginPage.ts` a `/username/i` y `/password/i`.
- Realizar pruebas E2E para confirmar que el auth sigue funcionando con los locators ajustados.
