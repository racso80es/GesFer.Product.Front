---
id: fix-mycompany-rastros-ui-i18n-spec
action_id: spec
feature_id: fix-mycompany-rastros-ui-i18n
title: Especificación — limpieza My Company
date: "2026-04-20"
status: active
branch: fix/mycompany-rastros-ui-i18n
---

# Especificación

## 1. Rutas

- **Canónica:** `/my-company` (vista con `MainLayout`, `ProtectedRoute`, `useMyCompany`).
- No debe existir **ningún caso especial en código** para paths inexistentes; un segmento sin página se comporta como **not-found** igual que cualquier otra ruta no definida en App Router.
- **Middleware:** rutas protegidas incluyen `/my-company`.

## 2. Internacionalización

- Eliminar el namespace raíz `companies` de los ficheros de mensajes.
- Consolidar textos de pantalla y formulario bajo **`myCompany`** (`title`, `subtitle`, `editDetails`, `emptyState`, `table.*`, `form.*`, mensajes de error/carga).
- En **`navigation`**, sustituir `companies` por **`myCompany`** con etiqueta acorde (p. ej. «Mi organización»).

## 3. Componentes

- Mover `CompanyForm` a `src/components/my-company/company-form.tsx`.
- Referencias de UI: `data-testid` con prefijo `my-company-form-*`.

## 4. Pruebas

- E2E: `src/tests/e2e/my-company.spec.ts` — `MyCompanyPage`, navegación desde `DashboardPage`.
- Integración API: `users-organization-api-integrity.test.ts` (antes `users-companies-integrity`) y mensajes en `id-validation.test.ts`.
- Ajustar tests unitarios que mockeen claves `navigation.*`.

## 5. Tests de integración (`/api/company`)

- Deben **nombrarse y documentarse** como contrato **API de producto** (listado/CRUD de organizaciones en backend), explícitamente distinto de «Mi organización» en cliente.

## 6. Cliente HTTP y BFF `/api/my-company` (obligatorio en navegador)

- **`NEXT_PUBLIC_API_URL`** puede apuntar al **API de producto** (p. ej. `:5020`). Las rutas **BFF** definidas solo en Next (`src/app/api/...`) no existen en ese host.
- El cliente debe solicitar **`/api/my-company`** como **origen de la aplicación Next** (URL relativa o mismo origen), no concatenando el origen del API de producto. Implementación: `effectiveBaseUrl` en `lib/api/client.ts`.
