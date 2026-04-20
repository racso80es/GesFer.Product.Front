---
id: fix-mycompany-rastros-ui-i18n-implementation
action_id: implementation
feature_id: fix-mycompany-rastros-ui-i18n
title: Implementación registrada
date: "2026-04-20"
status: done
branch: fix/mycompany-rastros-ui-i18n
---

# Implementación

- Rama **`fix/mycompany-rastros-ui-i18n`** creada vía skill `iniciar-rama`.
- **next.config:** sin redirects dedicados; rutas no definidas se resuelven con el comportamiento por defecto de Next.js (not-found).
- **i18n:** namespaces `myCompany` unificados; eliminado `companies`; `navigation.myCompany` en `es` / `en` / `ca`.
- **UI:** `CompanyForm` en `src/components/my-company/company-form.tsx`; página `my-company` actualizada a claves nuevas (`editDetails`, `emptyState`).
- **Tests:** E2E `my-company.spec.ts`, page object `MyCompanyPage`; ajustes `DashboardPage`, mock `usuarios/page.test`.
- **Middleware:** solo rutas protegidas habituales (incluye `/my-company`); sin reglas ad hoc para paths concretos inexistentes.
- **E2E:** escenario dashboard → `goToMyCompany`.
- **Integración:** refactor de comentarios y nombres en tests que usan `/api/company`.
- **Cliente HTTP / BFF:** `effectiveBaseUrl` en `src/lib/api/client.ts` y mensajes de error con `message` o `error`; comentario en `src/lib/api-origin.ts`.

## Problemas detectados

| ID | Síntoma | Causa raíz | Evidencia / notas |
| :--- | :--- | :--- | :--- |
| P1 | Mensaje en pantalla **`Error 404: Not Found`** al abrir `/my-company`. | El `apiClient` construía la URL con **`NEXT_PUBLIC_API_URL`** (origen del API de producto, p. ej. `http://localhost:5020`) más `/api/my-company`. Esa ruta **no existe en el backend**; el BFF solo está en **Next** (`/api/my-company` en el origen de la app). La respuesta era HTML 404, fallaba el `json()` y el cliente usaba la plantilla `Error ${status}: ${statusText}`. | Reproducción con app en `:3000` y API en `:5020`. |
| P2 | Tras un 404 JSON del BFF con `{ error: "…" }` sin `message`, el usuario veía un mensaje genérico poco útil. | El parser solo leía `message` en el tipo `ApiError`. | Respuestas del route handler con campo `error`. |

## Correcciones aplicadas (resumen técnico)

1. **`lib/api/client.ts`**
   - `effectiveBaseUrl(path)`: en **navegador**, para `/api/my-company` (y subrutas), base vacía → **URL relativa al origen** de Next (donde existe el Route Handler).
   - `get` / `delete`: construcción de `URL` compatible con esa base (origen actual cuando la base efectiva es la BFF).
   - Respuestas `!ok`: lectura de cuerpo JSON con `message` **o** `error`.
2. **`lib/api-origin.ts`:** documentado el comportamiento del cliente respecto al BFF frente a `NEXT_PUBLIC_API_URL`.

## Fuera de este fix (comportamiento aceptado)

- El middleware **no** trata `/companies` de forma especial: 404 como cualquier ruta sin página.

## PUT mi organización — cuerpo y 500 (2026-04-20)

- **Causa habitual de 500:** envío de `postalCodeId`, `cityId`, `stateId`, `countryId` o `languageId` como cadena vacía `""`; el API de producto (binder Guid) suele fallar. **Corrección:** `sanitizeCompanyMutationBody` en `src/lib/utils/company-payload.ts` y uso en `CompanyForm`; inclusión opcional de `id` de la empresa en el cuerpo.
- **Diagnóstico:** `getProductApi` ahora lee el cuerpo de error del upstream; la ruta BFF reenvía el mensaje en `{ error }`.
- **E2E:** `MyCompanyPage.updateOrganization` espera la respuesta `PUT` y falla con mensaje explícito si no es 2xx.

## Seguimiento — hidratación y documentación (2026-04-20)

- **Nota técnica del bug:** `technical-note-hydration.md` en esta carpeta.
- **Norma reutilizable (proyecto):** `SddIA/norms/nextjs-hydration-client-state.md`.
- **Hook:** `src/hooks/use-has-mounted.ts` (paridad SSR / primer render del cliente).
- **Tests de política:** `src/__tests__/policies/nextjs-hydration-policy.test.ts`.
- **Agente Tekton:** restricción e instrucción en `SddIA/agents/tekton-developer.json`.
