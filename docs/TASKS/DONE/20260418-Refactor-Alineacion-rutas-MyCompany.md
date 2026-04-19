# Tarea automatizada: Refactorización de alineación rutas My Company

**Origen:** PR `1181935355670548290` (Rama: `feat/adecuar-companies-a-mycompany-1181935355670548290`)

**Agente detector:** architect / qa-judge

## Contexto

El cliente de front usa rutas tipo `/api/MyCompany` en `src/lib/api/my-company.ts`, mientras la ruta Next.js de encabezado BFF vive en `src/app/api/my-company/route.ts` (convención de URL distinta). En despliegues donde el origen del `apiClient` sea el backend de producto, el contrato puede ser coherente; donde intervenga el propio Next, conviene evitar ambigüedad de casing y segmentos.

Además, la lógica del hook `src/hooks/use-my-company.ts` carece de tests unitarios dedicados; el flujo queda cubierto en parte por E2E.

## Objetivo del refactor (S+ Grade)

Documentar o unificar el contrato de URL “My Company” (backend vs BFF Next) y, si la política del repo lo exige, añadir pruebas unitarias mínimas del hook con mocks de `myCompanyApi` para cumplir criterios estrictos del agente qa-judge sin duplicar E2E.

## Instrucciones para Tekton / Jules

1. Revisar `getPublicApiOrigin()` / `NEXT_PUBLIC_API_URL` y documentar en un comentario breve o en `docs/architecture/` qué URL consume el browser para GET/PUT de “mi compañía” y cuándo aplica la ruta `app/api/my-company`.
2. Si se decide unificar nombres, alinear `my-company.ts` y la carpeta `app/api/` sin romper el contrato del API de producto (validar en entorno de integración).
3. Añadir test unitario de `useMyCompany` (React Query + mock de `myCompanyApi`) o registrar excepción explícita de política si solo se acepta cobertura E2E.
