---
id: obj-refactor-shared-form
title: Objetivos de la refactorización de UserForm
status: active
---
# Objetivos
Refactorizar `src/components/usuarios/user-form.tsx` para eliminar la gestión de estado manual (`useState`) y la validación manual, alineándolo con el stack moderno del proyecto (`react-hook-form` y `@hookform/resolvers/zod`). Esto reducirá código duplicado, estandarizará la UI usando componentes de formulario y mejorará la mantenibilidad.
