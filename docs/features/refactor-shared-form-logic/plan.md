---
id: plan-refactor-shared-form
title: Plan de refactorización de UserForm
status: active
---
# Plan
1. Analizar el componente actual `user-form.tsx` y su comportamiento condicional (creación vs edición).
2. Crear un esquema combinado o seleccionar dinámicamente entre `createUserSchema` y `updateUserSchema` dentro del hook `useForm`.
3. Reemplazar el renderizado manual por los componentes `<FormField>` asegurando conservar atributos como `data-testid`.
4. Ejecutar pruebas unitarias (`npm run test:all`) y chequeos de TypeScript (`tsc --noEmit`) para garantizar la integridad (The Wall).
