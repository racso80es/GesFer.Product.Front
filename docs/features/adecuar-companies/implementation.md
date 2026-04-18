---
id: T-20240418-001
action_id: action-implementation
feature_id: adecuar-companies
title: Adecuar Companies a MyCompany
status: IMPLEMENTED
---

# Implementation

1. Creado el hook `useMyCompany` en `src/hooks/use-my-company.ts`. Este hook provee el estado `company`, mutaciones para `updateCompany`, y estados de carga y error utilizando `@tanstack/react-query`.
2. Modificado `src/app/[locale]/companies/page.tsx` para consumir este hook. Se refactorizó la UI, pasando de una tabla de listado a una vista detallada de la compañía ("My Company"), eliminando lógica vieja asociada con crear, borrar y listar múltiples organizaciones.
3. Se integró la reutilización del componente de UI `CompanyForm` (que ya estaba habilitado para recibir data inicial y realizar un update) al modal de edición.
4. Se eliminó la capa de API obsoleta (`src/lib/api/companies.ts`), así como las rutas hijas obsoletas (ej. `src/app/[locale]/companies/[id]/page.tsx` y las equivalentes en la ruta client old). Adicionalmente, se eliminaron tests de integración/E2E que apuntaban a esas APIs y rutas ya no existentes.
