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
| Mensajes `es` / `en` / `ca` (namespaces `myCompany`, `navigation`) | OK |
| Jest `use-my-company`, `usuarios/page.test` | OK (regresión conocida del proyecto salvo contratos) |
| Jest `__tests__/lib/api/client.test.ts` | OK (BFF `effectiveBaseUrl`) |
| Jest `__tests__/policies/nextjs-hydration-policy.test.ts` | OK |
| Jest `__tests__/lib/utils/company-payload.test.ts` | OK |
| `next lint` | OK |
| E2E Playwright `my-company.spec.ts` | Ejecutar con app Next + API producto; `MyCompanyPage.updateOrganization` exige `PUT` 2xx |
| Pantalla `/my-company` sin **404** por URL incorrecta del BFF | Corregido (`effectiveBaseUrl`) — ver P1 en `implementation.md` |
| Guardado edición sin **500** por Guids `""` en PUT | Corregido (`sanitizeCompanyMutationBody`) — ver `implementation.md` |
| Consola sin warning de hidratación en rutas con `ProtectedRoute` | Corregido (`useHasMounted` + norma) — ver `technical-note-hydration.md` |

## Comandos de verificación local (referencia)

Desde `src/`:

- `npm run lint`
- `npm test -- --testPathPattern="use-my-company|nextjs-hydration-policy|company-payload" --no-coverage`
- `npm run test:e2e -- tests/e2e/my-company.spec.ts` (con servicios levantados)
