---
id: actualizacion_e2e_auth_implementation
title: Implementación de Actualización de selectores Auth en E2E
status: completed
created: 2026-05-11
---

## Cambios Realizados
1. Ejecutamos `sed -i` en `TEST-IDS.md` para estandarizar las referencias de los Test IDs en la documentación.
2. Usamos `sed -i` en los test spec files para cambiar la palabra 'usuario' por 'username' o quitarla cuando correspondía en `admin_logs.spec.ts`, `logging-persistence.spec.ts` y `logs_purge_logic.spec.ts`.
3. Actualizamos `LoginPage.ts` modificando un comentario en español por su equivalente en inglés (`auth_user`).
