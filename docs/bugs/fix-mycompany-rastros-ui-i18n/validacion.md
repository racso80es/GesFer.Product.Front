---
id: fix-mycompany-rastros-ui-i18n-validacion
action_id: validate
feature_id: fix-mycompany-rastros-ui-i18n
title: Validación
date: "2026-04-20"
status: done
branch: fix/mycompany-rastros-ui-i18n
---

# Validación

| Comprobación | Estado |
| :--- | :--- |
| `JSON` mensajes `es` / `en` / `ca` | OK (parse local) |
| Jest `use-my-company`, `usuarios/page.test` | OK |
| Jest `__tests__/lib/api/client.test.ts` | OK (tras corrección BFF en `apiClient`) |
| `next lint` | OK |
| E2E Playwright `my-company.spec.ts` | Ejecutar con app + API cuando se valide el entorno CI/local |
| Pantalla `/my-company` sin **Error 404: Not Found** por URL incorrecta | Corregido vía `effectiveBaseUrl` (ver `implementation.md`, problema P1) |
