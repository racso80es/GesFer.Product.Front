---
id: spec-mycompany-refactor
action_id: action-mycompany-refactor
feature_id: refactorization-mycompany-routes
title: Especificación de Alineación de Rutas MyCompany
status: ACTIVE
---

# Especificación de Alineación de Rutas MyCompany
1. Actualizar `src/lib/api-origin.ts` para documentar la URL que se consume por el frontend (Next.js vs external).
2. Cambiar explícitamente `"/api/MyCompany"` a `"/api/my-company"` en `src/lib/api/my-company.ts`.
3. Escribir test en `src/hooks/use-my-company.test.tsx`.