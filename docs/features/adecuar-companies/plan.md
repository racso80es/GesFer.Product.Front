---
id: T-20240418-001
action_id: action-plan
feature_id: adecuar-companies
title: Adecuar Companies a MyCompany
status: PLANNED
---

# Plan

1. **Custom Hook (`useMyCompany`)**:
   Crear `src/hooks/use-my-company.ts` usando `@tanstack/react-query` (`useQuery` para `get` y `useMutation` para `update`) apoyándose en `myCompanyApi` de `src/lib/api/my-company.ts`.
2. **Page Refactoring (`src/app/[locale]/companies/page.tsx`)**:
   - Eliminar el renderizado de la tabla de múltiples empresas.
   - Eliminar mutaciones de borrado, listado y creación.
   - Implementar un diseño de tarjeta única que muestre los datos de `myCompany`.
   - Incluir un botón de "Editar" que abre el formulario `CompanyForm` (ya existente y compatible con update).
3. **Limpieza**:
   - Remover código legacy que ya no se utiliza en el contexto de un solo perfil "My Company".
