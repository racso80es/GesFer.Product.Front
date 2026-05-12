---
title: "Especificación Kaizen - Double Casts"
---
- Se refactorizará el llamado `onSubmit` en `src/components/usuarios/user-form.tsx` para usar un solo layer de casting `as CreateUser | UpdateUser`.
- Se refactorizará `src/components/my-company/company-form.tsx` para usar un solo layer `as CreateCompany | UpdateCompany`.
