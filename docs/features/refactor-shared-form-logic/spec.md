---
id: spec-refactor-shared-form
title: Especificación de la refactorización de UserForm
status: active
---
# Especificación
1. Modificar `src/components/usuarios/user-form.tsx` para usar `useForm` de `react-hook-form`.
2. Integrar `zodResolver` utilizando los esquemas `createUserSchema` y `updateUserSchema` de `src/lib/validations/user.ts`.
3. Migrar todos los campos manuales (`Input`, `Select`) a la suite estándar de UI: `Form`, `FormField`, `FormItem`, `FormControl`, `FormMessage`.
4. Mantener la lógica de inicialización y traducción (next-intl).
